module.exports = (sequelize,DataTypes) =>{
    let alias = 'Role'; //roles in MySQL tables

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
    /*let config = {
        tableName : 'roles',
        timestamps: false
    }*/

    const Role = sequelize.define(alias,cols,/*config*/);
    return Role;
}