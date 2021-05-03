const { Werte } = require('../globals');

const getAttributeLevels = (Attributes = [], Character = {}) => {
    const AttributeList = [];
    Attributes.forEach(Attribute => {
        const { id } = Werte.find(att => att.kuerzel === Attribute);
        const { level } = Character.attributes.find(att => att.id === id);
        AttributeList.push({ Name: Attribute, Level: level });
    });

    return AttributeList;
};
module.exports = { getAttributeLevels };
