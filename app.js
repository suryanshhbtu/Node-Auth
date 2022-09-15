const express = require("express"); // imporing express
const app = express(); // declaring app as express function
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./api/routes/user");


// Handling CORS Errors -> Cross-Origin-Resourse-Sharing
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

mongoose.connect(
    "mongodb+srv://suryanshhbtu:" +
    process.env.MONGO_ATLAS_PW +    // to cope up with Hardcoding -> refer nodemon.json -> contains password
    "@cluster0.t1zpklg.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true  //NEW
        // useMongoClient: true,  //OLD        // using Mongodb client to connect to database
    }
);

app.use(morgan("dev")); // this will log in terminal using dev style string
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', userRoutes);


app.use((error, req, res, next) => {
    res.status(error.status || 500); // get status or using 500 by default
    res.json({
      // returning json instead of html
      error: {
        message: error.message,
      },
    });
  });


module.exports = app; // exporting app