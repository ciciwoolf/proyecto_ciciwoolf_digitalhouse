


var express = require('express');
var router = express.Router();
//Aquí llamo al middleware de autenticación. De esta forma aseguro que sólo el usuario logueado pueda ingresar al carrito de compra
const authMiddleware = require('../middlewares/auth');

//Aqui incorporo el middleware que se encarga de validar esto es para que tengan otra idea de como validar los datos que vienen del formulario
const validate = require('../middlewares/validate');


// ************ Controller Require ************
const controllersCart = require('../controllers/controllersCart');

router.post('/cart/addToCart', authMiddleware, validate.addCart, controllersCart.addCart);

router.get('/cart', authMiddleware, controllersCart.cart);

//router.post('/cart/buy', authMiddleware, controllersCart.shop);

//router.get('/cart/detailPurchase/:id', authMiddleware, controllersCart.buyDetail);

/*
router.post('/carrito/borrarElementoCarrito', authMiddleware, carritoController.deleteCart);
router.post('/carrito/compra', authMiddleware, carritoController.shop);
router.get('/carrito/historialCompra', authMiddleware, carritoController.history);
router.get('/carrito/detalleCompra/:id', authMiddleware, carritoController.buyDetail);

*/

module.exports = router;
