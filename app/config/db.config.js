require("dotenv").config();
const mongoose = require("mongoose");
const db = require("../models");
const Role = db.role;

const connection = ()=> {

  let db_connection = `mongodb+srv://${process.env.HOST}:${process.env.PASSWORD_DB}@cluster1.ekiux.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;
 return db.mongoose
  .connect(db_connection, {
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
  
};

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
  };

module.exports = connection;