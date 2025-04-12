    const jwt = require('jsonwebtoken');
    const User = require('../model/UserModel');

    const JWT_SECRET = process.env.JWT_SECRET || 'my_secret_key';
        
    /**
     * Middleware to verify JWT token
     */
    const verifyToken = (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(403).json({ message: 'No token provided or incorrect format' });
        }

        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded; // Attach user info to request
            next();
        } catch (err) {
            console.error('JWT Verification Error:', err.message);
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
    };

    /**
     * Role-based access control middleware
     */
    const checkRole = (roles) => {
        return (req, res, next) => {
            if (!req.user) {
                return res.status(401).json({ message: 'Unauthorized - No user data' });
            }

            if (!roles.includes(req.user.role)) {
                return res.status(403).json({ 
                    message: 'Access denied. Insufficient permissions.'   
                });
            }

            next();
        };
    };

    module.exports = {
        verifyToken,
        checkRole
    };
