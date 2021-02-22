const request = require('request');
const accessToken = 'pk.eyJ1IjoiYW1hbnAzMDA0IiwiYSI6ImNrbGMxaDN3NTBjbWgycG0xdDN0djFrcGgifQ.QO5lkL7rf0O0zkq6eBUv9w';

const geocode = (address,callback)=>{
const mapBoxurl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=" + accessToken;

request({url: mapBoxurl, json: true},(err,res)=>{
    if(err)
    {
        callback('Something not right',undefined);
    }
    else if(res.body.features == []){
        callback('Unable to find location',undefined);
    }
    else if(res.body.features[0] === undefined){
        callback('Unable to find location',undefined);
    }
    else
    {
        callback(undefined, {
        latitude : res.body.features[0].center[1],
        longitude: res.body.features[0].center[0],
        location : res.body.features[0].place_name
        });
    }
});
}
module.exports = geocode;
