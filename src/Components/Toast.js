import React from "react";
import "./Toast.css";
function Toast({ message, removeItem }) {
  return (
    <div className="toast-container">
      {message
        ? message.map((msg) => (
            <div
              className="toast-item"
              key={msg.id}
              onClick={() => removeItem(msg.id)}
            >
              {msg.message}
            </div>
          ))
        : null}
    </div>
  );
}
export default Toast;
