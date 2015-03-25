/**
 *
 * @param [name] string used to log method name that causes the timeout
 * @param [timeout] number that defines the timeout (in milliseconds)
 * @param callback function called when done (if first parameter is an error, then something went wrong)
 */
function timesUp(name, timeout, callback) {
    if (typeof callback === 'undefined' && typeof timeout === 'undefined') {
        callback = name;
        name = null;
        timeout = 10000;
    } else if (typeof callback === 'undefined') {
        switch (typeof name) {
            case 'string':
                callback = timeout;
                timeout = 10000;
                break;
            default:
            case 'number':
                callback = timeout;
                timeout = name;
                name = null;
                break;
        }
    }

    var timedOut = false;

    var id = setTimeout(function () {
        // out of time
        timedOut = true;
        callback(new Error(name ? 'Method '+name+' timed out ('+timeout+'ms)' : 'Method timed out ('+timeout+'ms)'));
    }, timeout);

    return function () {
        if (!timedOut) {
            clearTimeout(id);
            callback.apply(callback, arguments);
        }
    };
}

module.exports = timesUp;