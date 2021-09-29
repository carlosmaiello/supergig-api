var express = require('express');
var router = express.Router();

const { evento_tipos } = require("../database");

router.get('/', async function (req, res) {
    res.send(await evento_tipos.todos());
});

router.post('/', async function (req, res) {
    res.send(await evento_tipos.inserir(req.body));
});

router.get('/:id', async function (req, res) {
    res.send(await evento_tipos.consultar(req.params.id));
});

router.put('/:id', async function (req, res) {
    res.send(await evento_tipos.alterar(req.params.id, req.body));
});

router.delete('/:id', async function (req, res) {
    res.send(await evento_tipos.remover(req.params.id));
});

module.exports = router;