//
var jwt = require('jwt-simple');
//par hacer dentro del pate load que es el objeto que va a codificar jwt y lo guardara dentro de un toquen 
//se va a guardar la fecha de creacion del toquen y la fehca de expiracion ya que servira para saber nediante la fecha
//si el toquen expiro pues tendremos q volvernos a loguear
var moment = require('moment');
var secret = 'clave_secreta_curso';

exports.ensureAuth=function (req, res,next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'la peticion no tiene la cabecera de autenticacion'});
    }
    var token= req.headers.authorization.replace(/['"]+/g,'');

    try {
        var payload = jwt.decode(token, secret);
        if(payload.exp<=moment().unix()){
            return res.status(401).send({message: 'el token a expirado'});
        }
    }catch(ex){
        
        return res.status(404).send({message: 'el token no valido'});
    }

    req.user = payload;

    next();
};