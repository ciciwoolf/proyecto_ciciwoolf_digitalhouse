const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');//Debemos requerir el middleware
const verifyRole = require(path.resolve(__dirname,'../middlewares/verifyRole'));//Aquí dispongo lo referido al nombre del arhivo y a donde se va a guardar
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '..','..','public','images','products'));

    },
    filename: function (req, file, cb) {
      cb(null, 'prod-'+Date.now() + path.extname(file.originalname)); //how to name it prod++? prod1 prod2 prod 3 etc.
    }
  });
  
const upload = multer({ storage });const controllersAdmin = require(path.resolve(__dirname, '..', 'controllers', 'controllersAdmin'));router.get('/administrar', verifyRole, controllersAdmin.index);

router.get('/administrar/search_results', controllersAdmin.search);
router.get("/administrar/create", controllersAdmin.create);
router.post("/administrar/create", upload.single('imagen'), controllersAdmin.save);
router.get('/administrar/detail/:id', controllersAdmin.show);
router.get('/administrar/delete/:id', controllersAdmin.destroy);
router.get('/administrar/edit/:id', controllersAdmin.edit);
router.put('/administrar/edit/:id', upload.single('imagen'), controllersAdmin.update);module.exports = router;
router.get('/administrar', verifyRole, controllersAdmin.index)

