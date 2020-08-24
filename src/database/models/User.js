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
    /*User.associate = function(models) {
        User.belongsTo(
            models.Country,
            {
                as : 'country',
                foreignKey: 'countryId'
            }
        )
    };*/
  

    return User
  }