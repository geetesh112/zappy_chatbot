import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import video from '../assets/Auth.mp4';

const APP_URL = import.meta.env.VITE_APP_URL;

const Signup = () => {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }

    const handleError = (message) => {
        toast.error(message, {
            position: "top-right",
            theme: "dark"
        });
    }

    const handleSuccess = (message) => {
        toast.success(message, {
            position: "top-right",
            theme: "dark"
        });
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('name, email and password are required')
        }
        try {
            const url = `${APP_URL}/auth/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
        } catch (err) {
            handleError(err);
            console.log("Error", err)
        }
    }

    return (
        <div className="form_container">
            <h2>Create An Account</h2>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor='name'>Username</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        autoFocus
                        placeholder='Enter your username'
                        value={signupInfo.name}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={signupInfo.email}
                        placeholder="Enter your email"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={signupInfo.password}
                        placeholder="Enter your password"
                        onChange={handleChange}
                    />
                </div>
                <button className="auth-button" type="submit">Sign Up</button>
                <span className="auth-span">
                    Already have an account? <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer />
            <div className="auth-video-container">
                <video className="hero-video" autoPlay loop muted>
                    <source src={video} type="video/mp4" />
                </video>
            </div>
        </div>
    );
};

export default Signup;
