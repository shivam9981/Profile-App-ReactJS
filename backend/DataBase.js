const mongoose = require('mongoose');

const string = `mongodb://localhost:27017`



const connectTomongodb = ()=>{
    try{
        console.log("done")
        mongoose.connect(string,{
            useNewUrlparser: true,
            useUnifiedTopology: true,
            
        }),
            console.log("connect To database")
    }
    catch(err){
        console.log("error occure")
        console.log(err);
    }
}

module.exports =  connectTomongodb;