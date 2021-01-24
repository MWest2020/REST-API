//async handler
const express = require('express');
const router = express.Router();
const records = require('../records')

function asyncHandler(cb){
    return async (req, res, next)=>{
      try {
        await cb(req,res, next);
      } catch(err){
        next(err);
      }
    };
  }
  
  
  //we don't render or send. We want a json object, hence res.json to send a json object to the client.
  router.get('/greetings', (req, res) => {
      res.json({greeting: "Hello Rest API"})
  });
  
router.get('/quotes/quote/random', asyncHandler(async(req,res) => {
    const quote = await records.getRandomQuote();
    res.json(quote);
  })
)

  router.get('/quotes/:id', asyncHandler (async (req,res) => {
    
    const quote = await records.getQuote(req.params.id);
    if(quote){
      res.json(quote);
    } else {
      res.status(404).json({error: "Quote not found"})
    }
}))

  
  // Send a GET req to read a list of quotes
  router.get('/quotes/:id', asyncHandler (async (req,res) => {
    
      const quote = await records.getQuote(req.params.id);
      if(quote){
        res.json(quote);
      } else {
        res.status(404).json({error: "Quote not found"})
      }
  }))
  
  router.get('/quotes', asyncHandler(async (req, res) => {
      const quotes = await records.getQuotes();
      if(quotes){
        res.status(201).json(quotes);
      } else {
        res.status(404).json({error: "Quotes not found"});
      }
    })
  )
  
  router.post('/quotes', asyncHandler(async (req, res) => {
      
    //throw new Error('errooorrrr');
    if(req.body.author && req.body.quote){
      const quote = await records.createQuote({
        quote: req.body.quote,
        author: req.body.author
      });
      res.status(201)
          .json(quote)
    } else { res.status(400).json({ message: "Quote and Author required"})
    } 
    })
  )



  //write a route to add another catagory
  
  router.put('/quotes/:id', asyncHandler(async(req, res) => {
    
    const quote = await records.getQuote(req.params.id);
    if(quote){
      quote.quote = req.body.quote;
      quote.author = req.body.author;
  
      await records.updateQuote(quote);
      //convention to use end() to signal the update is done. otherwise it will hang indefinitely
      res.status(204).end();
    } else {
      res.status(404).json({error: "Quote not found"})
    }
  
    
  }))
  
  router.delete('/quotes/:id', asyncHandler(async(req, res) => {
    
    const quote = await records.getQuote(req.params.id);
    if(quote){
      await records.deleteQuote(quote);
      //convention to use end() to signal the update is done. otherwise it will hang indefinitely
      res.status(204).end();
    } else {
      res.status(404).json({error: "Quote not found"})
    }
    
  }))
  
  module.exports = router;