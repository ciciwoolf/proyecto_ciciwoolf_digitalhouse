module.exports = (sequelize,DataTypes) =>{
    let alias = 'productOrder'; //product_orders in MySQL tables

    //equiv to 'items' in Dani's Code
     
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        
        salePrice: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        
        subtotal: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },

        state: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        cart_id: {
            type: DataTypes.INTEGER,
        },

        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE,   

    }
    

    
    
    let productOrder = sequelize.define(alias, cols);
    productOrder.associate = function (models){
        productOrder.belongsTo(models.Cart, {
            as: "cart",
            foreignKey: "cart_id",  
          });

          productOrder.belongsTo(models.User, {
            as: "user",
            foreignKey: "user_id",
          });
        
          productOrder.belongsTo(models.Product, {
            as: "product",
            foreignKey: "product_id",
          });
    
        
    }



    

    return productOrder;
}


/*

Old Code from Backup

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

    //const productOrder = sequelize.define(alias,cols,/*config*/);

    /*

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


    /*


    return productOrder;
}   */