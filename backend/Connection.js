var mysql = require("mysql2")

var connection= mysql.createConnection({
 
      host:"localhost",
      user:"root",
      password:"1234"
})

connection.connect(function(err){
    if(err){
        console.log("connection connection failed")
    }
    else{
        console.log("connection built")
    }
})

module.exports=connection