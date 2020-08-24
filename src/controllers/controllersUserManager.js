const path = require('path');
const fs = require('fs');
const db = require('../database/models');
const _ = require("lodash");
const { nextTick } = require('process');
const Product = db.Product;

const Op = db.Sequelize.Op;
const User = db.User;

module.exports = {
    index: (req,res) =>{
        
        User.findAll()   
        .then(users =>{
            res.render(path.resolve(__dirname, '..', 'views', 'admin', 'user_manager'),{users});
        })
        .catch(error => res.send(error))
    },
    create: (req, res) =>{
        res.render(path.resolve(__dirname, '..','views','admin','create'));
    },
    save: (req,res)=>{

        const _body = { 

            name : req.body.nombre,
            description: req.body.descripcion,
            price: req.body.precio,
            discount: req.body.descuento,
            image : req.file.filename
        }    

        Product.create(_body)
        .then(product =>{
            res.redirect('/administrar');
        })
        .catch(error => res.send(error))
    },
    show: (req,res)=>{

        //let usersFile =  JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/user.json')));
        //let user = usersFile.find(usuario => usuario.email == req.params.id)
        User.findOne({
            where: {
              email: req.params.email},
        })
        .then(user =>{
       
            res.render(path.resolve(__dirname, '..','views','admin','user_detail'), {user});
        })  
        .catch(error => res.send(error))

    },
    destroy: (req,res) =>{
        
        /*JSON Logic - commented out
        let usersFile =  JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/user.json')));
        let requestedEmail = _.lowerCase(req.params.email);
        let cont = 1;
        usersFile.forEach(function(post){
            
        const storedEmail = _.lowerCase(post.email);
      
          if (storedEmail === requestedEmail) {
            usersFile.splice(cont-1,1); //splice remove current email, add new one
  
          let data = JSON.stringify(usersFile, null, 2);
  
          fs.writeFileSync(path.resolve(__dirname, '../data/user.json'), data, (err) => {
            if (err) throw err;
            });
        }  
        cont= cont + 1;
    });
    res.redirect('/administrar');*/   
    User.destroy({
        where: {
            email : req.params.email
        }
    })
    .then(()=>  res.redirect('/umanagers'))
    .catch(error => res.send(error))

    },
    edit: (req,res) =>{

        //let usersFile =  JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/user.json')));
        //let user = usersFile.find(usuario => usuario.email == req.params.email)

        User.findOne({
            where: {
              email: req.params.email},
        })
        .then(user =>{
       
            res.render(path.resolve(__dirname, '..','views','admin','user_edit'), {user});
        })  
        .catch(error => res.send(error))
          
    },
    update: (req,res) =>{
        console.log("Update Method")
        ssn=req.session;
        /*JSON Logic - comented out
        let usersFile =  JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/user.json')));        
        let requestedEmail = _.lowerCase(req.params.email);
        console.log(requestedEmail); 
        usersFile.forEach(function(post){  //go through each user
      
        const storedEmail = _.lowerCase(post.email);  //create variable storing user email changed to all lower case
      
          if (storedEmail === requestedEmail) {  //if stored email matches up with req email...
              //console.log("Entra en el IF");  
              post.nombre = req.body.name;    
              post.apellido = req.body.last_name;    //then match name to name 
              
            //console.log("En el metodo update oldimagen");
            //console.log(req.body.oldImagen);

              post.avatar = req.file ? req.file.filename : req.body.oldImagen;  //if avatar requested is new then add otherwise leave with old one
              //update avatar after changing it
              req.session.usuario.avatar = post.avatar;
              req.session.usuario.nombre = post.nombre;
              req.session.usuario.apellido = post.apellido;
              data = JSON.stringify(usersFile, null, 2);
              //console.log(data);
      
              fs.writeFileSync(path.resolve(__dirname, '../data/user.json'), data, (err) => {
                  if (err) throw err;
                  //console.log('Data written to file');
              });
              
            }   
        });
        //console.log("contenido de sesion de authenticated - update ");
        //console.log(req.session.authenticated);
        res.redirect('/');*/
        User.update ({
            first_name:req.body.first_name,
            last_name: req.body.last_name,
            image: req.file ? req.file.filename : req.body.oldImagen
        }, {
            where: {
                email:req.params.email
           }
        })
        .then(()=> res.redirect('/umanagers'))
        .catch(error =>res.send(error))
        
    },
    search: ( req, res) =>{
        console.log("SEARCH");
        User.findAll({
            where:{
                first_name: {[Op.like]: `%${req.body.search}%`}
            }
        })
        .then(users => { res.render(path.resolve(__dirname, '..', 'views', 'admin', 'user_manager'),{users});})
        .catch(error => res.send(error))
    },

    new: (req,res) =>{
        res.render(path.resolve(__dirname, '..', 'views', 'admin', 'usersave'));
    },
    sto: (req, res) => {
      let errors = validationResult(req);
      if (errors.isEmpty()) {
        //Create _body variable which contains user's information gathered from the body
        const _body = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10),
          province: Number(req.body.province),
          country: req.body.country,
          avatar:  req.file ? req.file.filename : '',
          role: 1   //Usuario 1 = Basico 2 = analista 9 = Administrador
        }
        //User model must be created as well as the user table in the Data Base
        User
          .create(_body)
          .then(user =>{
              res.redirect('/administrar')
          })
          .catch(error => res.send(error));     //error de Base de Datos
        //JSON logic - User Management
        //This section is comented out as we are working with Sequelize  
        /*let archivoUsers = fs.readFileSync(path.resolve(__dirname, '../data/user.json'), {
          encoding: 'utf-8'
        });
        let users;
        if (archivoUsers == "") {
          users = [];
        } else {
          users = JSON.parse(archivoUsers);
        };
        users.push(user);
        usersJSON = JSON.stringify(users, null, 2);
        fs.writeFileSync(path.resolve(__dirname, '../data/user.json'), usersJSON);*/
        
        res.redirect('/login');     
      } else {
      
        return res.render(path.resolve(__dirname, '../views/usuarios/registro'), {
          errors: errors.errors,  old: req.body
        });
      }
    }




}