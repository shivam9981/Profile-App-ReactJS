const express = require('express');
const app = express();
const cors = require('cors');
const port =  process.env.port || 8000;
const connectTomongodb = require('./DataBase')
app.use(express.json())
app.use(cors());
connectTomongodb()



app.use('/Api/Auth',require('./routes/signUP'))
app.listen(port, ()=>{  
    console.log(`student management system backend run by ${port}`)
})