const express = require('express');
const app = express();
const mysql = require('mysql');
const dotenv = require('dotenv');
const cors = require('cors')

dotenv.config();
app.use(express.json());
app.use(cors())

const db = mysql.createConnection({
  user: 'root',
  host: process.env.SQL_HOST,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE
});

app.post('/create', (req, res) => {
  console.log(req.body)
  const name = req.body.name
  const age = req.body.age
  const country = req.body.country
  const position = req.body.position
  const wage = req.body.wage

  db.query('INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)', [name, age, country,position, wage], (err, result) => {
    if(err){
      console.log(err)
    }else{
      res.send(200).json()
    }
  }
  )
})

app.get('/employees', (req, res) => {
  db.query('SELECT * FROM employees', (err, result) => {
    if(err){
      console.log(err)
    }else{
      res.send(200).json(result)
    }
  })
});

app.put('/update', (req, res) => {
  const id = req.body.id
  const wage = req.body.wage
  db.query('UPDATE employees SET wage = ? WHERE id = ?', [wage, id], (err, result) => {
    if(err){
      console.log(err)
    }else{
      res.send(200).json(result)
    }
  })
})

app.delete('/delete', (req, res) => {
  const id = req.body.id
  db.query('DELETE FROM employees WHERE id = ?', id, (err, result) => {
    if(err){
      console.log(err)
    }else{
      res.send(200).json(result)
    }
  })
})

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => console.log(`server is running: ${PORT}`));