import React, { useContext, useState } from "react";
import ChatContext from "../../context/ChatContext";
import "./sendmessage.css";

export default function Message() {
    const { publishMessage } = useContext(ChatContext);
    const [message, setMessage] = useState("");

    function sendMessage(e) {
        e.preventDefault();
        if(message && message.replace(/\s/g, "").length > 0) {
            publishMessage(message);
            setMessage("");
        }
    }

    return (
    <div className="send_message_item">
        <div className="send_message_message">Message:</div>
        <div className="send_message_form">
            <form className="message_form_item">
                <input
                className="message_form_input"
                type="text"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                />
                <button>onClick={sendMessage} className="message_form_button" Send</button>
            </form>
        </div>
    </div>
);
}