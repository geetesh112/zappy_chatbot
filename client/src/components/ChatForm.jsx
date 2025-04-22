import { useRef, useState } from "react";
import myImage from '../assets/Send.png';
import VoiceInput from './VoiceInput';
import { BsFillSendFill } from "react-icons/bs";


const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse, isResponseGenerating, setIsResponseGenerating, settings }) => {
    const inputRef = useRef();
    const [inputValue, setInputValue] = useState("");

    const handleFormSubmit = (e, message) => {
        e?.preventDefault();
        const userMessage = message.trim() || inputRef.current.value.trim();
        console.log(userMessage, isResponseGenerating)
        if (!userMessage || isResponseGenerating) return;

        setIsResponseGenerating(true);
        inputRef.current.value = "";
        setInputValue("");

        setChatHistory((history) => [...history, { role: "user", text: userMessage }]);

        setTimeout(() => {
            setChatHistory((history) => [...history, { role: "model", text: "Thinking..." }]);
            generateBotResponse([...chatHistory, { role: "user", text: userMessage }]);
        }, 600);
    };

    const handleVoiceInput = (transcript) => {
        setInputValue(transcript);
        handleFormSubmit(undefined , transcript)
    };

    return (
        <form onSubmit={(e) => handleFormSubmit(e, inputValue)} className="chat-form">
            <input 
                ref={inputRef}
                placeholder="Message..."
                className="message-input" 
                required
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <div className="chat-form-buttons">
                <VoiceInput 
                    onVoiceInput={handleVoiceInput} 
                    disabled={isResponseGenerating}
                    language={settings?.language || 'en-US'}
                />
                <button 
                    type="submit" 
                    id="send-message" 
                    className="material-symbols-rounded"
                    disabled={isResponseGenerating}
                >
                    <BsFillSendFill />
                </button>
            </div>
        </form>
    );
};

export default ChatForm;
