const CountOccurences = (arr, value) => {
    return arr.filter((v) => (v === value)).length;
};

module.exports = { CountOccurences };

//console.log(countOccurrences([1,2,3,4,3,2,3,3,2],2));
