var express = require("express");
const auth = require("../auth");
const { BandaEstilo } = require("../models");
var router = express.Router();

router.get("/", auth, async function (req, res) {
  res.send(await BandaEstilo.findAll());
});

router.post("/", auth, async function (req, res) {
  try {
    res.send(await BandaEstilo.create(req.body));
  } catch (e) {
    res.status(500).send({ erro: e.message, details: e });
  }
});

router.get("/:id", auth, async function (req, res) {
  var estilo = await BandaEstilo.findByPk(req.params.id);
  try {
    if (estilo == null) throw new Error("Estilo não existe");

    res.send(estilo);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.put("/:id", auth, async function (req, res) {
  var estilo = await BandaEstilo.findByPk(req.params.id);
  try {
    if (estilo == null) throw new Error("Estilo não existe");

    await (await estilo.update(req.body)).reload();

    res.send(estilo);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.delete("/:id", auth, async function (req, res) {
  var estilo = await BandaEstilo.findByPk(req.params.id);
  try {
    if (estilo == null) throw new Error("Estilo não existe");

    await estilo.destroy();

    res.send(true);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

module.exports = router;
