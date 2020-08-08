const path = require('path');
const fs = require('fs');
const _ = require("lodash");

module.exports = (req,res,next) =>{
    //Verify the role of the user 
    if(req.session.usuario.role != 9){  
        return res.render(path.resolve(__dirname, '..','views','web','verify_role'));
    }
    next();
}