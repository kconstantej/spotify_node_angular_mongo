//variable que permitira utilizar mongoose
var mongoose=require('mongoose');

//permitir definir un ojeto de tipo schema
var Schema = mongoose.Schema;

var AlbumSchema = Schema({
    title: String,
    description: String,
    year: Number,
    image: String,
    //el va a guardar una referencia a otro objeto, guarda un objeto que se tiene guardado en otra coleccion en la base
    artist: { type: Schema.ObjectId , ref: 'Artist'}
});


//para poder utilizar el schema fuera del fichero se exporta el modelo el nombre de la identidad User y se le va a
//dar el AlbumSchema 
module.exports = mongoose.model('Album',AlbumSchema);