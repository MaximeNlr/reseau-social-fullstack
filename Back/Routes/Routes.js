const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../Controllers/AuthController');
const { createPost, getAllPosts, deletePost, getPost, getFollwedPosts } = require('../Controllers/PostController');
const { getUsersPosts, editUser, getUser, searchUsers } = require('../Controllers/UserController');
const { createComment, getPostComments, deleteComment } = require('../Controllers/CommentController');
const { createMessage, getMessages, getConversations, deleteMessage } = require('../Controllers/MessageController');
const { insertLike } = require('../Controllers/LikeController');
const { addFollow } = require('../Controllers/FollowController');
const authenticated = require('../Middleware/Authenticated');
const upload = require('../Middleware/upload');


// Auth Routes
router.get('/check-auth', authenticated, (req, res) => {
    res.json({success: true, user: req.user});
});
router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticated, logout );

// User routes
router.get('/get-user-info', authenticated, getUser);
router.get('/search-user', authenticated, searchUsers);
router.post('/edit-user-profile', authenticated, upload.single('image'), editUser);

// Posts Routes
router.post('/create-post', authenticated, upload.single('image'), createPost)
router.get('/get-all-posts', authenticated, getAllPosts);
router.get('/get-users-posts', authenticated, getUsersPosts);
router.delete('/delete-post/:id', authenticated, deletePost);
router.get('/get-post/:id', authenticated, getPost);
router.get('/get-followed-posts', authenticated, getFollwedPosts);

// Comment Routes 
router.post('/create-comment', authenticated, createComment);
router.get('/get-post-comments/:id', authenticated, getPostComments);
router.delete('/delete-comment/:id', authenticated, deleteComment);

// Follow routes
router.post('/users/:id/follow', authenticated, addFollow);

// Like Routes
router.post('/like-post/:id', authenticated, insertLike);

// Messages Routes
router.post('/create-message', authenticated, createMessage);
router.get('/get-messages/:receiver_id', authenticated, getMessages);
router.get('/get-conversations', authenticated, getConversations);
router.delete('/delete-message/:id', authenticated, deleteMessage);

module.exports = router;