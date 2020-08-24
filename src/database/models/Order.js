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
    return Order;
}