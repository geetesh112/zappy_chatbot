import React from 'react';
import closeImg from "../assets/Close.png";
import chatImg from "../assets/Chat.png";

const Toggle = ({ showChatbot, onToggleChat }) => {
    return (
        <button onClick={onToggleChat} id="chatbot-toggler">
            <span className="material-symbols-rounded">
                <img src={showChatbot ? closeImg : chatImg} alt="Chat" style={{ width: '22px', height: '22px' }} />
            </span>
        </button>
    );
};

export default Toggle;
