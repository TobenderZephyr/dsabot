const CountOccurences = (arr, value) => {
    return arr.filter((v) => (v === value)).length;
};

module.exports = { CountOccurences };