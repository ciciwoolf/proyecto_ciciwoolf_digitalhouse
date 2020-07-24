const path = require('path');
const fs = require('fs');

let products =  JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','data','products.json'))); //


module.exports = {
    index: function(req,res){
        res.render(path.resolve(__dirname, '..', 'views','web','index'),{products});  
    },

    show: function(req,res){
        res.render(path.resolve(__dirname, '..', 'views','web','productDetail'),{products});  
    }

}
