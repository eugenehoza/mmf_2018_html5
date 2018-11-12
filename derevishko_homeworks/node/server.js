const fs = require('fs');
const process = require('process');
const EventEmitter = require('events').EventEmitter;
const Event = new EventEmitter;

console.log(process.stdout._events);

Event.on(process.stdout._events.end, (e)=>{
  console.log(e)
  console.log('lol')
})
process.stdout._events.end
