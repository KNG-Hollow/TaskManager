import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
    const [isActive, setActive] = useState<boolean | null>();
    const [isAdmin, setAllowed] = useState<boolean | null>(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!isActive) {
            return () => {
                navigate("/error")
            }
        }
    }, [navigate, isActive]);

    return (
        <h1>Routing Works!</h1>
    )
}