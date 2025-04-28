const User = require('../models/User.model');
const { createHash, isValidPassword } = require('../utils/hash');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;

        if (!first_name || !last_name || !email || !age || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const hashedPassword = createHash(password);

        const newUser = new User({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: 'Usuario registrado con éxito!' });

    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario', error });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        const isPasswordValid = isValidPassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, { httpOnly: true }).json({ message: 'Login exitoso', token });

    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
};

module.exports = {
    register,
    login
};