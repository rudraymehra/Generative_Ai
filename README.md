# Scaler Persona Chatbot

A persona-based AI chatbot featuring three Scaler Academy leaders: **Anshuman Singh**, **Abhimanyu Saxena**, and **Kshitij Mishra**. Built with Next.js, Tailwind CSS, and the Google Gemini API.

> **Live Demo**: _Add your deployed URL here after deploying to Vercel_

## Screenshots

_Add screenshots of the chat interface (showing each persona) after running the app._

## Features

- Switch between three distinct personas via a tab-based switcher
- Conversation history resets automatically when switching personas
- Quick-start suggestion chips per persona
- Typing indicator during API calls
- Responsive design for mobile and desktop
- Graceful error handling with user-friendly messages

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API (`gemini-1.5-flash`)
- **Language**: TypeScript

## Local Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd scaler-persona-chatbot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Gemini API key:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

Get your API key from [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey).

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment (Vercel)

1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. In the Vercel project settings, add the environment variable:
   - `GEMINI_API_KEY` = your API key
4. Deploy.

## Project Structure

```
├── app/
│   ├── api/chat/route.ts     # Backend API route
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ChatInterface.tsx     # Main chat component (state + logic)
│   ├── PersonaSwitcher.tsx   # Tab switcher for personas
│   ├── MessageBubble.tsx     # Individual chat message
│   └── TypingIndicator.tsx   # Animated typing indicator
├── lib/
│   └── personas.ts           # Persona definitions and system prompts
├── prompts.md                # Annotated system prompt documentation
├── reflection.md             # 300–500 word reflection
└── .env.example              # Environment variable template
```

## Personas

| Persona | Role | Focus |
|---|---|---|
| Anshuman Singh | CEO & Co-founder | Startup, education vision, outcomes |
| Abhimanyu Saxena | Co-founder | DSA, system design, technical depth |
| Kshitij Mishra | Instructor & Mentor | Teaching, algorithms, interview prep |

## Documentation

- [`prompts.md`](./prompts.md) — Annotated system prompts with design rationale
- [`reflection.md`](./reflection.md) — Reflection on prompt engineering effectiveness
