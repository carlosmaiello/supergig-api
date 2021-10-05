var express = require("express");
const { BandaEstilo, Endereco, Usuario, Banda } = require("../models");
var router = express.Router();

router.get("/", async function (req, res) {
  res.send(await Banda.findAll({ include: [Usuario, Endereco, BandaEstilo] }));
});

router.post("/", async function (req, res) {
  res.send(await Banda.create(req.body, { include: [Endereco, BandaEstilo] }));
});

router.get("/:id", async function (req, res) {
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

router.put("/:id", async function (req, res) {
  var banda = await Banda.findByPk(req.params.id);
  try {
    if (banda == null) throw new Error("Banda não existe");

    res.send(await banda.update(req.body));
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.delete("/:id", async function (req, res) {
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
