const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const geoCode = require('./utils/geocode.js');
const foreCast = require('./utils/forecast.js');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
app.use(express.static(path.join(__dirname, '../public')));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

app.get('/',(req,res)=>{
    res.render('index',{
        title: 'hbs app',
        name : 'Aman Pandey'
    })
});
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'hbs app',
        name : 'Aman Pandey'
    })
});

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'hbs app',
        name : 'Aman Pandey'
    })
});

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {return res.send({error: 'you must provide address term'});}

    const cityName = req.query.address;

    geoCode(cityName,(error,data={ })=>{
        if(error)
        { return res.send(error);}

        foreCast(data.latitude,data.longitude, (error,forecastdata)=>{
            if(error)
            {return res.send(error);}

            res.send({
                forecast : forecastdata,
                location : data.location
            });
        })
    });  
});

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {return res.send({error: 'you must provide search term'});}

    console.log(req.query.search);
    res.send({products: []});
});

// app.get('*',(req,res)=>{
//     res.render('404-page',{
//         errorMessage : 'not found',
//         name : 'Aman Pandey'
//     })
// });

app.listen(8000, ()=>{
    console.log('Server started on port 8000');
});