// import express, mongoose, mongojs, path packages
const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const mongojs = require("mongojs");

// PORT and db setup 
const PORT = process.env.PORT || 3000; 
const db = require("./models");

// init Express server and install middlewares 
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set static path directory
app.use(express.static("public"));

// connect to MongoDb
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

// Route for exercise page
app.get("/exercise", function (req, res) {
    res.sendFile(path.join(__dirname, "public/exercise.html"));
});

// Route for stats page
app.get("/stats", function (req, res) {
    res.sendFile(path.join(__dirname, "public/stats.html"));
});

// Route for 'api/workouts', find all documents from Workout collection
app.get('/api/workouts', (req, res)=>{
    db.Workout.find({})
        .then(data=>res.json(data))
        .catch(err=> res.json(err));
})

// Route for '/api/workouts/range'
app.get('/api/workouts/range', (req,res)=>{
    db.Workout.find({})
        .then(data=> res.json(data))
        .catch(err=> res.json(err));
})

// Route for posting a new Workout document
app.post('/api/workouts', ({ body }, res)=>{  
    db.Workout.create(body)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

// Route for adding a new exercise to exisiting workout
app.put('/api/workouts/:id', (req, res)=>{
    const id = mongojs.ObjectId(req.params.id);
    const exercise = req.body;
    db.Workout.update(
        {_id: id}, 
        {$push: {exercises: exercise}
    })
        .then(data=> res.json(data))
        .catch(err=> res.json(err));
})


// start the server 
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });  