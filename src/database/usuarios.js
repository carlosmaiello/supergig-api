const connect = require("./connect");

async function create() {
  const conn = await connect();
  const sql = `CREATE TABLE IF NOT EXISTS usuarios ( 
        id int not null auto_increment primary key, 
        nome varchar(255) not null,
        email varchar(255) not null,
        senha varchar(50) not null
    );`;
  return await conn.query(sql);
}

async function todos() {
  const conn = await connect();
  const [rows] = await conn.query("select * from usuarios");
  return rows;
}

async function consultar(id) {
  const conn = await connect();
  const sql = "select * from usuarios where id = ?";
  const values = [id];
  const [rows] = await conn.query(sql, values);
  return rows.length > 0 ? rows[0] : null;
}

async function inserir(usuario) {
  const conn = await connect();
  const sql = "insert into usuarios (nome, email, senha) values (?, ?, ?)";
  const values = [usuario.nome, usuario.email, usuario.senha];
  const [details] = await conn.query(sql, values);
  return await consultar(details.insertId);
}

async function alterar(id, usuario) {
  const conn = await connect();
  const sql = "update usuarios set nome = ?, email = ?, senha = ? where id = ?";
  const values = [usuario.nome, usuario.email, usuario.senha, id];
  await conn.query(sql, values);
  return await consultar(id);
}

async function remover(id) {
  const conn = await connect();
  const sql = "delete from usuarios where id = ?";
  const values = [id];
  const [details] = await conn.query(sql, values);
  return details.affectedRows > 0;
}

async function drop() {
  const conn = await connect();
  const sql = `DROP TABLE IF EXISTS usuarios;`;
  return await conn.query(sql);
}

module.exports = {
  todos,
  consultar,
  inserir,
  alterar,
  remover,
  ddl: {
    create,
    drop,
  },
};
