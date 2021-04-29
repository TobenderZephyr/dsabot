const Random = { int, use };

function int(min, max) {
    if (!min || !max) {
        return;
    }
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;
}

function use(str) {
    return true;
}

module.exports = { Random };
