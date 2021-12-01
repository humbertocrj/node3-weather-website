const request = require('postman-request')

const geocode = (address, callback) => {
    // address = encodeURIComponent(address)

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaGNyaiIsImEiOiJja3djYmJsODFiMGtsMm5zMXl2dmRjZW10In0.-RXxVX7Vv0EX6oCX6YjXIw&limit=1`
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location service:', undefined)
        } else if (!response.body.features[0]) {
            
            callback('Unable to connect to find location. Try another search.', undefined)
        } else {

            const lat = response.body.features[0].center[1]
            const lon = response.body.features[0].center[0]
            const location = response.body.features[0].text
          
            callback(undefined, {
                lat: lat,
                lon: lon,
                location: location
            })
        }
    })
}

module.exports = geocode