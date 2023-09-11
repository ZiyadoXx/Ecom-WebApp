const jwt = require("jsonwebtoken");

const AuthMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const secret = process.env.JWT_SECRET;
    
    jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                // Token has expired
                return res.status(401).json({ error: 'Token expired' });
            } else {
                // Other verification error
                return res.status(401).json({ error: 'Invalid auth token' });
            }
        }
        
        if (!decodedToken) {
            return res.status(401).json({ error: 'Invalid auth token' });
        }

        req.user = decodedToken;
        next();
    });
}

module.exports = AuthMiddleware;
