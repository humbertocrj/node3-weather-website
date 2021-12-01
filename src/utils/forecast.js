const request = require('postman-request');

const forecast = (lat, lon, callback) => {

    const url = `http://api.weatherapi.com/v1/current.json?key=f2288beeb62f416c8e7153954212311&q=${lat},${lon}&aqi=no&lang-pt`

    request({ url: url, json: true }, function (error, response, body) {
        
        if (error) {
            callback("Unable to connect to weather service.", undefined)

        } else if (body.error) {
            callback("Unable to find location.", undefined)
        } else {
            const pressure = (response.body.current.pressure_in)
            const humidity = (response.body.current.humidity)
            const wind_kph = (response.body.current.wind_kph)

            const condition = body.current.condition.text
            const temp_c = body.current.temp_c
            const feelslike_c = body.current.feelslike_c

            callback( undefined,`${condition}. It's currently ${temp_c}°C. It feels like ${feelslike_c}°C<br>-Pressure: ${pressure}<br>-Humidity:${humidity}<br>-Wind(kph):${wind_kph}`)
        }
    })
}

module.exports = forecast