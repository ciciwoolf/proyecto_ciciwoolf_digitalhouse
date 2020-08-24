


//Is productOrder actually necessary? Can we just have order? 
//Is this our pivot table?


module.exports = (sequelize,DataTypes) =>{
    let alias = 'productOrder'; //product_orders in MySQL tables

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey : true,
            allowNull: false,
            autoIncrement: true
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
        product_id: DataTypes.INTEGER,
        order_id: DataTypes.INTEGER,
    };
    
    let config = {
        tableName : 'product_orders',
        timestamps: false
    }

    const productOrder = sequelize.define(alias,cols,config);
    
    //one productOrder belongs to an order
    productOrder.associate = function(models) {
        productOrder.belongsTo(models.Order, {
                as : 'orders',
                foreignKey: 'order_id',
                timestamps: false   
            })
    }

        //one product order can have many products
    productOrder.associate = function(models) {
        productOrder.belongsTo(models.Product, {
                as : 'products',
                foreignKey: 'product_id',
                timestamps: false    
            })
    }

    return productOrder;
}