const jwt = require('jsonwebtoken');

const authenticated = (req, res, next) => {
    const token = req.cookies.token;
    if (!token)
    {
        return res.status(401).json({success: false, message: 'Non authentifié'});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({success: false, message: 'Token invalide'});
    }
};

module.exports = authenticated;