//Entry Point

const express = require('express'); //connect to Express library
const app = express();  //activate Express framework
const path = require('path'); //connect to files
const methodOverride = require('method-override'); //This is a Node.js module available through the npm registry. Installation is done using the npm install command:$ npm install method-override
//Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.  


//Requerir Sessión Cookies----------------
const session = require('express-session'); //para almecenar datos del usuario en el servidor; se borra despues de cerrar browser
const cookies = require('cookie-parser'); //para almecenar datos que persiste por un tiempo especifico; usado para validar usuario
//----------------------------------------

//Requerir el middleware que controla si el usuario está o no Logueado
const acceso = require('./middlewares/auth');
//const verifyRole = require('./middlewares/verifyRole');

//Middlewares
//Para indicarle express la carpeta donde se encuentran los archivos estáticos
app.use(express.static(path.resolve(__dirname, '..', 'public')));
//Path tells the app where the static files are

//Debemos indicar cual es el motor de plantillas que estamos usando EJS
app.set('view engine','ejs');

//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false })); //tells express how to understand req.body of an http request

//req.body   post and put http requests - from forms 
//req.params   based in the controllers-searching database, looks like: { id: '2' }
//req.url  http://localhost:3000/productos/productDetail/1 


//Middleware de aplicación el cual se encargue de controlar la posibilidad de usar otros métodos diferentes al GET y al POST, en nuestros formularios
app.use(methodOverride('_method'));

//Uso del Middleware de sessión
app.use(session({
    secret : 'TopSecret',  //:-)
    resave : true,
    saveUninitialized : true
}));

//Aqui coloco el Middleware para activar lo referido a las cookies
app.use(cookies());
app.use(acceso);

//Llamo mi Middleware de aplicación - 
//app.use(verifyRole);  //Le comente para ahora hacer un middleware de ruta

//Requerir las rutas
const webRoutes = require('./routes/web');
const userRoutes = require('./routes/user');
const productoRoutes = require('./routes/producto');
const adminRoutes = require('./routes/admin');
const ManagerRoutes = require('./routes/user_manager');
const cartRoutes = require('./routes/cart');
//const apiRoutesProductos = require('./routes/api/apiRoutesProductos'); For next Sprint



//Middleware de las rutas de mi proyecto
app.use(webRoutes);
app.use(userRoutes);
app.use(productoRoutes);
app.use(adminRoutes);
app.use(ManagerRoutes);
app.use(cartRoutes);
//app.use(apiRoutesProductos);  *Cici's Notes, example only


//Levantar servidor
app.listen(3000, 'localhost', ()=> console.log('Servidor corriendo en el puerto 3000'));
