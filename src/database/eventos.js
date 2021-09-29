const connect = require("./connect");

async function todos() {
  const conn = await connect();
  const [rows] = await conn.query("select * from eventos");
  return rows;
}

async function consultar(id) {
  const conn = await connect();
  const sql = "select * from eventos where id = ?";
  const values = [id];
  const [rows] = await conn.query(sql, values);
  return rows[0];
}

async function inserir(evento) {
  const conn = await connect();
  const sql = "insert into eventos (usuario_id, evento_tipo_id, nome, descricao, data, local, whatsapp, telefone, site) values (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [evento.usuario_id, evento.evento_tipo_id, evento.nome, evento.descricao, evento.data, evento.local, evento.whatsapp, evento.telefone, evento.site];
  const [details] = await conn.query(sql, values);
  return await consultar(details.insertId);
}

async function alterar(id, evento) {
  const conn = await connect();
  const sql = "update eventos set  usuario_id = ?, evento_tipo_id = ?, nome = ?, descricao = ?, data = ?, local = ?, whatsapp = ?,  telefone = ?, site = ? where id = ?";
  const values = [ evento.usuario_id, evento.evento_tipo_id, evento.nome, evento.descricao, evento.data, evento.local, evento.whatsapp, evento.telefone, evento.site, id ];
  await conn.query(sql, values);
  return await consultar(id);
}

async function remover(id) {
  const conn = await connect();
  const sql = "delete from eventos where id = ?";
  const values = [id];
  const [details] = await conn.query(sql, values);
  return details.affectedRows > 0;
}

async function create() {
  const conn = await connect();
  
  await conn.query(`CREATE TABLE IF NOT EXISTS eventos ( 
    id int not null auto_increment primary key, 
    usuario_id int not null,
    evento_tipo_id int not null,
    nome varchar(255) not null,
    descricao TEXT null,
    data DATETIME not null,
    local VARCHAR(255) not null,
    whatsapp varchar(16) null,
    telefone varchar(16) null,
    site varchar(255) null
  );`);
}

async function drop() {
  const conn = await connect();

  await conn.query(`DROP TABLE IF EXISTS eventos;`);
}

module.exports = {
  todos,
  consultar,
  inserir,
  alterar,
  remover,
  dml: {
    create,
    drop,
  },
};
