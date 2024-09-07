# React Quiz Application

## Overview
This React Quiz app is designed to test knowledge of React-related concepts. It features a timed quiz, local high score management, and is built with a focus on performance and clean state management using React’s `useReducer` hook. The quiz questions are dynamically fetched from a GitHub Gist.

## Features
- **Timed Quiz**: Users have a limited time to answer each question, adding a layer of challenge.
- **High Score Management**: Scores are stored in the browser's local storage, allowing users to track their best results.
- **State Management**: State is managed using the `useReducer` hook, ensuring all app behavior is consolidated into a single state with dispatch actions.
- **Dynamic Questions**: Quiz questions are fetched from an external GitHub Gist.

## Technologies Used
- **React JS**: For building the user interface and managing state.
- **useReducer Hook**: For managing complex state with a single reducer and dispatch actions.
- **CSS**: For styling the quiz interface.
- **Local Storage**: To store high scores persistently across sessions.
- **GitHub Gist**: For fetching quiz questions.
  
## Deployed URL
You can try out the live quiz here: [React Quiz App](https://quiz-app-by-logicule.vercel.app/)

## How It Works
1. Start the quiz and answer the React-related questions within the time limit.
2. Once the quiz is completed, the user's score is calculated and compared to the current high score.
3. The high score is saved in local storage for future reference.
