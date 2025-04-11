const db = require('../Config/db.js');
const path = require('path');

const createMessage = (req, res) => {
    const { text, receiver_id } = req.body;
    const user_id = req.user.id;
    
    const sql = 'INSERT INTO messages (text, sender_id, receiver_id) VALUES (?, ?, ?)';
    db.query(sql, [text, user_id, receiver_id], (err, results) => {
        if (err) {
            return res.status(500).json({success: false, message: 'Erreur lors de l\'envoie du message', err});
        }
        return res.status(201).json({success: true, message: 'Message envoyé avec succés', results});
    });
}

const getMessages = (req, res) => {
    const { receiver_id } = req.params;
    const user_id = req.user.id;
    const sql = `
                SELECT messages.id, messages.text, messages.sender_id, messages.receiver_id
                FROM messages
                WHERE (messages.sender_id = ? AND messages.receiver_id = ?)
                   OR (messages.sender_id = ? AND messages.receiver_id = ?)
                ORDER BY messages.created_at ASC;
                `;
    db.query(sql, [user_id, receiver_id, receiver_id, user_id], (err, results) => {
        if (err) {
            return res.status(500).json({success: false, message: 'Erreur lors de la récuperation des messages', err});
        }
        return res.status(200).json({success: true, message: 'Messages récuperés avec succés', results});
    });
};

const getConversations = (req, res) => {
    const user_id = req.user.id;
    const sql = `
                SELECT 
                users.id AS user_id, 
                users.pseudo, 
                users.profile_picture_url,
                latest_messages.text AS last_message
                FROM (
                SELECT 
                    CASE 
                        WHEN sender_id = ? THEN receiver_id
                        ELSE sender_id
                    END AS user_id,
                    MAX(id) AS last_message_id
                FROM messages
                WHERE sender_id = ? OR receiver_id = ?
                GROUP BY user_id
                ) latest
                JOIN messages latest_messages ON latest_messages.id = latest.last_message_id
                JOIN users ON users.id = latest.user_id;
                `;
    db.query(sql, [user_id, user_id, user_id, user_id], (err, results) => {
        if (err) {
            return res.status(500).json({success: false, message: 'Erreur lors de la récuperation des conversations', err});
        }
        return res.status(200).json({success: true, message: 'Conversations récupérés avec succès', results});
    });
};

const getUserConversation = (req, res) => {
    const user_id = req.user.id;
    const receiver_id = req.params.id;

    const sql = `
                SELECT messages.id, messages.text, messages.sender_id, messages.receiver_id
                FROM messages
                WHERE (messages.sender_id = ? AND messages.receiver_id = ?)
                OR (messages.sender_id = ? AND messages.receiver_id = ?)
                ORDER BY created_at DESC;
                `;
    db.query(sql, [user_id, receiver_id, receiver_id, user_id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({success: false, message: 'Erreurs lors de la récuperation de la conversation avec l\'utilisateur selectionné'})
        }
        return res.status(500).json({success: true, messages: 'Conversation avec l\'utilisateur selectionné récupérés avec succès', results})
    });
}   

module.exports = { createMessage, getMessages, getConversations, getUserConversation };