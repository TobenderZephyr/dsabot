function isString(str) {
    return typeof str === 'string' || str instanceof String ? true : false;
}
module.exports = { isString };
