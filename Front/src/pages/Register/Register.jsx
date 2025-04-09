import "./Register.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {

    const [name, setName] = useState("");
    const [firstname, setFirstname] = useState("");
    const [email, setEmail] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [birthday, setBirthday] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const submit_register = async (e) => {
        e.preventDefault();
        if (confirmPassword == password) {
            try {
                const options = {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        firstname: firstname,
                        email: email,
                        pseudo: pseudo,
                        birthday: birthday,
                        password: password
                    })
                }
                const response = await fetch("http://localhost:3000/api/register", options);
                const data = await response.json();
                console.log(data);
                if (data.success == true) {
                    navigate("/Login");
                }
            } catch (error) {
                console.error("Erreur lors de l'incription", error);
            }
        }
    }

    return (
        <div className="register-container">
            <div className="register-form-container">
                <form onSubmit={submit_register}>
                    <h1>Inscription</h1>
                    <div className="register-inputs">
                        <input
                            onChange={e => setName(e.target.value)}
                            type="text"
                            name="name"
                            placeholder="Nom"
                            required
                        />
                        <input
                            onChange={e => setFirstname(e.target.value)}
                            type="text"
                            name="firstname"
                            placeholder="Prénom"
                            required
                        />
                    </div>
                    <div className="register-inputs">
                        <input
                            onChange={e => setBirthday(e.target.value)}
                            type="date"
                            name="birthday"
                            required
                        />
                        <input
                            onChange={e => setPseudo(e.target.value)}
                            type="text"
                            name="pseudo"
                            placeholder="Nom d'utilisateur"
                            required
                        />
                    </div>
                    <div className="register-inputs">
                        <input
                            onChange={e => setEmail(e.target.value)}
                            type="text"
                            name="email"
                            placeholder="Email"
                            id="email"
                            required
                        />
                    </div>
                    <div className="register-inputs">
                        <input
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                            name="password"
                            placeholder="Mot de passe"
                            required
                        />
                        <input
                            onChange={e => setConfirmPassword(e.target.value)}
                            type="password"
                            name=""
                            placeholder="Confirmer le mot de passe"
                            required
                        />
                    </div>
                    <input type="submit" className="register-submit" />
                </form>
                <div className="go-to-login">
                    <p>Si vous êtes déja inscrit cliquez <Link to="/login">ici</Link> pour vous connecter</p>

                </div>
            </div>
        </div>
    )
}