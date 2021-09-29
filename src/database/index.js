const Sequelize = require("sequelize");

const database = new Sequelize("supergig_sequelize", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

const Banda = database.define("bandas", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.TEXT,
  },
  foto: {
    type: Sequelize.STRING,
  },
});

const BandaEstilo = database.define("banda_estilos", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Endereco = database.define("enderecos", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  logradouro: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  numero: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  complemento: {
    type: Sequelize.STRING,
  },
  bairro: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cep: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cidade: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  estado: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lat: {
    type: Sequelize.DECIMAL,
    precision: 10,
    scale: 7
  },
  lng: {
    type: Sequelize.DECIMAL,
    precision: 10,
    scale: 7
  },
});

const Evento = database.define("eventos", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.TEXT,
  },
  data: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  local: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  whatsapp: {
    type: Sequelize.STRING,
  },
  telefone: {
    type: Sequelize.STRING,
  },
  site: {
    type: Sequelize.STRING,
  },
});

const EventoTipo = database.define("evento_tipos", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Usuario = database.define("usuarios", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

BandaEvento = database.define("banda_eventos", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
});

BandaEstilo.hasMany(Banda);
EventoTipo.hasMany(Evento);

Usuario.hasMany(Banda);
Usuario.hasMany(Evento);
Usuario.belongsTo(Endereco);

Banda.belongsTo(Usuario);
Banda.belongsTo(Endereco);
Banda.belongsTo(BandaEstilo);

Evento.belongsTo(Usuario);
Evento.belongsTo(Endereco);
Banda.belongsTo(EventoTipo);

Banda.belongsToMany(Evento, { through: BandaEvento });
Evento.belongsToMany(Banda, { through: BandaEvento });

module.exports = {
  database,
  Banda,
  BandaEstilo,
  Endereco,
  Evento,
  EventoTipo,
  Usuario,
};
