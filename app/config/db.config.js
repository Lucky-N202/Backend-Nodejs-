require("dotenv").config();

const db_connection = `mongodb+srv://${process.env.HOST}:${process.env.PASSWORD_DB}@cluster1.ekiux.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;

module.exports = db_connection;