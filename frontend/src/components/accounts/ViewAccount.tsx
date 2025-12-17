import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Account() {
    const [isActive, setActive] = useState<boolean | null>();
    const [isAdmin, setAllowed] = useState<boolean | null>(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!isActive || !isAdmin) {
            return () => {
                navigate("/error")
            }
        }
    }, [navigate, isActive, isAdmin]);

    return (
        <h1>Routing Works!</h1>
    )
}