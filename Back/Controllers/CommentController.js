const db = require('../Config/db.js');

const createComment = (req, res) => {
    const { text, postId } = req.body;
    const userId = req.user.id;
    
    const sql = 'INSERT INTO comments (text, user_id, post_id) VALUES (?, ?, ?)';
    db.query(sql, [text, userId, postId], (err, results) => {
        if (err) {
            return res.status(500).json({success: false, message: 'Erreur lors de l\'ajout du commentaire', err});
        }
        return res.status(201).json({success: true, message: 'Commentaires ajoutés, un succès', results});
    });
}

const getPostComments = (req, res) => {
    const postId = req.params.id;
    const sql = `
                    SELECT comments.id, comments.text, comments.user_id, users.pseudo, users.profile_picture_url 
                    FROM comments
                    JOIN users ON comments.user_id = users.id
                    WHERE comments.post_id = ? 
                `;
    db.query(sql, [postId], (err, results) => {
        if (err) {
            return res.status(500).json({success: false, message: 'Erreur lors de la récupération des commentaires', err});
        };
        return res.status(200).json({success: true, message: 'Commentaires récupérés avec succès', results})
    });
}

const deleteComment = (req, res) => {
    const userId = req.user.id;
    const commentId = req.params.id;
    const sql = `
                DELETE FROM comments WHERE id = ? AND user_id = ?
                `;
    db.query(sql, [commentId, userId], (err, results) => {
        if (err) {
            return res.status(500).json({success: false, message: 'Erreur lors de la suppression du commentaire', err});
        }
        return res.status(200).json({success: true, message: 'Commentaire supprimé avec succés', results});
    });
};

module.exports = { createComment, getPostComments, deleteComment };