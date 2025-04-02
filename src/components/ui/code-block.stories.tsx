import type { Meta, StoryObj } from '@storybook/react';

import { CodeBlock } from './code-block';

const meta = {
  component: CodeBlock,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    files: {
      control: 'object',
      description: 'Array of file blocks containing title, code, and optional language',
    },
    defaultTitle: {
      control: 'text',
      description: 'The default active file tab',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-3xl w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CodeBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

// JavaScript example with single file
export const SingleJavaScriptFile: Story = {
  args: {
    files: [
      {
        title: 'example.js',
        code: `// Core utilities
const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

// Sample data
const posts = [
  { id: 1, title: 'Getting Started with React', date: '2023-03-15' },
  { id: 2, title: 'Advanced JavaScript Patterns', date: '2023-04-22' },
  { id: 3, title: 'CSS Grid Layout Techniques', date: '2023-05-10' },
];

// Filter posts by date range
function filterPostsByDate(items, startDate, endDate) {
  return items.filter(post => {
    const postDate = new Date(post.date);
    return postDate >= startDate && postDate <= endDate;
  });
}

// Display formatted posts
const displayPosts = (postList) => {
  return postList.map(post => {
    return \`<article>
      <h2>\${post.title}</h2>
      <time>\${formatDate(post.date)}</time>
    </article>\`;
  }).join('\\n');
};

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  const startDate = new Date('2023-01-01');
  const endDate = new Date('2023-12-31');
  
  const filteredPosts = filterPostsByDate(posts, startDate, endDate);
  const postsHTML = displayPosts(filteredPosts);
  
  document.getElementById('posts-container').innerHTML = postsHTML;
  console.log(\`Rendered \${filteredPosts.length} posts\`);
});`,
      },
    ],
  },
};

// Multiple files with TypeScript example
export const MultipleFiles: Story = {
  args: {
    files: [
      {
        title: 'app.tsx',
        code: `import React from 'react';
import { createRoot } from 'react-dom/client';
import { UserProfile } from './components/UserProfile';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';
import './styles/global.css';

// Main application component
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <div className="app-container">
          <header>
            <h1>User Dashboard</h1>
          </header>
          <main>
            <UserProfile />
          </main>
          <footer>
            <p>&copy; 2023 TechBlitz</p>
          </footer>
        </div>
      </UserProvider>
    </ThemeProvider>
  );
};

// Initialize the React application
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}`,
      },
      {
        title: 'UserProfile.tsx',
        code: `import React, { useState, useEffect } from 'react';
import { useUser } from '../hooks/useUser';
import { UserStats } from './UserStats';
import { Avatar } from './Avatar';
import { EditProfileForm } from './EditProfileForm';
import { User } from '../types';

export const UserProfile: React.FC = () => {
  const { user, updateUser } = useUser();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  if (!user) {
    return <div>Loading user profile...</div>;
  }
  
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };
  
  const handleProfileUpdate = (updatedUser: Partial<User>) => {
    updateUser(updatedUser);
    setIsEditing(false);
  };
  
  return (
    <div className="user-profile">
      <div className="profile-header">
        <Avatar src={user.avatarUrl} alt={user.name} size="large" />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <button onClick={handleEditToggle}>
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>
      
      {isEditing ? (
        <EditProfileForm 
          user={user} 
          onSubmit={handleProfileUpdate} 
        />
      ) : (
        <>
          <div className="profile-details">
            <p><strong>Location:</strong> {user.location}</p>
            <p><strong>Member since:</strong> {new Date(user.joinDate).toLocaleDateString()}</p>
            <p><strong>Bio:</strong> {user.bio || 'No bio provided'}</p>
          </div>
          
          <UserStats userId={user.id} />
        </>
      )}
    </div>
  );
};`,
      },
      {
        title: 'types.ts',
        code: `// User interfaces
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  location: string;
  joinDate: string;
  bio?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  emailNotifications: boolean;
  language: string;
}

// Stats interfaces
export interface UserStats {
  completedChallenges: number;
  totalPoints: number;
  streak: number;
  badges: Badge[];
  rank: UserRank;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  earnedAt: string;
}

export type UserRank = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Master';

// Form interfaces
export interface ProfileFormData {
  name: string;
  email: string;
  location: string;
  bio: string;
}

// Theme context types
export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}`,
      },
      {
        title: 'global.css',
        language: 'css',
        code: `:root {
  --primary: #3b82f6;
  --primary-dark: #1d4ed8;
  --secondary: #10b981;
  --accent: #8b5cf6;
  --background: #ffffff;
  --foreground: #0f172a;
  --muted: #f1f5f9;
  --muted-foreground: #64748b;
  --card: #ffffff;
  --card-foreground: #1e293b;
  --border: #e2e8f0;
  --input: #e2e8f0;
  --ring: #3b82f6;
  --radius: 0.5rem;
}

.dark {
  --background: #0f172a;
  --foreground: #f8fafc;
  --muted: #1e293b;
  --muted-foreground: #94a3b8;
  --card: #1e293b;
  --card-foreground: #f1f5f9;
  --border: #334155;
  --input: #334155;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
    'Helvetica Neue', Arial, sans-serif;
  background-color: var(--background);
  color: var(--foreground);
  line-height: 1.6;
}

.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

button {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

button:hover {
  background-color: var(--primary-dark);
}

.user-profile {
  border-radius: var(--radius);
  background-color: var(--card);
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}`,
      },
    ],
    defaultTitle: 'app.tsx',
  },
};

// HTML, CSS, and JavaScript files
export const WebProjectFiles: Story = {
  args: {
    files: [
      {
        title: 'index.html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Quiz App</title>
    <link rel="stylesheet" href="styles.css">
    <script src="script.js" defer></script>
</head>
<body>
    <div class="quiz-container">
        <div class="header">
            <h1>Tech Knowledge Quiz</h1>
            <div class="progress-container">
                <div id="progress-bar" class="progress-bar"></div>
            </div>
            <div class="stats">
                <span id="question-counter">1/10</span>
                <span id="score">Score: 0</span>
            </div>
        </div>
        
        <div id="question-container" class="question-container">
            <h2 id="question">Sample question will appear here</h2>
            <div id="answers" class="answers">
                <!-- Answer buttons will be generated by JavaScript -->
            </div>
        </div>
        
        <div id="feedback" class="feedback hidden">
            <p id="feedback-text"></p>
            <button id="next-button">Next Question</button>
        </div>
        
        <div id="results" class="results hidden">
            <h2>Quiz Completed!</h2>
            <p>Your final score: <span id="final-score">0</span>/100</p>
            <button id="restart-button">Restart Quiz</button>
        </div>
    </div>
</body>
</html>`,
      },
      {
        title: 'styles.css',
        code: `/* Base styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #4b6cb7 0%, #182848 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    color: #333;
}

.quiz-container {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    width: 100%;
    max-width: 800px;
    overflow: hidden;
}

/* Header styles */
.header {
    background-color: #f8f9fa;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid #e9ecef;
}

.header h1 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #2c3e50;
}

.progress-container {
    height: 8px;
    background-color: #e9ecef;
    border-radius: 4px;
    margin-bottom: 0.5rem;
}

.progress-bar {
    height: 100%;
    background: linear-gradient(to right, #4b6cb7, #182848);
    border-radius: 4px;
    width: 10%;
    transition: width 0.3s ease;
}

.stats {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    color: #6c757d;
}

/* Question styles */
.question-container {
    padding: 2rem;
}

.question-container h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    line-height: 1.4;
}

.answers {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
}

@media (min-width: 768px) {
    .answers {
        grid-template-columns: 1fr 1fr;
    }
}

.answer-btn {
    background-color: #f8f9fa;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    padding: 1rem;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
    text-align: left;
}

.answer-btn:hover {
    background-color: #e9ecef;
}

.correct {
    background-color: #d4edda;
    border-color: #c3e6cb;
}

.incorrect {
    background-color: #f8d7da;
    border-color: #f5c6cb;
}

/* Feedback and results styles */
.feedback, .results {
    padding: 2rem;
    text-align: center;
}

.hidden {
    display: none;
}

button {
    background-color: #4b6cb7;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
}

button:hover {
    background-color: #3a5795;
}`,
      },
      {
        title: 'script.js',
        code: `// Quiz data
const quizData = [
    {
        question: "What does HTML stand for?",
        answers: [
            "Hypertext Markup Language",
            "Hypertext Markdown Language",
            "Hyperloop Machine Language",
            "Helicopters Terminal Motorboats Lamborginis"
        ],
        correct: 0
    },
    {
        question: "Which of the following is NOT a JavaScript framework?",
        answers: [
            "Angular",
            "React",
            "Vue",
            "Java Spring"
        ],
        correct: 3
    },
    {
        question: "What is the correct CSS syntax for making all text elements bold?",
        answers: [
            "text-style: bold",
            "font-weight: bold",
            "style: bold",
            "text: bold"
        ],
        correct: 1
    },
    // More questions can be added here
];

// DOM elements
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const progressBar = document.getElementById('progress-bar');
const questionCounter = document.getElementById('question-counter');
const scoreElement = document.getElementById('score');
const feedbackElement = document.getElementById('feedback');
const feedbackTextElement = document.getElementById('feedback-text');
const nextButton = document.getElementById('next-button');
const resultsElement = document.getElementById('results');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');

// Quiz state
let currentQuestion = 0;
let score = 0;
let userAnswers = [];

// Initialize quiz
function initQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    showQuestion();
    
    // Event listeners
    nextButton.addEventListener('click', nextQuestion);
    restartButton.addEventListener('click', restartQuiz);
}

// Display current question
function showQuestion() {
    const question = quizData[currentQuestion];
    questionElement.textContent = question.question;
    
    // Update progress
    progressBar.style.width = \`\${((currentQuestion + 1) / quizData.length) * 100}%\`;
    questionCounter.textContent = \`\${currentQuestion + 1}/\${quizData.length}\`;
    
    // Clear previous answers
    answersElement.innerHTML = '';
    
    // Create answer buttons
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.classList.add('answer-btn');
        button.textContent = answer;
        button.dataset.index = index;
        button.addEventListener('click', checkAnswer);
        answersElement.appendChild(button);
    });
    
    // Hide feedback and results
    feedbackElement.classList.add('hidden');
    resultsElement.classList.add('hidden');
}

// Check the selected answer
function checkAnswer(e) {
    const selectedIndex = parseInt(e.target.dataset.index);
    const correct = quizData[currentQuestion].correct === selectedIndex;
    
    // Record user's answer
    userAnswers[currentQuestion] = selectedIndex;
    
    // Update score
    if (correct) {
        score += 10;
        scoreElement.textContent = \`Score: \${score}\`;
    }
    
    // Highlight buttons
    const buttons = answersElement.querySelectorAll('.answer-btn');
    buttons.forEach((button, index) => {
        button.disabled = true;
        if (index === quizData[currentQuestion].correct) {
            button.classList.add('correct');
        } else if (index === selectedIndex && !correct) {
            button.classList.add('incorrect');
        }
    });
    
    // Show feedback
    feedbackTextElement.textContent = correct 
        ? "Correct! Well done!" 
        : "Sorry, that's incorrect.";
    feedbackElement.classList.remove('hidden');
}

// Move to next question
function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        showResults();
    }
}

// Show final results
function showResults() {
    document.getElementById('question-container').classList.add('hidden');
    feedbackElement.classList.add('hidden');
    resultsElement.classList.remove('hidden');
    finalScoreElement.textContent = score;
}

// Restart the quiz
function restartQuiz() {
    document.getElementById('question-container').classList.remove('hidden');
    initQuiz();
}

// Start the quiz when page loads
document.addEventListener('DOMContentLoaded', initQuiz);`,
      },
    ],
    defaultTitle: 'index.html',
  },
};

// Configuration file example
export const JSONConfiguration: Story = {
  args: {
    files: [
      {
        title: 'tsconfig.json',
        code: `{
  "compilerOptions": {
    "target": "es2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`,
      },
      {
        title: 'package.json',
        code: `{
  "name": "techblitz-platform",
  "version": "1.5.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  },
  "dependencies": {
    "@prisma/client": "^5.0.0",
    "@radix-ui/react-dialog": "^1.0.4",
    "@radix-ui/react-dropdown-menu": "^2.0.5",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-popover": "^1.0.6",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-toast": "^1.1.4",
    "@supabase/auth-helpers-nextjs": "^0.7.4",
    "@supabase/supabase-js": "^2.31.0",
    "@tanstack/react-query": "^4.32.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "framer-motion": "^10.15.0",
    "lucide-react": "^0.263.1",
    "next": "^13.4.12",
    "next-themes": "^0.2.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "shiki": "^0.14.3",
    "tailwind-merge": "^1.14.0",
    "tailwindcss-animate": "^1.0.6",
    "zod": "^3.21.4"
  },
  "devDependencies": {
    "@storybook/addon-essentials": "^7.1.1",
    "@storybook/addon-interactions": "^7.1.1",
    "@storybook/addon-links": "^7.1.1",
    "@storybook/blocks": "^7.1.1",
    "@storybook/nextjs": "^7.1.1",
    "@storybook/react": "^7.1.1",
    "@storybook/testing-library": "^0.2.0",
    "@types/node": "^20.4.5",
    "@types/react": "^18.2.17",
    "@types/react-dom": "^18.2.7",
    "autoprefixer": "^10.4.14",
    "eslint": "^8.45.0",
    "eslint-config-next": "^13.4.12",
    "eslint-plugin-storybook": "^0.6.13",
    "jest": "^29.6.2",
    "postcss": "^8.4.27",
    "prisma": "^5.0.0",
    "storybook": "^7.1.1",
    "tailwindcss": "^3.3.3",
    "typescript": "^5.1.6"
  }
}`,
      },
    ],
  },
};

// Short example with a single file
export const ShortExample: Story = {
  args: {
    files: [
      {
        title: 'utils.js',
        code: `// Utility function to format a date
const formatDate = (date, format = 'long') => {
  const d = new Date(date);
  
  if (format === 'short') {
    return d.toLocaleDateString();
  }
  
  return d.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Export utility functions
export { formatDate };`,
      },
    ],
  },
};
