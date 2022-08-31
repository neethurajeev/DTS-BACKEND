// database connection

// import mongoose
const mongoose=require('mongoose')

// connection string to connect db with server
mongoose.connect('mongodb://localhost:27017/bankAPIServer',{
    useNewUrlParser:true
})

// create model
const User = mongoose.model('User',{
    
    uname:String,
    ph:Number,
    dob:Number,
    address:String,
    post:String,
    pin:Number,
    type:String,
    acno:Number,
    password:String,
    balance:Number,
    transaction:[]
})

// export
module.exports={
    User
}
