import jwt from 'jsonwebtoken'
import { ENV } from '../config/env.js';

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, ENV.SESSION_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); 
        req.user = user;
        next();
    });
};

export default authenticateToken;
