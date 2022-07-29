const mongoose =require( 'mongoose');
const ENV_DEV = require("./config")
  const db=async()=>{
    try {
       let db=await mongoose.connect('mongodb://localhost/my_database');
       console.log("Db Connected")
    } catch (error) {
        console.log(error);
        
    }
 }
db()
 