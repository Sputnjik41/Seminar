import React, {useContext} from "react";
import ChatContext from "../../context/ChatContext";
import "./listmembers.css";

export default function () {
    const {membersArray} = useContext(ChatContext);
    return(
        <div className=".list_members_item">
            <div>Members:</div>
            {membersArray.map((member) => (
                <div className="list_members_members_item" key={member.id}>
                    <span className="list_members_members_avatar">
                        {member.clientData.avatar}
                    </span>
                    <span className="list_members_members_username">
                    {member.clientData.username}
                    </span>
                </div>
            ))}
            </div>
    );
}