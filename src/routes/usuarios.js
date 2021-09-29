var express = require("express");
var router = express.Router();

const { usuarios } = require("../database");

router.get("/", async function (req, res) {
  res.send(await usuarios.todos());
});

router.post("/", async function (req, res) {
  res.send(await usuarios.inserir(req.body));
});

router.get("/:id", async function (req, res) {
  res.send(await usuarios.consultar(req.params.id));
});

router.put("/:id", async function (req, res) {
    res.send(await usuarios.alterar(req.params.id, req.body));
});

router.delete("/:id", async function (req, res) {
    res.send(await usuarios.remover(req.params.id));
});

module.exports = router;
