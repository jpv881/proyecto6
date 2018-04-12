var express = require('express');
var router = express.Router();
let controladorViajes = require('../controllers/controladorViajes');

router.get('/', controladorViajes.verTodos);

router.get('/eliminar-destino/:id', controladorViajes.eliminar);

router.get('/abrir-destino/:id', controladorViajes.abrirViaje);

router.post('/editar-destino', controladorViajes.editarViaje);

router.get('/crear-destino', controladorViajes.crearDestino);

router.post('/guardar-destino', controladorViajes.insertDestino);

module.exports = router;