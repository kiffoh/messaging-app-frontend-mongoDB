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
### Messaging
- **Real-time Chat:** Users can send and receive messages in real time using Socket.io. Conversations are organised into either group chats (3+ members) or direct messages (1-to-1).

### CRUD for Messaging
- **Create, Read, Update, Delete (CRUD):** Users can send, edit, and delete messages. Intuitive delete and edit functionality is triggered by clicking on a message. Only the message author has access to the delete and update options for their own messages.

### CRUD for Profiles and Groups
- **User Profiles:** Users can create accounts, edit their profile information (username, bio, and photo), and delete their own profiles.
- **Group Profiles:** Group profiles can be created by any user. Group admins (or the group creator) can edit or delete the group profile, including the group name, bio, and profile photo. These features ensure secure and appropriate access to profile management.

### Mobile-Friendly Messaging
- **Responsive Design:** The messaging interface is optimised for mobile devices, ensuring messages, buttons, and forms are easily usable on smaller screens.

### Image and Attachment Support
- **Sending Images and Attachments:** The message input form supports uploading images and attachments.

### Additional points
- **Message Timestamps:** Hovering over messages reveals the timestamps, allowing users to track the conversation history. If a message has been edited, the timestamp will display "Last edited" instead of the original creation time.

- **Seamless Contact Addition:** Adding contacts is streamlined and can be completed in just a few clicks, making it easy for users to manage their contacts.

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
