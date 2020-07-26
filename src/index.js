
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const path = require('path');
const _ = require("lodash");
const methodOverride = require('method-override');


app.use(methodOverride('_method'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.set('view engine','ejs');

app.use(express.urlencoded({ extended: true })); 

//Requerir las rutas
const adminRoutes = require('./routes/route');//decidi tener solo un archivo con las rutas porque me gustar ver todas a la vez
app.use(adminRoutes);

//Levantar servidor
app.listen(3000, 'localhost', ()=> console.log('Servidor corriendo en el puerto 3000'));

