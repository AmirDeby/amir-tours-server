const db = require('../sql');
const router = require('express').Router();
const { getUsers } = require('../queries')


router.get('/', async (req, res) => {

    const [users] = await db.execute(getUsers());


    res.send(users);
});

router.get('/me', async (req, res) => {

    
    
    res.send(req.user)


})

module.exports = router;