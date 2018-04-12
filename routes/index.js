var express = require('express');
var router = express.Router();
var session = require('express-session');
let usersModel = require('../models/usersModel');
let bcrypt = require('../middleware/crypto');
var controladorUsuarios = require('../controllers/controladorUsuarios');

/* GET home page. */
router.get('/', function (req, res, next) {
    let email = '';

    res.render('destinos', {
        title: 'Agencia Viajes',
        layout: 'layout',
        email: email || ''
    });
});

//router.get('/');

/* GET login page. */
router.get('/login', controladorUsuarios.login);

router.get('/logout',controladorUsuarios.logout);

router.post('/login/autenticar', controladorUsuarios.autenticar);

/* GET registro page. */
router.get('/registro', controladorUsuarios.registro);

router.post('/registro/insertar', controladorUsuarios.insertar);

// router.post('/autenticar-usuario', function (req, res, next) {
//     const USUARIO = {
//         "email": req.body.email,
//         "password": req.body.password
//     };
//
//     usersModel.getUsuarioByEmail(USUARIO.email, (error, usuario)=>{
//         if(error) return res.status(500).json(error);
//         let errores = true;
//         let template = '';
//         let layout = '';
//
//         if(usuario.length > 0){
//             if(bcrypt.compare(USUARIO.password, usuario[0].password)){
//                 errores = false;
//             }
//         }
//
//         if(errores){
//             template = 'login';
//             layout = 'layoutSinFooter';
//         }else{
//             template = 'destinos';
//             layout = 'layout';
//         }
//
//         res.render(template, {
//             title: 'Agencia Viajes',
//             layout: layout,
//             email: USUARIO.email,
//             erroresLogin: errores
//         });
//     });
// });



module.exports = router;
