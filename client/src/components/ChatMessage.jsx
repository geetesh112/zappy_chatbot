import ChatbotIcon from "./ChatbotIcon";
import TypingAnimation from "./TypingAnimation";
import TextToSpeech from "./TextToSpeech";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";



const ChatMessage = ({ chat, settings }) => {
    const isThinking = chat.role === "model" && chat.text === "Thinking...";
    const isBotMessage = chat.role === "model" && !isThinking;
    const theme = settings.theme === "dark" ? oneDark : oneLight;
    return (
        !chat.hideInChat && (
            <div className={`message ${chat.role === "model" ? "bot" : "user"}-message ${chat.isError ? "error" : ""}`}>
                {chat.role === "model" && <ChatbotIcon />}
                
                {isThinking ? (
                    <TypingAnimation />
                ) : (
                    <div className="message-text-container">
                    <div className="message-text">
                        <ReactMarkdown
                            children={chat.text}
                            components={{
                                code({ node, inline, className, children, ...props }) {
                                    const match = /language-(\w+)/.exec(className || "");
                                    return !inline ? (
                                        <SyntaxHighlighter
                                            style={theme}
                                            language={match?.[1] || "javascript"}
                                            PreTag="div"
                                            {...props}
                                        >
                                            {String(children).replace(/\n$/, "")}
                                        </SyntaxHighlighter>
                                    ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    );
                                }
                            }}
                        />
                    </div>
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
