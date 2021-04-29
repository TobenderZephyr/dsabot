const globals = require('../globals');

const getAttributeLevels = (Attributes = [], Character = {}) => {
    let AttributeId;
    let AttributeLevel;
    let AttributeList = [];
    for (let Attribute of Attributes) {
        AttributeId = globals.Werte.find(att => att.kuerzel === Attribute).id;
        AttributeLevel = Character.attributes.find(att => att.id === AttributeId).level;
        AttributeList.push({ Name: Attribute, Level: AttributeLevel });
    }
    return AttributeList;
};
module.exports = { getAttributeLevels };
