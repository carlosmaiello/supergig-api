var express = require("express");
const { Usuario, Endereco, Banda } = require("../models");
const router = express.Router();
const jwt = require("jsonwebtoken");
var auth = require("../auth");

router.get("/", auth, async function (req, res) {
  res.send(await Usuario.findAll());
});

router.post("/", async function (req, res) {
  try {
    var usuario = await Usuario.create(req.body, { include: [Endereco] });
    res.send(usuario);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/:id", auth, async function (req, res) {
  var usuario = await Usuario.findByPk(req.params.id, {
    include: [Endereco, Banda],
  });
  try {
    if (usuario == null) throw new Error("Usuário não existe");

    res.send(usuario);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.put("/:id", auth, async function (req, res) {
  var usuario = await Usuario.findByPk(req.params.id, { include: [Endereco] });

  try {
    if (usuario == null) throw new Error("Usuário não existe");

    if (req.body.endereco) {
      if (!usuario.endereco) {
        usuario.setEndereco(await Endereco.create(req.body.endereco));
      } else {
        console.log(usuario.endereco);
        await usuario.endereco.update(req.body.endereco);
      }
    }

    await usuario.update(req.body, { include: [Endereco] });

    await usuario.reload({ include: [Endereco] });

    res.send(usuario);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.delete("/:id", auth, async function (req, res) {
  var usuario = await Usuario.findByPk(req.params.id);
  try {
    if (usuario == null) throw new Error("Usuário não existe");

    await usuario.destroy();

    res.send(true);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.senha)
      throw new Error("E-mail ou senha inválidos");

    var usuario = await Usuario.findOne({
      where: {
        email: req.body.email,
        senha: req.body.senha,
      },
    });

    if (usuario == null) throw new Error("E-mail ou senha inválidos");

    const token = jwt.sign({ id: usuario.id }, process.env.SECRET, {
      expiresIn: 3000, // expires in 5min
    });
    return res.send({ auth: true, token: token });
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

module.exports = router;
