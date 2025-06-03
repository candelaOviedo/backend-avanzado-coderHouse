const { Router } = require('express');
const passport = require('passport');
const { authorizeRoles } = require('../middlewares/authorization.middleware');
const {
  getCart,
  addProductToCart,
  purchaseCart,
} = require('../controllers/carts.controller');

const router = Router();


router.get('/:cid', getCart);


router.post(
  '/:cid/products/:pid',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles(['user']),
  addProductToCart
);

router.post(
  '/:cid/purchase',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles(['user']),
  purchaseCart
);

module.exports = router;