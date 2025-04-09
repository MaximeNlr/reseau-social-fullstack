import "./NavSide.css";
import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Logout from "../Logout/Logout";

export default function NavSide() {

    const [pseudo, setPseudo] = useState("");
    const [image, setImage] = useState(null);
    const location = useLocation();

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
        <div className="navside-container">
            <div className="nav-bar-container">
                <div className="nav-btn-container">
                    <img src="../src/assets/icons/home-icon.jpg" alt="" />
                    <NavLink
                        to="/"
                        className={`nav-btn ${location.pathname === "/" ? "active" : ""}`}
                    >
                        Accueil
                    </NavLink>
                </div>
                <div className="nav-btn-container">
                    <img src="../src/assets/icons/user-icon.png" alt="" />
                    <NavLink
                        to="/profile"
                        className={`nav-btn ${location.pathname === "/profile" ? "active" : ""}`}
                    >
                        Profil
                    </NavLink>
                </div>
                <div className="nav-btn-container">
                    <img src="../src/assets/icons/search-icon.png" alt="" />
                    <NavLink
                        to="/search"
                        className={`nav-btn ${location.pathname === "" ? "active" : ""}`}
                    >
                        Rechercher
                    </NavLink>
                </div>
                <div className="nav-btn-container">
                    <img src="../src/assets/icons/message-icon.png" alt="" />
                    <NavLink
                        to="/message"
                        className={`nav-btn ${location.pathname === "/message" ? "active" : ""}`}
                    >
                        Messages
                    </NavLink>
                </div>

            </div>
            <div>
                <div className="profil-header">
                    <img src={`http://localhost:3000${image}`} alt="" />
                    <p>{pseudo}</p>
                </div>
                <div className="inputs-header">
                    <Logout />
                </div>
            </div>
        </div>
    )
}