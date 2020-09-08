const { productOrder } = require('../database/models');


//Para mi el state = 1 significa que el usuario aun no ha finalizado la compra si por el contrario el usuario finaliza la compra, entonces lo paso a state = 0

module.exports = (req, res, next) => {
   if (req.session.usuario) {
      productOrder.findAndCountAll({  //Este es un metodo de sequelize que me permite contar la cantidad de regsitros que hay con respecto a cierta condición indicada
         where: {
            user_id: req.session.usuario.id,
            state: 1 //means purchase hasn't been made yet
         },
         force: true
      })
         .then(data => {
            res.locals.carritoCantidad = data.count;
            return next();
         })
   }  else {
      return next();
   }
}