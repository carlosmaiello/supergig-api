var express = require('express');
var router = express.Router();

const { bandas } = require("../database");

router.get('/', async function (req, res) {
    res.send(await bandas.todos());
});

router.post('/', async function (req, res) {
    res.send(await bandas.inserir(req.body));
});

router.get('/:id', async function (req, res) {
    res.send(await bandas.consultar(req.params.id));
});

router.put('/:id', async function (req, res) {
    res.send(await bandas.alterar(req.params.id, req.body));
});

router.delete('/:id', async function (req, res) {
    res.send(await bandas.remover(req.params.id));
});

module.exports = router;