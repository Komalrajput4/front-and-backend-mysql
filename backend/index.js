var express=require("express")
var cors=require("cors")
var connection=require("./Connection")

var app= express()

app.use(express.json())
app.use(cors());

app.post("/login", function (req, resp) {
const username = req.body.username;
const password = req.body.password;


  connection.query(
    "SELECT * FROM `flipkart`.`users` WHERE Username = ? AND Password = ?",
    [username, password],
    function (err, result) {
      if (err) {
        console.log("Login query failed", err);
        resp.send({  message: "Server error"  });
      } else if (result.length > 0) {
        console.log("Login successful", result);
        resp.send({  message: "Login successful", success: result });
      } else {
        console.log("Wrong username or password");
        resp.send({  message: "Wrong username or passwordss" });
      } 
    }
  );
});


// Delete all records
app.delete("/deleteAll", function (req, resp) {
  connection.query("DELETE FROM `flipkart`.`data`", function (err, result) {
    if (err) {
      console.log("All data is not deleted", err);
      resp.status(500).send({ message: "All data is not deleted", error: err });
    } else {
      console.log("All data deleted successfully", result);
      resp.status(200).send({ message: "All data deleted successfully", data: result });
    }
  });
});


app.get("/fetch",function(req,resp){
    connection.query("Select * from `flipkart`.`data`" , function(err,result){
        if(err){
            console.log("Data can not fatch")
            resp.send("Data can not fatch")
        }
        else{
            console.log("Data fetch successfully ",result)
            resp.send({message:"Data fetch successfullt", data:result})
        }
    })
})


app.post("/insert", function(req, resp) {
  connection.query(
    "INSERT INTO `flipkart`.`data` (`Name`, `Phone`, `Address`) VALUES (?, ?, ?)",
    [req.body.Name, req.body.Phone, req.body.Address],
    function(err, result) {
      if (err) {
        console.log({ message: "Data is not inserted", error: err });
        // Always send valid JSON
        resp.send({ message: "Data is not inserted", error: err });
      } else {
        console.log({ message: "Data is inserted", data: result });
        resp.send({ message: "Data is inserted", data: result });
      }
    }
  );
});






app.delete("/del/:id", function (req, resp) {
  const userId = req.params.id;
  connection.query(
    "DELETE FROM `flipkart`.`data` WHERE `ID` = ?",
    [userId],
    function (err, result) {
      if (err) {
        console.log("Data is not deleted", err);
        resp.send("Data is not deleted");
      } else {
        console.log("Data deleted successfully", result);
        resp.send({ message: "Data deleted successfully", data: result });
      }
    }
  );
});



app.put("/update/:id", function (req, resp) {
    var userId = req.params.id;

    connection.query(
        "UPDATE `flipkart`.`data` SET Name = ?, Phone = ?, Address = ? WHERE ID = ?",
        [req.body.Name, req.body.Phone, req.body.Address, userId],
        function (err, result) {
            if (err) {
                console.log("Data is not updated", err);
                resp.send("Data is not updated");
            } else {
                console.log("Data is updated successfully", result);
                resp.send({ message: "Data is updated successfully", data: result });
            }
        }
    );
});




app.listen(process.env.PORT || 3000,function(){
    console.log("server start successfully at port 3000")
})  