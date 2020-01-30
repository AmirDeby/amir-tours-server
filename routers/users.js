const db = require('../sql');
const router = require('express').Router();
const { getUsers } = require('../queries')


router.get('/me', async (req, res) => {

    
    res.send(req.user)


})

module.exports = router;