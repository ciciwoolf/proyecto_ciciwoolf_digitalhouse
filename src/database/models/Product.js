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
        image: DataTypes.STRING
    };

    /*let config = {
        tableName : 'products',
        timestamps: false
    }*/

    const Product = sequelize.define(alias,cols);
    return Product;
}