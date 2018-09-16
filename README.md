# libsaml [![Build Status](https://travis-ci.org/bgshacklett/saml2js.svg?branch=master)](https://travis-ci.org/bgshacklett/saml2js)

> Parses SAML responses into JS objects you can read and manipulate.

## Install

```
$ yarn add https://github.com/bgshacklett/libsaml.git
```

```
$ npm install git+https://github.com/bgshacklett/libsaml.git --save
```

## Usage

LibSaml was designed for use in any Node.js environment whether that's a web app or a standalone script.

```js
const express = require('express');
const LibSaml = require('libsaml');
const app     = express();

app.post('/saml/callback/?', function(req, res, next){
  var parser = new LibSaml(res.body.SAMLResponse);
  res.json(parser.toObject());
});

app.listen(3000);
```

### Methods

#### Constructor

To instantiate a new SAML parser:

```js
const LibSaml = require('libsaml');

const parser = new LibSaml(SAMLResponse);
```

After passing your SAML response as a string to the constructor you now have
access to the following methods.

#### `toObject()`

Returns the parsed SAML as a JavaScript object.

```
var parsedObject = parser.toObject();
```

#### `toJSON()`

Returns parsed SAML as a JSON string. Once you've instantiated the module and
passed it raw SAML you can get its value as a JSON string with
`parser.toJSON()`.

#### `getAttribute()`

Returns an array containing the value(s) of any SAML attribute(s) by name. The
name you pass to this function should be the same as what the attribute value
in your SAML is. For example, given this SAML:

```xml
<saml2:Attribute Name="First Name">
  <saml2:AttributeValue>John</saml2:AttributeValue>
</saml2:Attribute>
```

To get the value of `First Name` you would call it like this:

```js
// assuming you've instantiated the library as `parser` with
// `new LibSaml(SAMLResponse)`...
var firstName = parser.get('first name');
console.log(firstName[0]); //=> 'John'
```

You don't need to worry about case sensitivity. Internally the case of the
string you pass is normalized so when it is compared against the parsed SAML
it will automagically match the name of the key as its stored internally if it
exists.

#### `parse()`

This is a private method. It is called internally when you pass your SAML to
the constructor. You should never need to call this manually. See the source
code if you want to know more about it.

## Testing

Testing requires Mocha and Unexpected. Both will be installed with your
preferred package manager.

1. Clone the repository
2. Run `yarn install` (or `npm install`)
3. Finally, run `yarn test` or `npm test`

## Contributing

When contributing, be sure to branch off of `develop` to get the latest
changes. Contributions are welcome. Pull requests without corresponding tests
will not be merged outside of exceptional circumstances.

## Credit

This is a fork of [saml2js](https://github.com/billpatrianakos/saml2js.git) by Bill
Patrianakos, which is, in turn, a fork of
[saml2json](https://github.com/flesch/saml2json.git) by John Flesch. Thanks
for your original work!
