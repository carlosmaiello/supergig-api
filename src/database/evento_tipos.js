const connect = require("./connect");

async function todos() {
  const conn = await connect();
  const [rows] = await conn.query("select * from evento_tipos");
  return rows;
}

async function consultar(id) {
  const conn = await connect();
  const sql = "select * from evento_tipos where id = ?";
  const values = [id];
  const [rows] = await conn.query(sql, values);
  return rows[0];
}

async function inserir(evento_tipo) {
  const conn = await connect();
  const sql =
    "insert into evento_tipos (nome) values (?)";
  const values = [evento_tipo.nome];
  const [details] = await conn.query(sql, values);
  return await consultar(details.insertId);
}

async function alterar(id, evento_tipo) {
  const conn = await connect();
  const sql = "update evento_tipos set  nome = ? where id = ?";
  const values = [ evento_tipo.nome, id ];
  await conn.query(sql, values);
  return await consultar(id);
}

async function remover(id) {
  const conn = await connect();
  const sql = "delete from evento_tipos where id = ?";
  const values = [id];
  const [details] = await conn.query(sql, values);
  return details.affectedRows > 0;
}

async function create() {
  const conn = await connect();

  await conn.query(`CREATE TABLE IF NOT EXISTS evento_tipos ( 
    id int not null auto_increment primary key, 
    nome varchar(255) not null
  );`);
}

async function drop() {
  const conn = await connect();

  await conn.query( `DROP TABLE IF EXISTS evento_tipos;`);
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
