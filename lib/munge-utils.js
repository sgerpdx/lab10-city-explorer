function placeData(dataSet) {
    return {
        formatted_query: placesData[0].display_name,
        latitude: placesData[0].lat,
        longitude: placesData[0].lon
    };
}


function weatherData(dataSet) {
    const weatherResponse = weathersData.data.map(weatherDay => {
        return {
            forecast: weatherDay.weather.description,
            time: new Date(weatherDay.ts * 1000).toDateString(),
        };
    });

    return weatherResponse;
}



module.exports = {
    placeData,
    weatherData
}