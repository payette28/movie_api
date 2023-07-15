const express = require('express');
bodyParser = require('body-parser'),
uuid = require('uuid');

const app = express();

const morgan = require('morgan');

app.use(bodyParser.json());

let users = [
   {
    id: 1,
    name: 'Noraa',
    favoriteMovie:[]
   },
   {
    id: 2,
    name: 'Aaron',
    favoriteMovie:[]
   },
   {
    id: 3,
    name: 'Chris',
    favoriteMovie:[]
   },
   {
    id: 4,
    name: 'Sam',
    favoriteMovie:[]
   },
   {
    id: 5,
    name: 'Diana',
    favoriteMovie:[]
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
        description:'After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos actions and restore balance to the universe.',
        directors: {
            name: 'Anthony Russo',
            born: 'February 3rd 1970',
            bio:  'Anthony J. Russo is an American filmmaker and producer who works alongside his brother Joseph Russo.',
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
        description:'As a new threat to the galaxy rises, Rey, a desert scavenger, and Finn, an ex-stormtrooper, must join Han Solo and Chewbacca to search for the one hope of restoring peace.',
        directors: {
            name:'J.J Abrams',
            born:'June 27th, 1966',
            bio:'Jeffrey Jacob Abrams is an American filmmaker and composer.',
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
            bio:  'Anthony J. Russo is an American filmmaker and producer who works alongside his brother Joseph Russo.',
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
            name:'Jon Watts',
            born:'June 28th, 1981',
            bio:'Jonathan Watts is an American filmmaker.',
        },
        year: '2015',
        genres: {
            name: 'Sci-Fi',
        },
    },
    {
        title: 'Jurassic World',
        description:'A new theme park, built on the original site of Jurassic Park, creates a genetically modified hybrid dinosaur, the Indominus Rex, which escapes containment and goes on a killing spree.',
        directors: {
            name:'Colin Trevorrow',
            born:'September 13th, 1976',
            bio:'Colin Trevorrow is an American filmmaker.',
        },
        year: '2015',
        genres: {
            name: 'Sci-Fi',
        },
    },
    {
        title: 'The Lion King',
        description:'After the murder of his father, a young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.',
        directors: {
            name:'Jon Favreau',
            born:'October 19th, 1966',
            bio:'Jonathan Kolia Favreau is an American filmmaker and actor.',
        },
        year: ' 2019',
        genres: {
            name: 'Adventure',
        },
    },
    {
        title: 'The Avengers',
        description:'Earths mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.',
        directors: {
            name:'Joss Whedon',
            born:'June 23rd, 1964',
            bio:'Joseph Hill Whedon is an American screenwriter, director, producer and comic book writer.',
        },
        year: ' 2012',
        genres: {
            name: 'Sci-Fi',
        },
    },
];

app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        user.favoriteMovie.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user's favorites`);
    } else {
        res.status(404).send('User not found.')
    }
}); 

app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find(movie => movie.title === title);

    if (movie) {
        res.status(200).json(movie); 
    } else {
        res.status(404).send('Could not find that movie.');
    }
});

app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        user.favoriteMovie = user.favoriteMovie.filter(title => title!==movieTitle)
        res.status(200).send(`${movieTitle} has been removed from user's favorites`);
    } else {
        res.status(404).send('User not found.')
    }
}); 

app.get('/movies/genres/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find(movie => movie.genres.name === genreName).genres;

    if (genre) {
        res.status(200).json(genre); 
    } else {
        res.status(404).send('Could not find that genre.');
    }
});

app.get('/movies/directors/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find(movie => movie.directors.name === directorName).directors;

    if (director) {
        res.status(200).json(director); 
    } else {
        res.status(404).send('Could not find that genre.');
    }
});

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        users = users.filter(user => user.id != id);
        res.status(200).send(`User ${id} has been deleted`);
    } else {
        res.status(404).send('User not found.')
    }
}); 

app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser);
    } else {
        res.status(400).send('Name field required.');
    }
});

app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find(user => user.id == id);

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('User not found.')
    }
}); 

app.get('/movies', (req, res) => {
    res.status(200).json(movies);
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
