import { useRef, useEffect } from 'react';
import { RiUserVoiceFill } from "react-icons/ri";

const TextToSpeech = ({ text, language = 'en-US', rate = 1 }) => {
  const isSpeakingRef = useRef(false);

  const speak = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in your browser');
      return;
    }

    if (isSpeakingRef.current) {
      window.speechSynthesis.cancel();
      isSpeakingRef.current = false;
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = rate;

    utterance.onend = () => {
      isSpeakingRef.current = false;
    };

    window.speechSynthesis.speak(utterance);
    isSpeakingRef.current = true;
  };

  // Stop speech synthesis if the user navigates away or closes the page
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isSpeakingRef.current) {
        window.speechSynthesis.cancel();
        isSpeakingRef.current = false;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <button 
      className="tts-button" 
      onClick={speak}
      aria-label="Read message aloud"
      title="Read message aloud"
    >
      <RiUserVoiceFill size={24} />
    </button>
  );
};

export default TextToSpeech;
