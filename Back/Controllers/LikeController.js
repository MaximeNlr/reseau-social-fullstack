const db = require('../Config/db.js');

const insertLike = (req, res) => {
    const userId = req.user.id;
    const postId = req.params.id;
    console.log(userId, postId);
    const sql = `INSERT INTO post_likes (user_id, post_id) VALUES (?, ?)`;
    db.query(sql, [userId, postId], (err, results) => {
        if (err) {
            return res.status(500).json({success: false, message: 'Erreur lors de l\'envoie du like', err});
        };
        return res.status(201).json({success: true, message: 'like envoyé avec succés', results});
    });
};

module.exports = { insertLike };