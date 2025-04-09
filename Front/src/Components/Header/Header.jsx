import "./Header.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../Logout/Logout";


export default function Header() {

    const [pseudo, setPseudo] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const options = {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'application/json'
                    },
                }
                const response = await fetch('http://localhost:3000/api/get-user-info', options);
                const data = await response.json();
                const userData = data.user[0];
                setPseudo(userData.pseudo)
                setImage(userData.profile_picture_url);
                console.log(pseudo);

            } catch (error) {
                console.error('Erreur lors de la récuperation des infos utilisateur pour le header', error);
                setUserInfo("");
            }
        }
        fetchUserInfo();
    }, []);

    return (
        <div className="header-container">
            <div className="logo-header">
                <h2>Forum</h2>
            </div>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Rechercher"
                />
            </div>
            <div className="profil-header">
                <img src={`http://localhost:3000${image}`} alt="" />
                <p>{pseudo}</p>
            </div>
        </div>
    )
}