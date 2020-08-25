//variable que permitira utilizar mongoose
var mongoose=require('mongoose');

//permitir definir un ojeto de tipo schema
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    role: String,
    image: String
});


//para poder utilizar el schema fuera del fichero se exporta el modelo el nombre de la identidad User y se le va a
//dar el UserSchema 
module.exports = mongoose.model('User',UserSchema);