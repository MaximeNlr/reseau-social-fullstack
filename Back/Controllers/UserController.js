const db = require('../Config/db.js');

const getUsersPosts = (req, res) => {
    const userId = req.user.id;
    const sql = `
                    SELECT posts.id, posts.subject, posts.image_url, posts.uploaded_at, users.pseudo, users.profile_picture_url
                    FROM posts
                    JOIN users ON posts.user_id = users.id
                    WHERE posts.user_id = ?
                    ORDER BY posts.uploaded_at DESC
                `;
    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({success: false, message: `Erreur lors de la récupération des posts de l'utilisateur`});
        }
        return res.status(201).json({success: true, message: `Posts de l'utilisateur récupérés avec succès`, results});
    });
};

const getUser = (req, res) => {
    const userId = req.user.id;
    const sql = `SELECT users.id, users.pseudo, users.profile_picture_url FROM users WHERE users.id = ?`;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({success: false, message: 'Erreur lors de la récuperation des infos de l\'utilisateur'});
        }
        return res.status(200).json({success: true, message: 'Infos utilisateur récupérés avec succès', results});
    });
;}

const editUser = (req,res) => {
    const userId = req.user.id;
    const profilePicture = req.file ? `/uploads/${req.file.filename}` : null;
    
    const sql = 'UPDATE users SET profile_picture_url = ? WHERE id = ?';
    db.query(sql, [profilePicture ,userId], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({success: false, message: 'Erreur lors de l\'ajout de la photo de profil'})
        }
        return res.status(201).json({success: true, message: 'Photo de profil ajoutée avec succés'});
    });
};

const searchUsers = (req, res) => {
    const searchQuery = req.query.q;

    const sql= `SELECT id, pseudo, profile_picture_url FROM users WHERE pseudo LIKE ? LIMIT 10`
    const values = [`%${searchQuery}%`];

    db.query(sql, [values], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({success: false, message: 'Erreur lors de la récuperation des utilisateuts via la barre de recherche'});
        }
        return res.status(200).json({success: true, message: 'Utilisateurs récupérés avec succés', results});
    });
};
module.exports = { getUsersPosts, editUser, getUser, searchUsers };