const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  type: {
      type: String,
      trim: true,
      required: true
  },

  name: {
      type: String,
      trim: true,
      require: true
  },

  duration: {
      type: Number,
      required: true
  }, 

  weight: Number,
  reps: Number,
  sets: Number,
  distance: Number
});

const WorkoutSchema = new Schema({
  day: {
      type: Date,
      require: true
  },
  exercises: [ExerciseSchema]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;