# GenJam Organizer

A comprehensive web application for organizing AI creativity hackathon events. Built for [Machine Cinema](https://machinecinema.com).

![GenJam](https://img.shields.io/badge/GenJam-2025-purple)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-cyan)

## Overview

GenJam Organizer guides participants through an 11-step workflow from registration to final showcase voting:

1. **Registration** - Collect participant info and display venue details
2. **Skills Survey** - Assess creative skills for team formation
3. **Icebreaker** - Fun warm-up activity to connect participants
4. **Ideas Submission** - Submit film concepts and vote on favorites
5. **Workflow** - Visual timeline of the production process
6. **Cheat Sheet** - AI tool guides with sponsor promo codes
7. **Examples** - Showcase of past GenJam films for inspiration
8. **Storyboard** - Visual planning workspace with AI generation
9. **Submit** - Upload final video with metadata
10. **Voting** - Vote for favorites across 3 categories
11. **Follow-up** - Results, community links, and resources

## Features

- 🎬 **11-Step Guided Workflow** - Structured creative process
- ⏱️ **Persistent Countdown Timer** - Keep participants on track
- 🎯 **Contextual Instructions** - Step-specific guidance
- 🏆 **Category Voting** - Best Overall, Best Visuals, Most WTF
- 🛠️ **AI Tool Cheat Sheet** - Quick reference with promo codes
- 📱 **Responsive Design** - Works on desktop and mobile
- 🎨 **Custom Design System** - Machine Cinema branded UI

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4 + Custom Design System
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build**: Vite

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/genjam-organizer.git

# Navigate to project directory
cd genjam-organizer

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Shared UI components
│   ├── Layout.tsx       # Page wrapper with nav, timer, footer
│   ├── StepProgressBar.tsx
│   ├── EventTimer.tsx
│   ├── PageNavigation.tsx
│   ├── GenJamHeader.tsx
│   ├── GenJamFooter.tsx
│   └── Logo.tsx
├── pages/               # 11 workflow pages
│   ├── RegistrationPage.tsx
│   ├── SkillsSurveyPage.tsx
│   ├── IcebreakerPage.tsx
│   ├── IdeasSubmissionPage.tsx
│   ├── WorkflowPage.tsx
│   ├── CheatSheetPage.tsx
│   ├── ExamplesPage.tsx
│   ├── StoryboardPage.tsx
│   ├── SubmitPage.tsx
│   ├── VotingPage.tsx
│   └── FollowupPage.tsx
├── lib/                 # Utilities
│   └── utils.ts
├── App.tsx              # Router setup
├── main.tsx             # Entry point
└── index.css            # Global styles + design system
```

## Design System

The app uses a custom design system with:

- **Primary**: Purple (oklch 280° hue)
- **Secondary**: Blue (oklch 240° hue)
- **Accent**: Orange for highlights
- **Typography**: Space Grotesk (headings) + DM Sans (body)

## Future Enhancements

- [ ] Backend integration (tRPC + MySQL)
- [ ] User authentication (OAuth)
- [ ] File uploads to S3
- [ ] Real-time updates (WebSocket)
- [ ] Admin panel for content management
- [ ] Team formation algorithm

## Contributing

This project is part of Machine Cinema's open-source initiative. Contributions welcome!

## License

MIT License - see [LICENSE](LICENSE) for details.

---

Built with ❤️ by [Machine Cinema](https://machinecinema.com)
