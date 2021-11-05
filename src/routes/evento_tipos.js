var express = require("express");
const auth = require("../auth");
const { EventoTipo } = require("../models");
var router = express.Router();

router.get("/", auth, async function (req, res) {
  res.send(await EventoTipo.findAll());
});

router.post("/", auth, async function (req, res) {
  try {
    res.send(await EventoTipo.create(req.body));
  } catch (e) {
    res.status(500).send({ erro: e.message, details: e });
  }
});

router.get("/:id", auth, async function (req, res) {
  var tipo = await EventoTipo.findByPk(req.params.id);
  try {
    if (tipo == null) throw new Error("Tipo não existe");

    res.send(tipo);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.put("/:id", auth, async function (req, res) {
  var tipo = await EventoTipo.findByPk(req.params.id);
  try {
    if (tipo == null) throw new Error("Tipo não existe");

    await (await tipo.update(req.body)).reload();

    res.send(tipo);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.delete("/:id", auth, async function (req, res) {
  var tipo = await EventoTipo.findByPk(req.params.id);
  try {
    if (tipo == null) throw new Error("Tipo não existe");

    await tipo.destroy();

    res.send(true);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

module.exports = router;
