module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": "chocolates",  
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port": 3306
  },
  "test": {
    "username": "root",
    "password": "12345",
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "12345",
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

/*This file has all of our environment variables for the database connection. This file only has information for a dev environment. In a real app, your production variables would go here, too. This information is bundled in a single object, which is then exported for app-wide use. */


/* https://lorenstewart.me/2016/10/03/sequelize-crud-101/  */
