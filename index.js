const express = require('express');
const app = express();
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

const Joi = require('joi');
const cors = require('cors');
require('dotenv').config();

const userRouter = require('./routers/users');
const vacationsRouter = require('./routers/vacation');
const registerRouter = require('./routers/register');
const loginRouter = require('./routers/login');


const port = process.env.PORT;


app.use(cors());
app.use(express.json());
app.use(expressJwt({ secret: process.env.SECRET }).unless({ path: ['/login', '/register'] }));

// app.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     /*
//     const [users] = db.query('SELECT * FROM Users WHERE username = ? AND password = ?', [username, password]);
//      if (!users[0]) {
//         res.status(401).send("username and password don't match");
//         return;
//      }
//     */
//     const token = jwt.sign({ username }, JWT_SECRET);
//     res.send({ token });
// });


app.use('/users', userRouter);
app.use('/vacations', vacationsRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);


app.use('*', (req, res) => {
    res.status(404).send('page not found');
});

app.listen(port, () => {
    console.log(`server is up: ${port}`);
});

