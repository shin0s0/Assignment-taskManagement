const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];

        try {
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded Token:', decoded);
            req.user = decoded.userId;
            next();
        } catch (error) {
            return res.status(401).json({ error: 'Token is not valid' });
        }
    } else {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }
};
