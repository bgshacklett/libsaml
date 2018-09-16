/* global beforeEach describe it */

// Saml2js Tests
// =============
// The tests for this module.
// jshint esnext: true

const expect  = require('unexpected');
const fs      = require('fs');
const path    = require('path');
const Saml2js = require('../index');

let parser;

beforeEach('pass SAML response to Saml2js', (done) => {
  fs.readFile(path.join(__dirname, 'sample.saml'), (err, data) => {
    if (err) throw err;
    parser = new Saml2js(data);
    done();
  });
});

describe('Saml2js', () => {
  describe('#parse()', () => {
    it('should have a value', () => {
      expect(parser.parsedSaml, 'to be defined');
    });

    it('should return an object', () => {
      expect(parser.parsedSaml, 'to be an', 'object');
    });

    it('should have 10 elements in attributes', () => {
      expect(Object.keys(parser.parsedSaml.attributes), 'to have length', 10);
    });
  });

  describe('#parse()', () => {
    it('should parse base64 encoded SAML', (done) => {
      fs.readFile(path.join(__dirname, 'base64.saml'), { encoding: 'utf8' }, (err, saml) => {
        if (err) done(err);
        const base64parser = new Saml2js(saml);
        expect(base64parser.toObject(), 'to be an', 'object');
        done();
      });
    });

    it('should contain the expected data', (done) => {
      fs.readFile(path.join(__dirname, 'base64.saml'), { encoding: 'utf8' }, (err, saml) => {
        if (err) done(err);
        const base64parser = new Saml2js(saml);
        expect(base64parser.getAttribute('transfer type')[0], 'to be', 'Completed Application');
        done();
      });
    });
  });

  describe('#toJSON()', () => {
    it('should return a string', () => {
      expect(parser.toJSON(), 'to be a', 'string');
    });

    it('should be valid JSON', () => {
      expect(JSON.parse(parser.toJSON()), 'to be ok');
    });
  });

  describe('#getAttribute()', () => {
    it('should get attributes by name', () => {
      expect(parser.getAttribute('transfer type')[0], 'to be', 'Completed Application');
    });

    it('should get attributes case-insensitively', () => {
      expect(parser.getAttribute('FfE ASSIgned Consumer Id')[0], 'to be a', 'string');
    });

    it('should return an empty string if the attribute is empty', () => {
      expect(parser.getAttribute('Exception Reason')[0], 'to be empty');
    });

    it('should return an empty array if the key does not exist', () => {
      expect(parser.getAttribute('some undefined key'), 'to be empty');
    });
  });

  describe('#toObject()', () => {
    it('should return an object', () => {
      expect(parser.toObject(), 'to be an', 'object');
    });

    it('should have 10 elements in attributes', () => {
      expect(Object.keys(parser.toObject().attributes), 'to have length', 10);
    });
  });
});
