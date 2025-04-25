import "./Profile.css";
import Header from "../../Components/Header/Header";
import NavSide from "../../Components/NavSide/NavSide";
import { useState, useEffect } from "react";
import Posts from "../../Components/Posts/Posts";
import { useUser } from "../../Components/UserContext/UserContext";

export default function Profile() {

    const { user } = useUser();
    const [userPosts, setUserPosts] = useState([]);
    const [image, setImage] = useState(null);

    const userInfo = Array.isArray(user) && user.length > 0 ? user[0] : null;

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
                setUserPosts(data.results);
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
            const data = await response.json();
            console.log(data);
            if (data.success === true) {
                setUserPosts((prevPosts) => prevPosts.filter(post => post.id !== postId));
            }
            console.log(data);
        } catch (error) {
            console.error("Erreur lors de la suppression du post", error);
        }
    };
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
                <div className="home-posts-container">
                    <div className="profile-header">
                        <h3>Mes publications</h3>
                    </div>
                    <div className="profile-posts-container">
                        <Posts posts={userPosts} handleDelete={deletePost} />
                    </div>
                </div>
                <div className="user-profile-container">
                    <form onSubmit={editProfile}>
                        <div className="user-profile-container-form">
                            <div className="profile-img-container" style={{
                                backgroundImage: `url(${`http://localhost:3000${userInfo?.profile_picture_url || '../../src/assets/icons/default-user.png'}`})`,
                            }}>
                                <div className="input-file-container">
                                    <label htmlFor="file">
                                        <img src="../../src/assets/icons/media-icon.png" alt="" />
                                    </label>
                                    <input
                                        type="file"
                                        id="file"
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </div>
                            <div className="profile-form-inputs">
                                <div className="profile-inputs">
                                    <label htmlFor="name">Nom :</label>
                                    <input
                                        type="text"
                                    />
                                </div>
                                <div className="profile-inputs">
                                    <label htmlFor="firstname">Prénom :</label>
                                    <input
                                        type="text"
                                    />
                                </div>
                                <div className="profile-inputs">
                                    <label htmlFor="pseudo">Pseudo :</label>
                                    <input
                                        type="text"
                                    />
                                </div>
                                <div className="profile-inputs">
                                    <label htmlFor="email">Email :</label>
                                    <input
                                        type="email"
                                    />
                                </div>
                            </div>
                            <div className="profile-edit-input">
                                <input
                                    type="submit"
                                    value="Editer"
                                    className="btn-component"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}