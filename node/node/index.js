const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql2')

app.get('/', async (req,res) => {
    const connection = mysql.createConnection(config)
    const sql = `select * from people
                 LIMIT 100`
    const data = await connection.promise().query(sql)
    connection.end();

    res.send(`<h1>Full Cycle</h1>
              <br/>
              <ul>
                <li>
                ${data[0].map((row) => {
                    return row.name;
                }).join(`</li><li>`)}
                </li>
              </ul>`)
})

app.listen(port, async ()=> {
    console.log('Rodando na porta ' + port);

    const connection = mysql.createConnection(config)
    const createPeopleTableSql = `CREATE TABLE IF NOT EXISTS people (
        id integer not null auto_increment,
        name varchar(255) not null,
        PRIMARY KEY (id)
    );`
    await connection.promise().query(createPeopleTableSql)

    const sql = `INSERT INTO people(name)
                 SELECT concat('Wesley ', coalesce(max(id), 0) + 1) from people`

    await connection.promise().query(sql)
    connection.end();
})
