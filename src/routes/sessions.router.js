const { Router } = require('express');
const { register, login } = require('../controllers/sessions.controller');
const passport = require('passport');

const router = Router();

// Registro de usuario
router.post('/register', register);

// Login de usuario
router.post('/login', login);

// Current user (lo vamos a terminar después)
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ user: req.user });
});

module.exports = router;