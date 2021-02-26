const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const request = require('superagent');
const placesData = require('./places.js');
const weathersData = require('./weathers.js');
const places = require('./places.js');

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
    //const placeName = req.query.search;

    const placeData = {
      formatted_query: placesData[0].display_name,
      latitude: placesData[0].lat,
      longitude: placesData[0].lon
    }

    res.json(placeData);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});


app.get('/weather', async (req, res) => {
  try {
    //const placeName = req.query.search;

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




app.use(require('./middleware/error'));

module.exports = app;
