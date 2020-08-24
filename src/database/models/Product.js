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
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
        categoryId: DataTypes.INTEGER  //foreign key
        
    };

    const Product = sequelize.define(alias,cols);
    
    Product.associate = function(models) {
        Product.belongsTo(
            models.Category,
            {
                as : 'category',
                foreignKey: 'categoryId'
            }
        )
    };

    /*

          //one product belongs to any product order m:1
    Product.associate = function(models) {
        Product.belongsTo(models.productOrder, {
                as : 'product_orders',
                foreignKey: 'product_order_id',
                timestamps: false   //check then delete comment
                })
            }
    
            */
    
    

    return Product;
}