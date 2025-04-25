import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserAuth() {

    const [isAuth, setIsAuth] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAuth = async (e) => {
            try {
                const options = {
                    credentials: 'include'
                }
                const response = await fetch("http://localhost:3000/api/check-auth", options)
                const data = await response.json();
                if (data.success === false) {
                    setIsAuth(false);
                    navigate('/register');
                } else {
                    setIsAuth(true);
                }
            } catch (error) {
                setIsAuth(false);
                console.error("Erreur de la vérification de l'authentification de l'utilisateur", error);
                navigate('/register');
            }
        }
        fetchAuth();
    }, [navigate])
    return isAuth;
}