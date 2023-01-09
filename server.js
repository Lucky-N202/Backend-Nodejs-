const express = require('express');
const cors = require("cors");

const cookieParser = require('cookie-parser');
const { urlencoded } = require('express');



const app = express();

var corsOptions = {
    origin: "http://localhost:4200"
  };

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({extended: true}));


const connection = require('./app/config/db.config');

const app_routes = require('./app/routes');
const user_routes = require('./app/routes/user.routes')


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});
app.use(cors());


app.get("/", (req, res) =>{
    res.json({message: "Welcome!!!!"})
});



app.use("/api/v1", app_routes);

// routes

app.use("/api/v1", user_routes);


const PORT = process.env.PORT || 7500;

app.listen(PORT, async()=>{
    await connection();
    console.log(`Listening on Port ${PORT}`);
});