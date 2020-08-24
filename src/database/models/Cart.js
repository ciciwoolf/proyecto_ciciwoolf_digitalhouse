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

    /*Cart.associate = function(models){
        Cart.hasMany(
            models.Product,
            {
                as: 'products',
                foreignKey: 'id'
            }
        )
    } */  
  
    return Cart;
}