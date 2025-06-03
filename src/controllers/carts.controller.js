const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { createTicket } = require('../services/ticket.service');

exports.purchaseCart = async (req, res) => {
  const cartId = req.params.cid;
  const userEmail = req.user.email;

  try {
    const cart = await Cart.findById(cartId).populate('products.product');
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

    let amount = 0;
    const purchasedProducts = [];
    const notPurchased = [];

    for (const item of cart.products) {
      const product = item.product;
      const quantity = item.quantity;

      if (product.stock >= quantity) {
        product.stock -= quantity;
        await product.save();
        amount += product.price * quantity;
        purchasedProducts.push(item);
      } else {
        notPurchased.push(product._id);
      }
    }

    // Actualizar carrito con productos no comprados
    cart.products = cart.products.filter(item =>
      notPurchased.some(id => id.toString() === item.product._id.toString())
    );
    await cart.save();

    if (purchasedProducts.length > 0) {
      const ticket = await createTicket({ amount, purchaser: userEmail });

      return res.json({
        message: notPurchased.length === 0
          ? 'Compra completada exitosamente'
          : 'Compra procesada parcialmente',
        ticket,
        sinStock: notPurchased
      });
    }

    return res.json({
      message: 'No se pudo procesar la compra, sin stock disponible',
      sinStock: notPurchased
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al procesar la compra' });
  }
};
