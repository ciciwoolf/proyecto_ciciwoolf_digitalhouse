module.exports = (sequelize,DataTypes) =>{
    let alias = 'Cart'; //carts in MySQL tables

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey : true,
            allowNull: false,
            autoIncrement: true
        },
       
        user_id: DataTypes.INTEGER,
        product_id: DataTypes.INTEGER, 
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE,        
    };

    const Cart = sequelize.define(alias,cols,/*config*/);
    Cart.associate = function(models) {
        Cart.belongsTo(
            models.Product,
            {
                as : 'user',
                foreignKey: 'product_id'
            }
        )
    };

   
    // A cart has a user 1:1
    Cart.associate = function(models) {
        Cart.belongsTo(models.User, {
            as: "users",
            foreignKey: "user_id"   //Check and then delete
        })
    }

    //A cart has many orders 
    Cart.associate = function(models) {
            Cart.hasMany(models.Order, {
                as: "orders",
                foreignKey: "order_id"     //Check and then delete
            })
        }  

    return Cart;
}