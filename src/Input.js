// src/Input.js

import React, { useState } from "react";

const Input = ({ sendMessage }) => {
  const [text, setText] = useState("");

  const handleSendMessage = () => {
    if (text.trim() !== "") {
      sendMessage(text);
      setText("");
    }
  };

  return (
    <div className='input-container'>
      <textarea
        className='textarea-style'
        placeholder='      Type a message...'
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
          }
        }}
      />
      <button onClick={handleSendMessage}>
        Send
        <svg
          height='24'
          width='24'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M2.01 21L23 12 2.01 3 2 10l15 2-15 2z' />
        </svg>
      </button>
    </div>
  );
};

export default Input;
