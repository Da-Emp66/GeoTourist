"use client";
import React, { useState } from "react"
import logo from './logo.svg'
import { Login } from "./login";
import { Register } from "./register";
import { Routes, Route } from 'react-router-dom';
import HomePage from "./homepage";

function App() {
    // const navigate = useNavigate();
    const [currentForm, setCurrentForm] = useState('login');

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }

    return (
        <div className="App">
            <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/homepage" element={<HomePage/>} />
            </Routes>
        </div>
    );
}


export default App;