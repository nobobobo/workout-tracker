const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000; 
const db = require("./models");
const { Workout } = require('./models');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.get('/api/workouts', (req, res)=>{
    db.Workout.find({})
        .then(data=>res.json(data))
        .catch(err=> res.json(err));
})

app.post('/api/workouts', ({ body }, res)=>{
    const workout = new Workout(body);

    db.Workout.create(workout)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

app.put('/api/workouts/:id', (req, res)=>{
    const id = mongojs.ObjectId(req.params.id);
    const exercise = new Workout(req.body);
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