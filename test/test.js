/* global before describe it */

// LibSaml Tests
// =============
// The tests for this module.
// jshint esnext: true

const expect  = require('unexpected');
const fs      = require('fs');
const path    = require('path');
const LibSaml = require('../index');

describe('LibSaml', () => {
  describe('#parse()', () => {
    describe('utf-8', () => {
      let parser;

      before('pass SAML response to LibSaml', (done) => {
        fs.readFile(path.join(__dirname, 'sample.saml'), (err, data) => {
          if (err) throw err;
          parser = new LibSaml(data);
          done();
        });
      });

      it('should have a value', () => {
        expect(parser.parsedSaml, 'to be defined');
      });

      it('should return an object', () => {
        expect(parser.parsedSaml, 'to be an', 'object');
      });

      it('should have 9 elements in attributes', () => {
        expect(Object.keys(parser.parsedSaml.attributes), 'to have length', 9);
      });

      it('should retain multiple attribute values', () => {
        expect(parser.parsedSaml.attributes[7].value, 'to have length', 2);
      });

      it('should contain the expected data', () => {
        expect(parser.parsedSaml.attributes[7].value[1], 'to be', 'Bar');
      });
    });


    describe('base64', () => {
      let parser;

      before('pass SAML response to LibSaml', (done) => {
        fs.readFile(path.join(__dirname, 'base64.saml'), { encoding: 'utf8' }, (err, data) => {
          if (err) done(err);
          parser = new LibSaml(data);
          done();
        });
      });

      it('should have a value', () => {
        expect(parser.parsedSaml, 'to be defined');
      });

      it('should return an object', () => {
        expect(parser.parsedSaml, 'to be an', 'object');
      });

      it('should have 9 elements in attributes', () => {
        expect(Object.keys(parser.parsedSaml.attributes), 'to have length', 9);
      });

      it('should retain multiple attribute values', () => {
        expect(parser.parsedSaml.attributes[7].value, 'to have length', 2);
      });

      it('should contain the expected data', () => {
        expect(parser.parsedSaml.attributes[7].value[1], 'to be', 'Bar');
      });
    });
  });


  describe('#toJSON()', () => {
    let parser;

    before('pass SAML response to LibSaml', (done) => {
      fs.readFile(path.join(__dirname, 'sample.saml'), (err, data) => {
        if (err) throw err;
        parser = new LibSaml(data);
        done();
      });
    });

    it('should return a string', () => {
      expect(parser.toJSON(), 'to be a', 'string');
    });

    it('should be valid JSON', () => {
      expect(JSON.parse(parser.toJSON()), 'to be ok');
    });
  });

  describe('#getAttribute()', () => {
    let parser;

    before('pass SAML response to LibSaml', (done) => {
      fs.readFile(path.join(__dirname, 'sample.saml'), (err, data) => {
        if (err) throw err;
        parser = new LibSaml(data);
        done();
      });
    });

    it('should get attributes by name', () => {
      expect(parser.getAttribute('transfer type')[0], 'to be', 'Completed Application');
    });

    it('should get attributes case-insensitively', () => {
      expect(parser.getAttribute('FfE ASSIgned Consumer Id')[0], 'to be a', 'string');
    });

    it('should return an empty string if the attribute is empty', () => {
      expect(parser.getAttribute('Exception Reason')[0], 'to be a', 'string');
      expect(parser.getAttribute('Exception Reason')[0], 'to be empty');
    });

    it('should return an empty array if the key does not exist', () => {
      expect(parser.getAttribute('some undefined key'), 'to be empty');
    });
  });

  describe('#toObject()', () => {
    let parser;

    before('pass SAML response to LibSaml', (done) => {
      fs.readFile(path.join(__dirname, 'sample.saml'), (err, data) => {
        if (err) throw err;
        parser = new LibSaml(data);
        done();
      });
    });

    it('should return an object', () => {
      expect(parser.toObject(), 'to be an', 'object');
    });

    it('should have 9 elements in attributes', () => {
      expect(Object.keys(parser.toObject().attributes), 'to have length', 9);
    });
  });
});
