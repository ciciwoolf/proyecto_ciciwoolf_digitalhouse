const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');//Debemos requerir el middleware
const controllersUserManager = require('../controllers/controllersUserManager');
const verifyRole = require(path.resolve(__dirname,'../middlewares/verifyRole'));//Aquí dispongo lo referido al nombre del arhivo y a donde se va a guardar
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '..','..','public','images','users'));
    },
    filename: function (req, file, cb) {
      cb(null, 'picture-'+Date.now() + path.extname(file.originalname));
    }
  });const upload = multer({ storage });const controllersAdmin = require(path.resolve(__dirname, '..', 'controllers', 'controllersUserManager'));
  
router.get('/umanagers/:email',verifyRole, controllersUserManager.index);
router.get('/umanagers/search_results', controllersAdmin.search);
router.get("/administrar/create", controllersAdmin.create);
router.post("/administrar/create", upload.single('imagen'), controllersAdmin.save);
router.get('/umanagers/detail/:id', controllersAdmin.show);
router.get('/umanagers/delete/:email', controllersAdmin.destroy);
router.get('/umanagers/edit/:email', controllersAdmin.edit);
router.put('/umanagers/edit/:email', upload.single('imagen'), controllersAdmin.update);

module.exports = router;
