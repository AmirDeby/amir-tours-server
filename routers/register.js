const db = require('../sql');
const router = require('express').Router();
const Joi = require('@hapi/joi');
const { registration, checkIfUserExists } = require('../queries');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const { userName, firstName, lastName, password } = req.body;

    const userSchema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        password: Joi.string().min(3).max(15).required(),
        userName: Joi.string().min(2).max(15).required(),
    });

    const validation = userSchema.validate({ firstName, lastName, password, userName });
    if (validation.error) {
        res.status(400).send(validation.error);
        return
    }

    const [result] = await db.execute(checkIfUserExists(), [userName]);
    const [userExist] = result;
    if (userExist) {
        res.status(400).json({ message: "user exists" });
        return;
    }

    const [response] = await db.execute(registration(), [firstName, lastName, password, userName]);
    // print result and see which field holds the new id
    console.log(response);
    
    
    const userId = response.insertId;
    jwt.sign({ userName, userId }, process.env.SECRET , async (err, token) => {
        if (err) {
            console.error(err);
            res.status(500).send('error creating user');
            return;
        }

        res.json({ message: `${userName}, Welcome to AmirTours`, token });
    })
});


module.exports = router