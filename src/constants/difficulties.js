export const DIFFICULTIES = {
  EASY: {
    value: 'easy',
    label: 'Easy',
    color: 'success',
    icon: '🌱',
    description: 'Perfect for beginners',
    points: 10
  },
  MEDIUM: {
    value: 'medium',
    label: 'Medium',
    color: 'warning',
    icon: '⚡',
    description: 'A good challenge',
    points: 20
  },
  HARD: {
    value: 'hard',
    label: 'Hard',
    color: 'destructive',
    icon: '🔥',
    description: 'For quiz masters',
    points: 30
  }
};

export const DIFFICULTY_OPTIONS = Object.values(DIFFICULTIES);
