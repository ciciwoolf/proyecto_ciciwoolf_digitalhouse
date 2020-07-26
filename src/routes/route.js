const express = require('express');
const router = express.Router();
const path = require('path');
const _ = require("lodash");


//controller
const controller = require(path.resolve(__dirname, '..', 'controllers', 'controller'));



router.get('/', controller.home); //va a la pagina index.ejs
router.get('/products', controller.list); //Sprint 3 Ruta 1
router.get('/administrar/create', controller.create); //Sprint 3 Ruta 2
router.get('/detail/:id', controller.show); //Sprint 3 Ruta 3
router.post('/administrar/create', controller.save);  //Sprint 3 Ruta 4
router.post('/administrar/create', upload.any('imagen'), controller.save); //no estoy segura que sea correcto
router.get('/administrar/edit/:id', controller.edit); //Sprint 3 Ruta 5
router.put('/administrar/detail/:id', controller.update); //Sprint 3 Ruta 6
router.delete('/administrar/delete/:id', controller.eliminate); //Sprint 3 Ruta 7



module.exports = router;