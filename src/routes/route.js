const express = require('express');
const router = express.Router();
const path = require('path');
const _ = require("lodash");
const multer = require('multer');/*Middleware: Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.

NOTE: Multer will not process any form which is not multipart (multipart/form-data). */


const mantenimiento = require(path.resolve(__dirname,'../middlewares/mantenimiento'));//maintenance middleware

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '..','..','public','images','relojes'));
    },
    filename: function (req, file, cb) {
      cb(null, 'reloj-'+Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage });
  
  const controllersAdmin = require(path.resolve(__dirname, '..', 'controllers', 'controllersAdmin'));
  
  router.get('/administrar', mantenimiento, controllersAdmin.index);

//controller
const controller = require(path.resolve(__dirname, '..', 'controllers', 'controller'));



router.get('/', controller.home); //va a la pagina index.ejs
//router.get('/controller', controller.index); //Va a la pagina de Admin
router.get('/', controller.list); //Sprint 3 Ruta 1
router.get('/administrar/create', controller.create); //Sprint 3 Ruta 2
router.get('/detail/:id', controller.show); //Sprint 3 Ruta 3
router.post('/administrar/create', controller.save);  //Sprint 3 Ruta 4
router.post('/administrar/create', upload.any('imagen'), controller.save); //no estoy segura que sea correcto
router.get('/administrar/edit/:id', controller.edit); //Sprint 3 Ruta 5
router.put('/administrar/detail/:id', controller.update); //Sprint 3 Ruta 6
router.delete('/administrar/delete/:id', controller.eliminate); //Sprint 3 Ruta 7



module.exports = router;