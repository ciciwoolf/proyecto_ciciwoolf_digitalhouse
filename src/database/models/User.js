module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: dataTypes.STRING,
        last_name: dataTypes.STRING,
        email: dataTypes.STRING,
        password: dataTypes.STRING,
        avatar: dataTypes.STRING,
        province: dataTypes.STRING,
        country: dataTypes.STRING,
        role: dataTypes.STRING 
    };

    const User = sequelize.define(alias, cols) 
    User.associate = function(models) {
        User.belongsTo(
            models.Country,
            {
                as : 'country',
                foreignKey: 'countryId'
            }
        )
    };
  

     // A user has 1 cart
     User.associate = function(models) {        
        User.belongsTo(models.Cart, {
            as: "carts",
            foreignKey: "cart_id"   //Check and then delete comment
             })
    }

    //A user has many orders
    User.associate = function(models) {
        User.hasMany(models.Order, {
            as: "orders",
            foreignKey: "order_id"   //Check and then delete comment
            })
    }

    //A user has 1 country
    User.associate = function(models) {
        User.belongsTo(
            models.Country, {
                as : 'countries',
                foreignKey: 'country_id'   
            })
    }

    //A user has 1 role
    User.associate = function(models) {
        User.belongsTo(models.Role, {
            as: "roles",
            foreignKey: "roles_id"    //Check and then delete comment
            })
    }

    

    return User;
  }