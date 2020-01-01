const db = require('../sql');
const router = require('express').Router();

const users = [{ id: '5', name: 'itzik' }, { id: '7', name: 'shlomo' }]

router.get('/', (req, res) => {
    // e.g. GET /users/
    res.send(users);
});

router.get('/search', (req, res) => {
    // e.g. GET /users/search?name=s
    const { name } = req.query;

    const filteredUsers = users.filter(user => user.name.includes(name));
    res.send(filteredUsers)
})

router.get('/:id', (req, res) => {
    // e.g. GET /users/7
    const { id } = req.params;
    const user = users.find(user => user.id === id);
    res.send(user);
});

router.post('/', (req, res) => {
    // e.g. POST /users with body {"name": "gidi"}
    const { name } = req.body;
    const user = {
        name,
        id: Date.now().toString(),
    };
    users.push(user);
    res.send(user);
});

module.exports = router;