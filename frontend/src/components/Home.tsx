import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { type Account, type Task } from "./utility/Interfaces";

export default function Home() {
    const [isActive, setActive] = useState<boolean>(false);
    const [isAdmin, setAllowed] = useState<boolean>(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!isActive) {
            return () => {
                navigate("/login")
            }
        }
    }, [navigate, isActive]);

    return (
        <div className="component-container">
            <div className="header">
                <h2>Welcome Home</h2>
            </div>
            <div className="component-view">
                <div id="home-container">
                    <div id="home-info">

                    </div>
                    <div id="active-tasks">

                    </div>
                </div>
            </div>
        </div>
    );
}
