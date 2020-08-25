//se crea una variable con un rquerimiento de express
var express= require('express');

//se crea una variable bodyParser que requerira a bodyParser  
var bodyParser= require('body-parser');

//se crea un objeto de express

var app = express();

//cargar rutas
var user_roters = require('./routers/user');
var artist_roters = require('./routers/artist');
var album_roters = require('./routers/album');
var song_roters = require('./routers/song');

//se crea la configuracion de body parser

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configurar las cabeceras http

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY,  Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow','GET,POST,OPTIONS,PUT,DELETE');

    next();
});

//carga de rutas base
app.use('/api/:id',user_roters);
app.use('/api',artist_roters);
app.use('/api',album_roters);
app.use('/api',song_roters);



//exportamos el modulo para poder utilizar expres desde otro fichero que cargue app

module.exports = app;