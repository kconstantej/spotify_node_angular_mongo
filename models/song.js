//variable que permitira utilizar mongoose
var mongoose=require('mongoose');

//permitir definir un ojeto de tipo schema
var Schema = mongoose.Schema;

var SongSchema = Schema({
    number: String,
    name: String,
    duration: String,
    file: String,
    album: {type: Schema.ObjectId, ref: 'Album'}
});


//para poder utilizar el schema fuera del fichero se exporta el modelo el nombre de la identidad Song y se le va a
//para poder utilizar el schema fuera del fichero se exporta el modelo el nombre de la identidad Song y se le va a
//dar el Schema 
module.exports = mongoose.model('Song',SongSchema);