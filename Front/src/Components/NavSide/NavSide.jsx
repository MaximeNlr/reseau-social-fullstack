import "./NavSide.css";
import { NavLink, useLocation } from "react-router-dom";
import Logout from "../Logout/Logout";
import { useUser } from "../UserContext/UserContext";

export default function NavSide() {

    const { user } = useUser();
    const location = useLocation();

    const userInfo = Array.isArray(user) && user.length > 0 ? user[0] : null;
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
                    <img src={`http://localhost:3000${userInfo?.profile_picture_url || '../../src/assets/icons/default-user.png'}`} alt="Icon de l'utilisateur" />
                    <p>{userInfo?.pseudo || 'none'}</p>
                </div>
                <div className="inputs-header">
                    <Logout />
                </div>
            </div>
        </div>
    )
}