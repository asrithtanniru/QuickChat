# QuickChat

A real-time chat application that enables users to create and join chat rooms seamlessly.

## Project Overview

QuickChat is a web-based chat application built with modern technologies. Users can sign in, create new chat rooms, join existing rooms, and participate in real-time conversations with other users.

Report: https://docs.google.com/document/d/1ESy8VtVRHoS5D6-1oRHA1SFa7OgxIV-AyoBSt53agzU/edit?usp=sharing

Project Demonstration: https://drive.google.com/file/d/15bxCJl535Dqaxd-dx5YKB77EGMuzyukn/view?usp=sharing

Code Demonstration: https://drive.google.com/file/d/1NORSBa1jJS871F-R-_FKMrz1h43vYGtN/view?usp=sharing

### Features

- **User Authentication** - Secure sign-in and sign-out with Firebase Authentication
- **Room Management** - Create and join chat rooms
- **Real-time Messaging** - Exchange messages with other users in real-time
- **User Profiles** - Display user avatars and information

## Tech Stack

### Frontend Framework
- **React** - JavaScript library for building interactive user interfaces
- **Vite** - Fast build tool and dev server for React applications
- **React Router DOM** - Client-side routing for multi-page navigation

### Styling & UI Components
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **DaisyUI** - Component library built on Tailwind CSS for pre-designed UI elements

### Backend & Services
- **Firebase** - Backend-as-a-Service platform providing:
  - Authentication
  - Realtime Database/Firestore
  - Cloud Functions

### Development Tools
- **ESLint** - Code linting for code quality
- **Babel/React Compiler** - JavaScript transpilation and optimization

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your Firebase configuration

4. Start the development server:
```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

The build artifacts will be in the `dist` directory.

## Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── SignIn.jsx        - Authentication component
│   │   ├── RoomLobby.jsx     - Room selection/creation interface
│   │   ├── ChatRoom.jsx      - Main chat interface
│   │   └── Avatar.jsx        - User avatar component
│   ├── config/
│   │   └── firebase.js       - Firebase configuration
│   ├── App.jsx               - Main application component
│   └── main.jsx              - Application entry point
├── tailwind.config.js        - Tailwind CSS configuration
├── vite.config.js            - Vite build configuration
└── package.json              - Project dependencies
```
