const express = require('express');
const app = express();

const data = require('./data.json');
//imports routes.js 
const routes = require('./routes/routes');


// //express middleware tells requests to come in as json. .json() is a method, so don't forget the ()
app.use(express.json());
//this piece of middlewhere connect our router routes and places /api in front of the route
app.use('/api', routes);



//Error Handling
app.use((req, res, next) =>{
  const err = new Error("Not Found");
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  })
  next(err);
});


//  Send a GET req to READ a quote by array index
// app.get(`/quotes/:index`, (req,res) => {
//     const index = parseInt(req.params.index);
//     res.json({data: data.records[index].quote});
//   })

// Send a POST req /quotes to create a quote

// Send a PUT req to /quotes/:id update a quote

// Send a DELETE to  /quotes/:id/

// Send a get req to view a random quote

//Error Handling



app.listen(3000, () => console.log('Quote API listening on port 3000!'));
