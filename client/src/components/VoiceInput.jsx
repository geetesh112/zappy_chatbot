import { useState, useEffect } from 'react';
import { MdKeyboardVoice } from "react-icons/md";

const VoiceInput = ({ onVoiceInput, disabled, language = 'en-US' }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = language;
      
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log(transcript)
        onVoiceInput(transcript);
        setIsListening(false);
      };
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    }
    
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [onVoiceInput, language]);

  useEffect(() => {
    if (recognition) {
      recognition.lang = language;
    }
  }, [language, recognition]);

  const toggleListening = () => {
    if (!recognition) {
      alert('Speech recognition is not supported in your browser');
      return;
    }
    
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  return (
    <button 
      type="button" 
      onClick={toggleListening} 
      className={`voice-input-button ${isListening ? 'active' : ''}`}
      disabled={disabled}
      aria-label={isListening ? 'Stop listening' : 'Start voice input'}
      title={isListening ? 'Stop listening' : `Start voice input (${language})`}
    >
     <MdKeyboardVoice size={24}/>
    </button>
  );
};

export default VoiceInput; 