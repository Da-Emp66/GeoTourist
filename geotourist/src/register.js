"use client";
import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";

export const Register = (props) => 
{
    const navigate = useNavigate();
    
    const handleClick = (e) => {
        e.preventDefault();
        navigate("/");
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const registrationData = {
        name: name,
        email: email,
        password: password,
    };

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        navigate("/homepage");
    }

    return (
        <><h1>GeoTourist</h1><div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Full Name</label>
                <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Full Name" />
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="*********" id="password" name="password" />
                <button type="submit" className="get-in-btn">Register</button>
            </form>
            <button className="link-btn" onClick={handleClick}>Already have an account? Login here.</button>
        </div></>
    )
}