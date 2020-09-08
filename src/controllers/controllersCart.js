const path = require('path');
const {validationResult} = require('express-validator');
const {Product, productOrder, Cart } = require('../database/models'); 

module.exports = {
    addCart: (req,res) =>{
        //return res.send(req.body)
        const errores = validationResult(req);
        if(errores.isEmpty()){
            Product.findByPk(req.body.id,{
                include: ['category']
            })
            .then((producto)=>{
        
                let price = Number(producto.price)
                let salePrice = (price - ((price * producto.discount) / 100))  
                //console.log(salePrice + '====================================')
                return productOrder.create({
                    salePrice: producto.price,
                    quantity: req.body.cantidad,
                    subtotal: salePrice * req.body.cantidad,
                    state: 1,
                    user_id: req.session.usuario.id,  //id of logged in user
                    product_id: producto.id,
                    cart_id: null
                })
                .then(()=> res.redirect('/productos'))
                .catch(error => console.log(error))
            })

        }else{
            //Hay errores
            Product.findByPk(req.body.id,{
                include: ['category']
            })
            .then((product)=>{
                return res.render(path.resolve(__dirname, '../views/productos/product_detail'), {
                    errors: errors.errors, product})
            })
         }
    },

    cart : (req,res) =>{
        productOrder.findAll({
            where:{
                user_id : req.session.usuario.id,
                state: 1
            },
            include:{
                all: true,
                nested: true
            }
        })
        .then((cartProducto)=>{
            //return res.send(cartProducto)
            let total = cartProducto.reduce((total, item)=>(total = total + (Number(item.subtotal))),0)
            return res.render(path.resolve(__dirname, '../views/usuarios/cart'), {
                cartProducto, total})
        })

    },
   
    shop : (req,res) =>{
        //return res.send("Estamos en la compra")
        let precioTotal = 0;
        productOrder.findAll({
            where: {
                user_id : req.session.usuario.id,
                state: 1
            }
        })
        .then((items) =>{
            precioTotal = items.reduce((total, item)=>(total = total + (Number(item.subtotal))),0)
        })
        Cart.findOne({
            order: [['createdAt','DESC']]
        })
        .then((cart)=>{
            return Cart.create({
                id : cart ? cart.orderNumber + 1 : 1,
                total : precioTotal,
                user_id : req.session.usuario.id
            })
        })
        .then((cart) =>{
            productOrder.update({
                state: 0,
                id: cart.id
            },
            
            {
                where:{
                    user_id: req.session.usuario.id,
                    state: 1
                }
            
            })
        })
        .then(() => res.redirect('/usuarios/detail_purchase'))
        .catch(error => console.log(error))
    }
   
}