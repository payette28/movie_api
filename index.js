const mongoose = require('mongoose');
const Models = require('./models.js');
mongoose.connect('mongodb://127.0.0.1:27017/cfDB', { useNewUrlParser: true, useUnifiedTopology: true });
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

let users = [
  {
    id: 1,
    name: 'Noraa',
    favoriteMovie: []
  },
  {
    id: 2,
    name: 'Aaron',
    favoriteMovie: []
  },
  {
    id: 3,
    name: 'Chris',
    favoriteMovie: []
  },
  {
    id: 4,
    name: 'Sam',
    favoriteMovie: []
  },
  {
    id: 5,
    name: 'Diana',
    favoriteMovie: []
  },
];

const movies = [
  {
    title: 'Avatar',
    description: 'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
    directors: {
      name: 'James Cameron',
      born: 'August 16th, 1954',
      bio: 'James Francis Cameron CC is a Canadian film director, screenwriter, and producer.',
    },
    year: '2009',
    genres: {
      name: 'Sci-Fi',
    },
  },

  {
    title: 'Avengers: Endgame',
    description: 'After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos actions and restore balance to the universe.',
    directors: {
      name: 'Anthony Russo',
      born: 'February 3rd 1970',
      bio: 'Anthony J. Russo is an American filmmaker and producer who works alongside his brother Joseph Russo.',
    },
    year: '2019',
    genres: {
      name: 'Sci-Fi',
    },
  },
  {
    title: 'Avatar: The Way of Water',
    description: 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Navi race to protect their home.',
    directors: {
      name: 'James Cameron',
      born: 'August 16th, 1954',
      bio: 'James Francis Cameron CC is a Canadian film director, screenwriter, and producer.',
    },
    year: '2022',
    genres: {
      name: 'Sci-Fi',
    },
  },
  {
    title: 'Titanic',
    description: 'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.',
    directors: {
      name: 'James Cameron',
      born: 'August 16th, 1954',
      bio: 'James Francis Cameron CC is a Canadian film director, screenwriter, and producer.',
    },
    year: '1997',
    genres: {
      name: 'Drama',
    },
  },
  {
    title: 'Star Wars: Episode VII - The Force Awakens',
    description: 'As a new threat to the galaxy rises, Rey, a desert scavenger, and Finn, an ex-stormtrooper, must join Han Solo and Chewbacca to search for the one hope of restoring peace.',
    directors: {
      name: 'J.J Abrams',
      born: 'June 27th, 1966',
      bio: 'Jeffrey Jacob Abrams is an American filmmaker and composer.',
    },
    year: '2015',
    genres: {
      name: 'Sci-Fi',
    },
  },
  {
    title: 'Avengers: Infinity War',
    description: 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.',
    directors: {
      name: 'Anthony Russo',
      born: 'February 3rd 1970',
      bio: 'Anthony J. Russo is an American filmmaker and producer who works alongside his brother Joseph Russo.',
    },
    year: '2018',
    genres: {
      name: 'Sci-Fi',
    },
  },
  {
    title: 'Spider-Man: No Way Home',
    description: 'With Spider-Mans identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.',
    directors: {
      name: 'Jon Watts',
      born: 'June 28th, 1981',
      bio: 'Jonathan Watts is an American filmmaker.',
    },
    year: '2015',
    genres: {
      name: 'Sci-Fi',
    },
  },
  {
    title: 'Jurassic World',
    description: 'A new theme park, built on the original site of Jurassic Park, creates a genetically modified hybrid dinosaur, the Indominus Rex, which escapes containment and goes on a killing spree.',
    directors: {
      name: 'Colin Trevorrow',
      born: 'September 13th, 1976',
      bio: 'Colin Trevorrow is an American filmmaker.',
    },
    year: '2015',
    genres: {
      name: 'Sci-Fi',
    },
  },
  {
    title: 'The Lion King',
    description: 'After the murder of his father, a young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.',
    directors: {
      name: 'Jon Favreau',
      born: 'October 19th, 1966',
      bio: 'Jonathan Kolia Favreau is an American filmmaker and actor.',
    },
    year: ' 2019',
    genres: {
      name: 'Adventure',
    },
  },
  {
    title: 'The Avengers',
    description: 'Earths mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.',
    directors: {
      name: 'Joss Whedon',
      born: 'June 23rd, 1964',
      bio: 'Joseph Hill Whedon is an American screenwriter, director, producer and comic book writer.',
    },
    year: ' 2012',
    genres: {
      name: 'Sci-Fi',
    },
  },
];

// Get all users
app.get('/users', async (req, res) => {
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
app.get('/users/:username', async (req, res) => {
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
app.post('/users', async (req, res) => {
await Users.findOne({ username: req.body.username })
  .then((user) => {
    if (user) {
      return res.status(400).send(req.body.username + 'already exists');
    } else {
      Users
        .create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
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
app.get('/movies', (req, res) => {
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
app.get('/movies/:title', (req, res) => {
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
app.get('/movies/genres/:genreName', (req, res) => {
  Movies.find({ 'genre.name': req.params.genreName })
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((err) => {
      res.status(500).send('Error: ' + err);
    });
});

//Search for movies by director
app.get('/movies/directors/:directorsName', (req, res) => {
  Movies.find({ 'director.name': req.params.directorsName })
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((err) => {
      res.status(500).send('Error: ' + err);
    });
});

// Add a movie to a user's list of favorites
app.post('/users/:username/movies/:MovieID', async (req, res) => {
  await Users.findOneAndUpdate({ username: req.params.userName }, {
     $push: { FavoriteMovies: req.params.MovieID }
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
app.delete('/users/:username/:movieTitle', (req, res) => {
  Movies.findOneAndRemove({ title: req.params.movieTitle }).then((movies) => {
    if (!movies) {
      res.status(400).send(req.params.movieTitle + 'was not found');
    } else {
      res.status(200).send(req.params.movieTitle + ' was deleted');
    }
  });
});

// Update a user's info, by username
  app.put('/users/:username', async (req, res) => {
      await Users.findOneAndUpdate({ username: req.params.username }, { $set:
        {
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
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
app.delete('/users/:username', async (req, res) => {
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

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
