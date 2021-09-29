const connect = require("./connect");

async function todos() {
  const conn = await connect();
  const [rows] = await conn.query("select * from bandas");
  return rows;
}

async function consultar(id) {
  const conn = await connect();
  const sql = "select * from bandas where id = ?";
  const values = [id];
  const [rows] = await conn.query(sql, values);
  return rows[0];
}

async function inserir(banda) {
  const conn = await connect();
  const sql =
    "insert into bandas (usuario_id, banda_estilo_id, nome, descricao, foto) values (?, ?, ?, ?, ?)";
  const values = [banda.usuario_id, banda.banda_estilo_id, banda.nome, banda.descricao, banda.foto];
  const [details] = await conn.query(sql, values);
  return await consultar(details.insertId);
}

async function alterar(id, banda) {
  const conn = await connect();
  const sql = "update bandas set  usuario_id = ?, banda_estilo_id = ?, nome = ?, descricao = ?, foto = ? where id = ?";
  const values = [ banda.usuario_id, banda.banda_estilo_id, banda.nome, banda.descricao, banda.foto, id ];
  await conn.query(sql, values);
  return await consultar(id);
}

async function remover(id) {
  const conn = await connect();
  const sql = "delete from bandas where id = ?";
  const values = [id];
  const [details] = await conn.query(sql, values);
  return details.affectedRows > 0;
}

async function create() {
  const conn = await connect();
  
  await conn.query(`CREATE TABLE IF NOT EXISTS bandas ( 
    id int not null auto_increment primary key, 
    usuario_id int not null,
    banda_estilo_id int not null,
    nome varchar(255) not null,
    descricao TEXT null,
    foto varchar(255) null
  );`);
}

async function drop() {
  const conn = await connect();
  
  await conn.query(`DROP TABLE IF EXISTS bandas;`);
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
