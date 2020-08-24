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


    
    

    return Product;
}