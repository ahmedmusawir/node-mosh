const EventEmitter = require('events');
// const emitter = new EventEmitter();

const url = 'http://mylogger.io';

class Logger extends EventEmitter {
  log(message) {
    this.emit('messageLogged', { id: 1, url: 'http://' });
    console.log(message);
  }
}

module.exports = Logger;
