// Open Trivia DB API Service
// API Documentation: https://opentdb.com/api_config.php

const API_BASE_URL = "https://opentdb.com";
const QUESTIONS_PER_QUIZ = 10;

// Session token management
let sessionToken = null;

/**
 * Get or create a session token to prevent duplicate questions
 */
async function getSessionToken() {
  if (sessionToken) return sessionToken;
  
  try {
    const response = await fetch(`${API_BASE_URL}/api_token.php?command=request`);
    const data = await response.json();
    
    if (data.response_code === 0 && data.token) {
      sessionToken = data.token;
      return sessionToken;
    }
  } catch (error) {
    console.warn("Failed to get session token:", error);
  }
  
  return null;
}

/**
 * Reset the session token when all questions have been exhausted
 */
async function resetSessionToken() {
  if (!sessionToken) return;
  
  try {
    await fetch(`${API_BASE_URL}/api_token.php?command=reset&token=${sessionToken}`);
  } catch (error) {
    console.warn("Failed to reset session token:", error);
  }
  
  sessionToken = null;
}

/**
 * Decode HTML entities in text
 */
function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

/**
 * Transform API question format to app format
 */
function transformQuestion(apiQuestion, index) {
  const options = [
    ...apiQuestion.incorrect_answers.map(decodeHTML),
    decodeHTML(apiQuestion.correct_answer)
  ];
  
  // Shuffle options
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  
  const correctOption = options.indexOf(decodeHTML(apiQuestion.correct_answer));
  
  // Assign points based on difficulty
  const points = {
    easy: 10,
    medium: 20,
    hard: 30
  }[apiQuestion.difficulty] || 10;
  
  return {
    question: decodeHTML(apiQuestion.question),
    options,
    correctOption,
    points,
    difficulty: apiQuestion.difficulty,
    category: decodeHTML(apiQuestion.category),
    type: apiQuestion.type
  };
}

/**
 * Fetch questions from Open Trivia DB
 * @param {Object} options - Query options
 * @param {string} options.difficulty - Difficulty level: 'easy', 'medium', 'hard', or null for mixed
 * @param {number} options.category - Category ID (optional)
 * @param {string} options.type - Question type: 'multiple' or 'boolean' (optional)
 * @returns {Promise<Array>} Array of formatted questions
 */
export async function fetchQuestions({ difficulty = null, category = null, type = null } = {}) {
  try {
    // Get session token
    const token = await getSessionToken();
    
    // Build query parameters
    const params = new URLSearchParams({
      amount: QUESTIONS_PER_QUIZ.toString()
    });
    
    if (difficulty) params.append('difficulty', difficulty);
    if (category) params.append('category', category.toString());
    if (type) params.append('type', type);
    if (token) params.append('token', token);
    
    // Fetch questions
    const response = await fetch(`${API_BASE_URL}/api.php?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Handle response codes
    switch (data.response_code) {
      case 0: // Success
        return data.results.map(transformQuestion);
        
      case 1: // No results
        throw new Error("Not enough questions available for this query. Try a different difficulty or category.");
        
      case 2: // Invalid parameter
        throw new Error("Invalid query parameters. Please try again.");
        
      case 3: // Token not found
        sessionToken = null;
        return fetchQuestions({ difficulty, category, type }); // Retry
        
      case 4: // Token empty (all questions exhausted)
        await resetSessionToken();
        return fetchQuestions({ difficulty, category, type }); // Retry
        
      case 5: // Rate limit
        throw new Error("Too many requests. Please wait a moment and try again.");
        
      default:
        throw new Error("An unexpected error occurred. Please try again.");
    }
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
}

/**
 * Fetch available categories
 */
export async function fetchCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/api_category.php`);
    const data = await response.json();
    return data.trivia_categories || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

/**
 * Get question count for a category
 */
export async function getCategoryQuestionCount(categoryId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api_count.php?category=${categoryId}`);
    const data = await response.json();
    return data.category_question_count;
  } catch (error) {
    console.error("Error fetching question count:", error);
    return null;
  }
}
