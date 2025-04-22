import ChatbotIcon from "./ChatbotIcon";
import TypingAnimation from "./TypingAnimation";
import TextToSpeech from "./TextToSpeech";

const ChatMessage = ({ chat, settings }) => {
    const isThinking = chat.role === "model" && chat.text === "Thinking...";
    const isBotMessage = chat.role === "model" && !isThinking;

    return (
        !chat.hideInChat && (
            <div className={`message ${chat.role === "model" ? "bot" : "user"}-message ${chat.isError ? "error" : ""}`}>
                {chat.role === "model" && <ChatbotIcon />}
                
                {isThinking ? (
                    <TypingAnimation />
                ) : (
                    <div className="message-text-container">
                        <p className="message-text">{chat.text}</p>
                        {isBotMessage && (
                            <TextToSpeech 
                                text={chat.text} 
                                language={settings?.language || 'en-US'} 
                                rate={settings?.voiceRate || 1}
                            />
                        )}
                    </div>
                )}
            </div>
        )
    );
};

export default ChatMessage;
