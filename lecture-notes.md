// a SQL backend:
// city-explorer-feb-2021
// 

// don't need db, but do need Heroku for proxy/app deployment
// Lab 6 and Lab 7

// npm i
// update .env sans -example and to port 3000

// app.js


app.get('/location', async (req, res) => {
    try {
        // res.json({ seattle object });
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
});


app.get('/weather', async (req, res) => {
    try {
        // res.json({ weather object });
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
});

// npm run start:watch
// go to Postman to see if endpoints working...
