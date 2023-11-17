// src/Chat.js

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message";
import Input from "./Input";
import "./index.css";

const socket = io("http://localhost:5000");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(""); // Add state for the current user
  const [displayedMessages, setDisplayedMessages] = useState([]);

  useEffect(() => {
    const username = prompt("Enter your name"); // Prompt the user for their name
    setCurrentUser(username);

    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

const sendMessage = (text) => {
  const currentDate = new Date();
  const hours = currentDate.getHours() % 12 || 12;
  const minutes = currentDate.getMinutes();
  const ampm = currentDate.getHours() >= 12 ? "PM" : "AM";

  const newMessage = {
    user: currentUser,
    text,
    timestamp: `${hours}:${minutes} ${ampm}`, // Updated timestamp format
  };

  socket.emit("chat message", newMessage);
  setMessages((prevMessages) => [...prevMessages, newMessage]);
};



  const displayMessage = (message) => {
    // Check if the message has already been displayed for the current user
    if (
      !displayedMessages.find(
        (msg) => msg.id === message.id && msg.user === currentUser
      )
    ) {
      setDisplayedMessages((prevMessages) => [...prevMessages, message]);
    }
  };

  return (
    <div className='chat-container'>
      <ScrollToBottom className='message-container'>
        {messages.map((msg, index) => (
          <Message
            key={index}
            message={msg}
            isCurrentUser={msg.user === currentUser} // Pass isCurrentUser prop
            displayMessage={() => displayMessage(msg)} // Pass a function to displayMessage
          />
        ))}
      </ScrollToBottom>
      <Input sendMessage={sendMessage} />
    </div>
  );
};

export default Chat;
