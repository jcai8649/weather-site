const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=bb9e70566574e5c2e22641ec8f110d25&query='+ encodeURIComponent(lat+ ', ' + long) +'&units=f';
    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to server', undefined)
        } else if (body.error){
            callback('Please enter specify valid coordinates', undefined)
        } else {
            callback(undefined, 'The temperature is: ' + body.current.temperature + "F, and it will feel like "+ body.current.feelslike +"F. The humidity is " + body.current.humidity + "%")
        }
    }) 
}

module.exports = forecast;