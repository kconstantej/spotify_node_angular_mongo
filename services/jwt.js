//
var jwt = require('jwt-simple');
//par hacer dentro del pate load que es el objeto que va a codificar jwt y lo guardara dentro de un toquen 
//se va a guardar la fecha de creacion del toquen y la fehca de expiracion ya que servira para saber nediante la fecha
//si el toquen expiro pues tendremos q volvernos a loguear
var moment = require('moment');
var secret = 'clave_secreta_curso'


//se crea el metodo q se va a utilizar para guardar los datos del usuario dentro de un toquen o hash
//de esta forma vamos a saber q un usuario esta logueado

exports.createToken = function(user){
    var payload={
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        //se guarda cada cuanto tiempo se tiene q loguear el usuario
        exp: moment().add(30, 'days').unix()
    };

    return jwt.encode(payload, secret);
};
