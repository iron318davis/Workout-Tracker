const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {type: Date, default:Date.now},
    excercises: [
        {
            type: {
                type: String,
                trim: true,
                required: "Type is required"
            },
            name: {
                type: String,
                trim: true,
                required: "Excercise name is required"
            },
            duration: {
                type: Number
            },
            distance: {
                type: Number
            },
            weight: {
                type: Number
            },
            reps: {
                type: Number
            },
            sets: {
                type: Number
            }
        }
    ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
