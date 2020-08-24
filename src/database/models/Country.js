module.exports = (sequelize,DataTypes) =>{
    let alias = 'Country'; //countries in MySQL tables

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey : true,
            allowNull: false,
            autoIncrement: true
        },
        name: DataTypes.STRING
    };

    let config = {
        tableName : 'countries',
        timestamps: false
    }


    const Country = sequelize.define(alias, cols, config) 
    //Create relationship with table Users  - Relationship:  1 to Many
    Country.associate = function(models){
        Country.hasMany(
            models.User,
            {
                as: 'users',
                foreignKey: 'country_id'
            }
        )
    } 
    
       
    
    return Country;
}