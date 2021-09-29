const db = require("../database");

const execute = async () => {
  await db.usuarios.dml.drop();
  await db.bandas.dml.drop();
  await db.banda_estilos.dml.drop();
  await db.eventos.dml.drop();
  await db.evento_tipos.dml.drop();

  await db.usuarios.dml.create();
  await db.bandas.dml.create();
  await db.banda_estilos.dml.create();
  await db.eventos.dml.create();
  await db.evento_tipos.dml.create();
  console.log("Criou o banco de dados.");

  await db.usuarios.inserir({
    nome: "José da Silva",
    email: "jose@gmail.com",
    senha: "123",
  });

  await db.usuarios.inserir({
    nome: "Maria de Souza",
    email: "maria@gmail.com",
    senha: "123",
  });

  await db.usuarios.inserir({
    nome: "João de Souza",
    email: "joao@gmail.com",
    senha: "123",
  });

  await db.banda_estilos.inserir({  
    nome: "Rock"
  });

  await db.banda_estilos.inserir({  
    nome: "POP"
  });

  await db.bandas.inserir({
    usuario_id: 1,
    banda_estilo_id: 1,
    nome: "Nenhum de Nós",
    descricao: "Ninguém",
    url: "https://s2.glbimg.com/Br-bXXROkQ9lGKQ7-bbdeyTrYi0=/0x0:2000x1498/984x0/smart/filters:strip_icc()/s.glbimg.com/jo/g1/f/original/2017/07/05/ndnos_raul_krebs_wvUs33u.jpg",
  });

  await db.bandas.inserir({
    usuario_id: 1,
    banda_estilo_id: 1,
    nome: "Paralamas do Sucesso",
    descricao: "Paralamas",
    url: "https://www.uniaofm.com.br/wp-content/uploads/2021/03/paralamas.jpg",
  });


  await db.evento_tipos.inserir({  
    nome: "Show"
  });

  await db.evento_tipos.inserir({  
    nome: "Barzinho"
  });

  console.log("Inseriu dados de teste.");
  return;
};

execute();
