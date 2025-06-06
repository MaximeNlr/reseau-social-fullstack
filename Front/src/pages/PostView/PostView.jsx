import "./PostView.css";
import NavSide from "../../Components/NavSide/NavSide"
import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react";
import { useUser } from "../../Components/UserContext/UserContext";

const postPage = () => {

    const { user } = useUser();
    const userInfo = Array.isArray(user) && user.length > 0 ? user[0] : null;

    const location = useLocation();
    const post = location.state?.post[0];

    const [comment, setComment] = useState("");
    const [allComment, setAllComment] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const options = {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'application/json'
                    }
                }
                const response = await fetch(`http://localhost:3000/api/get-post-comments/${post.id}`, options)
                const data = await response.json();
                setAllComment(data.results);

            } catch (error) {
                console.error('Erreur lors de la récuperation des commentaires du post', error);
            }
        }
        fetchComments();
    }, []);
    const submitCommentForm = async (e) => {
        e.preventDefault();
        try {
            const options = {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'application/json'
                },
                body: JSON.stringify({
                    text: comment,
                    postId: post.id
                })
            }
            const response = await fetch('http://localhost:3000/api/create-comment', options)
            const data = await response.json();
        } catch (error) {
            console.error('Erreur lors de la création d un commentaire', error);
        }
    };
    const deleteComment = async (commentId) => {
        try {
            const options = {
                method: 'DELETE',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            }
            const response = await fetch(`http://localhost:3000/api/delete-comment/${commentId}`, options)
            const data = await response.json();
            console.log(data);
            setAllComment((prevComment) => prevComment.filter(comment => comment.id !== commentId));
        } catch (error) {
            console.error('Erreur lors de la suppression du commentaire', error);
        }
    };
    const deleteCommentClick = (e, commentId) => {
        e.stopPropagation();
        deleteComment(commentId);
    }
    return (
        <div className="post-view-container">
            <div className="nav-container">
                <NavSide />
            </div>
            <div className="main-preview-container">
                <div className="post-id-container">
                    <div className="post-id-info">
                        <div className="post-user-picture">
                            <img src={`http://localhost:3000${post.profile_picture_url}`} alt="" />
                        </div>
                        <div className="post-content">
                            <h4>{post.pseudo}</h4>
                            <h2>{post.title}</h2>
                            <p>{post.subject}</p>
                            <img className="content-img" src={`http://localhost:3000${post.image_url}`} alt="" />
                            <div className="post-btn-container">
                                <div className={`like-container ${post.liked_by_user ? 'liked_container' : ''}`}>
                                    <img src="../../src/assets/icons/like1-icon.png" alt="" />
                                    <p>{post.like_count}</p>
                                </div>
                                <div className="comment-container">
                                    <img src="../../src/assets/icons/comment1-icon.png" alt="" />
                                    <p>{post.comment_count}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="post-comment-container">
                    <img src={`http://localhost:3000${userInfo?.profile_picture_url || '../../src/assets/icons/default-user.png'}`} alt="" />
                    <form onSubmit={submitCommentForm}>
                        <textarea
                            name="text"
                            placeholder="Commenter"
                            onChange={e => setComment(e.target.value)}
                        >
                        </textarea>
                        <input
                            type="submit"
                            value="Commenter"
                            className="btn-component"
                        />
                    </form>
                </div>
                <div className="all-comments-container">
                    {allComment.map((comment) => (
                        <div className="users-comment-container" key={comment.id}>
                            <div className="user-comment">
                                <div className="user-pic">
                                    <img src={`http://localhost:3000${comment.profile_picture_url}`} alt="" />
                                </div>
                                <div>
                                    <div className="user-comment-text">
                                        <p> <strong>{comment.pseudo}</strong></p>
                                        <p>{comment.text}</p>
                                    </div>
                                    <div className="comment-btn-container">
                                        <div className="like-icon-container">
                                            <img src="../../src/assets/icons/like1-icon.png" alt="" />
                                            <p>0</p>
                                        </div>
                                        <div className="comment-icon-container">
                                            <img src="../../src/assets/icons/comment1-icon.png" alt="" />
                                            <p>0</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {comment.user_id === userInfo.id && (
                                <div className="option-icon-container" onClick={(e) => deleteCommentClick(e, comment.id)}>
                                    <img src="../../src/assets/icons/option-icon.png" alt="icon options" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}
export default postPage;