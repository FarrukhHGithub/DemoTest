import cors from "cors";
import session from "express-session";
import passport from "passport";
import passportGoogleOAuth2 from 'passport-google-oauth2';
import express from 'express';

const app = express();

const setupMiddleware = () => {
    // Build allowed origin list from CORS_ORIGINS env (comma-separated) + local dev
    const envOrigins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',').map(o => o.trim()) : [];
    app.use(cors({
        origin: [...envOrigins, 'http://localhost:5173', 'http://localhost:5174'].filter(Boolean),
        credentials: true
    }));
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.json());
};

export default setupMiddleware;
