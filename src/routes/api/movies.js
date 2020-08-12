/* Cici's Notes


const express = require('express');
const router = express.Router();
const moviesAPIController = require('../../controllers/api/moviesAPIController')



router.get('/', moviesAPIController.list);  //now create new API controllers folder
router.get('/:id', moviesAPIController.find);

module.exports = router;