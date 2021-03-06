const path = require('path');
const fs = require('fs');
const db = require('../database/models')
const Product = db.Product;
const Category = db.Category;
const Cart = db.Cart;

module.exports = {
    index: function(req,res){
        const products = Product.findAll();
        const categories = Category.findAll();
        Promise.all([products,categories])
        .then(([products,categories]) =>{
            res.render(path.resolve(__dirname , '..','views','productos','productos') , {products,categories});
        })           
        .catch(error => res.send(error))
    },
    categories: (req,res) =>{
        const categories = Category.findAll();
        console.log(req.query.category);
        const categorySelected = req.query.category;
        
        if (categorySelected != '3')  //3 is all 'todos'
        {
            const products = Product
            .findAll({
                where: {categoryId : req.query.category},
                include: [{association: 'category'}]
            })
            Promise.all([products,categories])
            .then(([products,categories]) =>

                res.render(path.resolve(__dirname, '..','views','productos','productos'), {products,categories })
            )
        }else{
            console.log("ingresa al else")
            const products = Product.findAll();
            Promise.all([products,categories])
            .then(([products,categories]) =>{
            res.render(path.resolve(__dirname , '..','views','productos','productos') , {products,categories});
            })           
            .catch(error => res.send(error))

        }            
     
    },

    add: function(req,res){
        const _body = {
            user_id: req.session.user.id,
            product_id: req.params.id
        }    
        Cart.create(_body)
        .then(cart =>{
            res.redirect('/administrar');
        })
        .catch(error => res.send(error))
    },
   
   
    show: (req,res)=>{
            console.log(req.url)
            console.log(req.params)
        Product.findOne({
            where: {
                id: req.params.id //match id to Product model
                
            }, 
        })
        .then((product) =>{   //res.render has 2 parameters : res.render (PATH_TO_TEMPLATE , {object: obj})
       
            res.render(path.resolve(__dirname, '..','views','productos','product_detail'), {product})   //display the selected product
               
            
        })  

        .catch(error => res.send(error))

    }

}








