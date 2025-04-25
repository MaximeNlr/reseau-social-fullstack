import "./Home.css";
import Header from "../../Components/Header/Header";
import NavSide from "../../Components/NavSide/NavSide";
import { useState, useEffect } from "react";
import Posts from "../../Components/Posts/Posts";
import { useUser } from "../../Components/UserContext/UserContext";



export default function Home() {

    const { user } = useUser();
    const userInfo = Array.isArray(user) && user.length > 0 ? user[0] : null;

    const [posts, setPosts] = useState([]);
    const [subject, setSubject] = useState("");
    const [image, setImage] = useState(null);
    const [imgPreview, setImgPreview] = useState(null);
    const [followed, setFollowed] = useState(false);
    const [explore, setExplore] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const options = {
                    method: "GET",
                    credentials: "include",
                };
                const response = await fetch('http://localhost:3000/api/get-all-posts', options)
                const data = await response.json();
                console.log(data.results);
                setPosts(data.results);
                setExplore(true);
            } catch (error) {
                console.error("Erreur lors de la recuperation du fil d'actualité");
            }
        }
        fetchPosts();
    }, [])
    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
        setImgPreview(URL.createObjectURL(e.target.files[0]));
    };

    const fetchPosts = async () => {
        try {
            const options = {
                method: "GET",
                credentials: "include",
            };
            const response = await fetch('http://localhost:3000/api/get-all-posts', options)
            const data = await response.json();
            console.log(data.results);
            setPosts(data.results);
            setExplore(true)
            setFollowed(false);
        } catch (error) {
            console.error("Erreur lors de la recuperation du fil d'actualité");
        }
    }
    const followedPosts = async () => {
        try {
            const options = {
                method: 'GET',
                credentials: 'include'
            };
            const response = await fetch('http://localhost:3000/api/get-followed-posts', options);
            const data = await response.json();
            setPosts(data.results);
            setFollowed(true);
            setExplore(false);
        } catch (error) {
            console.error("Erreur lors de la recuperation du des posts suivi");
        }
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
                <div className="home-posts-container">
                    <div className="home-header">
                        <div className={`explore-container ${explore === true ? 'explore-active' : ''}`}
                            onClick={fetchPosts}>
                            <h4>Explorer</h4>
                        </div>
                        <div className={`followed-container ${followed === true ? 'followed-active' : ''}`}
                            onClick={followedPosts}>
                            <h4>Suivi</h4>
                        </div>
                    </div>
                    <Posts posts={posts} />
                </div>
                <div className="create-post-form-container">
                    <form onSubmit={post_form}>
                        <div className="preview-container">
                            <div className="post-form-img-txt-container">
                                <img src={`http://localhost:3000${userInfo?.profile_picture_url || '../../src/assets/icons/default-user.png'}`} alt="Icon de l'utilisateur" />
                                <textarea
                                    name="subject"
                                    placeholder="Quoi de neuf ?"
                                    onChange={e => setSubject(e.target.value)}
                                >
                                </textarea>
                            </div>
                            <div className="img-preview-container">
                                <img src={imgPreview} />
                            </div>
                        </div>
                        <div className="inputs-post">
                            <label htmlFor="input-file"><img src="../../src/assets/icons/media-icon.png" alt="icon media" /></label>
                            <input
                                type="file"
                                name="file"
                                onChange={handleFileChange}
                                id="input-file"
                            />
                            <input className="btn-component"
                                value="Publier"
                                type="submit"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}