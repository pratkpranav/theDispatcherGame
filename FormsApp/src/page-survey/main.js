require('normalize.css/normalize.css')
require('../css/main.css')
require('./page.css')
const img = require('../img/unicorn.jpg')
import React from 'react'
import 'survey-react/survey.css'
import * as Survey from 'survey-react'
import io from 'socket.io-client';
var stringify = require('json-stringify');

// let socket = io('http://localhost:3000');
// socket.on('connect', () => {
//   console.log('Survey Page Connected!');
// })

