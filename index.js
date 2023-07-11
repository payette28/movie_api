const express = require('express');
const app = express();

const morgan = require('morgan');

const topMovies = [
    {
        title: 'Avatar',
        director: 'James Cameron',
        year: '2009'
    },
    {
        title: 'Avengers: Endgame',
        director: 'Anthony Russo, Joe Russo',
        year: '2019'
    },
    {
        title: 'Avatar: The Way of Water',
        director: 'James Cameron',
        year: '2022'
    },
    {
        title: 'Titanic',
        director: 'James Cameron',
        year: '1997'
    },
    {
        title: 'Star Wars: Episode VII - The Force Awakens',
        director: 'J.J Abrams',
        year: '2015'
    },
    {
        title: 'Avengers: Infinity War',
        director: 'Anthony Russo',
        year: '2018'
    },
    {
        title: 'Spider-Man: No Way Home',
        director: 'Jon Watts',
        year: '2015'
    },
    {
        title: 'Jurassic World',
        director: 'Colin Trevorrow',
        year: '2015'
    },
    {
        title: 'The Lion King',
        director: 'Jon Favreau',
        year: ' 2019'
    },
    {
        title: 'The Avengers',
        director: 'Joss Whedon',
        year: ' 2012'
    }
];


app.get('/movies', (req, res) => {
    res.json(topMovies);
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
