import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from '../utils';
import { ToastContainer, toast } from "react-toastify";
import Chatbot from "./Chatbot";
import Hero from "./Hero";
import Toggle from "./Toggle";

const APP_URL = import.meta.env.VITE_APP_URL;

const Home = () => {
    const [showChatbot, setShowChatbot] = useState(false);
    const handleToggleChat = () => {
        setShowChatbot((prev) => !prev);
    };

    const [loggedInUser, setLoggedInUser] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged out');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    }

    const SuccessLogin = async () => {
        try {
            const url = `${APP_URL}/home`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            };
            const response = await fetch(url, headers);
            const result = await response.json();

            if (result && result[0] && result[0].message && !message) {
                setMessage(result[0].message);
                toast.success(result[0].message, {
                    theme: "dark",
                    position: "bottom-center",
                    autoClose: "3000"
                });
            }

            if (loggedInUser && !message) {
                toast.success(`Welcome, ${loggedInUser}!`, {
                    theme: "dark",
                });
            }
        } catch (err) {
            handleError(err);
        }
    };

    useEffect(() => {
        if (loggedInUser) {
            SuccessLogin();
        }
    }, [loggedInUser]);

    return (
        <div>
            <Hero onStartChat={handleToggleChat} />
            <button id="logout-btn" onClick={handleLogout}>LOGOUT</button>
            {showChatbot && <Chatbot setShowChatbot={setShowChatbot} />}
            <Toggle showChatbot={showChatbot} onToggleChat={handleToggleChat} />
            <ToastContainer />
        </div>
    );
};

export default Home;
