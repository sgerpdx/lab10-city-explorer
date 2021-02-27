const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const request = require('superagent');
const weathersData = require('./weathers.js');
const { formatPlaceData, formatWeatherData, formatReviewData } = require('./munge-utils.js');

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
    const lat = req.query.latitude;
    const lon = req.query.longitude;

    const weatherData = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=38.123&lon=-78.543&key=${process.env.WEATHER_API_KEY}`);

    const weatherResponse = formatWeatherData(weatherData.body);

    res.json(weatherResponse);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});


app.get('/reviews', async (req, res) => {
  try {
    const lat = req.query.latitude;
    const lng = req.query.longitude;

    const reviewData = await request
      .get(`https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lng}`)
      .set('Authorization', `Bearer ${process.env.REVIEWS_API_KEY}`)
      .set('Accept', 'application/json')

    const reviewResponse = formatReviewData(reviewData.body);

    res.json(reviewResponse);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});




app.use(require('./middleware/error'));

module.exports = app;
