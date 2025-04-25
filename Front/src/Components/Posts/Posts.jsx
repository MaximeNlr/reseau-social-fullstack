import("./Posts.css");
import { useEffect, useState } from "react";
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
                headers: { 'Content-type': 'application/json' }
            }
            const response = await fetch(`http://localhost:3000/api/get-post/${postId}`, options)
            const data = await response.json();
            console.log(data);
            if (data.success == true) {
                navigate('/post', { state: { post: data.results } });
            }
        } catch (error) {
            console.error('Erreur lors de la récuperation des infos du post', error);
        }
    };
    const addLike = async (postId) => {
        try {
            const options = {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-type': 'application/json' }
            }
            const response = await fetch(`http://localhost:3000/api/like-post/${postId}`, options)
            const data = await response.json();
            setPosts((prevPosts) => prevPosts.filter(posts => posts.liked_by_user))
            console.log(data);
        } catch (error) {
            console.error('Erreur lors de l\'envoie du like', error);
        }
    };

    const addFollow = async (userId) => {
        try {
            const options = {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-type': 'application/json' }
            }
            const response = await fetch(`http://localhost:3000/api/users/${userId}/follow`, options);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Erreur lors du follow de l\'utilisateur');
        }
    };
    const addFollowClick = (e, userId) => {
        e.stopPropagation();
        addFollow(userId);
    };
    const likeClick = (e, postId) => {
        e.stopPropagation();
        addLike(postId);
    }
    const deletePostClick = (e, postId) => {
        e.stopPropagation();
        handleDelete(postId);
    };
    return (
        <div className="posts-component">
            {posts.map((post) => (
                <div className="post-container" key={post.id} onClick={() => getPost(post.id)}>
                    <div className="post-info">
                        <div className="post-user-picture">
                            <img src={`http://localhost:3000${post.profile_picture_url}`} alt="" />
                        </div>
                        <div className="post-content">
                            <div className="h4-option-container">
                                <h4>{post.pseudo}</h4>
                                <button className="btn-component" onClick={(e) => addFollowClick(e, post.user_id)}>suivre</button>
                            </div>
                            <p>{post.subject}</p>
                            <div className="content-img-container">
                                <img className="content-img" src={`http://localhost:3000${post.image_url}`} alt="" />
                            </div>
                            <div className="post-btn-container">
                                <div
                                    className={`like-container ${post.liked_by_user ? 'liked-container' : ''}`}
                                    onClick={(e) => likeClick(e, post.id)}
                                >
                                    <img src="../../src/assets/icons/like1-icon.png" alt="" />
                                    <p>{post.like_count}</p>
                                </div>
                                <div className="comment-container">
                                    <img src="../../src/assets/icons/comment1-icon.png" alt="" />
                                    <p>{post.comment_count}</p>
                                </div>
                                {isProfilePage && (
                                    <button className="delete-post-btn" onClick={(e) => deletePostClick(e, post.id)}>supprimer</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))
            }
        </div >
    )
}