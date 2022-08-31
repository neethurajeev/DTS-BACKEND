// import jsonwebtoken library
// const { sign } = require('jsonwebtoken')
const jwt=require('jsonwebtoken')

// import db 
const db=require('./db')

// database
database ={
    1000:{uname:"Arisha Barron",ph:123456789,dob:22333,address:"Address1",post:"Dubai",pin:123456,type:"Savings",acno:123,password:123,balance:5000,transaction:[]},
    1001:{uname:"Branden Gibson",ph:123456749,dob:2233,address:"Address2",post:"Dubai2",pin:1234456,type:"Savings",acno:1234,password:1234,balance:5000,transaction:[]},
    1002:{uname:"Rhonda Church",ph:123456789,dob:233,address:"Address3",post:"Dubai",pin:123456,type:"Savings",acno:12345,password:12345,balance:5000,transaction:[]},
    1003:{uname:"Georgina Hazel",ph:123456789,dob:233,address:"Address4",post:"Dubai",pin:123456,type:"Savings",acno:123456,password:123456,balance:5000,transaction:[]}

  }
   // register-
  const register=(uname,ph,dob,address,post,pin,type,acno,password)=>
  {
    // asynchronous
    return db.User.findOne({acno})
    .then(user=>{
      if(user){

        // already existing acno
        return{
          statusCode:401,
          status:false,
          message:"Account number already exist"
        }
      }
      else{
        const  newUser=new db.User({
        // add details in to db
          
          uname,
          ph,
          dob,
          address,
          post,
          pin,
          type,
          acno,
          password,
          balance:0,
          transaction:[]
          
        
    })
    newUser.save()
      // status 200 cases
      return{
        statusCode:200,
        status:true,
        message:"Sucessfully Registered"
      } 
    }
  })

     
  }
  
  // login 

  const login=(acno,pwd)=>{
    return db.User.findOne({acno,password:pwd})
    .then(user=>{
      if(user){
        currentUser=user.uname 
        currentAcno=acno
        // console.log( currentAcno + " currentAcno in login");
        const token=jwt.sign({ 
          currentAcno:acno
        },'secret123445') 
        return {
          statuscode:200,
          status:true,
          message:" Login Succesful ",
          token,
          currentUser,
          currentAcno
        }
      }
      else{
        return {
          statuscode:422,
          status:false,
          message:"Invalid Credentials"
  
        }

      }
    })
  }

  // deposit
  const deposit=(acno,pwd,amt)=>{
    var  amount=parseInt(amt)
    return db.User.findOne({acno,password:pwd})
    .then(user=>{
      console.log(user);
      if(user){
          user.balance+=amount
          user.transaction.push(
            {
             type:"credit",
             amount:amount
            }
          )
          user.save()
                 return {
            statuscode:200,
            status:true,
            message:amount+"Succesfully deposited.. and new balance is :"+  user.balance
    
          }
  
        }
        else{
          return {
            statuscode:401,
            status:false,
            message:"invalid credentials"
    
          }
  
        }
     }
    )}
   

// withdraw
const withdraw=(req,acno,pwd,amt)=>{
  var  amount=parseInt(amt)
  console.log(acno + "acno in withdraw");

  return db.User.findOne({acno,password:pwd})
  .then(user=>{
    if(req.currentAcno!=acno){
      console.log(req.currentAcno +"currentAcno in withdraw");
      return {
        statuscode:422,
        status:false,
        message:"operation denied!!!"
      }
    }

 if(user){
  if (user.balance>amount){
    user.balance-=amount
    user.transaction.push(
      {
       type:"debit",
       amount:amount
      }
    )
//console.log(database);
user.save()
    return {
      statuscode:200,
      status:true,
      message:amount+"succesfully debited.. and new balance is :"+  user.balance

    }

  }


        else{
          return {
            statuscode:401,
            status:false,
            message:"Insufficient balance!!!"
          }
        }
  }
      else {
        return {
          statuscode:401,
          status:false,
          message:"Invalid credentials!!!!"
        }
      }
  })
}
 
 
 

// Transaction history
const transaction=(acno)=>{
  return db.User.findOne({acno})
  .then(user=>{
    if(user){

     return{
      statuscode:200,
      status:true,
      transaction:user.transaction
     }
   }
   else{
    return {
      statuscode:401,
      status:false,
      message:"User does not exist !!!!"

     }
    }
 }
  )}


// Export
module.exports={
    register,
    login,
    deposit,
    withdraw,
    transaction
   

}
