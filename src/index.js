
const express = require('express');
const app = express();
const path = require('path');


//Para indicarle express la carpeta donde se encuentran los archivos estáticos
app.use(express.static(path.resolve(__dirname, '..', 'public')));
//Debemos indicar cual es el motor de plantillas que estamos usando EJS
app.set('view engine','ejs');


//Requerir las rutas
const webRoutes = require('./routes/web');
const userRoutes = require('./routes/user');
const productoRoutes = require('./routes/producto');
const adminRoutes = require('./routes/admin');
//Para usar las rutas
app.use(webRoutes);
app.use(userRoutes);
app.use(productoRoutes);
app.use(adminRoutes);

//Levantar servidor
app.listen(3000, 'localhost', ()=> console.log('Servidor corriendo en el puerto 3000'));
