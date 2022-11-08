const mysql = require('mysql');
require(`dotenv`).config();

const connection = mysql.createConnection({
  host:process.env.DB_HOST,
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_DATABASE
})

connection.connect(err =>{
    let message = !err ? 'Databse is connected' : 'connecttion failed';
    console.log(`myssql : ${message}`) 
})

module.exports = connection