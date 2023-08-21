import React, {useState, uuseState} from "react";
import login from "./login/login";
import Chat from "./chat/chat";
import UserContext from "./context/UserContext";

const CHANNEL_ID =  `${process.env.REACT_APP_SCALEDRONE_CHANNEL_ID}`

export default function MyChatApp() {
    const [user, setUser] = useState("");
    const [drone, setDrone] = useState(null);

    function onUserLogin(username, avatar) {
        if (username) {
            const drone = new window.Scaledrone(CHANNEL_ID, {
                data: {username, avatar},
            });
            drone.on("open", () => {
                setDrone(drone);
                setUser({id: drone.clientId, username, avatar});
            }); 
        }
    }
    
    function userLogout() {
        drone.close();
        setDrone(null);
        setUser(null);
    }

    return (
        <div>
            <UserContext.Provider value={{user, drone, onUserLogin, userLogout}}>
                {!user && <login/>}
                {user && <Chat/>}
            </UserContext.Provider>
        </div>
    );
}