const path = require('path');
const fs = require('fs');
const db = require('../database/models');
const _ = require("lodash");
const { nextTick } = require('process');
const Product = db.Product;
//Aqui hacen esto para lograr activalos operadores en sus querys (like - count - max) 
const Op = db.Sequelize.Op;

//Esto es otra forma de declarar los Modelos en nuestro controlador
//const Product = db.Product; 
//const Category = db.category;
//const TipoPago = db.TipoPago;
//const {Product,Category,TipoPago} = require('../database/models');


module.exports = {
    index: (req,res) =>{
        /*db.sequelize
        .query('select * from products')
        .then(relojes =>{
            return res.send(relojes[0])
        }) 
        .catch(error => res.send(error)) */      

        //res.render(path.resolve(__dirname, '..', 'views', 'admin', 'administrar'),{relojes});
        //Ahora vamos a trabajar usando los métodos de sequelize
        //Product.findAll()   //select * from products
        //.then(relojes =>{
            //return res.send(relojes);
            let users =  JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/user.json')))
            res.render(path.resolve(__dirname, '..', 'views', 'admin', 'user_manager'),{users});
        //})
        //.catch(error => res.send(error))
    },
    create: (req, res) =>{
        res.render(path.resolve(__dirname, '..','views','admin','create'));
    },
    save: (req,res)=>{
        //req.body.image = req.file.filename;
        //return res.send(req.body);
        const _body = { 
        //return res.send(_body);
            name : req.body.nombre,
            description: req.body.descripcion,
            price: req.body.precio,
            discount: req.body.descuento,
            image : req.file.filename
        }    
        //return res.send(_body);
        Product.create(_body)
        .then(product =>{
            res.redirect('/administrar');
        })
        .catch(error => res.send(error))
    },
    show: (req,res)=>{

        let usersFile =  JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/user.json')));
        let user = usersFile.find(usuario => usuario.email == req.params.id)
        
        
        //console.log("contenido de sesion de authenticated - show ");
        //console.log(req.session.authenticated);

        res.render(path.resolve(__dirname, '..','views','admin','user_detail'), {user});
        
        /*Product.findByPk(req.params.id)  
        .then(miReloj =>{
            res.render(path.resolve(__dirname, '..','views','admin','detail'), {miReloj});
        })*/  
        //.catch(error => res.send(error))
    },
    destroy: (req,res) =>{

        //console.log("Entra en destroy");
        //Read users file
        let usersFile =  JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/user.json')));
        
        //console.log("Method update");
        
        let requestedEmail = _.lowerCase(req.params.email);
        //console.log(requestedEmail); 
        let cont = 1;
        usersFile.forEach(function(post){
            
        const storedEmail = _.lowerCase(post.email);
      
          if (storedEmail === requestedEmail) {
            usersFile.splice(cont-1,1); //splice remove current email, add new one
  
            //console.log(usersFile);
  
          let data = JSON.stringify(usersFile, null, 2);
          //console.log(data);
  
          fs.writeFileSync(path.resolve(__dirname, '../data/user.json'), data, (err) => {
            if (err) throw err;
            //console.log('Data written to file');
            });
          
    
        }  
        cont= cont + 1;
    });
    res.redirect('/administrar');   

    },
    edit: (req,res) =>{

        let usersFile =  JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/user.json')));
        let user = usersFile.find(usuario => usuario.email == req.params.email)
        
        console.log("contenido de sesion de authenticated - update ");
        console.log(req.session.authenticated);
        
        res.render(path.resolve(__dirname, '..','views','admin','user_edit'), {user});

        /*Product.findByPk(req.params.id)  
        .then(relojEditar =>{
            res.render(path.resolve(__dirname, '..','views','admin','edit'), {relojEditar})
        })  
        .catch(error => res.send(error))   */     
    },
    update: (req,res) =>{
        //console.log("En el metodo update");
        ssn=req.session;
        //Read users file
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
        res.redirect('/');
        
    },
    search: ( req, res) =>{
        Product.findAll({
            where:{
                name: {[Op.like]: `%${req.query.search}%`}
            }
        })
        .then(resultado => { res.render(path.resolve(__dirname, '..', 'views', 'admin', 'administrar'),{products: resultado});})
        .catch(error => res.send(error))
    }


}