const express = require('express');
const helmet = require('helmet');
const sessions = require('express-session');
const KnexSessionStore = require('connect-session-knex')(sessions);
const dbConnection = require('../data/db-config');
const cors = require('cors');

const usersRouter = require('../users/user-router');
const authRouter = require('../auth/auth-router');
const restrictedRouter = require('../restricted/restricted-router');

const server = express();

const sessionConfig = {
    name: 'validatedUser',
    secret: process.env.SESSION_SECRET || 'super secret code',
    saveUninitialized: true,
    resave: false,

    store: new KnexSessionStore({
        knex: dbConnection,
        createtable: true,
        clearInterval: 1000 * 60 * 10,
        sidfieldname: 'sid',
        tablename: 'sessions'
    }),

    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: false,
        httpOnly: true
    }
};


// server.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(sessions(sessionConfig));

server.use('/api/auth', authRouter)
server.use('/api/users', usersRouter);
server.use('/api/restricted', restrictedRouter);

module.exports = server;