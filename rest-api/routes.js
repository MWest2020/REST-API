'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const {check, validationResult} = require('express-validator');

const users = [];
const router = express.Router();

// Route that returns a list of users.
router.get('/users', (req, res) => {
  res.json(users);
});


// Route that creates a new user.
router.post('/users', [
  check('name')
  .exists()
  .withMessage('Please provide a value for "name"'),
  
  check('email')
  .exists()
  .withMessage('Please provide a value for "email"')
  .isEmail()
  .withMessage('Please provide a valid email address for "email"'),

  check('birthday')
  .exists()
  .withMessage('Please provide a value for "birthday"')
  .isDate("MM/DD/YYYY")
  .withMessage('Please enter a valid date of birth'),

  check('password')
  .exists()
  .withMessage('Please provide a value for "password"')
  .isLength({ min: 8, max: 20 })
  .withMessage('Password has to be more than 8 and less than 20 characters'),

  check('confirmedPassword')
  .exists()
  .withMessage('Please provide a value for confirmed password')
  .custom( (value, { req }) => {
    if (value && req.body.password && value !== req.body.password) {
      throw new Error(`"Password" and "Confirmed Password" don't match`);
    }
      return true;
  })

], (req, res) => {
  //Attempt to get the validation results from the Request
  const errors  = validationResult(req);
  
  //validationResults method returns a validation result object - which provides an isEmpty() Method. 
  if (!errors.isEmpty()){
    // We can use the array map() method to pluck each validation error object's msg property value—which is a string representing the validation error message—into a new array of just the validation error messages:
    const errorMessages = errors.array().map(error => error.msg);

    //Return validation error back to the client.
    res.status(400).json({errors: errorMessages})
  } else {

    // Get the user from the request body.
    const user = req.body;
    // Add the user to the `users` array.
    users.push(user);

    // Set the status to 201 Created and end the response.
    res.status(201).end();

  }
  
});

module.exports = router;




// // Get the user from the request body.
// const user = req.body;

// //STEP 1: MAKE A ERROR ARRAY - Stores possible errors and attached these to the user object in the users array. This is actually a very clever way to prevent code from running. If errors => stop, if not, continue
// const errors = [];

// // STEP 2: WRITE A CONDITIONAL THAT validates user.name exists. IF the checked property doesn't exist, attempting to acces the property will return [undefined], which is falsy. If conditional is met it will push the string to the errors array
// if(!user.name){
//   errors.push('Please provide a value for "name" ');
// }

// if(!user.email){
//   errors.push('Please provide a value for "email"');
// }


// if(!user.password){
//   errors.push('please provide a value for "password" ')
// } else if(user.password < 9 || user.password >20 ){
//   errors.push("Password need to be between 8 and 20 characters long")
// } else { 
//   user.password = bcrypt.hashSync(user.password, 10);
// }


// if(errors.length > 0) {
//   res.status(400).json( { errors })
// } else {
//   // Add the user to the `users` array.
//   users.push(user);
// };

// console.log(errors);

// // Set the status to 201 Created and end the response.
// res.status(201).end();