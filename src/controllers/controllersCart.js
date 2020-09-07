const path = require('path');
const {validationResult} = require('express-validator');
const {Product, Cart } = require('../database/models'); 

module.exports = {
    addCart: (req,res) =>{
        //return res.send(req.body)
        const errores = validationResult(req);
        if(errores.isEmpty()){
            Product.findByPk(req.body.id,{
                include: ['category']
            })
            .then((product)=>{
                //return res.send(producto)
                let price = Number(product.price)
                let salePrice = (price - ((price * product.discount) / 100))  
                //console.log(salePrice + '====================================')
                return Item.create({
                    salePrice: salePrice,
                    quantity: req.body.cantidad,
                    subtotal: salePrice * req.body.cantidad,
                    state: 1,
                    userId: req.session.usuario.id,
                    productId: producto.id,
                    cartId: null
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
        Product.findAll({
            where:{
                userId : req.session.user.id,
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
            return res.render(path.resolve(__dirname, '../views/carrito/carrito'), {
                cartProducto, total})
        })

    },
   
    shop : (req,res) =>{
        //return res.send("Estamos en la compra")
        let precioTotal = 0;
        Product.findAll({
            where: {
                userId : req.session.usuario.id,
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
                orderNumber : cart ? cart.orderNumber + 1 : 1,
                total : precioTotal,
                userId : req.session.usuario.id
            })
        })
        .then((cart) =>{
            Item.update({
                state: 0,
                cartId: cart.id
            },
            
            {
                where:{
                    userId: req.session.usuario.id,
                    state: 1
                }
            
            })
        })
        .then(() => res.redirect('/carrito/historialCompra'))
        .catch(error => console.log(error))
    }
   
}