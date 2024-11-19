import jwt from 'jsonwebtoken';
import {getUsers} from './database.js';
import * as settings from './config.json' assert {type: 'json'};

const limiterSettings = settings.default.rateLimiterSettings;

const sum = (a, b) => {
    return a + b;
}

const getLimiterWindow = () => {
    const window = Math.round(Date.now() / limiterSettings.windowSizeinMillis);
    return window;
}

// predicate function: true iff the number of requests have exeeded
// for this specific user within the limiting window

const rateLimiter = (user, req, res) => {
    const window = getLimiterWindow();
    // is this user moving to the next window?
    if (user.rateLimiting.window < window){
        user.rateLimiting.window = window;
        user.rateLimiting.requestCounter = 1;
        res.set('X-RateLimit-Remaining', limiterSettings.limit - 1)
    } else { // we are at the same window that we visited last time
        if (user.rateLimiting.requestCounter >= limiterSettings.limit) {
            res.set('X-RateLimit-Remaining', 0);
            res.status(429).end();
            return true;
        } else {
            user.rateLimiting.requestCounter++
            res.set('X-RateLimit-Remaining', limiterSettings.limit - user.rateLimiting.requestCounter);
        }
    }

    return false
}

const verifyToken = (req, res, next) => {
    const bearer_token = req.header('Authorization');
    if (bearer_token && bearer_token.toLowerCase().startsWith('bearer ')){
        const token = bearer_token.substring(7);
        try {
        const decodedToken = jwt.verify(token, 'my_secret_key');
        const now = Date.now()/1000;
        const isValid = (decodedToken.exp-now) >= 0 ? true : false;
        if(isValid){
            let users = getUsers().find(a => (a.username === decodedToken.username)&&(a.token === token));
            if(users != null){
                if (!rateLimiter(users, req, res))
                    next()
            } else {
                res.status(401).json({'error': 'Unauthorized'})
            }}} catch (err){
                res.status(401).json({'error': 'Invalid Token'})
            }
        } else
            res.status(401).json({'error': 'Invalid Token'})
    }
    export {sum, verifyToken}