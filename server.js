const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const db = require("./models");
// const Workout = require("./models/workout.js")

const PORT = process.env.PORT || 3001;

const app = express();

// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });



app.get("/api/workouts", (req, res) =>{
    db.Workout.find({})
    .then((dbworkouts) => {  
      res.json(dbworkouts);
    })
    .catch(err => {
        res.json(err);
      });
  });
  
  
  app.put("/api/workouts/:id", (req, res) =>{
  
    console.log(req.body)
  
    db.Workout.update({"_id": req.params.id}, {
  
     $push:{exercises: req.body}
    })
    .then((dbworkout)=>{
      res.json(dbworkout)
    })
    .catch(err => {
        res.json(err);
      });
  });
  
  app.post("/api/workouts/", (req, res) =>{
    db.Workout.create(req)
    .then((dbworkout)=>{
      res.json(dbworkout)
    })
    .catch(err => {
        res.json(err);
      });
  });
  
  app.get("/api/workouts/range", (req, res) =>{
    db.Workout.find({}).then((dbworkouts)=>{  
      res.json(dbworkouts);
    })
    .catch(err => {
        res.json(err);
      });
  });
  
  //HTML ROUTES
  
  app.get("/stats", (req, res) =>{
    res.sendFile(path.join(__dirname + '/public/stats.html'));
  });
  
  app.get("/exercise", (req, res) =>{
    res.sendFile(path.join(__dirname + '/public/exercise.html'));
  });
  
  
  //Start Server
  
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });