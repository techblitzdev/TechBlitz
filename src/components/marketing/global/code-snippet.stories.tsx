import type { Meta, StoryObj } from '@storybook/react';

import CodeSnippet from './code-snippet';

const meta = {
  component: CodeSnippet,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    language: {
      control: 'select',
      options: ['javascript', 'typescript', 'html', 'css', 'python', 'java', 'json'],
    },
    lightTheme: {
      control: 'select',
      options: ['github-light', 'vitesse-light', 'solarized-light'],
    },
    darkTheme: {
      control: 'select',
      options: ['github-dark', 'dracula', 'nord', 'one-dark-pro'],
    },
  },
} satisfies Meta<typeof CodeSnippet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    code: 'console.log("Hello, world!");',
    language: 'javascript',
    filename: 'example.js',
    darkTheme: 'github-dark',
    lightTheme: 'github-light',
  },
};

export const JavaScriptExample: Story = {
  args: {
    code: `// Function to calculate Fibonacci numbers
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Generate first 10 Fibonacci numbers
const fibSequence = Array.from({ length: 10 }, (_, i) => fibonacci(i));
console.log(fibSequence);

// ES6 features demo
const getMessage = (name) => \`Hello, \${name}!\`;
const users = ['Alice', 'Bob', 'Charlie'];
const greetings = users.map(getMessage);

// Spread and destructuring
const [first, ...rest] = greetings;
const allGreetings = [...greetings, 'Hello, World!'];

console.log(allGreetings);`,
    language: 'javascript',
    filename: 'fibonacci.js',
    darkTheme: 'github-dark',
    lightTheme: 'github-light',
  },
};

export const HTMLExample: Story = {
  args: {
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Code Snippet Example</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <nav>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <section id="code-examples">
      <h1>Code Snippet Examples</h1>
      <div class="container">
        <pre id="code-display"></pre>
        <button onclick="copyCode()">Copy</button>
      </div>
    </section>
  </main>

  <footer>
    <p>&copy; 2023 Code Snippets</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>`,
    language: 'html',
    filename: 'index.html',
    darkTheme: 'github-dark',
    lightTheme: 'vitesse-light',
  },
};

export const CSSExample: Story = {
  args: {
    code: `/* Variables */
:root {
  --primary-color: #3b82f6;
  --secondary-color: #10b981;
  --dark-bg: #111827;
  --light-bg: #f9fafb;
  --text-light: #f3f4f6;
  --text-dark: #1f2937;
}

/* Modern layout with CSS Grid */
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
}

/* Card component with hover effects */
.card {
  background: var(--light-bg);
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  body {
    background-color: var(--dark-bg);
    color: var(--text-light);
  }
  
  .card {
    background: #1e293b;
  }
}

/* Responsive typography */
html {
  font-size: 16px;
}

@media (max-width: 768px) {
  html {
    font-size: 14px;
  }
}`,
    language: 'css',
    filename: 'modern-styles.css',
    darkTheme: 'dracula',
    lightTheme: 'solarized-light',
  },
};

export const PythonExample: Story = {
  args: {
    code: `import json
from dataclasses import dataclass
from typing import List, Optional

@dataclass
class User:
    id: int
    name: str
    email: str
    active: bool = True
    friends: List[int] = None
    
    def __post_init__(self):
        if self.friends is None:
            self.friends = []
    
    def to_json(self) -> str:
        return json.dumps({
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "active": self.active,
            "friends": self.friends
        })
        
    @classmethod
    def from_json(cls, json_str: str) -> 'User':
        data = json.loads(json_str)
        return cls(**data)


# Using the dataclass
users = [
    User(1, "Alice", "alice@example.com"),
    User(2, "Bob", "bob@example.com", friends=[1]),
    User(3, "Charlie", "charlie@example.com", active=False)
]

# List comprehension and filtering
active_users = [user for user in users if user.active]
print(f"Active users: {len(active_users)}")

# Using generators
def get_emails(user_list):
    for user in user_list:
        yield user.email

emails = list(get_emails(active_users))
print(f"Emails: {emails}")`,
    language: 'python',
    filename: 'users.py',
    darkTheme: 'nord',
    lightTheme: 'github-light',
  },
};

export const JSONExample: Story = {
  args: {
    code: `{
  "app": "TechBlitz",
  "version": "1.0.0",
  "config": {
    "themes": {
      "light": "github-light",
      "dark": "github-dark"
    },
    "features": [
      "code-snippets",
      "interactive-lessons",
      "progress-tracking"
    ]
  },
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "role": "admin",
      "courses": [
        {
          "id": "js-101",
          "title": "JavaScript Fundamentals",
          "progress": 85,
          "completed": false
        },
        {
          "id": "ts-101",
          "title": "TypeScript Basics",
          "progress": 62,
          "completed": false
        }
      ]
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "role": "user",
      "courses": [
        {
          "id": "js-101",
          "title": "JavaScript Fundamentals",
          "progress": 100,
          "completed": true
        }
      ]
    }
  ]
}`,
    language: 'json',
    filename: 'config.json',
    darkTheme: 'one-dark-pro',
    lightTheme: 'vitesse-light',
  },
};

export const ShortExample: Story = {
  args: {
    code: `const greeting = "Hello, TechBlitz!";
console.log(greeting);`,
    language: 'javascript',
    filename: 'greeting.js',
    darkTheme: 'github-dark',
    lightTheme: 'github-light',
  },
};
