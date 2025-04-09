import "./Profile.css";
import Header from "../../Components/Header/Header";
import NavSide from "../../Components/NavSide/NavSide";
import { useState, useEffect } from "react";
import Posts from "../../Components/Posts/Posts";

export default function Profile() {

    const [userPosts, setUserPosts] = useState([]);
    const [image, setImage] = useState(null);

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    useEffect(() => {
        const fetchUsersPosts = async () => {
            try {
                const options = {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'application/json'
                    }
                }
                const response = await fetch('http://localhost:3000/api/get-users-posts', options);
                const data = await response.json();
                setUserPosts(data.posts);
            } catch (error) {
                console.error('Erreur lors de la recuperation des posts de l\'utilisateur', error);
            }
        }
        fetchUsersPosts();
    }, [])

    const deletePost = async (postId) => {
        try {
            const options = {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                }
            }
            const response = await fetch(`http://localhost:3000/api/delete-post/${postId}`, options)
        } catch (error) {
            console.error("Erreur lors de la suppression du post", error);
        }
    }

    const editProfile = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        try {
            const options = {
                method: 'POST',
                credentials: 'include',
                body: formData
            }
            const response = await fetch('http://localhost:3000/api/edit-user-profile', options);
            const data = await response.json()
            console.log('reponse apres edit ->', data);
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la photo de profil', error);
        }
    }
    return (
        <div className="profile-container">
            <div className="nav-container">
                <NavSide />
            </div>
            <div className="main-profile-container">
                <div className="home-posts-container" id="posts-profile">
                    <div className="profile-header">
                        <h3>Vos publication</h3>
                    </div>
                    <Posts posts={userPosts} handleDelete={deletePost} />
                </div>
                <div className="user-profile-container">
                    <div className="user-profile-img">
                        <div className="profile-img-container">
                            <img src="" alt="" />
                        </div>
                        <form onSubmit={editProfile}>
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
            </div>
        </div>
    )
}