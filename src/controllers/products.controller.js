exports.getProducts = (req, res) => {
  res.send('Todos los productos');
};

exports.getProductById = (req, res) => {
  res.send(`Producto con ID ${req.params.pid}`);
};

exports.createProduct = (req, res) => {
  res.send('Producto creado');
};

exports.updateProduct = (req, res) => {
  res.send(`Producto con ID ${req.params.pid} actualizado`);
};

exports.deleteProduct = (req, res) => {
  res.send(`Producto con ID ${req.params.pid} eliminado`);
};