const { Router } = require('express');
const passport = require('passport');
const { authorizeRoles } = require('../middlewares/authorization.middleware');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products.controller');

const router = Router();


// Obtener todos los productos
router.get('/', getProducts);

// Obtener producto por ID
router.get('/:pid', getProductById);

// Crear nuevo producto (solo admin)
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles(['admin']),
  createProduct
);

// Actualizar producto (solo admin)
router.put(
  '/:pid',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles(['admin']),
  updateProduct
);

// Eliminar producto (solo admin)
router.delete(
  '/:pid',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles(['admin']),
  deleteProduct
);

module.exports = router;