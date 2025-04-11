const db = require('../Config/db.js');
const path = require('path');

const createPost = (req, res) => {
    const { subject } = req.body;
    const user_id = req.user.id;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    const sql = 'INSERT INTO posts (subject, image_url, user_id) VALUES (?, ?, ?)';
    db.query(sql, [subject, image_url, user_id], (err, results) => {
        if (err) {
            return res.status(500).json({success: false, message: 'Erreur lors de la création du post', err});  
        }
        return res.status(201).json({success: true, message: 'Post créer avec succés'})
    });
};

const getAllPosts = (req, res) => {
    const sql = `
                    SELECT posts.id, posts.likes, posts.subject, posts.image_url, posts.uploaded_at, posts.user_id AS user_id, users.pseudo, users.profile_picture_url,
                    COUNT (comments.id) AS comment_count
                    FROM posts
                    JOIN users ON posts.user_id = users.id
                    LEFT JOIN comments ON comments.post_id = posts.id
                    GROUP BY posts.id
                    ORDER BY posts.uploaded_at DESC
                `;
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            
            return res.status(500).json({success: false, message: 'Erreur lors de la récuperation des posts', err});
        }
        return res.status(201).json({sucess: true, message: 'Posts récupéré avec succés', results});
    });
}

const getPost = (req, res) => {
    const postId = req.params.id;
    
    const sql = `
                    SELECT posts.id, posts.subject, posts.likes, posts.image_url, posts.uploaded_at, 
                           posts.user_id AS user_id, users.pseudo, users.profile_picture_url
                    FROM posts
                    JOIN users ON posts.user_id = users.id
                    WHERE posts.id = ?
                `;
                db.query(sql, [postId], (err, results) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({success: false, message: 'Erreur lors de la récuperation du post'});
                    };
                    return res.status(200).json({success: true, message: 'Post récupéré avec succés', results});
                });
}

const deletePost = (req, res) => {
    const postId = req.params.id;
    const userId = req.user.id;
    console.log("ID du post à supprimer :", postId);
    console.log("ID de l'utilisateur connecté :", userId);
    const sql = `DELETE FROM posts WHERE id = ? AND user_id = ?`;
    db.query(sql, [postId, userId], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({success: false, message: 'Erreur lors de la suppression du post'});
        }
        return res.status(200).json({success: true, message: 'Post supprimé avec succés', results})
    });

}

module.exports = { createPost, getAllPosts, deletePost, getPost };
