const express = require('express');
const passport = require('passport');
const extractToken = require('../middlewares/jwtExtractor')
const { registerUser, loginUser, getCurrentUser } = require('../controllers/users.controller');

const router = express.Router();

// Registro
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Ruta protegida para obtener el usuario actual
router.get('/current', passport.authenticate('jwt', { session: false }), getCurrentUser);

// Ruta para obtener la información del usuario autenticado
router.get('/current', extractToken, getCurrentUser)

module.exports = router;
