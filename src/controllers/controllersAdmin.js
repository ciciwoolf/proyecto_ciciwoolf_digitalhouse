const path = require('path');
const fs = require('fs');

//let chocolates =  JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','data','chocolates.json')));//


module.exports = {
    productAdd: (req,res) =>{
        res.render(path.resolve(__dirname, '..', 'views', 'admin', 'productAdd'),{chocolates});
    }
}