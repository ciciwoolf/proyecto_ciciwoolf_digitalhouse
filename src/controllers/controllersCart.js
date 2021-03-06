const path = require('path');
const {validationResult} = require('express-validator');
const {Product, productOrder, Cart } = require('../database/models'); 

module.exports = {
    addCart: (req,res) =>{
        //return res.send(req.body)
        const errores = validationResult(req);
        if(errores.isEmpty()){
            console.log(req.body)
            Product.findByPk(req.body.productId,{
                include: ['category']
                })
            .then((producto)=>{
        
                let price = Number(producto.price)
                let salePrice = (price - ((price * producto.discount) / 100))  
                //console.log(salePrice + '====================================')
               console.log(productOrder)
                return productOrder.create({
                    salePrice: producto.price,
                    quantity: req.body.cantidad,
                    subtotal: salePrice * req.body.cantidad,
                    state: 1,
                    user_id: req.session.usuario.id,  //id of logged in user
                    product_id: producto.id,
                    cart_id: null,
                    order_id: null
                })
                .then(()=> res.redirect('/cart'))
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
        

            let total = cartProducto.reduce((total, item)=>(total = total + (Number(item.subtotal))),0)
            return res.render(path.resolve(__dirname, '../views/usuarios/cart'), {
                cartProducto, total})
        })

    },

    /* From cart.ejs

     <% cartProducto.forEach(item => { %>

        /images/products/<%= item.product.image %>

         <img src="/images/products/<%= item.product.image %>" alt="<%= item.product.name %>" 
        
        <%= item.category.name %>

          $ <%= item.salePrice; %>

          <%= item.quantity %>

*/
   
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