const globals = require('../globals');

const findMessage = (value) => {
    return globals.Replies.find(r => r.id === value).string;
};

module.exports = { findMessage };