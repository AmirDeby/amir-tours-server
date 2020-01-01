const db = require('../sql');
const router = require('express').Router();

router.get('/', (req, res) => {
    // we get req.user from express-jwt middleware
    const { username } = req.user;
    console.log(username);
    res.send("sending all products: ['soccerball', 'tennis shoe']");
});

router.get('/:id', () => {
    res.send('sending a specific product: soccerball');
});

module.exports = router;