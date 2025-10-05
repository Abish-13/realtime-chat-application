# 🚀 Real-Time Chat Application

This is a full-stack, real-time chat application built with React, Node.js, and Socket.IO. It demonstrates the fundamentals of full-stack development, WebSocket communication, and client-side state management in a modern front-end framework.

---

## ✨ Features

-   **Real-Time Messaging:** Send and receive messages instantly without needing to refresh the page.
-   **Temporary Usernames:** Each user is assigned a random username for the session.
-   **Responsive Design:** The user interface is built to be clean and functional on both desktop and mobile devices.
-   **Message History:** The chat displays the history of messages for the current session, with auto-scrolling to the latest message.

---

## 🛠️ Tech Stack

-   **Front-End:** React.js, Vite, Socket.IO Client
-   **Back-End:** Node.js, Express.js, Socket.IO
-   **Communication:** WebSockets

---

## ⚙️ How to Run Locally

To run this project on your local machine, you will need to run both the client and the server in separate terminals.

**1. Clone the repository:**
```bash
git clone [https://github.com/Abish-13/realtime-chat-application.git](https://github.com/Abish-13/realtime-chat-application.git)
cd realtime-chat-application

2. Start the Back-End Server:

Bash

# Navigate to the server directory
cd server

# Install dependencies
npm install

# Start the server
node index.js
# Your server will be running on http://localhost:3001

3. Start the Front-End Client (in a new terminal):

Bash

# Navigate to the client directory from the root folder
cd client

# Install dependencies
npm install

# Start the client development server
npm run dev
# Your client will be running on http://localhost:5173
