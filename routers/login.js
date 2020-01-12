const db = require('../sql');
const router = require('express').Router();
const { login } = require('../queries');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const { userName, password } = req.body;

    const loginSchema = Joi.object({
        userName: Joi.string().required(),
        password:Joi.string().required()
    })

    const validation = loginSchema.validate({ userName, password });
    if (validation.error) {
        res.status(400).send(validation.error);
        return
    }

    const [result] = await db.execute(login(), [userName, password]);
    const [user] = result;
    if (!user) {
        res.status(401).send('incorrect user name or password')
        return;
    }
    jwt.sign({ userName }, process.env.SECRET, (err, token) => {
        if (err) {
            console.error(err);
            res.status(500).send('error creating user');
            return;
        }

        res.json({ message: 'Welcome to AmirTours', token });
    });
});


module.exports = router;