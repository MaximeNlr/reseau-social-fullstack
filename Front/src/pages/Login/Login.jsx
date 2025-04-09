import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const submit_login = async (e) => {
        e.preventDefault();
        try {
            const options = {
                method: 'POST',
                credentials: "include",
                headers: {
                    "content-type": "application/json",
                    "Authorization": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
            const response = await fetch("http://localhost:3000/api/login", options);
            const data = await response.json();
            console.log(data);
            if (data.success == true) {
                navigate("/");
            }
        } catch (error) {
            console.error("Erreur lors de l'identification !:", error);
        }
    }
    return (
        <div className="login-register-container">
            <div className="login-register-form-container">
                <h1>Connexion</h1>
                <form onSubmit={submit_login}>
                    <div className="login-inputs">
                        <img src="../../src/assets/icons/email.png" alt="" />
                        <input
                            onChange={e => setEmail(e.target.value)}
                            type="text"
                            name="email"
                            placeholder="Email"
                            className="login-input"
                            required
                        />
                    </div>
                    <div className="login-inputs">
                        <img src="../../src/assets/icons/password.png" alt="" />
                        <input
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                            name="password"
                            placeholder="Mot de passe"
                            className="login-input"
                            required
                        />
                    </div>
                    <input type="submit" className="login-submit" value="Se connecter" />
                </form>
            </div>
        </div>
    )
}