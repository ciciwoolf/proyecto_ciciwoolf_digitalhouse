const path = require('path');

module.exports = {
    registro: function (req,res){
        res.render(path.resolve(__dirname, '..', 'views', 'users', 'registro'));
    },

    cartshow: function (req,res){
    res.render(path.resolve(__dirname, '..', 'views', 'users', 'productCart'));
    }

}