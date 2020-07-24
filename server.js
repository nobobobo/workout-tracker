const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const mongojs = require("mongojs");

const PORT = process.env.PORT || 3000; 
const db = require("./models");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.get("/exercise", function (req, res) {
    res.sendFile(path.join(__dirname, "public/exercise.html"));
});

app.get("/stats", function (req, res) {
    res.sendFile(path.join(__dirname, "public/stats.html"));
});

app.get('/api/workouts', (req, res)=>{
    db.Workout.find({})
        .then(data=>res.json(data))
        .catch(err=> res.json(err));
})

app.get('/api/workouts/range', (req,res)=>{
    db.Workout.find({})
        .then(data=> res.json(data))
        .catch(err=> res.json(err));
})

app.post('/api/workouts', ({ body }, res)=>{  
    db.Workout.create(body)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

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

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });  