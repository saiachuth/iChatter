// src/Message.js
import React from "react";

const Message = ({ message, isCurrentUser }) => {
  const messageClass = isCurrentUser ? "message-sender" : "message-recipient";

  return (
    <div className={`message ${messageClass}`}>
      <div className='message-header'>
        <strong className='message-username'>{message.user}</strong>
        <span className='message-timestamp'>{message.timestamp}</span>
      </div>
      <div className='message-content'>{message.text}</div>
    </div>
  );
};

export default Message;
