// Saml2js Tests
// =============
// The tests for this module.
// jshint esnext: true

const expect  = require('unexpected');
const Saml2js = require('../index');
const fs      = require('fs');

var parser;

beforeEach('pass SAML response to Saml2js', function(done) {
  fs.readFile(__dirname + '/sample.saml', function(err, data) {
    if (err) throw err;
    parser = new Saml2js(data);
    done();
  });
});

describe('Saml2js', function() {
  describe('#parse()', function() {
    it('should have a value', function() {
      expect(parser.parsedSaml, 'to be defined');
    });

    it('should return an object', function() {
      expect(parser.parsedSaml, 'to be an', 'object');
    });

    it('should have 8 keys', function() {
      expect(Object.keys(parser.parsedSaml), 'to have length', 8);
    });
  });

  describe('#parse()', function() {
    it('should parse base64 encoded SAML', function(done) {
      fs.readFile(__dirname + '/base64.saml', {encoding: 'utf8'}, function(err, saml) {
        if (err) done(err);
        var base64parser = new Saml2js(saml);
        expect(base64parser.toObject(), 'to be an', 'object');
        done();
      });
    });

    it('should contain the expected data', function(done) {
      fs.readFile(__dirname + '/base64.saml', {encoding: 'utf8'}, function(err, saml) {
        if (err) done(err);
        var base64parser = new Saml2js(saml);
        expect(base64parser.get('transfer type'), 'to be', 'Completed eligibility application');
        done();
      });
    });
  });

  describe('#toJSON()', function() {
    it('should return a string', function() {
      expect(parser.toJSON(), 'to be a', 'string');
    });

    it('should be valid JSON', function() {
      expect(JSON.parse(parser.toJSON()), 'to be ok');
    });
  });

  describe('#get()', function() {
    it('should get attributes by name', function() {
      expect(parser.get('transfer type'), 'to be', 'Completed Application');
    });

    it('should get attributes case-insensitively', function() {
      expect(parser.get('FfE ASSIgned Consumer Id'), 'to be a', 'string');
    });

    it('should return undefined if the key does not exist', function() {
      expect(parser.get('some undefined key'), 'to be undefined');
    });

    it('should return null for empty SAML attributes', function() {
      expect(parser.get('Exception Reason'), 'to be null');
    });
  });

  describe('#toObject()', function() {
    it('should return an object', function() {
      expect(parser.toObject(), 'to be an', 'object');
    });

    it('should have 8 keys', function() {
      expect(Object.keys(parser.toObject()), 'to have length', 8);
    });
  });
});
