# Sezzle Coding Challenge
This project is a full stack web application, deployed on Heroku, which allows a user to perform mathematical calculations, which are then posted for all users to see.

A live version of the app can be found here 
- [Heroku App](https://calm-inlet-72674.herokuapp.com/#/home)

## Build With
This version uses React, Redux, Express, and Material-UI, (a full list of dependencies can be found in `package.json`).

### Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [Nodemon](https://nodemon.io/)

## Development Setup Instructions

* Run `npm install`
* Run `npm run server`
* Run `npm run client`
* change the line const socket = io(); in socket.js to const socket = io('http://localhost:8000');
* Navigate to `localhost:3000`

### Completed Features

- [x] Calculator which performs math equations
- [x] Immediate updates for all users
- [x] Published on Heroku

### Navigation

* `src/` contains the React application
* `public/` contains static assets for the client-side
* `server/` contains the Express App

## Authors

* Trevor Dammon