var express = require("express");
var morgan = require("morgan");
var app = express();

app.use(express.json());

app.use(morgan('combined'));

// var log = require("./middlewares/log");
// app.use(log);

var usuarios = require("./routes/usuarios");
var banda_estilos = require("./routes/banda_estilos");
var bandas = require("./routes/bandas");
var eventos = require("./routes/eventos");
var evento_tipos = require("./routes/evento_tipos");

app.use("/usuarios", usuarios);
app.use("/bandas", bandas);
app.use("/banda_estilos", banda_estilos);
app.use("/eventos", eventos);
app.use("/evento_tipos", evento_tipos);

app.all("*", function (req, res, next) {
  console.log("Alguém acessou!!!");
  next();
});

app.get("/", function (req, res) {
  res.send("SUPERGIG API");
});

app.listen(3000, function () {
  console.log("Servidor rodando na porta 3000");
});
