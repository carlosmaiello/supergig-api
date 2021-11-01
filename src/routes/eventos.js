var express = require("express");
const auth = require("../auth");
const { Evento, Endereco, EventoTipo, Usuario } = require("../models");
var router = express.Router();

router.get("/", auth, async function (req, res) {
  res.send(
    await Evento.findAll({
      include: [Usuario, Endereco, EventoTipo],
    })
  );
});

router.post("/", auth, async function (req, res) {
  const dados = {...req.body, usuarioId: req.usuarioId};
  try {
    res.send(await Evento.create(dados));
  } catch (e) {
    res.status(500).send({ erro: e.message, details: e });
  }
});

router.get("/:id", auth, async function (req, res) {
  var evento = await Evento.findByPk(req.params.id, {
    include: [Endereco, EventoTipo, Usuario],
  });
  try {
    if (evento == null) throw new Error("Evento não existe");

    res.send(evento);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.put("/:id", auth, async function (req, res) {
  var evento = await Evento.findByPk(req.params.id);
  try {
    if (evento == null) throw new Error("Evento não existe");

    await (await evento.update(req.body)).reload();

    res.send(evento);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.delete("/:id", auth, async function (req, res) {
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
