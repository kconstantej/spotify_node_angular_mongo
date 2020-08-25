//variable que permitira utilizar mongoose
var mongoose=require('mongoose');

//permitir definir un ojeto de tipo schema
var Schema = mongoose.Schema;

var ArtistSchema = Schema({
    name: String,
    surname: String,
    description: String,
    image: String
});


//para poder utilizar el schema fuera del fichero se exporta el modelo el nombre de la identidad Artist y se le va a
//dar el ArtistSchema 
module.exports = mongoose.model('Artist',ArtistSchema);