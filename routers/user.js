var express=require('express');

var UserController = require('../controllers/user');

var api = express.Router();

var md_auth = require('../middlewares/authenticated');

//nos permite un middleware que permita subir archivos

var multipart = require('connect-multiparty');

var md_upload = multipart({uploadDir: './uploads/users'})

api.get('/probando-controlador',md_auth.ensureAuth,UserController.pruebas);
api.post('/register',UserController.saveUser);
api.post('/login',UserController.loginUser);
api.put('/update-user/:id',md_auth.ensureAuth, UserController.updateUser);
api.post('/update-image-user/:id',[md_auth.ensureAuth,md_upload],UserController.uploadImage);
api.get('/get-image-user/:imageFile',UserController.getImageFile);



module.exports = api;
