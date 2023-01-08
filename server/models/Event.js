const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const eventSchema = new Schema({
    eventStart:{
        type: Date,
    },
    eventEnd:{
        type: Date,
    },
    eventTitle:{
        type: String
    },
    eventAuthor:{
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
});

const Event = model('Event', eventSchema);

module.exports = Event;
