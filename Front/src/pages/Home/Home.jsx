import "./Home.css";
import Header from "../../Components/Header/Header";
import NavSide from "../../Components/NavSide/NavSide";
import { useState, useEffect } from "react";
import Posts from "../../Components/Posts/Posts";



export default function Home() {

    const [posts, setPosts] = useState([]);
    const [subject, setSubject] = useState("");
    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const options = {
                    method: "get",
                    credentials: "include",
                }
                const response = await fetch("http://localhost:3000/api/get-all-posts", options)
                const data = await response.json();
                console.log("home page data", data);

                setPosts(data.posts);
            } catch (error) {
                console.error("Erreur lors de la recuperation du fil d'actualité");
            }
        }
        fetchPosts();
    }, [])

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const post_form = async (e) => {
        e.preventDefault();
        const formData = new FormData();
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
        <div className="home-container">
            <div className="nav-container">
                <NavSide />
            </div>
            <div className="main-container">
                {/* <div className="create-post-form-container">
                    <form onSubmit={post_form}>
                        <div className="preview-container">
                            <textarea
                                name="subject"
                                id=""
                                placeholder="Quoi de neuf ?"
                                onChange={e => setSubject(e.target.value)}
                            >
                            </textarea>
                            <div className="img-preview-container">
                                <img src={image} alt="" />
                            </div>
                        </div>

                        <div className="inputs-post">
                            <input
                                type="file"
                                onChange={handleFileChange}
                            />

                            <input
                                type="submit"
                            />
                        </div>
                    </form>
                </div> */}
                <div className="home-posts-container">
                    <Posts posts={posts} />
                </div>
            </div>

        </div >
    )
}