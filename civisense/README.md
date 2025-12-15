#  n-CiviSense

**Nigeria's Indigenous AI-Powered Government Services Platform**

n-CiviSense is a bespoke all-in-one intelligent application that provides information about core government parastatals, functions, public services, and programs. Built on top of **N-ATLaS 1** (Nigeria's first indigenous Large Language Model), n-CiviSense bridges the gap between citizens and government services.


---

## Features

### Powered by Nigerian Technology
Built with **N-ATLaS 1**, Nigeria's first indigenous Large Language Model, ensuring culturally relevant and contextually accurate responses tailored for Nigerian citizens.

### Comprehensive Coverage
Access information on major government parastatals and services:
- **NIMC** (National Identity Management Commission) - NIN services and identity management
- **FIRS** (Federal Inland Revenue Service) - Tax information and services
- **FRSC** (Federal Road Safety Corps) - Driver's license and vehicle registration
- **Health** - Government healthcare services
- **Education** - Educational programs and services
- **Agriculture** - Agricultural support and programs

### Multi-Language Support
Communicate in your preferred Nigerian language with our AI-powered conversational interface.

### Voice Input
Ask questions using voice commands with our integrated speech-to-text functionality.

### Real-Time News Feed
Stay updated with the latest news categorized by sectors (Latest, Education, Health, Agriculture).

###  Secure Authentication
Built-in user authentication system with signup, login, and verification features.

---

## How n-CiviSense Works

### 01. Choose a Service
Select from NIMC, FIRS, FRSC, Health, Education, or Agriculture services.

### 02. Ask in Your Language
Interact with our N-ATLaS powered conversational AI interface in your preferred language.

### 03. Get Reliable Guidance
Receive instant, accurate, and contextually relevant responses to your government service queries.

---

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (React 19)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **AI Model:** N-ATLaS 1 (Nigerian Indigenous LLM)
- **Backend API:** FastAPI (Python)
- **Icons:** Lucide React, React Icons
- **Animation:** Framer Motion
- **State Management:** React Hooks


---

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18.x or higher
- **npm**, **yarn**, **pnpm**, or **bun** package manager
- **Git** for version control

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/civisense.git
cd civisense
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```


### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### 4. Build for Production

```bash
npm run build
npm run start
```

---

##  Project Structure

```
civisense/
├── app/
│   ├── api/                    # API routes
│   │   ├── audio/
│   │   │   └── transcribe/     # Voice transcription endpoint
│   │   ├── auth/
│   │   │   ├── signin/         # User login endpoint
│   │   │   └── signup/         # User registration endpoint
│   │   ├── chat/
│   │   │   └── stream/         # AI chat streaming endpoint
│   │   ├── news/               # News feed endpoint
│   │   └── nin/                # NIN verification endpoint
│   ├── auth/                   # Authentication pages
│   │   ├── login/
│   │   ├── signup/
│   │   ├── forgot/
│   │   ├── reset/
│   │   └── verify/
│   ├── components/             # App-specific components
│   ├── dashboard/              # User dashboard
│   ├── landing/                # Landing page sections
│   │   ├── dashboard/          # Dashboard components
│   │   │   └── components/
│   │   │       ├── ChatSection.tsx
│   │   │       ├── NewsFeed.tsx
│   │   │       ├── Sidebar.tsx
│   │   │       └── ServerIcon.tsx
│   │   ├── config/             # Language configurations
│   │   └── context/            # React contexts
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── components/                 # Reusable UI components
│   ├── ui/                     # Base UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   ├── auth/                   # Auth-specific components
│   └── VoiceInput.tsx          # Voice recording component
├── lib/                        # Utility functions
│   └── utils.ts
├── public/                     # Static assets
└── package.json
```

---

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login

### Chat
- `POST /api/chat/stream` - Stream AI responses (SSE)

### Audio
- `POST /api/audio/transcribe` - Convert voice to text

### News
- `GET /api/news?category={category}` - Fetch news by category

### NIN Verification
- `POST /api/nin` - Verify NIN details

---

## Key Features Implementation

### AI Chat with Streaming
The chat interface uses Server-Sent Events (SSE) to stream responses from the N-ATLaS model in real-time, providing a smooth conversational experience.

### Voice Input
Users can record their questions using the microphone button. The audio is transcribed using Whisper AI and automatically populates the chat input.

### Multi-Language Support
The application supports multiple Nigerian languages through the Language Context Provider, allowing users to interact in their preferred language.

### News Feed
Real-time news updates categorized by government sectors, fetched from the n-CiviSense API.

---

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```



##  Contributing

We welcome contributions to n-CiviSense! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---



## Developed By

**NExtar Quantum Systems Ltd**

A leading Nigerian technology company specializing in AI and quantum computing solutions.

---



## Links

- [N-ATLaS Model](https://huggingface.co/tosinamuda/N-ATLaS-GGUF)

---

<div align="center">
  <strong>Made in Nigeria 🇳🇬 for Nigerians</strong>
  <br />
  <em>Empowering citizens through indigenous AI technology</em>
</div>