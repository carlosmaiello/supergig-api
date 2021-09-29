var express = require("express");
const { Usuario } = require("../database");
var router = express.Router();

router.get("/", async function (req, res) {
  res.send(await Usuario.findAll());
});

router.post("/", async function (req, res) {
  res.send(await Usuario.create(req.body));
});

router.get("/:id", async function (req, res) {
  var usuario = await Usuario.findByPk(req.params.id);
  try {
    if (usuario == null) throw new Error("Usuário não existe");
    
    res.send(usuario);
  } catch (e) {
    res.send({ erro: e.message });
  }
});

router.put("/:id", async function (req, res) {
  var usuario = await Usuario.findByPk(req.params.id);
  try {
    if (usuario == null) throw new Error("Usuário não existe");

    res.send(await usuario.update(req.body));
  } catch (e) {
    res.send({ erro: e.message });
  }
});

router.delete("/:id", async function (req, res) {
  var usuario = await Usuario.findByPk(req.params.id);
  try {
    if (usuario == null) throw new Error("Usuário não existe");
    res.send(await usuario.destroy());
  } catch (e) {
    res.send({ erro: e.message });
  }
});

module.exports = router;
