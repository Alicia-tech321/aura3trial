# AURA: Your AI Balance Agent 🌿✨

A fully functional Next.js 14 app that helps you create the perfect balanced schedule using AI-powered task scheduling.

## Features ✅

- **Task Management**: Add tasks with custom priority levels (Low, Medium, High) and time estimates
- **Availability Tracking**: Set your available time window with automatic calculation
- **Mood & Energy Tracking**: Select your current mood (Energized, Balanced, Tired, Stressed) and energy level (1-10)
- **AI Schedule Generation**: Automatically generates an optimized schedule based on your inputs
- **Smart Scheduling**: 
  - Prioritizes tasks based on importance
  - Adjusts task order based on mood and energy
  - Automatically adds breaks between tasks
- **Interactive Schedule**: Complete, skip, or reschedule tasks with real-time score updates
- **Balance Scoring System**:
  - Overall Balance Score (0-100)
  - Productivity Score
  - Wellness Score
  - Consistency Score
- **Smart Notifications**: 10-minute warnings before tasks end
- **LocalStorage Persistence**: Your schedule and scores are automatically saved
- **Beautiful UI**: Soft mint gradient background with smooth animations

## Tech Stack 🛠️

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Storage**: LocalStorage API

## Getting Started 🚀

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd workspace
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage 📖

1. **Add Tasks**: Enter your tasks with custom names, priorities, and time estimates
2. **Set Availability**: Choose your start and end times
3. **Select Mood**: Pick how you're feeling and set your energy level
4. **Generate Schedule**: Click "Generate My Perfect Day" to create your optimized schedule
5. **Manage Tasks**: Complete, skip, or reschedule tasks as needed
6. **Track Progress**: Monitor your balance score and daily stats

## Scoring System 🎯

- **Complete Task**: +10 points
- **Skip Task**: -5 points
- **Reschedule Task**: -2 points

## Project Structure 📁

```
workspace/
├── app/
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page component
├── components/
│   ├── TaskInput.tsx       # Task input and management
│   ├── AvailabilityPicker.tsx  # Time range selector
│   ├── FeelingSelector.tsx     # Mood and energy selector
│   ├── Schedule.tsx        # Schedule display
│   ├── ScoreBoard.tsx      # Score tracking panel
│   ├── LoadingScreen.tsx   # Loading animation
│   └── NotificationModal.tsx   # Reschedule notification
├── store/
│   └── useStore.ts         # Zustand global state
├── types/
│   └── index.ts            # TypeScript type definitions
├── utils/
│   ├── scheduleGenerator.ts    # AI schedule generation logic
│   └── localStorage.ts     # LocalStorage utilities
└── package.json
```

## Features in Detail 🔍

### AI Schedule Generation
The app intelligently schedules tasks based on:
- Task priority (High > Medium > Low)
- Your current mood and energy level
- Available time window
- Optimal break times

### Mood-Based Scheduling
- **Energized/High Energy**: Schedules harder tasks first
- **Tired/Low Energy**: Starts with easier, shorter tasks
- **Stressed**: Includes meditation breaks
- **Balanced**: Maintains even distribution

### Smart Breaks
- Short breaks (5 min) for energized state
- Medium breaks (10 min) for balanced/stressed states
- Longer breaks (15 min) for tired state

## Browser Support 🌐

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License 📄

MIT License - feel free to use this project for personal or commercial purposes.

## Author ✍️

Built with ❤️ using Next.js 14 and AI assistance
