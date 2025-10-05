const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');

// Create the Express app and HTTP server
const app = express();
app.use(cors()); // Use cors middleware to allow cross-origin requests
const server = http.createServer(app);

// Initialize a new instance of socket.io by passing the server object
// and configuring CORS for the client's address.
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // This must match the address of your React app
    methods: ["GET", "POST"]
  }
});

// This event listener runs whenever a new client connects to the server
io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // Listen for a 'send_message' event from a client
  socket.on('send_message', (data) => {
    // When a message is received, broadcast it to all other connected clients
    // using the 'receive_message' event.
    io.emit('receive_message', data);
  });

  // This event listener runs when a client disconnects
  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

// Define the port the server will run on
const PORT = 3001;

// Start the server
server.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
