const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;

const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};
const connection = mysql.createConnection(config);

var query_create = `
    CREATE TABLE IF NOT EXISTS people (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(45),
        PRIMARY KEY (id)
    );`;
connection.query(query_create);

const query_insert = `INSERT INTO people (name) VALUES ('Edu')`;
connection.query(query_insert);

app.get("/", (req, res) => {
  connection.query(`SELECT name FROM people`, function (err, result, fields) {
    if (err) {
      console.log(err);
    } else {
      res.send(
        "<h1>Full Cycle</h1><p>- Lista de nomes cadastrada no banco de dados.</p>" +
          result
            .map((item) => {
              return "<p style='padding-left: 10px'>- " + item["name"] + "</p>";
            })
            .join("")
      );
    }
  });
});

// connection.end();

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});
