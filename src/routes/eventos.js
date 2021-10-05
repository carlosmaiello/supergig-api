var express = require("express");
const { Evento, Endereco, EventoTipo } = require("../models");
var router = express.Router();

router.get("/", async function (req, res) {
  res.send(
    await Evento.findAll({
      include: [Endereco, EventoTipo],
    })
  );
});

router.post("/", async function (req, res) {
  try {
    res.send(await Evento.create(req.body));
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/:id", async function (req, res) {
  var evento = await Evento.findByPk(req.params.id);
  try {
    if (evento == null) throw new Error("Evento não existe");

    res.send(evento);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.put("/:id", async function (req, res) {
  var evento = await Evento.findByPk(req.params.id);
  try {
    if (evento == null) throw new Error("Evento não existe");

    await (await evento.update(req.body)).reload();

    res.send(evento);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.delete("/:id", async function (req, res) {
  var evento = await Evento.findByPk(req.params.id);
  try {
    if (evento == null) throw new Error("Evento não existe");

    await evento.destroy();

    res.send(true);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

module.exports = router;
