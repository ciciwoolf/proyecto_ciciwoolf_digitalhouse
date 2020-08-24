module.exports = (sequelize,DataTypes) =>{
    let alias = 'Order'; //orders in MySQL tables

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey : true,
            allowNull: false,
            autoIncrement: true
        },

        user_id: DataTypes.INTEGER,
        payment_method_id: DataTypes.INTEGER,    
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
       
    };
    /*let config = {
        tableName : 'orders',
        timestamps: false
    }*/

    const Order = sequelize.define(alias,cols,/*config*/);

    /*

     // An order belongs to 1 cart
      Order.associate = function(models) {
        Order.belongsTo(models.Cart, {
            as: "carts",
            foreignKey: "cart_id"   //Check and then delete
        })
    }

      // An order belongs to a product_order 1:1
      Order.associate = function(models) {
        Order.hasMany(models.productOrder, {
            as: "product_orders",
            timestamps: false   //Check and then delete
        })
    }

       // An order(s) belongs to  1 user
       Order.associate = function(models) {
        Order.belongsTo(models.User, {
            as: "users",
            foreignKey: "user_id"   //Check and then delete
        })
    }

       // An order(s) belongs to  1 payment method
       Order.associate = function(models) {
        Order.belongsTo(models.paymentMethod, {
            as: "payment_methods",
            foreignKey: "payment_method_id"   //Check and then delete
        })
    }


    */

    return Order;
}