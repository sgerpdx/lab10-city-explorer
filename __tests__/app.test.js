require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');
const { formatPlaceData } = require('../lib/munge-utils');

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



    // test('returns name and coordinates of a city', async () => {

    //   const expectation = {
    //     "formatted_query": "Portland, Multnomah County, Oregon, USA",
    //     "latitude": "45.5202471",
    //     "longitude": "-122.6741949"
    //   }

    //   const data = await fakeRequest(app)
    //     .get('/location')
    //     .expect('Content-Type', /json/)
    //     .expect(200);

    //   expect(data.body).toEqual(expectation);
    // });



    // test('returns weather forecast by time', async () => {

    //   const expectation = [
    //     {
    //       "forecast": "Scattered clouds",
    //       "time": "Tue May 05 2020"
    //     },
    //     {
    //       "forecast": "Light snow",
    //       "time": "Wed May 06 2020"
    //     },
    //     {
    //       "forecast": "Few clouds",
    //       "time": "Thu May 07 2020"
    //     },
    //     {
    //       "forecast": "Few clouds",
    //       "time": "Fri May 08 2020"
    //     },
    //     {
    //       "forecast": "Broken clouds",
    //       "time": "Sat May 09 2020"
    //     },
    //     {
    //       "forecast": "Overcast clouds",
    //       "time": "Sun May 10 2020"
    //     },
    //     {
    //       "forecast": "Overcast clouds",
    //       "time": "Mon May 11 2020"
    //     },
    //     {
    //       "forecast": "Light rain",
    //       "time": "Tue May 12 2020"
    //     },
    //     {
    //       "forecast": "Light rain",
    //       "time": "Wed May 13 2020"
    //     },
    //     {
    //       "forecast": "Light rain",
    //       "time": "Thu May 14 2020"
    //     },
    //     {
    //       "forecast": "Overcast clouds",
    //       "time": "Fri May 15 2020"
    //     },
    //     {
    //       "forecast": "Light shower rain",
    //       "time": "Sat May 16 2020"
    //     },
    //     {
    //       "forecast": "Light rain",
    //       "time": "Sun May 17 2020"
    //     },
    //     {
    //       "forecast": "Overcast clouds",
    //       "time": "Mon May 18 2020"
    //     },
    //     {
    //       "forecast": "Overcast clouds",
    //       "time": "Tue May 19 2020"
    //     },
    //     {
    //       "forecast": "Overcast clouds",
    //       "time": "Wed May 20 2020"
    //     }
    //   ]

    //   const data = await fakeRequest(app)
    //     .get('/weather')
    //     .expect('Content-Type', /json/)
    //     .expect(200);

    //   expect(data.body).toEqual(expectation);
    // });



    test('takes in location API data and returns formatted object', async () => {

      const dataAPI = [
        {
          'place_id': '282983083',
          'licence': 'https://locationiq.com/attribution',
          'osm_type': 'relation',
          'osm_id': '186579',
          'boundingbox': [
            '45.432536',
            '45.6528812',
            '-122.8367489',
            '-122.4720252'
          ],
          'lat': '45.5202471',
          'lon': '-122.6741949',
          'display_name': 'Portland, Multnomah County, Oregon, USA',
          'class': 'place',
          'type': 'city',
          'importance': 0.75356571743377,
          'icon': 'https://locationiq.org/static/images/mapicons/poi_place_city.p.20.png'
        },
        {
          'place_id': '236025890',
          'licence': 'https://locationiq.com/attribution',
          'osm_type': 'relation',
          'osm_id': '132500',
          'boundingbox': [
            '43.606363',
            '43.727658',
            '-70.346095',
            '-70.076935'
          ],
          'lat': '43.6610277',
          'lon': '-70.2548596',
          'display_name': 'Portland, Cumberland County, Maine, USA',
          'class': 'place',
          'type': 'city',
          'importance': 0.65297101392868,
          'icon': 'https://locationiq.org/static/images/mapicons/poi_place_city.p.20.png'
        },
        {
          'place_id': '236658381',
          'licence': 'https://locationiq.com/attribution',
          'osm_type': 'relation',
          'osm_id': '6587501',
          'boundingbox': [
            '27.8498897',
            '27.9213517',
            '-97.3678298',
            '-97.2899118'
          ],
          'lat': '27.8768086',
          'lon': '-97.3233874',
          'display_name': 'Portland, San Patricio County, Texas, USA',
          'class': 'place',
          'type': 'city',
          'importance': 0.54410058492494,
          'icon': 'https://locationiq.org/static/images/mapicons/poi_place_city.p.20.png'
        },
        {
          'place_id': '236284975',
          'licence': 'https://locationiq.com/attribution',
          'osm_type': 'relation',
          'osm_id': '127875',
          'boundingbox': [
            '40.411974',
            '40.461887',
            '-85.009914',
            '-84.959248'
          ],
          'lat': '40.4344895',
          'lon': '-84.9777455',
          'display_name': 'Portland, Jay County, Indiana, USA',
          'class': 'place',
          'type': 'city',
          'importance': 0.49697098952911,
          'icon': 'https://locationiq.org/static/images/mapicons/poi_place_city.p.20.png'
        },
        {
          'place_id': '236114383',
          'licence': 'https://locationiq.com/attribution',
          'osm_type': 'relation',
          'osm_id': '319344',
          'boundingbox': [
            '17.9838936',
            '18.2668071',
            '-76.7573127',
            '-76.2465133'
          ],
          'lat': '18.1253511',
          'lon': '-76.5347819830471',
          'display_name': 'Portland, Surrey County, Jamaika',
          'class': 'boundary',
          'type': 'administrative',
          'importance': 0.49206233482695,
          'icon': 'https://locationiq.org/static/images/mapicons/poi_boundary_administrative.p.20.png'
        },
        {
          'place_id': '235506000',
          'licence': 'https://locationiq.com/attribution',
          'osm_type': 'relation',
          'osm_id': '181721',
          'boundingbox': [
            '47.49062',
            '47.505902',
            '-97.378755',
            '-97.357012'
          ],
          'lat': '47.4983191',
          'lon': '-97.3703689',
          'display_name': 'Portland, Traill County, North Dakota, USA',
          'class': 'place',
          'type': 'city',
          'importance': 0.48101672592537,
          'icon': 'https://locationiq.org/static/images/mapicons/poi_place_city.p.20.png'
        },
        {
          'place_id': '95824744',
          'licence': 'https://locationiq.com/attribution',
          'osm_type': 'way',
          'osm_id': '33048848',
          'boundingbox': [
            '33.229136',
            '33.2473896',
            '-91.522173',
            '-91.4985818'
          ],
          'lat': '33.2378972',
          'lon': '-91.5115095',
          'display_name': 'Portland, Arkansas, USA',
          'class': 'place',
          'type': 'city',
          'importance': 0.47894485354305,
          'icon': 'https://locationiq.org/static/images/mapicons/poi_place_city.p.20.png'
        },
        {
          'place_id': '236908745',
          'licence': 'https://locationiq.com/attribution',
          'osm_type': 'relation',
          'osm_id': '8527098',
          'boundingbox': [
            '33.2265608',
            '33.2473896',
            '-91.522173',
            '-91.4985818'
          ],
          'lat': '33.2378972',
          'lon': '-91.5115095',
          'display_name': 'Portland, Arkansas, USA',
          'class': 'place',
          'type': 'city',
          'importance': 0.47894485354305,
          'icon': 'https://locationiq.org/static/images/mapicons/poi_place_city.p.20.png'
        },
        {
          'place_id': '236166092',
          'licence': 'https://locationiq.com/attribution',
          'osm_type': 'relation',
          'osm_id': '134699',
          'boundingbox': [
            '42.8524425',
            '42.885961',
            '-84.940167',
            '-84.867058'
          ],
          'lat': '42.8692006',
          'lon': '-84.9030517',
          'display_name': 'Portland, Ionia County, Michigan, USA',
          'class': 'boundary',
          'type': 'administrative',
          'importance': 0.47680090174386,
          'icon': 'https://locationiq.org/static/images/mapicons/poi_boundary_administrative.p.20.png'
        },
        {
          'place_id': '233171208',
          'licence': 'https://locationiq.com/attribution',
          'osm_type': 'relation',
          'osm_id': '3175109',
          'boundingbox': [
            '-38.40641',
            '-38.3204',
            '141.56878',
            '141.65026'
          ],
          'lat': '-38.363435',
          'lon': '141.605605508935',
          'display_name': 'Portland, Shire of Glenelg, Victoria, VIC 3305, Australia',
          'class': 'boundary',
          'type': 'administrative',
          'importance': 0.4724219600668,
          'icon': 'https://locationiq.org/static/images/mapicons/poi_boundary_administrative.p.20.png'
        }
      ];

      const expectation = {
        "formatted_query": "Portland, Multnomah County, Oregon, USA",
        "latitude": "45.5202471",
        "longitude": "-122.6741949"
      }

      const data = formatPlaceData(dataAPI) // thefunction(fakedata) (no await) and make some fake data
      // .get('/location')
      // .expect('Content-Type', /json/)
      // .expect(200);

      expect(data).toEqual(expectation);
    });



  });
});
