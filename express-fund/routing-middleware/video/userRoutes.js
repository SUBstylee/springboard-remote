const { Router } = require('express');
const router = new Router();

const USERS = [
    { id: 1, username: 'billybob' },
    { id: 2, username: 'santaclaus' },
]

router.get('/', (req, res) => {
    return res.json({ users: USERS });
});

router.get('/:id', (req, res) => {
    const user = USERS.find(u => u.id === +req.params.id);
    return res.json({ user });
});

module.exports = router;