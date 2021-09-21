var express = require("express");
var app = express();

var usuarios = require("./src/controllers/usuarios");
var bandas = require("./src/controllers/bandas");
var eventos = require("./src/controllers/eventos");

app.use("/usuarios", usuarios);
app.use("/bandas", bandas);
app.use("/eventos", eventos);

app.listen(3000, function () {
  console.log("Servidor rodando na porta 3000");
});
