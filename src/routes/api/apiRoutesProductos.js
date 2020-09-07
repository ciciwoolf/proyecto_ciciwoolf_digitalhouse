const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');//Debemos requerir el middleware
const verifyRole = require(path.resolve(__dirname,'../../middlewares/verifyRole'));//Aquí dispongo lo referido al nombre del arhivo y a donde se va a guardar
const apiControllersProductos = require(path.resolve(__dirname, '..', '..', 'controllers', 'api', 'apiControllersProductos'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '..','..','public','images','products'));

    },
    filename: function (req, file, cb) {
      cb(null, 'prod-'+Date.now() + path.extname(file.originalname)); 
    }
  });
  
const upload = multer({ storage });


router.get('/listadoDeProductos', verifyRole, apiControllersProductos.index);

