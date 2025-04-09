const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../Controllers/AuthController');
const { createPost, getAllPosts, deletePost, getPost } = require('../Controllers/PostController');
const { getUsersPosts, editUser, getUser, searchUsers } = require('../Controllers/UserController');
const { createComment, getPostComments } = require('../Controllers/CommentController');
const { createMessage, getMessages, getConversations, getUserConversation } = require('../Controllers/MessageController');
const authenticated = require('../Middleware/Authenticated');
const upload = require('../Middleware/upload');

router.get('/check-auth', authenticated, (req, res) => {
    res.json({success: true, user: req.user});
});
router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticated, logout );

router.post('/create-post', authenticated, upload.single('image'), createPost)
router.get('/get-all-posts', authenticated, getAllPosts);
router.get('/get-users-posts', authenticated, getUsersPosts);
router.get('/get-user-info', authenticated, getUser);
router.delete('/delete-post/:id', authenticated, deletePost);
router.post('/edit-user-profile', authenticated, upload.single('image'), editUser);
router.get('/get-post/:id', authenticated, getPost);
router.post('/create-comment', authenticated, createComment);
router.get('/get-post-comments:id', authenticated, getPostComments);
router.get('/search-user', authenticated, searchUsers);
router.post('/create-message', authenticated, createMessage);
router.get('/get-messages:receiver_id', authenticated, getMessages);
router.get('/get-conversations', authenticated, getConversations);
router.get('/get-user-conversation:receiver_id', authenticated, getUserConversation);

module.exports = router;