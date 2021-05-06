const { Replies } = require('../globals');

const findMessage = value => Replies.find(r => r.id === value).string;

module.exports = { findMessage };
