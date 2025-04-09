import("./Posts.css");
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Posts({ posts, handleDelete }) {

    const location = useLocation();
    const navigate = useNavigate();
    const isProfilePage = location.pathname === '/profile';

    const getPost = async (postId) => {
        try {
            const options = {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'application/json'
                }
            }
            const response = await fetch(`http://localhost:3000/api/get-post/${postId}`, options)
            const data = await response.json();
            console.log(data);
            if (data.success == true) {
                navigate('/post', { state: { post: data.result } });
            }
        } catch (error) {
            console.error('Erreur lors de la récuperation des infos du post', error);
        }
    }
    return (
        <div className="posts-component">
            {posts.map((post) => (
                <div className="post-container" key={post.id} onClick={() => getPost(post.id)}>
                    <div className="post-info">
                        <div className="post-user-picture">
                            <img src={`http://localhost:3000${post.profile_picture_url}`} alt="" />
                        </div>
                        <div className="post-content">
                            <h4>{post.pseudo}</h4>
                            <p>{post.subject}</p>
                            <img className="content-img" src={`http://localhost:3000${post.image_url}`} alt="" />
                            <div className="post-btn-container">
                                <div className="like-container">
                                    <img src="../../src/assets/icons/like1-icon.png" alt="" />
                                    <p>{post.likes}</p>
                                </div>
                                <div className="comment-container">
                                    <img src="../../src/assets/icons/comment1-icon.png" alt="" />
                                    <p>{post.comment_count}</p>
                                </div>
                                {isProfilePage && (
                                    <button onClick={() => handleDelete(post.id)}>supprimer</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}