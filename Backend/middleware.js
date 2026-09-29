import cors from "cors";
import session from "express-session";
import passport from "passport";
import passportGoogleOAuth2 from 'passport-google-oauth2';
import express from 'express';
import MongoStore from 'connect-mongo';
import { ENV } from './config/env.js';

const app = express();

const setupMiddleware = () => {
    // Build allowed origin list from CORS_ORIGINS env (comma-separated) + dynamic origins
    const allowedOrigins = [
        ENV.CLIENT_URL,
        ENV.DASHBOARD_URL,
    ];
    if (ENV.NODE_ENV !== 'production') {
        allowedOrigins.push('http://localhost:5173', 'http://localhost:5174');
    }
    app.use(cors({
        origin: allowedOrigins.filter(Boolean),
        credentials: true
    }));

    app.use(session({
        secret: ENV.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: ENV.MONGODB_URI,
            collectionName: 'sessions'
        }),
        cookie: {
            secure: ENV.NODE_ENV === 'production',
            sameSite: ENV.NODE_ENV === 'production' ? 'none' : 'lax'
        }
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.json());
};

export default setupMiddleware;
