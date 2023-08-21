import React, { useContext, useEffect, useRef } from "react";
import ChatContext from "../../context/ChatContext";
import UserContext from "../../context/UserContext";
import "./listmessages.css";

export default function () {
  const { messageArray } = useContext(ChatContext);
  const { user } = useContext(UserContext);
  const bottomRef = useRef();

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ block: "end", behavior: "smooth" });
    }
  }, [messageArray]);

  function getWrapperClass(message) {
    return `message_item ${
      user.id === message.user.id ? "my_item" : "others_item"
    }`;
  }

  function getUsernameClass(message) {
    return `message_message_username ${
      user.id === message.user.id ? "my_username" : "others_username"
    }`;
  }

  function getMessageClass(message) {
    return `message_message_text ${
      user.id === message.user.id ? "my_message" : "others_message"
    }`;
  }

  return (
    <div className="messages">
      {messageArray.map((msg) => {
        if (msg.type === "MEMBER_JOINED") {
          return (
            <div
              className="message_item message_joined_left"
              key={msg.id}
            >
              <div className="message_joined">
                {msg.user.username} {msg.message}
              </div>
            </div>
          );
        } else if (msg.type === "MEMBER_LEFT") {
          return (
            <div
              className="message_item message_joined_left"
              key={msg.id}
            >
              <div className="message_left">
                {msg.user.username} {msg.message}
              </div>
            </div>
          );
        } else {
          return (
            <div className={getWrapperClass(msg)} key={msg.id}>
              <div className="message_avatar">{msg.user.avatar}</div>

              <div className="message_message_item">
                <div className={getUsernameClass(msg)}>
                  <div>{msg.user.username}</div>
                </div>
                <div className={getMessageClass(msg)}>{msg.message}</div>
              </div>
            </div>
          );
        }
      })}
      <div className="bottomContainerElement" ref={bottomRef}></div>
    </div>
  );
}
