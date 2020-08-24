const path = require('path');
const fs = require('fs');
const db = require('../database/models');
const Product = db.Product;
const Category = db.Category;
const Cart = db.Cart;
//const {Cart, Category, Country, Order, paymentMethod, productOrder, Product, Role, User} = require('../database/models');

<<<<<<< HEAD
const Op = db.Sequelize.Op;

=======
//const {Cart, Category, Country, Order, paymentMethod, productOrder, Product, Role, User} = require('../database/models');


//Aqui hacen esto para lograr activalos operadores en sus querys (like - count - max) 
const Op = db.Sequelize.Op;

//Esto es otra forma de declarar los Modelos en nuestro controlador
//const Product = db.Product; 
//const Category = db.Category;
//const TipoPago = db.TipoPago;



>>>>>>> c04708e56363d6b02b0ae9276aed0576fe8366e6
module.exports = {
    index: (req,res) =>{

        Product.findAll()
           
        .then(products =>{
            res.render(path.resolve(__dirname, '..', 'views', 'admin', 'administrar'),{products});
        })
        .catch(error => res.send(error)) 
    },
    create: (req, res) =>{
        res.render(path.resolve(__dirname, '..','views','admin','create'));
    },
    save: (req,res)=>{
        const _body = { 
            name : req.body.name,
            description: req.body.description,
            price: req.body.price,
            discount: req.body.discount,
            image : req.file.filename
        }    
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
                name: {[Op.like]: `%${req.query.search}%`} 
            }
        })
        .then(resultado => { res.render(path.resolve(__dirname, '..', 'views', 'admin', 'administrar'),{products: resultado});})
        .catch(error => res.send(error))
    },
    inventory: function(req,res){
        const products = Product.findAll();
        const categories = Category.findAll();
        Promise.all([products,categories])
        .then(([products,categories]) =>{
            return res.send(products)
            //res.render(path.resolve(__dirname , '..','views','productos','productos') , {platos,categorias});
        })           
        .catch(error => res.send(error))
    },
    filtered: (req,res) =>{
        const categories = Category.findAll();
        const products = Product
        .findAll({
            where: {categoryId : '1'},
            include: [{association: 'category'}]
        })
        Promise.all([products,categories])
        .then(([products,categories]) =>{
            return res.send(products)
            //res.render(path.resolve(__dirname, '..','views','productos','productos'), {platos,categorias })
        })        
     },
     cart: (req,res) =>{
        const products = Product.findAll();
        const carts = Cart
        .findAll({
            where: {user_id : req.params.id},
            include: [{association: 'user'}]
        })
        Promise.all([products,carts])
        .then(([products,carts]) =>{
            //console.log(carts)
            
            //return res.send(carts[0].user.name)
            res.render(path.resolve(__dirname, '..','views','admin','cart'), {carts})
        })        
     }


}