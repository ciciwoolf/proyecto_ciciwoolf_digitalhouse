const path = require('path');
const fs = require('fs');

let relojes =  JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','data','relojes.json')));

module.exports = {
    index: function(req,res){
        //res.sendFile(path.resolve(__dirname, '..', 'views', 'productos', 'productos.html'));
        res.render(path.resolve(__dirname, '..', 'views', 'productos', 'productos'),{relojes});
    }
}