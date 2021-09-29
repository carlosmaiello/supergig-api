const connect = require("./connect");

async function todos() {
  const conn = await connect();
  const [rows] = await conn.query("select * from banda_estilos");
  return rows;
}

async function consultar(id) {
  const conn = await connect();
  const sql = "select * from banda_estilos where id = ?";
  const values = [id];
  const [rows] = await conn.query(sql, values);
  return rows[0];
}

async function inserir(banda_estilo) {
  const conn = await connect();
  const sql =
    "insert into banda_estilos (nome) values (?)";
  const values = [banda_estilo.nome];
  const [details] = await conn.query(sql, values);
  return await consultar(details.insertId);
}

async function alterar(id, banda_estilo) {
  const conn = await connect();
  const sql = "update banda_estilos set  nome = ? where id = ?";
  const values = [ banda_estilo.nome, id ];
  await conn.query(sql, values);
  return await consultar(id);
}

async function remover(id) {
  const conn = await connect();
  const sql = "delete from banda_estilos where id = ?";
  const values = [id];
  const [details] = await conn.query(sql, values);
  return details.affectedRows > 0;
}

async function create() {
  const conn = await connect();

  await conn.query(`CREATE TABLE IF NOT EXISTS banda_estilos ( 
    id int not null auto_increment primary key, 
    nome varchar(255) not null
  );`);
}

async function drop() {
  const conn = await connect();

  await conn.query( `DROP TABLE IF EXISTS banda_estilos;`);
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
