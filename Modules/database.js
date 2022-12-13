const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  database: "todo_list",
  user: "root",
  password: "Ss.09308",
});

connection.connect(function (error) {
  if (error) {
    throw error;
  }else 
  {
    console.log("Connected succesfully ")
  }
});
module.exports=connection;
