import React, {useContext, useEffect, useState} from "react";
import ChatContext from "../context/ChatContext";
import UserContext from "../context/UserContext";
import listmessages from "./list_messages/listmessages";
import listmembers from "./list_members/listmembers";
import send_message from "./send_message/sendmessage";
import "./chat.css";
import { error } from "console";
import { func } from "prop-types";

const default_room_name = "observale_default_room";

export default function Chat() {
    const { user, drone, userLogout } = useContext(UserContext);
    const [messageArray, setMessageArray] = useState([]);
    const [membersArray, setMembersArray] = useState([]);

    useEffect(() => {
        if (user) {
            setupRoom(drone);
        }
    }, [user, drone]);

    function setupRoom(scaledrone) {
        scaledrone.on("error", (error) => console.error(error));
        const room = scaledrone.subscribe(default_room_name);
        room.on("error", (error) => console.error(error));
        room.on("members", function (members) {
        setMembersArray([members]);
    });

    room.on("member_join", function (member) {
        setMembersArray(function (current) {
            return [current, member];
        });

        setMessageArray((current) => {
            return [
                current,
                {
                    message:"has joined the chat!",
                    id: Math.random(),
                    type: "Member Joined",
                    user: {
                        username: member.clientData.username,
                        avatar: member.clientData.avatar,
                    },
                },
            ];
        });
    });

    room.on("member:leave",function (member) {
        setMembersArray((current) => {
            return current.filter((oneMember) => oneMember.id !== member.id);
        });
        setMessageArray((current) => {
            return [
                current,
                {
                    message:"has left the chat!",
                    id: Math.random(),
                    type: "Member Left",
                    user: {
                        username: member.clientData.username,
                        avatar: member.clientData.avatar,
                    },
                },
            ];
        });
    });

    room.on("message", (message) => {
        setMessageArray((current) => {
            return [
                current,
                {
                    message:message.data.message,
                    id: message.id,
                    type: "Message",
                    user: {
                        id: message.member.id,
                        username: message.member.clientData.username,
                        avatar: message.member.clientData.avatar,
                    },
                },
            ];
        });
    });
}
    
    function publishMessage(message) {
        drone.publish({
            room: default_room_name,
            message: {message},
        });
    }

    function onClickLogout() {
        userLogout();
    }

    return(
        <div className="chat">
            <ChatContext.Provider
            value={{
                publishMessage,
                onClickLogout,
                messageArray,
                membersArray,
                user,
            }}
            >
                <div className="chat_header">
                   <header/>
                </div>
                <div className="chat_main">
                    <div className="chat_main_item">
                        <div className="chat_main_members">
                            <listmembers/>
                        </div>
                        <div className="chat_main_messages">
                            <listmessages/>
                        </div>
                    </div>
                </div>
                <div className="chat_footer">
                    <send_message/>
                </div>
            </ChatContext.Provider>
        </div>
     );
}