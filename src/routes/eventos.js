var express = require('express');
var router = express.Router();


const { eventos } = require("../database");

router.get('/', async function (req, res) {
    res.send(await eventos.todos());
});

router.post('/', async function (req, res) {
    res.send(await eventos.inserir(req.body));
});

router.get('/:id', async function (req, res) {
    res.send(await eventos.consultar(req.params.id));
});

router.put('/:id', async function (req, res) {
    res.send(await eventos.alterar(req.params.id, req.body));
});

router.delete('/:id', async function (req, res) {
    res.send(await eventos.remover(req.params.id));
});

module.exports = router;