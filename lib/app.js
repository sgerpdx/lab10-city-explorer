const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const request = require('superagent');
//const placesData = require('./places.js');
const weathersData = require('./weathers.js');
const { formatPlaceData } = require('./munge-utils.js');
//const places = require('./places.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging



// app.get('/api/test', (req, res) => {
//   res.json({
//     message: `in this proctected route, we get the user's id like so: ${req.userId}`
//   });
// });

// app.get('/animals', async (req, res) => {
//   try {
//     const data = await client.query('SELECT * from animals');

//     res.json(data.rows);
//   } catch (e) {

//     res.status(500).json({ error: e.message });
//   }
// });

// app.use(require('./middleware/error'));

// module.exports = app;


app.get('/location', async (req, res) => {
  try {
    const placeName = req.query.search;

    const placeData = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_API_KEY}&q=${placeName}&format=json`);

    const placeResponse = formatPlaceData(placeData.body);

    res.json(placeResponse);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});


app.get('/weather', async (req, res) => {
  try {

    const weatherData = weathersData.data.map(weatherDay => {
      return {
        forecast: weatherDay.weather.description,
        time: new Date(weatherDay.ts * 1000).toDateString(),
      }
    })


    res.json(weatherData);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});


// app.get('/reviews', async (req, res) => {
//   try {

//     const reviewData = reviewsData.data.map(reviewItem => {
//       return {
//         name: 'sushi go',
//         image_url: 'shshs',
//         price: '$4',
//         rating: 4.5,
//         url: 'shshss'
//       }
//     })


//     res.json(reviewData);
//   } catch (e) {

//     res.status(500).json({ error: e.message });
//   }
// });




app.use(require('./middleware/error'));

module.exports = app;
