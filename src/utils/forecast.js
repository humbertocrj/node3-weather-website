const request = require('postman-request');

const forecast = (lat, lon, callback) => {

    const url = `http://api.weatherapi.com/v1/current.json?key=f2288beeb62f416c8e7153954212311&q=${lat},${lon}&aqi=no&lang-pt`

    request({ url: url, json: true }, function (error, response, body) {
        
        if (error) {
            callback("Unable to connect to weather service.", undefined)

        } else if (body.error) {
            callback("Unable to find location.", undefined)
        } else {

            const condition = body.current.condition.text
            const temp_c = body.current.temp_c
            const feelslike_c = body.current.feelslike_c

            callback( undefined,`${condition}. It's currently ${temp_c}°C. It feels like ${feelslike_c}°C`)
        }
    })
}

module.exports = forecast