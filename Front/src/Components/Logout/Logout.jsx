import "./Logout.css";
import { useNavigate } from "react-router-dom";

export default function Logout() {

    const navigate = useNavigate();

    const logout_btn = async (e) => {
        e.preventDefault();
        try {
            const options = {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-type": "application/json",
                    "authorization": "application.json"
                }
            }
            const response = await fetch("http://localhost:3000/api/logout", options);
            const data = await response.json();
            console.log(data);
            if (data.success == true) {
                navigate("/login");
                window.location.reload();
            }
        } catch (error) {
            console.error("Erreur lors de la déconnexion", error)
        }
    }

    return (
        <div className="logout-container">
            <button onClick={logout_btn}>Deconnexion</button>
        </div>
    )
}