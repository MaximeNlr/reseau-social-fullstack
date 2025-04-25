const bcrypt = require("bcrypt");
const db = require('../Config/db.js');
const jwt = require("jsonwebtoken");
require('dotenv').config();

const register = (req, res) => {
    const {name, firstname, birthday, pseudo, email, password} = req.body;
    
    db.query('SELECT * FROM users WHERE pseudo = ? OR email = ?', [pseudo, email], (err, results) => {
        if (err) {
            return res.status(500).json({success: false, message: 'Erreur serveur'});
        }
        if (results.length > 0) {
            return res.status(400).json({success: false, message: 'Pseudo ou Email déjà utilisé'});
        }
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return res.status(500).json({success: false, message: 'Erreur lors du hachage du mot de passe'});
            }
            const query = 'INSERT INTO users (name, firstname, birthday, pseudo, email, password) VALUES (?, ?, ?, ?, ?, ?)';
            db.query(query, [name, firstname, birthday, pseudo, email, hashedPassword], (err, results) => {
                if (err) {
                    return res.status(500).json({success: false, message: 'Erreur lors de l\'inscription'});
                }
                return res.status(201).json({success: true, message: 'Utilisateur inscrit avec succès'});
            });
        });
    });
};

const login = (req, res) => {
    const {email, password} = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).json({success: false, message: 'Erreur serveur'});
        }
        if (results.length == 0)
        {
            return res.status(400).json({success: false, message: 'Email ou mot de passe incorrect'})
        }
        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({success: false, message: 'Erreur lors de la vérification du mot de passe'});
            }
            if (!isMatch) {
                return res.status(400).json({success: false, message: 'Mot de passe incorrect !'});
            }
            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: "Strict",
                maxAge: 3600 * 1000
            });
            res.status(200).json({success: true, token, user: {id: user.id, pseudo: user.pseudo, pp :user.profile_picture_url}});
        })
    })
}

const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false,
        sameSite: 'Strict',
        path: '/'
    }); 
    res.status(200).json({ success: true, message: "Déconnexion réussie !"});   
}

module.exports = { register, login, logout };
