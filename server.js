const express = require('express');
const cors = require("cors");
const cookieSession = require("cookie-session");
const { urlencoded } = require('express');



const app = express();

var corsOptions = {
    origin: "http://localhost:4200"
  };

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

// app.use(
//     cookieSession({
//         name: 'task-session',
//         secret: '',
//         httpOnly: true
//     })
// );

const db = require("./app/models");
const Role = db.role;
const dbConfig = require('./app/config/db.config');


db.mongoose
  .connect(dbConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },

  (err) => {
    if (err) {
    console.log("error in connection");
    process.exit();
    } else {
    console.log("mongodb is connected");
    initial();
    }});
  
  
  
  
  function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "moderator"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'moderator' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }


app.get("/", (req, res) =>{
    res.json({message: "Welcome!!!!"})
});




const PORT = process.env.PORT || 7500;

app.listen(PORT, ()=>{
    console.log(`Listening on Port ${PORT}`)
});