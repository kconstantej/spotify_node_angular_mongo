//exportamos mongoose que se encargara de la coneccion a la base de datos

var mongoose = require('mongoose');


//se carga app que tiene a express, cabezeras y rutas

var app = require('./app');

//se configura un puerto

var port = process.env.PORT || 3977;


//connect permite la coneccion a nuestra base con el url y mandamos un call back 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/curso_mean2',(err,res)=>{
	if(err){
		//si eciste el error arrojamos el mismo
		throw err;
	}else{
		//si no hay error entonces se imprime
		console.log("la coneccion a la base de datos esta funcionando correctamente");

		//se ve por q puerto va a escuchar  y se crea un call back

		app.listen(port,function (){
			console.log("Servidor del api rest de musica escuchando en http://localhost:"+port)
		});
	}
});