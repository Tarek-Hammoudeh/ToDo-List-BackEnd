var express = require("express");
let  router = express.Router();
let TasksClass = require("./../Modules/Tasks");
let Tasks = new TasksClass();
var json = require("./../db/data");
var fs = require("fs");
var database = require("./../Modules/database");
const pdfService = require('./pdfGenerator/pdf_file');
const app = require("../app");
// GET home page.**************************************** 
router.get("/", function (req, res, next) {
  res.render("index", { title: "To Do List" });
});
//get all tasks json
router.get("/tasks", function (req, res, next) {
  Tasks.getTasks(req, res);
});
// add task to the json list
router.post("/add_task", function (req, res, next) {
  Tasks.addTask(req, res);
});
// remove task by id json
router.delete("/remove_task/:id", function (req, res, next) {
  Tasks.removeTask(req, res);
});


//get pdf file :**********************************
router.get('/pdf', (req, res, next) => {
  const stream = res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment;filename=ToDo.pdf`,
  });
  pdfService.buildPDF(
    (chunk) => stream.write(chunk),
    () => stream.end()
  );
});
//get all tasks My SQL************************************
router.get("/tasks_db", function (req, res, next) {
  Tasks.getDbTasks(req, res);
});
// add task to the MySQL list
router.post("/add_task_db", function (req, res, next) {
  Tasks.addDbTasks(req, res);
  console.log(req.body)
});
// remove task by id MYSQL
router.delete("/remove_task_db/:id", function (req, res, next) {
  Tasks.removeDbTask(req, res);
});
//get task bu ID
router.get("/task/:id", function (req, res) {
  var id = req.params.id; // will contains data from :id, the + is to parse string to integer
  var task = json.find((t) => t.id === id); // find user from users using .find method
  res.send(task); // send the data
});
module.exports = router;
