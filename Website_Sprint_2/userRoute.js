const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcryptjs'); 

const _ = require("lodash");
const fs = require('fs'); //Will we need this when we use Sequelize?
const multer = require('multer');

//el paquete express-validator
const {
    check,
    validationResult,  
    body
} = require('express-validator');

//Requerir el modulo de los controladores
const controllerUser = require(path.resolve(__dirname, '..', 'controllers', 'controllerUser'));

let fileUsers =  JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/users.json')))  

//For image upload/storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../../public/images/users')); 
    },
    filename: function (req, file, cb) {
      cb(null, 'foto' + '-' + Date.now()+ path.extname(file.originalname));      
    }
  })
   
const upload= multer({ storage })

//Routes for User
router.get('/register', controllerUser.register); //to Register page

router.post('/register', upload.single('avatar'),[
    check('first_name').isLength({
        min: 1
      }).withMessage('che, pone tu nombre acá :-)'),
    check('last_name').isLength({min: 1
      }).withMessage('che, pone tu apellido acá  :-)'),
    check('email').isEmail().withMessage('che, agregá un email válido'),

    //Cici's Note: Here we check to see if the user is already reg
    istered in our JSON file. 

    body('email').custom( (value) =>{
        for (let i = 0; i < fileUsers.length; i++) {
            if (fileUsers[i].email == value) {
                return false    //Run through list to see if email is already registered
            }
        }
        return true   
    }).withMessage('che, tu email ya lo tenemos!'), //if email is found then return with message that email is already registered

    //Password check 
    check('password').isLength({min: 6 }).withMessage('che, boludo, la contraseña debe tener un mínimo de 6 caractéres para ser super secreto, no pongas 123456 pelotudo!!'),
    
    //Password confirmation check
    check('confirm_password').isLength({min: 6 }).withMessage('ojo! la confirmación de la super secreta contraseña debe tener un mínimo de 6 caractéres'),   

    body('confirm_password').custom((value, {req}) =>{
        if(req.body.password == value ){
            return true    // If true, there is no ERROR    
        }else{
            return false   // If false, then password doesn't match and there is ERROR
        }    
    }).withMessage('che loco las contraseñas deben ser iguales :-)'),

    //Check for avatar image
    body('avatar').custom((value, {req}) =>{
        if(req.file != undefined){
            return true  //If user uploads a file correctly then no Error.
        }
        return false;
    }).withMessage('che, no eligiste tu avatar! cuanta boludez! por favor, debe ser un archivo con formato: .JPG ó JPEG ó PNG')
  ], controllerUser.create);


router.get('/login', controllerUser.login); //Still need to work on login.ejs - not created yet

router.post('/login',[
  check('email').isEmail().withMessage('acá tu email espléndido (y válido)'),
  body('email').custom( (value) =>{
    for (let i = 0; i < fileUsers.length; i++) {
        if (fileUsers[i].email == value) {
            
          return true    
        }
    }
    return false   
}).withMessage('che! lo siento, pero no se encuentra registrado...!'),
check('password').isLength({min: 6 }).withMessage('la contraseña debe tener un mínimo de 6 caractéres'),
body('password').custom((value, {req}) =>{
  for (let i = 0; i < fileUsers.length; i++) {
    if (fileUsers[i].email == req.body.email) {
      if(bcrypt.compareSync(value,fileUsers[i].password)){
        return true
      }else{
        return false
      }
    }
}
}).withMessage('sorry papá! las contraseñas no coinciden...')

]  ,controllerUser.login);  //'ingresar' == login??

  //Logout route, returns to the original login page
  router.get('/logout', controllerUser.logout);
module.exports = router;