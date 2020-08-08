const path = require('path');
const fs = require('fs');
const db = require('../database/models');
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
        .then(products =>{
            return res.send(products[0])
        }) 
        .catch(error => res.send(error)) */      

        //res.render(path.resolve(__dirname, '..', 'views', 'admin', 'administrar'),{products});
        //Ahora vamos a trabajar usando los métodos de sequelize
        Product.findAll()   //select * from products
        .then(products =>{
            //return res.send(products);
            res.render(path.resolve(__dirname, '..', 'views', 'admin', 'administrar'),{products});
        })
        .catch(error => res.send(error))
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
        Product.findByPk(req.params.id)  
        .then(myProduct =>{
            res.render(path.resolve(__dirname, '..','views','admin','detail'), {myProduct})
        })  
        .catch(error => res.send(error))
    },
    destroy: (req,res) =>{
        Product.destroy({
            where: {
                id : req.params.id
            }
        })
        .then(()=>  res.redirect('/administrar'))
        .catch(error => res.send(error))
    },
    edit: (req,res) =>{
        Product.findByPk(req.params.id)  
        .then(productEdit =>{
            res.render(path.resolve(__dirname, '..','views','admin','edit'), {productEdit})
        })  
        .catch(error => res.send(error))        
    },
    update: (req,res) =>{
        /*Les paso la alternativa que usé si alguno quiere verla: Ezequiel
        update: (req,res) =>{
               const _body = {
                   name: req.body.nombre,
                   description: req.body.descripcion,
                   price: req.body.precio,
                   discount: req.body.descuento,
               };
                   if (req.file) {
                       _body.image = req.file.filename
                   };
           
                  Product.update(
                      _body,
                      {
                       where:{
                           id: req.params.id
                       }
                      })
                   .then(()=>res.redirect('/administrar'))
                   .catch(error=> res.send(error));
           }*/

        Product.update ({
                name:req.body.nombre,
                price: req.body.precio,
                description : req.body.descripcion,
                discount: req.body.descuento,
                image: req.file ? req.file.filename : req.body.oldImagen
            }, {
                where: {
                    id:req.params.id
               }
            })
            .then(()=> res.redirect('/administrar'))
            .catch(error =>res.send(error))
    },
    search: ( req, res) =>{
        Product.findAll({
            where:{
                name: {[Op.like]: `%${req.query.search}%`} //review
            }
        })
        .then(resultado => { res.render(path.resolve(__dirname, '..', 'views', 'admin', 'administrar'),{products: resultado});})
        .catch(error => res.send(error))
    }


}