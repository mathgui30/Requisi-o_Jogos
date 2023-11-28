const express = require('express');
const bodyParser = require('body-parser');
const mysql = require ('mysql');
const { error } = require('console');


const app = express();


app.use(express.json());

app.listen(3000, () => { console.log('Conectado ao banco de dados') });

const db = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: '12345678',
    database: 'loja_jogos'
});

db.connect((err)=> {
    if(err){
        console.error('Erro ao conectar com o banco de dados: ', err);

    } else {
        console.log('Conexão com o banco de dados bem sucedida')
    }
})

app.get('/jogos', (req,res)=> {
    db.query('SELECT * FROM jogos', (err, result) =>{
        if(err) throw err;
        res.json(result);
    });
});

app.post('/jogos', (req, res) => {
    const { titulo, descricao, data_lancamento, preco, idioma, armazenamento, classificacao_indicativa } = req.body;
    db.query('INSERT INTO jogos (titulo, descricao, data_lancamento, preco, idioma, armazenamento, classificacao_indicativa) VALUES (?, ?, ?, ?, ?, ?, 7)', [titulo, descricao, data_lancamento, preco, idioma, armazenamento, classificacao_indicativa], (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

app.put('/jogos/:id_jogos', (req, res) => {
        const { titulo, descricao, data_lancamento, preco, idioma, armazenamento, classificacao_indicativa } = req.body;
        const { id_jogos } = req.params;
        db.query('UPDATE jogos SET titulo = "Hello Kitty Island Adventure" WHERE id_jogos = ?', [id_jogos, titulo, descricao, data_lancamento, preco, idioma, armazenamento, classificacao_indicativa], (err, results) => {
          if (err) throw err;
          res.json(results);
        });
      });
  app.delete('/jogos/:id_jogos', (req, res) => {
        const { id_jogos } = req.params;

        db.query('DELETE FROM jogos WHERE id_jogos = ?', [id_jogos], (err, result) => {
          if (err) throw err;
          res.json(result);
          
        });
      });
      
// import csv
      const fs = require('fs');
      const csv = require('csv-parser');
      
      const arquivoCSV = 'C:/Users/Matheus/Downloads/data.csv';
      
      const resultados = [];
      
      fs.createReadStream(arquivoCSV)
        .pipe(csv())
        .on('data', (linha) => {
          resultados.push(linha);
        })
        .on('end', () => {
          console.log('Leitura do CSV concluída.');
          console.log(resultados);
          // Faça algo com os dados, como salvá-los em um banco de dados ou processá-los de alguma forma.
        })
        .on('error', (erro) => {
          console.error('Erro ao ler o arquivo CSV:', erro.message);
        });