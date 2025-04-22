import { useState, useEffect } from 'react';
import { IoIosSettings } from "react-icons/io";


const ChatSettings = ({ onSettingsChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('chatSettings');
    return savedSettings ? JSON.parse(savedSettings) : {
      language: 'en-US',
      voiceRate: 1,
      theme: 'light'
    };
  });

  useEffect(() => {
    localStorage.setItem('chatSettings', JSON.stringify(settings));
    onSettingsChange(settings);
  }, [settings, onSettingsChange]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleOpen = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="chat-settings">
      <button 
        className="settings-toggle"
        onClick={toggleOpen}
        aria-label="Toggle settings"
      >
        <IoIosSettings size={24}/>
      </button>
      
      {isOpen && (
        <div className="settings-panel">
          <h3>Settings</h3>

          
          <div className="settings-group">
            <label htmlFor="theme">Theme:</label>
            <select 
              id="theme" 
              name="theme" 
              value={settings.theme}
              onChange={handleChange}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
            </select>
          </div>
          
          <div className="settings-group">
            <label htmlFor="voiceRate">Voice Speed:</label>
            <input 
              type="range" 
              id="voiceRate" 
              name="voiceRate" 
              min="0.5" 
              max="2" 
              step="0.1" 
              value={settings.voiceRate}
              onChange={handleChange}
            />
            <span>{settings.voiceRate}x</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSettings; 