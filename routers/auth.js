const db = require('../sql');
const router = require('express').Router();
const { registration, checkIfUserExists, login } = require('../queries');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const loginValidation = require('../validation/loginValidation');
const registerValidation = require('../validation/registerValidation');


router.post('/login', loginValidation, async (req, res) => {
    
    const { userName, password } = req.body;

    const [result] = await db.execute(login(), [userName, password]);

    const [user] = result;

    if (!user) {
        res.status(401).send('incorrect user name or password')
        return;
    }

    createAndReturnToken(user.userName, user.id, res);
});


router.post('/register', registerValidation, async (req, res) => {
    const { userName, firstName, lastName, password } = req.body;
    console.log(req.body);

    const [result] = await db.execute(checkIfUserExists(), [userName]);
    const [userExist] = result;
    if (userExist) {
        res.status(400).json({ message: "user exists" });
        return;
    }

    const [response] = await db.execute(registration(), [firstName, lastName, password, userName]);
    const userId = response.insertId;
    createAndReturnToken(userName, userId, res);
});

function createAndReturnToken(userName, userId, res) {
    jwt.sign({ userName, userId }, process.env.SECRET, async (err, token) => {
        if (err) {
            console.error(err);
            res.status(500).send('error creating user');
            return;
        }
        res.json({ message: `${userName}, Welcome to AmirTours`, token });
    });
}


module.exports = router;