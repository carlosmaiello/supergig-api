var express = require('express');
var router = express.Router();

const { banda_estilos } = require("../database");

router.get('/', async function (req, res) {
    res.send(await banda_estilos.todos());
});

router.post('/', async function (req, res) {
    res.send(await banda_estilos.inserir(req.body));
});

router.get('/:id', async function (req, res) {
    res.send(await banda_estilos.consultar(req.params.id));
});

router.put('/:id', async function (req, res) {
    res.send(await banda_estilos.alterar(req.params.id, req.body));
});

router.delete('/:id', async function (req, res) {
    res.send(await banda_estilos.remover(req.params.id));
});

module.exports = router;