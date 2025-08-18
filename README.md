# Students Coding Platform

A comprehensive web application built with Next.js and Firebase to foster coding culture in colleges. Students can register, join groups, track their coding progress, participate in discussions, and get AI-powered help with their coding doubts.

## 🚀 Features

### Authentication & User Management
- **User Registration**: Email, password, and username registration
- **User Authentication**: Secure login/logout with Firebase Auth
- **Profile Management**: User profiles with learning topics, streaks, and badges

### Group Formation & Management
- **Manual Group Creation**: Users can create coding groups with specific goals
- **Group Discovery**: Search and join existing groups (DSA in Java, C++, etc.)
- **Group Dashboard**: Dedicated dashboard for group activities and discussions

### Student Dashboard
- **LeetCode Problems Sheet**: Track problem status with direct links
- **Daily Challenge**: Mandatory daily problem with completion tracking
- **Progress Tracking**: Streak counter, weekly goals, and "Consistent Coder" badge
- **Contest Goals**: Upcoming contests and rank history
- **Statistics**: Total problems solved, weekly count, current streak
- **Discussion Board**: Group discussions with replies and timestamps
- **College Updates**: Events, workshops, and competitions

### Goals Section
- **Current Goals Display**: Visual progress bars for daily/weekly goals
- **Goal Creation**: Form to create new goals with title, target, description, and type
- **Goal Types**: Daily (⚡) and Weekly (📅) goals with different styling
- **Progress Tracking**: Real-time progress updates and completion status

### Leaderboard
- **Group Leaderboard**: Rankings within your group
- **Inter-Group Leaderboard**: Average rankings across groups
- **Ranking Criteria**: Based on daily streak, problems solved, and contest participation
- **Visual Indicators**: Crown, medals, and rank badges for top performers

### AI Doubt Solver
- **Chat Interface**: Real-time messaging with AI assistant
- **Chat History**: Previous conversations with timestamps and message counts
- **Quick Help Topics**: Pre-defined topics for common coding questions
- **New Chat Functionality**: Start fresh conversations anytime

## 🛠️ Tech Stack

- **Frontend**: Next.js 13, React, TypeScript
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with modern design
- **Icons**: Lucide React
- **State Management**: React hooks and Firebase real-time listeners

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd students-coding-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Create Firestore database
   - Get your Firebase configuration

4. **Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   
   # Optional: For AI Doubt Solver
   OPENAI_API_KEY=your_openai_api_key_here
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Structure

### Collections

#### Users
```typescript
{
  uid: string;
  email: string;
  username: string;
  leetcodeUsername?: string;
  groupId?: string;
  profile: {
    name: string;
    learningTopic: string;
    maxStreak: number;
    currentStreak: number;
    totalSolved: number;
    weeklySolved: number;
    badges: string[];
    lastActiveDate: string;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

#### Groups
```typescript
{
  id: string;
  name: string;
  description: string;
  language: string;
  goal: string;
  createdBy: string;
  members: string[];
  memberCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

#### Problems
```typescript
{
  id: string;
  name: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  leetcodeLink: string;
  tags: string[];
  category: string;
}
```

#### Goals
```typescript
{
  id: string;
  userId: string;
  title: string;
  description: string;
  targetNumber: number;
  currentProgress: number;
  type: 'daily' | 'weekly';
  status: 'active' | 'completed' | 'paused';
  createdAt: Timestamp;
  deadline?: Timestamp;
}
```

## 🎨 Design System

### Colors
- **Primary**: Dark Blue (#1e40af)
- **Secondary**: Light Blue (#3b82f6)
- **Background**: White (#ffffff)
- **Accent**: Various blue shades for different components

### Typography
- **Font Family**: Inter (sans-serif)
- **Responsive**: Mobile-first design approach

### Components
- Modern and minimalist design
- Subtle animations and transitions
- User-friendly interface optimized for students

## 🔧 Services

### AuthService
- User registration and login
- Profile management
- Authentication state management

### GroupService
- Group creation and management
- Member management
- Group search functionality

### ProblemService
- Problem tracking and status updates
- Daily challenge management
- User statistics calculation

### GoalService
- Goal creation and management
- Progress tracking
- Goal completion handling

### LeaderboardService
- Group and inter-group rankings
- Score calculation
- Performance metrics

### DiscussionService
- Discussion creation and management
- Reply system
- Like/unlike functionality

### AIChatService
- Chat session management
- Message history
- AI response integration

## 🚀 Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**
   - Vercel (recommended for Next.js)
   - Netlify
   - Firebase Hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- Firebase for backend services
- Next.js team for the amazing framework
- Tailwind CSS for styling utilities
- Lucide React for beautiful icons

## 📞 Support

For support, email pagrutdarshana@gmail.com or create an issue in the repository.
