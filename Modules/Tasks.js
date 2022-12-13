const jsonfile = require("jsonfile");
const connection = require("./../Modules/database");
const file = "db/data.json";
var database = require("./../Modules/database");
const PDFDocument = require("pdfkit");
const fs = require("fs");

class Tasks {
    //get using json as DB
    getTasks(req, res) {
        jsonfile
            .readFile(file)
            .then((obj) => {
                res.send(obj).end;
            })
            .catch((error) => console.error(error));
    }

    //Add using json as DB
    addTask(req, res) {
        let taksName = req.body.task;

        console.log(req.body.task);

        jsonfile
            .readFile(file)
            .then((obj) => {
                //the data that recieved from client(postman) we push it into obj

                obj.push({
                    id: parseInt(Math.round(obj.length + 1)),
                    task: taksName,
                });

                jsonfile
                    .writeFile(file, obj)
                    .then((res) => {
                        console.log("Write complete");
                    })
                    .catch((error) => console.error(error));

                res.send(obj).end;
            })
            .catch((error) => console.error(error));
    }

    // add using json as DB
    addTask(req, res) {
        let taksName = req.body.task;

        console.log(req.body.task);

        jsonfile
            .readFile(file)
            .then((obj) => {
                //the data that recieved from client(postman) we push it into obj

                obj.push({
                    id: parseInt(Math.round(obj.length + 1)),
                    task: taksName,
                });

                jsonfile
                    .writeFile(file, obj)
                    .then((res) => {
                        console.log("Write complete");
                    })
                    .catch((error) => console.error(error));

                res.send(obj).end;
            })
            .catch((error) => console.error(error));
    }

    //REMOVE FROM JSON DB
    removeTask(req, res) {
        let id = parseInt(req.params.id);
        console.log(id);

        jsonfile
            .readFile(file)
            .then((obj) => {
                let index = obj.findIndex((task) => task.id === id);

                // incase we need to update an element context :
                // this request is pull request .
                //   obj[index]= {"id":4,"task":""}

                let deleted = obj.splice(index, 1);
                console.log(deleted);
                console.log(obj);
                // obj.push(deleted)

                jsonfile
                    .writeFile(file, obj)
                    .then((res) => {
                        console.log("Write complete");
                    })
                    .catch((error) => console.error(error));

                res.send(obj).end;
            })
            .catch((error) => console.error(error));
    }

    //get using MySQL as DB
    getDbTasks(req, res) {
        let sql = "SELECT * FROM todo_tbl";
        let query = connection.query(sql, (err, results) => {
            if (err) throw err;
            console.log(results);
            console.log(err);

            res.send(results).end;
        });
    }
    //add using MySQL as DB
    addDbTasks(req, res) {
        let task = req.body.task;
        let add = {task_name: task};
        let sql = "INSERT INTO todo_tbl SET ?";
        let query = connection.query(sql, add, (err, results) => {
            if (err) throw err;
            console.log(results);

            res.send(results).end;
        });
    }

    // REMOVE FROM MYSQL DB
    removeDbTask(req, res) {
        const id= req.params.id
        console.log(req.params)
        const sql = "DELETE FROM todo_tbl WHERE task_id= ?"
        connection.query(sql,id , (err, results) => {
            if (err) throw err;
            console.log(results);
            res.send("results").end;
        });
    }

    // //Updating using my sql
    // updateDb(res, req) {
    //     const id = req.body.task_id
    //     let task = req.body.task_name;
    //
    // }


    //GENERATE PDF FILE
    generatPdf(dataCallBack, endCallBack) {
        const doc = new PDFDocument();
        doc.on('data', dataCallBack);
        doc.on('end', endCallBack);
        doc
            .fontSize(25)
            .text('this is new pdf ')
        doc.end();
    }
}

module.exports = Tasks;


// let task = req.body.task_name;
//   let add = { task_name: task };
//   let query = connection.query(sql, add, (err, results) => {
//     if (err) throw err;
//     console.log(results);

//     res.send(results).end;
//   });
