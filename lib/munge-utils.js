function formatPlaceData(dataSet) {
    return {
        formatted_query: dataSet[0].display_name,
        latitude: dataSet[0].lat,
        longitude: dataSet[0].lon
    };
}


function formatWeatherData(dataSet) {
    const weatherResponse = dataSet.data.map(weatherDay => {
        return {
            forecast: weatherDay.weather.description,
            time: new Date(weatherDay.ts * 1000).toDateString(),
        };
    });

    return weatherResponse;
}


function formatReviewData(dataSet) {
    const reviewResponse = dataSet.businesses.map(businessItem => {
        return {
            name: businessItem.name,
            image_url: businessItem.image_url,
            price: businessItem.price,
            rating: businessItem.rating,
            url: businessItem.url
        };
    });

    return reviewResponse;
}


module.exports = {
    formatPlaceData,
    formatWeatherData,
    formatReviewData
}
