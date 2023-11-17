import React, { useState } from "react";
import Message from "./Message";

const MessageList = ({ messages }) => {
  const [displayedMessages, setDisplayedMessages] = useState([]);

  const displayMessage = (message) => {
    setDisplayedMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div>
      {messages.map((message, index) => {
        // Check if the message has already been displayed
        if (displayedMessages.includes(message.text)) {
          return null;
        }

        // Display the message and mark it as displayed
        displayMessage(message.text);

        return <Message key={index} message={message} />;
      })}
    </div>
  );
};

export default MessageList;
