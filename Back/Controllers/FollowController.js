const db = require('../Config/db.js');

const addFollow = (req, res) => {
    const userId = req.user.id;
    const followedUserId = req.params.id;

    const sql = `INSERT INTO followers (follower_user_id, following_user_id) VALUES (?, ?)`;

    db.query(sql, [userId, followedUserId], (err, results) => {
        if (err) {
            return res.status(500).json({success: false, message: 'Erreur lors du follow', err})
        };
        return res.status(200).json({success: true, message: 'Follow effectué avec succés', results});
    });
}

module.exports = { addFollow };