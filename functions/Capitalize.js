const Capitalize = (Word = 'none') => {
    return Word[0].toUpperCase() + Word.substring(1);
};

module.exports = { Capitalize };
