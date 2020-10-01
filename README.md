# Keypoint
  
    . node.js v12.6.0
    . npm v 6.9.0
    . Express framwork

# Getting started
   
    . Clone this repo
    . select apis folder
    . npm install
    . npm start
    . npm test
    
# Build the Docker image

    . docker build -t addform-assignment .
    . docker run -t -p 9000:3000 addform-assignment

# Dependencies

    . expressjs - The server for handling and routing HTTP requests
    . body-parser - This module handling Node.js GET and POST requests.
    . helmet - Helmet helps you secure your Express apps by setting various HTTP headers. 
    . express-rate-limit - To prevent brute force and DDoS attacks.
    . joi use for to validate request
    . chai, chai-http, mocha - Use for unit testing
    . babel-cli and babel-preset-env to compile code from the commond line
    . morgan - Use for log the requests

# Application Structure

    . swvl/apis/app.js - The entry point to our application.
    . swvl/apis/bin/ - app configuration file.
    . swvl/apis/routes/ - This folder contains the route definitions for our API.
    . swvl/apis/controllers/ - This folder responsible for controlling the flow of the application execution. 
    . swvl/apis/helper/ - helping and common methods
    . swvl/apis/tests/ - Unit testing
    . swvl/apis/postman_collection/ -  Postman collection to test APIs.
    . swvl/apis/Dockerfile - For dockerization the app.
    . swvl/apis/access.log - This for logging the request.

#  Data store
        . swvl/data/ - data is store in this folder.

  