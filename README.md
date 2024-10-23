# **EasyMessage - Messaging App (Frontend)**

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Usage](#usage)
- [Folder Structure](#folder-structure)

## Introduction
A brief overview of the messaging app, its purpose, and what problem it solves. You can also include any personal motivations for building the app.
**EasyMessage** is a web application for direct and group messaging, inspired by WhatsApp. This project is one of the final projects in the [Odin Project](https://www.theodinproject.com/lessons/nodejs-messaging-app).

NEED TO ADD A DESCRIPTION OF FRONTEND

## Features

- 🔐 **Secure Authentication**: JWT-based user authentication
- 💬 **Real-time Messaging**: Instant message delivery using Socket.IO
- 👥 **Group Chats**: Support for multiple users in conversations
- 📸 **Media Sharing**: Image upload and sharing capabilities
- 👤 **User Profiles**: Customisable user profiles with avatars
- 📩 **Direct Messages**: One-to-one private conversations
- 📱 **Responsive design**: for mobile and desktop

# Demo
[The website is live](https://messaging-app-client-eight.vercel.app/). Log in with the demo credentials to explore the features of the full-stack application:
- **username**: guest
- **password**: iamaguest

## Technologies Used
- **Frontend Framework**: React
- **Styling**: CSS Modules and In-Line CSS
- **Routing**: React Router
- **Real-time Communication**: Socket.io
- **Build Tool**: Vite
- **API**: Axios for HTTP requests

## Getting Started

### Prerequisites
Ensure the following software is installed before proceeding:
- **Node.js** (v16+ recommended)
- **npm**

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/kiffoh/messaging-app-client.git
   ```
2. Navigate to the project directory:
```bash
cd messaging-app-client
```
3. Install dependencies:
```bash
npm install
```

### Running the Application
To start the development server, run:
```bash
npm run dev
```
Open your browser and go to the port specified.

## Usage


## Folder Structure
```bash
/src
    /authentication      # authentication (checking if token is valid) context
    /components          # Reusable components
    /functions           # Reusable functions
    /layouts             # Layouts used for React-Router
    /routes              # URL routes for functions
    /socketContext       # Socket.io Context
    /assets              # Images, icons, etc.
    /images           # Images, icons, etc.
        /styles           # Global and override styles
            global.css          # Global CSS styles
            LogInGlobalOverride.css  # Login-specific overrides
            SignUpGlobalOverride.css # Signup-specific overrides

    App.jsx                # Main app component
    ErrorPage.jsx          # Error page component
    Home.jsx               # Home page component
    app.module.css         # App-specific CSS, could be moved into the same folder as App.jsx
    main.jsx               # React app entry point
    index.css              # Main CSS file for styling the app
```
