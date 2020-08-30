const moment = require('moment-timezone');

function formatMessage(firstname, text){
    return {
        firstname,
        text,
        time: moment().tz('America/New_York').format('h:mm a')
    }
}

module.exports = formatMessage;