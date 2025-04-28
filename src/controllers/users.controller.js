const jwt = require('jsonwebtoken');
const User = require('../models/User.model')
require('dotenv').config();
const bcrypt = require('bcryptjs');


// Registrar usuario

const registerUser = async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;

        // Verifica si hay algún campo faltante
        if (!first_name || !last_name || !email || !age || !password) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario con la contraseña hasheada
        const user = new User({ first_name, last_name, email, age, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'Usuario registrado exitosamente', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el registro', error });
    }
};

// Login de usuario
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Crear un token JWT
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET, // Usar variable de entorno para la clave secreta
            { expiresIn: '1h' } // El token expira en 1 hora
        );

        res.json({ message: 'Login exitoso', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Obtener datos del usuario actual
const getCurrentUser = (req, res) => {
    res.json({
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
        role: req.user.role,
    });
};

module.exports = { registerUser, loginUser, getCurrentUser };
