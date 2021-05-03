function int(min, max) {
    if (!min || !max) {
        return undefined;
    }
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;
}

function use() {
    return true;
}
const Random = { int, use };
module.exports = { Random };
