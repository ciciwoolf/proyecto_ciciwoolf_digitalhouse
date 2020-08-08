module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": "watches",  //Needs to change to products
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
