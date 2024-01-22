// import express application
const express = require("express");

// import body-paeser module
const bodyParser = require("body-parser");

// import bcrypt
const bcrypt = require("bcrypt");

// import mongoose module
const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/validation');

// import path
const path = require("path");

// import jsonwebtoken module
const jwt = require('jsonwebtoken');

// import express-session module
const session = require('express-session');


// create express apllication
const app = express();

// configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Security configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with , Authorization, expiresIn"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, PATCH, PUT"
    );
    next();
});

// Session Configuration
const secretKey = 'your-secret-key';
app.use(session({
secret: secretKey,
}));

// Models Importation
const User = require("./models/user");
const Task = require("./models/task");

// BL:SIGNUP
app.post("/users/signup",(req, res) => {
    console.log("here into BL: Signup", req.body);
    User.findOne({ tel: req.body.tel }).then((doc) => {
        if (doc) {
            res.json({ msg: "oops,tel exists" });

        } else {
            bcrypt.hash(req.body.password, 8).then((cryptedPwd) => {
                console.log("here crypted pwd", cryptedPwd);
                req.body.password = cryptedPwd;
            
                let user = new User(req.body);
                user.save((err, doc) => {
                    if (err) {
                        res.json({ msg: "failed" });
                    } else {
                        res.json({ msg: "added with succes" });
                    }
                });
            });
        }
    })
});

// Business Logic:Login
app.post("/users/login", (req, res) => {
    console.log("here into BL: Login", req.body);
    let result;
    User.findOne({ tel: req.body.tel })
        .then((doc) => {
            console.log("here finded User by tel", doc);
            if (!doc) {
                return res.json({ msg: "please check your tel" });
            }
            else {
                result = doc;
                bcrypt.compare(req.body.password, doc.password).then((pwdCompare) => {
                    console.log("here pwdCompare", pwdCompare);
                    if (pwdCompare) {
                        const token = jwt.sign({ 
                            firstName: result.firstName,
                            lastName: result.lastName, 
                            id: result._id,
                            role:result.role 
                        }, 
                            secretKey, { expiresIn:'1h' });
                        res.json({
                            msg: "welcome",
                            token: token
                        });
                    } else {
                        res.json({ msg: "please check your pwd" });
                    }
                }
        )};
            
        });
});

// Business Logic: get all tasks
app.get("/tasks", (req, res) => {
    console.log("here into BL: get all tasks");
    Task.find().populate("employee").then((docs) => {
        res.json({ tasks: docs });
    });

});

// Business Logic:get task by id
app.get("/tasks/:id", (req, res) => {
    console.log("here into BL: get task by id");
    Task.findById(req.params.id).then((doc) => {
        res.json({ task: doc });
    });
});

// Business Logic:Edit task
app.put("/tasks", (req, res) => {
    console.log("here into BL: Edit Task");
    let newTask = req.body;
    Task.updateOne({ _id: req.body._id }, newTask).then((updateResponse) => {
        console.log("here response after update", updateResponse);
        if (updateResponse.nModified == 1) {
            res.json({ isUpdated: true });
        } else {
            res.json({ isUpdated: false });
        }

    });

});

// Business Logic:Delete task
app.delete("/tasks/:id", (req, res) => {
    console.log("here into BL: Delete task");
    let taskId = req.params.id;
    Task.deleteOne({ _id: taskId }).then((deleteResponse) => {
        console.log("here response after delete", deleteResponse);
        if (deleteResponse.deletedCount == 1) {
            res.json({ msg: "is deleted" });
        } else {
            res.json({ msg: "error" });
        }


    });
});

//Business Logic: get all users
app.get("/users", (req, res) => {
    console.log("here into BL: Get All Users");

    User.find().then((docs) => {
        res.json({ users: docs });
    })
});

//Business Logic: add task
app.post("/tasks", (req, res) => {
    console.log("here into BL : add task ");
    
    User.findById(req.body.idEmployee).then((employee)=>{
        console.log("here founded employer",employee);
        if (!employee) {
            res.json({msg: "employee not found"})
        } else {
            let task = new Task({
                title:req.body.title,
                description: req.body.description,
                timing:req.body.timing,
                status:req.body.status,
                employee : employee._id
            })
            task.save((err,doc)=>{
            if (err) {
                res.json({msg:"error"})
            } else {
                employee.task = doc._id;
                employee.save()
               res.json({ msg: "Added with success" })
            }
            })
        }
        
    })
    
 });

//  B.l: get Task For Employee
 app.get("/tasks/employee/:employee", (req, res) => {
    console.log("here get tasks for employee");
   const idEmployee=req.params.employee;
    Task.find({employee:idEmployee}).populate("employee").then((docs) => {
        res.json({ tasks: docs });
    })
});

// business logic: accept Task
app.get("/tasks/acceptTask/:id",(req,res)=>{
    console.log("here accept task");
    Task.updateOne({ _id: req.params.id},{status:"accepted"}).then((updateResponse) => {
        console.log("here response after update", updateResponse);
        if (updateResponse.nModified == 1) {
            res.json({ isUpdated: true });
        } else {
            res.json({ isUpdated: false });
        }
    });
});

// business logic: refuse Task
app.get("/tasks/refuseTask/:id",(req,res)=>{
    console.log("here refuse task");
    Task.updateOne({ _id: req.params.id},{status:"refused"}).then((updateResponse) => {
        console.log("here response after update", updateResponse);
        if (updateResponse.nModified == 1) {
            res.json({ isUpdated: true });
        } else {
            res.json({ isUpdated: false });
        }
    });
});

// make app importable from another files
module.exports = app;