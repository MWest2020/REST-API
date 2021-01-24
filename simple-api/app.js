const express = require('express');
const app = express();

const data = require('./data.json');




//we don't render or send. We want a json object, hence res.json to send a json object to the client.
app.get('/greetings', (req, res) => {
    res.json({greeting: "Hello Rest API"})
});


// Send a GET req to read a list of quotes
app.get('/quotes/:id', (req,res) => {
  //id = req.params.id 

  const quote = data.records.find(
    record => data.records[0].id == parseInt(req.params.id)
    );
  res.json(quote);
})


//  Send a GET req to READ a quote by array index
// app.get(`/quotes/:index`, (req,res) => {
//     const index = parseInt(req.params.index);
//     res.json({data: data.records[index].quote});
//   })

// Send a POST req /quotes to create a quote

// Send a PUT req to /quotes/:id update a quote

// Send a DELETE to  /quotes/:id/

// Send a get req to view a random quote
app.get('/quotes/quote/random', (req,res) => {
    const r  = Math.floor(Math.random() * data.records.length) ;
    res.json({data: data.records[r].quote});
  })
//Error Handling



app.listen(3000, () => console.log('Quote API listening on port 3000!'));
