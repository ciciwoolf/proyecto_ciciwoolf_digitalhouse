const express = require('express');
const router = express.Router();
const path = require('path');
const _ = require("lodash");

//controller
const controller = require(path.resolve(__dirname, '..', 'controllers', 'controller'));

//test
router.get('/controller', controller.test);

router.get('/', controller.home); //va a la pagina index.ejs
//router.get('/controller', controller.index); //Va a la pagina de Admin
router.get('/controller', controller.list); //Sprint 3 Ruta 1
router.get('/controller/create', controller.create); //Sprint 3 Ruta 2
router.get('/controller/detail/:id', controller.show); //Sprint 3 Ruta 3
router.post('/controller/create', controller.save);  //Sprint 3 Ruta 4
router.post('/controller/create', upload.any('imagen'), controller.save); //no estoy segura que sea correcto
router.get('/controller//edit/:id', controller.edit); //Sprint 3 Ruta 5
router.put('/controller/detail/:id', controller.update); //Sprint 3 Ruta 6
router.delete('/controller/delete/:id', controller.eliminate); //Sprint 3 Ruta 7



module.exports = router;