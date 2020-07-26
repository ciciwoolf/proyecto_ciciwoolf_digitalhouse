const express = require('express');
const router = express.Router();
const path = require('path');
const _ = require("lodash");

/* const multer = require('multer');/*Middleware: Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.
NOTE: Multer will not process any form which is not multipart (multipart/form-data). 


const mantenimiento = require(path.resolve(__dirname,'../middlewares/mantenimiento'));//maintenance middleware

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '..','..','public','images','relojes'));
    },
    filename: function (req, file, cb) {
      cb(null, 'prod-'+Date.now() + path.extname(file.originalname)); //how to do prod +number?  prod1.png
    }
  });
  
  const upload = multer({ storage });   */

//controller
const controller = require(path.resolve(__dirname, '..', 'controllers', 'controller'));

//Dani's Code for New Routes
//router.get('/administrar', mantenimiento, controllersAdmin.index);
//router.get('/administrar/search_results', controllersAdmin.search);

router.get('/test', controller.test);
router.get('/', controller.home); //va a la pagina index.ejs
router.get('/products', controller.list); //Sprint 3 Ruta 1
router.get('/administrar/create', controller.create); //Sprint 3 Ruta 2
router.get('/administrar/detail/:id', controller.show); //Sprint 3 Ruta 3
router.post('/administrar/create', controller.save);  //Sprint 3 Ruta 4
router.post('/administrar/create', upload.any('imagen'), controller.save); //no estoy segura que sea correcto
router.get('/administrar/edit/:id', controller.edit); //Sprint 3 Ruta 5
router.put('/administrar/detail/:id', controller.update); //Sprint 3 Ruta 6
router.delete('/administrar/delete/:id', controller.destroy); //Sprint 3 Ruta 7



router.get('/administrar/delete/:id', controllersAdmin.destroy);
router.get('/administrar/edit/:id', controllersAdmin.edit);
router.put('/administrar/edit/:id', upload.single('imagen'), controllersAdmin.update);

module.exports = router;