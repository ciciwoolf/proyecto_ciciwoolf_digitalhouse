const path = require("path");
const { body } = require("express-validator");
const bycript = require("bcryptjs");

// ******** Sequelize ***********

//const { Product } = require("../database/models");

module.exports = {
  addCart: [
    body("cantidad")
      .custom((value) => value > 0)
      .withMessage("Debes agregar al menos un producto a su carrito"),
  ],
};
