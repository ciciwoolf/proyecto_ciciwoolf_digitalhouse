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
    /*let config = {
        tableName : 'product_orders',
        timestamps: false
    }*/

    const productOrder = sequelize.define(alias,cols,/*config*/);
    return productOrder;
}