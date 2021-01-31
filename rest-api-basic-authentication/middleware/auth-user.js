'use strict';

// Middleware to authenticate the request using Basic Authentication.
const auth = require('basic-auth');
const bcrypt = require('bcrypt');

const { User } = require('../models')




exports.authenticateUser = async (req, res, next) => {
    // Parse the user's credentials from the Authorization header.
  const credentials = auth(req);

    // If the user's credentials are available...
    if(credentials){
        // Attempt to retrieve the user from the data store
       const user = await User.findOne({
           where: { username: credentials.name}
       });
       
       //if data is retrieved from user(user doesn't return undefined), store the comparison of ... 
       if(user){
            const authenticated = bcrypt.compareSync(credentials.pass//stored in Authorization header
            , user.confirmedPassword)//stored in the user model
            if(authenticated){
                //if passwords match
            }
       }
    }

    
       // by their username (i.e. the user's "key"
       // from the Authorization header).
  
    // If a user was successfully retrieved from the data store...
       // Use the bcrypt npm package to compare the user's password
       // (from the Authorization header) to the user's password
       // that was retrieved from the data store.
  
    // If the passwords match...
       // Store the retrieved user object on the request object
       // so any middleware functions that follow this middleware function
       // will have access to the user's information.
  
    // If user authentication failed...
       // Return a response with a 401 Unauthorized HTTP status code.
  
    // Or if user authentication succeeded...
    if(this.authenticateUser.authenticateUser){
        // Call the next() method.
        next();
    }
       
  };

  
  