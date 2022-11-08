const mongoose = require('mongoose');


const userSchema =  mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        required:true,
    },
    mobile:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    date:{
        type: Date,
        default:Date.now
    },
    messagess:[
        {
            name:{
                type:String,
                require:true,
            },
            email:{
                type:String,
                required:true,
            },
            mobile:{
                type:Number,
                required:true,
            },
            textbox:{
                type:String,
                required:true,
            },      
        }
    ]
})


userSchema.methods.addmessage = async function(name ,email,mobile,textbox){
    try {
        this.messagess = this.messagess.concat({name ,email,mobile,textbox})
        await this.save()
        return this.messagess;
    } catch (error) {
        console.log(error)
    }
}
const User = mongoose.model('Users',userSchema);

module.exports = User;