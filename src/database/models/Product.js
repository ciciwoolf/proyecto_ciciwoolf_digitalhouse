module.exports = (sequelize,DataTypes) =>{
    let alias = 'Product'; 

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey : true,
            allowNull: false,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        price: DataTypes.DECIMAL,
        discount: DataTypes.INTEGER,
        image: DataTypes.STRING,
        category_id: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
       
    };

    let config = {
        tableName : 'products',
        timestamps: false
    }  

    const Product = sequelize.define(alias, cols, config);

          //many products belong to 1 category (Bebida, Trufa, Barra)
    Product.associate = function(models) {
        Product.belongsTo(models.Category, {
                as : 'categories',
                foreignKey: 'product_order_id'   //check then delete comment
               })
        }

        //one product belongs to any product order m:1
    Product.associate = function(models) {
        Product.belongsTo(models.productOrder, {
                as : 'product_orders',
                foreignKey: 'product_order_id',
                timestamps: false   //check then delete comment
                })
            }
    

    return Product;
}