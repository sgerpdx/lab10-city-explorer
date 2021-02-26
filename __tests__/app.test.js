require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');

describe('app routes', () => {
  describe('routes', () => {
    let token;

    beforeAll(async done => {
      execSync('npm run setup-db');

      client.connect();

      const signInData = await fakeRequest(app)
        .post('/auth/signup')
        .send({
          email: 'jon@user.com',
          password: '1234'
        });

      token = signInData.body.token; // eslint-disable-line

      return done();
    });

    afterAll(done => {
      return client.end(done);
    });

    // test('returns animals', async() => {

    //   const expectation = [
    //     {
    //       'id': 1,
    //       'name': 'bessie',
    //       'coolfactor': 3,
    //       'owner_id': 1
    //     },
    //     {
    //       'id': 2,
    //       'name': 'jumpy',
    //       'coolfactor': 4,
    //       'owner_id': 1
    //     },
    //     {
    //       'id': 3,
    //       'name': 'spot',
    //       'coolfactor': 10,
    //       'owner_id': 1
    //     }
    //   ];

    //   const data = await fakeRequest(app)
    //     .get('/animals')
    //     .expect('Content-Type', /json/)
    //     .expect(200);

    //   expect(data.body).toEqual(expectation);
    // });

    test('returns name and coordinates of a city', async () => {

      const expectation = {
        "formatted_query": "Portland, Multnomah County, Oregon, USA",
        "latitude": "45.5202471",
        "longitude": "-122.6741949"
      }

      const data = await fakeRequest(app)
        .get('/location')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });


    test('returns weather forecast by time', async () => {

      const expectation = [
        {
          "forecast": "Scattered clouds",
          "time": "Tue May 05 2020"
        },
        {
          "forecast": "Light snow",
          "time": "Wed May 06 2020"
        },
        {
          "forecast": "Few clouds",
          "time": "Thu May 07 2020"
        },
        {
          "forecast": "Few clouds",
          "time": "Fri May 08 2020"
        },
        {
          "forecast": "Broken clouds",
          "time": "Sat May 09 2020"
        },
        {
          "forecast": "Overcast clouds",
          "time": "Sun May 10 2020"
        },
        {
          "forecast": "Overcast clouds",
          "time": "Mon May 11 2020"
        },
        {
          "forecast": "Light rain",
          "time": "Tue May 12 2020"
        },
        {
          "forecast": "Light rain",
          "time": "Wed May 13 2020"
        },
        {
          "forecast": "Light rain",
          "time": "Thu May 14 2020"
        },
        {
          "forecast": "Overcast clouds",
          "time": "Fri May 15 2020"
        },
        {
          "forecast": "Light shower rain",
          "time": "Sat May 16 2020"
        },
        {
          "forecast": "Light rain",
          "time": "Sun May 17 2020"
        },
        {
          "forecast": "Overcast clouds",
          "time": "Mon May 18 2020"
        },
        {
          "forecast": "Overcast clouds",
          "time": "Tue May 19 2020"
        },
        {
          "forecast": "Overcast clouds",
          "time": "Wed May 20 2020"
        }
      ]

      const data = await fakeRequest(app)
        .get('/weather')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });



  });
});
