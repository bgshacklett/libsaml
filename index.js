// Saml2js
// =======
// A library for parsing SAML attributes
// into a POJO (Plain Old JavaScript Object)

// Require dependencies
const xmldom = require('xmldom');
const xpath  = require('xpath');

// Saml2js
// -------
// Constructor function. Saves a copy
// of the raw SAML you pass to it and
// a copy that's parsed into a JS object.
//
// `response` [String] - A SAML response string
function Saml2js(response) {
  this.rawSaml    = response;
  this.parsedSaml = this.parse(response);
}

// Saml2js.parse
// -------------
// Private function.
// Parses raw SAML assertion to an array of objects.
Saml2js.prototype.parse = function parse(saml) {
  const attributePath = '//*[local-name() = "AttributeStatement"]/*';

  const xml = Buffer.from(saml, 'base64').toString('ascii');
  const doc = new xmldom.DOMParser().parseFromString(xml);

  const rawAttributes = xpath.select(attributePath, doc);

  const attributes = rawAttributes.reduce((x, y) => {
    const namePath  = 'string(@Name)';
    const valuePath = 'string(*[local-name() = "AttributeValue"]/text())';

    return x.concat(
      {
        name:  xpath.select(namePath, y),
        value: xpath.select(valuePath, y),
      },
    );
  }, []);

  return { attributes };
};


// Saml2js.toJSON
// --------------
// Returns parsed SAML as a JSON string.
// (Basically just an alias to `JSON.stringify()`).
Saml2js.prototype.toJSON = function toJSON() {
  return JSON.stringify(this.parsedSaml);
};

// Saml2js.getAttribute
// -----------
// Get the value of a SAML attribute by using its
// original SAML attribute Name from the raw XML.
//
// `key` [String] - The attribute name as it appears in the raw SAML
//
// Example:
//     // Given the following SAML/XML
//     // <saml2:Attribute Name="First Name">
//     //   <saml2:AttributeValue>John</saml2:AttributeValue>
//     // </saml2:Attribute>
//     console.log(parser.get('first name')[0]); //=> John
Saml2js.prototype.getAttribute = function get(key) {
  const attributes = this.parsedSaml.attributes;

  return attributes.filter(element => element.name.toLowerCase()
                                      === key.toLowerCase())
                   .map(x => x.value);
};

// Saml2js.toObject
// ----------------
// Returns the parsed SAML as a JS object.
// This does not do any further processing, it
// just returns the object's internal value
// of `this.parsedSaml`.
Saml2js.prototype.toObject = function toObject() {
  return this.parsedSaml;
};

module.exports = Saml2js;
