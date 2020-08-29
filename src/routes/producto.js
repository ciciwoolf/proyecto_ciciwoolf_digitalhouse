const express = require('express');
const router = express.Router();
const path = require('path');

const controllersProducto = require(path.resolve(__dirname, '..', 'controllers', 'controllersProducto'));

router.get('/productos', controllersProducto.index);
router.get('/productos/categories', controllersProducto.categories);
router.get('/productos/add/:id', controllersProducto.add);
router.get('/productos/productDetail/:id', controllersProducto.show);

module.exports = router;