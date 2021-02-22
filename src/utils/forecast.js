const request = require('request');
const apiKey = "a4e5ec7473e5f8b39a1b2213da1a8375";

const forecast = (latitude,longitude,callback)=>{
const baseURL = "http://api.weatherstack.com/current?access_key="+ apiKey +"&query=" + latitude + ',' + longitude;

request({url: baseURL, json:true},(err,res)=>{
if(err)
{
    callback('Something not right',undefined);
}
else if(res.body.error){
    callback('Unable to find location',undefined);
}
else{
    callback(undefined,res.body.current.weather_descriptions[0] + ', It is currently ' + res.body.current.temperature + ' degrees outside. There is ' + res.body.current.feelslike + '% chance of rain.')
}
});
}
module.exports = forecast;

