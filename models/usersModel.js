let conn = require('../connection/mysqlconnection');
let Usuarios = {};


Usuarios.insert = (usuario, callback)=>{
    if(!conn) return cb("Error en la conexión");
    conn.query('insert into usuarios set ?', [usuario], (error, result)=>{
       if(error) return callback(error);
       return callback(null, result);
    });
}

Usuarios.getUsuarioByEmail = (usuario, callback)=>{
    if(!conn) return callback("Error en la conexión");
    const SQL = 'select * from usuarios where email = "'+usuario+'"';
    conn.query(SQL, (error, rows)=>{
       if(error) return callback(error);
       else {
           return callback(null, rows);
       }
    });
};

module.exports = Usuarios;