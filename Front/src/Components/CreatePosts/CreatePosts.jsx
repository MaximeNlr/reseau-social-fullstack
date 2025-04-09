import "./CreatePosts.css";
import Header from "../../Components/Header/Header";
import NavSide from "../../Components/NavSide/NavSide";
import { useState } from "react";

export default function CreatePosts() {

    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [image, setImage] = useState(null);


    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const post_form = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("subject", subject);
        formData.append("image", image);

        try {
            const options = {
                method: "POST",
                credentials: "include",
                body: formData
            }
            const response = await fetch("http://localhost:3000/api/create-post", options)
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Erreur lors de la création du post !", error);
        }
    }

    return (
        <div className="create-posts-container">
            <div className="create-post-form-container">
                <h1>Créer un post</h1>
                <form onSubmit={post_form}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Titre"
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        name="subject"
                        id=""
                        placeholder="Sujet"
                        onChange={e => setSubject(e.target.value)}
                    >
                    </textarea>
                    <input
                        type="file"
                        onChange={handleFileChange}
                    />
                    <input
                        type="submit"
                    />
                </form>
            </div>
        </div>
    )
}