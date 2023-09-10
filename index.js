const mongoose = require('mongoose');
const Models = require('./models.js');
// mongoose.connect('mongodb://127.0.0.1:27017/cfDB', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect( process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const Movies = Models.Movie;
const Users = Models.User;

const express = require('express');
bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const morgan = require('morgan');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

const { check, validationResult } = require('express-validator');

// Get all users
app.get('/users', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get a user by username
app.get('/users/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOne({ username: req.params.username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Add a user
app.post('/users', 
// Validation logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //which means "opposite of isEmpty" in plain english "is not empty"
  //or use .isLength({min: 5}) which means
  //minimum value of 5 characters are only allowed
  [
    check('username', 'username is required').isLength({min: 5}),
    check('username', 'username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('password', 'password is required').not().isEmpty(),
    check('email', 'email does not appear to be valid').isEmail()
  ], async (req, res) => {

  // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.password);
await Users.findOne({ username: req.body.username })
  .then((user) => {
    if (user) {
      return res.status(400).send(req.body.username + ' already exists');
    } else {
      Users
        .create({
          username: req.body.username,
          password: hashedPassword,
          email: req.body.email,
          birthday: req.body.birthday
        })
        .then((users) =>{res.status(201).json(users); })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      })
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

//gets a JSON object of all the current movies on the server
app.get('/movies', passport.authenticate('jwt', { session: false }), async (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Search for movies by title 
app.get('/movies/:title', passport.authenticate('jwt', { session: false }), (req, res) => {
Movies.findOne({ title: req.params.title })
  .then((movies) => {
    res.json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//Search for movies by genre
app.get('/movies/genres/:genrename', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find({ 'genre.name': req.params.genrename })
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((err) => {
      res.status(500).send('Error: ' + err);
    });
});

//Search for movies by director
app.get('/movies/directors/:directorsname', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find({ 'director.name': req.params.directorsname })
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((err) => {
      res.status(500).send('Error: ' + err);
    });
});

// Add a movie to a user's list of favorites
app.post('/users/:username/movies/:movieid', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndUpdate({ username: req.params.username }, {
     $push: { FavoriteMovies: req.params.movieid }
   },
   { new: true }) // This line makes sure that the updated document is returned
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//Allow users to delete movies from their favorites
app.delete('/users/:username/:movietitle', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOneAndRemove({ title: req.params.movietitle }).then((movies) => {
    if (!movies) {
      res.status(400).send(req.params.movietitle + ' was not found');
    } else {
      res.status(200).send(req.params.movietitle + ' was deleted');
    }
  });
});

// Update a user's info, by username
  app.put('/users/:username',
  [
    check('username', 'username is required').isLength({min: 5}),
    check('username', 'username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('password', 'password is required').not().isEmpty(),
    check('email', 'email does not appear to be valid').isEmail()
  ], async (req, res) => {

  // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.password);

      await Users.findOneAndUpdate({ username: req.params.username }, { $set:
        {
          username: req.body.username,
          password: req.hashedPassword,
          email: req.body.email,
          birthday: req.body.birthday
        }
      },
      { new: true }) // This line makes sure that the updated document is returned
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      })
    
    });

// Delete a user by username
app.delete('/users/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndRemove({ username: req.params.username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.username + ' was not found');
      } else {
        res.status(200).send(req.params.username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});
app.get('/', (req, res) => {
  res.send('Thank you!');
});

app.use(express.static('public'));

app.use(morgan('common'));

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});
