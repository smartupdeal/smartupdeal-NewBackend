require('dotenv').config();
const express = require('express');
// const compression = require('compression');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const keys = require('./server/config/keys');
const routes = require('./server/routes');

const { database, port } = keys;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit:'1mb'}));
app.use(cors());
app.use(passport.initialize());

//============================================== Connect to MongoDB  ==================================================//
// mongoose.set('useCreateIndex', true);
mongoose
  .connect(database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
  })
  .then(() =>
    console.log("//==== MongoDB Connected successfully ===//")
  ).then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });    
  })
  .catch(err => console.log(err));

require('./server/config/passport');
app.use(routes);

