const { Replies } = require('../globals');

const findMessage = value => {
    return Replies.find(r => r.id === value).string;
};

module.exports = { findMessage };
