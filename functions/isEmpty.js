function isEmpty(document = {}) {
    if (!document) return true;
    if (document.length === 0) return true;
    return Object.keys(document).length === 0 ? true : false;
}
module.exports = { isEmpty };
