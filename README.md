# Frontend Boilerplate – React + TypeScript + Vite

This repository is a **frontend boilerplate** built with **React, TypeScript, and Vite**.  
It provides a structured setup with **ESLint, Prettier, Husky, and lint-staged** to maintain code quality and enforce best practices across the team.

---

## 🚀 Tech Stack

- [React](https://react.dev/) – UI library
- [TypeScript](https://www.typescriptlang.org/) – Static typing
- [Vite](https://vitejs.dev/) – Fast build tool with HMR
- [ESLint](https://eslint.org/) – Linting
- [Prettier](https://prettier.io/) – Code formatting
- [Husky](https://typicode.github.io/husky/) – Git hooks for pre-commit checks
- [lint-staged](https://github.com/okonet/lint-staged) – Run linters on staged files

---

## 📂 Project Structure

├── src/
│ ├── assets/ # Static assets (images, fonts, etc.)
│ ├── components/ # Reusable UI components
│ ├── hooks/ # Custom React hooks
│ ├── pages/ # Page-level components
│ ├── services/ # API calls and external services
│ ├── styles/ # Global styles
│ ├── utils/ # Helper functions
│ ├── main.tsx # Application entry point
│ └── App.tsx # Root component
├── .eslintrc # ESLint configuration
├── .prettierrc # Prettier configuration
├── tsconfig.json # TypeScript configuration
├── vite.config.ts # Vite configuration
└── package.json # Dependencies and scripts

## ⚙️ Setup Instructions

### 1️⃣ Install Dependencies

npm install
2️⃣ Run the Development Server
npm run dev
3️⃣ Build for Production
npm run build
4️⃣ Preview Production Build
npm run preview
🧹 Code Quality
ESLint + Prettier
ESLint enforces best practices and catches errors.

Prettier ensures consistent formatting.

Run manually:

npm run lint
npm run format
Husky + lint-staged
Husky runs pre-commit hooks.

lint-staged ensures only staged files are linted & formatted before commit.

```

```
