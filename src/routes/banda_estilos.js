var express = require("express");
const { BandaEstilo } = require("../models");
var router = express.Router();

router.get("/", async function (req, res) {
  res.send(await BandaEstilo.findAll());
});

router.post("/", async function (req, res) {
  try {
    res.send(await BandaEstilo.create(req.body));
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/:id", async function (req, res) {
  var estilo = await BandaEstilo.findByPk(req.params.id);
  try {
    if (estilo == null) throw new Error("Estilo não existe");

    res.send(estilo);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.put("/:id", async function (req, res) {
  var estilo = await BandaEstilo.findByPk(req.params.id);
  try {
    if (estilo == null) throw new Error("Estilo não existe");

    await (await estilo.update(req.body)).reload();

    res.send(estilo);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.delete("/:id", async function (req, res) {
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
