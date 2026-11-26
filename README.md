# CodeLearn – React frontend prototype

A responsive React/Vite prototype for the third-semester Coding Learning Platform. This repository is **frontend only**; the [Java backend](https://github.com/Schel-beck/3.semesterProjekt) is unchanged.

## Run locally

Requires a compatible Node.js version for the existing Vite setup.

```bash
npm install
npm run dev
```

Open the local URL shown by Vite (usually http://localhost:5173).

## Features and component hierarchy

```text
App (mock data, shared state)
├── Navbar
├── Subjects overview
│   └── SubjectList
│       └── SubjectItem
│           └── QuestionList
│               └── QuestionItem
├── ChatPage
│   ├── ChatMessage
│   └── ChatInput
└── AuthPage / LoggedIn
    └── LogIn
```

- Subjects appear in one accordion list (no overarching category buttons).
- Expanding a subject shows its questions. Clicking a question opens a chat for **that question**.
- After the first submitted answer, that question gets a green checkmark, regardless of correctness.
- Completion is stored in browser localStorage for the prototype and can be reset.
- Search filters subjects/questions. Login sends credentials to the backend and stores the returned JWT; registration remains a demo.
- Chat replies are **demo text** until the backend is connected.

### Thinking in React

Components live in their own folders inside src/components and use JSX/CSS. Dummy data originates in src/App.jsx and is passed down with props. useState and event handlers handle accordion navigation, searching, chat input and answered checkmarks. Shared answered status belongs in App because multiple components need it.

Reference: https://react.dev/learn/thinking-in-react

## Authentication

Login follows the course's Frontend Security exercise: src/apiFacade.js calls POST /auth/login, stores the JWT as jwtToken in localStorage and exposes getTokenData, logout and fetchData. App owns the login state, and LogIn receives the login callback as a prop. LoggedIn displays the account and a logout button. Configure VITE_API_URL in .env if needed. The backend must allow the frontend origin through CORS. JWT decoding is for display only; authorization belongs to the backend. The current backend does not expose a protected read endpoint for ordinary users, so no such request is made on the account page.

## Backend integration (later)

The prepared src/services/api.js provides helpers for GET /subjects, GET /subjects/{id}, GET /questions and POST /chat. It is **not used by the prototype**.

Backend chat request: { "contents": [{ "role": "user", "parts": [{ "text": "..." }] }] }. Chat response: { "reply": "..." }. Question objects use the field "name".

CORS must be verified when fetching from a separately hosted frontend. The backend currently restricts writes to /user-questions to ADMIN, so regular-user progress saving needs backend changes. Never put admin JWTs or API secrets into frontend code.
