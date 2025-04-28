const jwt = require('jsonwebtoken');

const extractToken = (req, res, next) => {
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Asegúrate de usar tu JWT_SECRET
        req.user = decoded;  // Añadimos la información del usuario al objeto req
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token no válido' });
    }
};

module.exports = extractToken;
