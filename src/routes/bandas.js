var express = require("express");
const { BandaEstilo, Endereco, Usuario, Banda } = require("../models");
var router = express.Router();
var auth = require("../auth");

router.get("/", auth, async function (req, res) {
  res.send(await Banda.findAll({ include: [Usuario, Endereco, BandaEstilo] }));
});

router.post("/", auth, async function (req, res) {
  const dados = { ...req.body, usuarioId: req.usuarioId };
  try {
    res.send(await Banda.create(dados, { include: [Endereco, BandaEstilo] }));
  } catch (e) {
    res.status(500).send({ erro: e.message, details: e });
  }
});

router.get("/:id", auth, async function (req, res) {
  var banda = await Banda.findByPk(req.params.id, {
    include: [Usuario, Endereco, BandaEstilo],
  });
  try {
    if (banda == null) throw new Error("Banda não existe");

    res.send(banda);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.put("/:id", auth, async function (req, res) {
  var banda = await Banda.findByPk(req.params.id);
  try {
    if (banda == null) throw new Error("Banda não existe");

    res.send(await banda.update(req.body));
  } catch (e) {
    res.status(500).send({ erro: e.message, details: e });
  }
});

router.delete("/:id", auth, async function (req, res) {
  var banda = await Banda.findByPk(req.params.id);
  try {
    if (banda == null) throw new Error("Banda não existe");
    await banda.destroy();
    res.send(true);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

module.exports = router;
