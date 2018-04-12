var Usuario = require('../models/usersModel');
var controladorUsuarios = {};
let bcrypt = require('../middleware/crypto');

exports.login = (req, res, next)=>{
    res.render('login', {
        title: 'Agencia Viajes',
        layout: 'layoutSinFooter'
    });
};

exports.logout = (req, res, next)=>{
    req.session.destroy();
    res.redirect('/');
};

exports.registro = (req, res, next)=>{
    res.render('registro', {
        title: 'Agencia Viajes',
        layout: 'layoutSinFooter'
    });
};

// controladorUsuarios.login = (req, res, next)=>{
//     const USUARIO = {
//         "email": req.body.email,
//         "password": req.body.password
//     };
//
//     Usuario.getUsuarioByEmail(USUARIO.email, (error, usuario)=>{
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
//         console.log("errores "+errores);
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
// }

exports.autenticar = (req, res, next)=>{
    const USUARIO = {
        "email": req.body.email,
        "password": req.body.password
    };

    Usuario.getUsuarioByEmail(USUARIO.email, (error, usuario)=>{
        if(error) return res.status(500).json(error);
        let errores = true;
        let template = '';
        let layout = '';

        if(usuario.length > 0){
            if(bcrypt.compare(USUARIO.password, usuario[0].password)){
                errores = false;

                if(usuario[0].tipo === 1) req.session.rol = 1;
                else{
                    req.session.rol = 0;
                }

                var conectado;
                if(req.session.rol) conectado = true;
                else conectado = false;
            }
        }



        if(errores){
            template = 'login';
            layout = 'layoutSinFooter';
        }else{
            template = 'destinos';
            layout = 'layout';
            if( req.session.rol === 1) res.redirect('/admin');
        }

        res.render(template, {
            title: 'Agencia Viajes',
            layout: layout,
            email: USUARIO.email,
            erroresLogin: errores,
            conectado: conectado
        });
    });
}

exports.insertar = (req, res, next)=>{
    const USUARIO = {
        "email": req.body.email,
        //"password": req.body.password1,
        "password": bcrypt.encrypt(req.body.password1),
    };

    Usuario.getUsuarioByEmail(USUARIO.email, (error, usuario) => {
        if (error) return res.status(500).json(error);

        if (usuario.length >  0) {
            res.render('registro', {
                title: 'Agencia Viajes',
                layout: 'layoutSinFooter',
                existeEmail: true
            });
        } else {
            Usuario.insert(USUARIO, (error, insertID) => {
                if (insertID) {
                    //res.status(200).send('Añadido usuario');
                    // return res.redirect('/');

                    res.render('destinos', {
                        title: 'Agencia Viajes',
                        layout: 'layout',
                        email: USUARIO.email,
                    });
                }else{
                    res.status(500).json('Error al guardar ' + error);
                }

            });
        }
    });
}

exports.registro = (req, res, next)=>{
    res.render('registro', {
        title: 'Agencia Viajes',
        layout: 'layoutSinFooter'
    });
}

//module.exports = controladorUsuarios;