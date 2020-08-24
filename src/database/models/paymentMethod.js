module.exports = (sequelize,DataTypes) =>{
    let alias = 'paymentMethod'; //payment_methods in MySQL tables

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey : true,
            allowNull: false,
            autoIncrement: true
        },
        description: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
       
    };
    
    let config = {
        tableName : 'payment_methods',
        timestamps: false
    }

    const paymentMethod = sequelize.define(alias,cols,config);

    paymentMethod.associate = function(models) {
        paymentMethod.hasMany(models.Order, {
                as : 'orders',
                foreignKey: 'order_id'   //check then delete comment
               })
        }
    


    return paymentMethod;
}