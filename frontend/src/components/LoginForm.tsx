import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import type { Account } from "./utility/Interfaces";
import { UseAccount } from "../context/Context";

export default function Login() {
    const [isActive, setActive] = useState<boolean>(false);
    const [usernameIn, setUsernameValue] = useState<string>('');
    const [passwordIn, setPasswordValue] = useState<string>('');
    const navigate = useNavigate();

    return (
        <div className="component-container">
            <div className="header">
                <h2>Login</h2>
            </div>
            <div className="component-view">
                <div id="login-container">
                    <div id="login-header">

                    </div>
                    <div id="login-info">

                    </div>
                    <div id="login-form">
                        <div id="input-username">
                            <label htmlFor="username-area">Username:</label>
                            <input 
                                type="text"
                                aria-label="username"
                                placeholder="username"
                                value={usernameIn}
                                onChange={(e) => setUsernameValue(e.target.value)}
                            >
                            </input>
                        </div>
                        <div id="input-password">
                            <label htmlFor="password-area">Password:</label>
                            <input
                                type="text"
                                aria-label="password"
                                placeholder="password"
                                value={passwordIn}
                                onChange={(e) => setPasswordValue(e.target.value)}
                            >
                            </input>
                        </div>
                    </div>
                    <div id="login-buttons">
                        <div id="login-button">
                            <button onClick={() => {
                                console.log("Attempting To Login as: ", usernameIn);
                                const [exists, accountInfo] = authorizeUser(usernameIn, passwordIn);
                                if (!exists) {
                                    setActive(false);
                                    return;
                                } else {
                                    setActive(true);
                                    accountInfo.active = isActive;
                                    const { setAccount } = UseAccount();
                                    setAccount(accountInfo);
                                    navigate("/")
                                }
                            }}>
                                Login
                            </button>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function authorizeUser(username: string, password: string): [boolean | null, Account] {
    
}
