require('dotenv').config();
const express = require('express');
// const compression = require('compression');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');

const keys = require('./config/keys');
// const webpackConfig = require('../webpack.config');
const routes = require('./routes');

const { database, port } = keys;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit:'1mb'}));
app.use(cors());
app.use(passport.initialize());

// Connect to MongoDB
// mongoose.set('useCreateIndex', true);
mongoose
  .connect(database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
  })
  .then(() =>
    console.log("//==== MongoDB Connected successfully ===//")
  )
  .catch(err => console.log(err));

require('./config/passport');
app.use(routes);

// if development
// if (process.env.NODE_ENV !== 'production') {
//   const compiler = webpack(webpackConfig);
//   app.use(
//     historyApiFallback({
//       verbose: false
//     })
//   );

//   app.use(
//     webpackMiddleware(compiler, {
//       publicPath: webpackConfig.output.publicPath,
//       contentBase: path.resolve(__dirname, '../client/public'),
//       stats: {
//         colors: true,
//         hash: false,
//         timings: true,
//         chunks: false,
//         chunkModules: false,
//         modules: false
//       }
//     })
//   );

//   app.use(webpackHotMiddleware(compiler));
//   app.use(express.static(path.resolve(__dirname, '../dist')));
// } else {
//   app.use(compression());
//   app.use(express.static(path.resolve(__dirname, '../dist')));
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../dist/index.html'));
//   });
// }

app.listen(port, () => {
  console.log("http://localhost:3000");
});
