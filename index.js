const express = require('express');
const app = express();
const expressJwt = require('express-jwt');

const cors = require('cors');
require('dotenv').config();

const userRouter = require('./routers/users');
const vacationsRouter = require('./routers/vacation');
const authRouter = require('./routers/auth');

const port = process.env.PORT;


app.use(cors());
app.use(express.json());
app.use(expressJwt({ secret: process.env.SECRET }).unless({ path: ['/login', '/register'] }));

app.use('/users', userRouter);
app.use('/vacations', vacationsRouter);
app.use('/auth', authRouter)

app.use('*', (req, res) => {
    res.status(404).send('page not found');
});

app.listen(port, () => {
    console.log(`server is up: ${port}`);
});

