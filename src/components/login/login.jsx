import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import "./login.css";

export default function Login() {
    const [username, setUsername] = useState(null);
    const [avatar, setAvatar] = useState("🐱‍🐉");
    const [error, setError] = useState("");
    const {onUserLogin} = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !username.replace(/\s/g,"").lenght) {
            setError("Please enter your name:")
        } else {
            setError(null);
            onUserLogin(username, avatar);
        }
    };
    
    return (
      <div className="login_page">
        <div className="form_wrap">
          <div>
              <form className="form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" className="nameAvatar">Name</label>
                </div>
                <input
                className="form_username_input"
                type="text"
                maxLength="20"
                onChange={(e) => setUsername(e.target.value)}
                />
                <div className="form_error_message">{error}</div>
                <div className="form_control">
                    <div>
                        <label htmlFor="avatar" className="nameAvatar"Avatar></label>
                    </div>
                    <select 
                       className="form_avatar_input"
                       onChange={(e) => setAvatar(e.target.value)}
                    >
                        <option value="🐱">🐱</option>
                        <option value="🦊">🦊</option>
                        <option value="🏀">🏀</option>
                        <option value="🎱">🎱</option>
                        <option value="🚲">🚲</option>
                    </select>
                </div>
                <div className="form_control">
                    <button type="submit" className="form_login_button">Login</button>
                </div>
               </form>
          </div>
        </div>
      </div>
    );
}