import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import './App.css';

// Establish a connection to the backend server.
// The client will try to connect to this address.
const socket = io.connect("http://localhost:3001");

function App() {
  // State variables to manage component data
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);
  // Assign a random username for the session. In a real app, this would be a login.
  const [username] = useState(`User-${Math.floor(Math.random() * 1000)}`);
  
  // A ref to automatically scroll to the latest message
  const chatEndRef = useRef(null);

  // Function to send a message to the server
  const sendMessage = async () => {
    // Only send if the message isn't empty
    if (currentMessage.trim() !== "") {
      const messageData = {
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      // Emit the 'send_message' event to the server
      await socket.emit("send_message", messageData);
      
      // Also add the message to our own chat history immediately
      setMessageHistory((list) => [...list, messageData]);
      
      // Clear the input field
      setCurrentMessage("");
    }
  };

  // This useEffect hook runs once when the component mounts.
  // It sets up the listener for incoming messages.
  useEffect(() => {
    const handleReceiveMessage = (data) => {
      // Only add the message to history if it's from another user
      // to avoid duplicating our own messages.
      if (data.author !== username) {
        setMessageHistory((list) => [...list, data]);
      }
    };
    
    // Listen for the 'receive_message' event from the server
    socket.on("receive_message", handleReceiveMessage);

    // Cleanup function: This is important to prevent memory leaks.
    // It removes the event listener when the component is unmounted.
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [username]); // The effect depends on 'username'

  // This useEffect hook scrolls the chat view down whenever a new message is added.
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageHistory]);

  // The JSX that defines the structure of the chat window
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat (You are: {username})</p>
      </div>
      <div className="chat-body">
        {messageHistory.map((msg, index) => (
          <div 
            key={index} 
            className={`message-container ${msg.author === username ? 'sent' : 'received'}`}
          >
            <div className="message">
              <p>{msg.message}</p>
            </div>
            <div className="message-meta">
              <span>{msg.author} at {msg.time}</span>
            </div>
          </div>
        ))}
        {/* Empty div to mark the end of the chat for auto-scrolling */}
        <div ref={chatEndRef} />
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Type your message..."
          onChange={(event) => setCurrentMessage(event.target.value)}
          onKeyPress={(event) => event.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default App;
