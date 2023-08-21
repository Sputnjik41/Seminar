import React, {useContext} from "react";
import ChatContext from "../../content/ChatContext";
import "./header.css";

export default function header() {
    const {onClickLogout, user} = useContext(ChatContext);
    return(
        <div className="header_item">
            <div className="header_button_item">
                <button className="header_button" onClick={onClickLogout} type="submit">Logout</button>
                </div>
                <div className="header_greetings_item">
                    <div>Hello {user.username}!</div>
                </div>    
        </div>
    );
}