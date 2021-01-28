'use strict';

const express = require('express');
const bcrypt = require('bcrypt');

// This array is used to keep track of user records
// as they are created.
const users = [];

// Construct a router instance.
const router = express.Router();

// Route that returns a list of users.
router.get('/users', (req, res) => {
  res.json(users);
});

// Route that creates a new user.
router.post('/users', (req, res) => {
  // Get the user from the request body.
  const user = req.body;

  //STEP 1: MAKE A ERROR ARRAY - Stores possible errors and attached these to the user object in the users array. This is actually a very clever way to prevent code from running. If errors => stop, if not, continue
  const errors = [];
  
  // STEP 2: WRITE A CONDITIONAL THAT validates user.name exists. IF the checked property doesn't exist, attempting to acces the property will return [undefined], which is falsy. If conditional is met it will push the string to the errors array
  if(!user.name){
    errors.push('Please provide a value for "name" ');
  }

  if(!user.email){
    errors.push('Please provide a value for "email"');
  }

  if(!user.password){
    errors.push('please provide a value for "password" ')
  } else { 
    user.password = bcrypt.hashSync(user.password, 10);
  }


  if(errors.length > 0) {
    res.status(400).json( { errors })
  } else {
    // Add the user to the `users` array.
    users.push(user);
  };

  console.log(errors);

  // Set the status to 201 Created and end the response.
  res.status(201).end();
});

module.exports = router;