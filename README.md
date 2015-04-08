times-up
========

Wrap asynchronous calls with a timeout checker to prevent them from hanging indefinitely

### Example
```js
var timesUp = require('times-up');

function asyncFunc(callback) {
  setTimeout(function () {
  	console.log('Some process in the future.');
  	callback('done');
  }, 2000);
}

asyncFunc(timesUp('asyncFunc', 1000, function (err, res) {
  if (err) {
  	throw err;
  } else {
  	console.log('Res: '+res);
  }
}));
```
Outputs
```sh
$ node app.js 
/tmp/bar/app.js:12
  	throw err;
  	      ^
Error: Method asyncFunc timed out (1000ms)
    at null._onTimeout (/tmp/bar/node_modules/times-up/times-up.js:32:18)
    at Timer.listOnTimeout (timers.js:110:15)
```

Because `times-up` timeout is set to `1000ms` and `asyncFunc()` waits for `2000ms`
