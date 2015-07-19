var window = window || undefined;

if (window) {
  GLOBAL = window;
} else {
  var fs = require('fs');
  var vm = require('vm');
  var sinon = require('sinon');
  var chai = require('chai');
  var functionsFile = fs.readFileSync(process.cwd() + '/insert-dashes.js');
  vm.runInThisContext(functionsFile); // file runs and it's contents has access to GLOBAL
}


var expect = chai.expect;
var should = chai.should();

describe("Main", function() {
  var sandbox;

  beforeEach(function() {
    // create a sandbox
    sandbox = sinon.sandbox.create();

    // stub some console methods
    sandbox.stub(console, "log");
    sandbox.stub(console, "error");
  });

  afterEach(function() {
    // restore the environment as it was before
    sandbox.restore();
  });

  describe("#insertDashes", function() {
    it("should be a function", function() {
      (typeof GLOBAL.insertDashes).should.equal("function");
    });
    it("should return an empty string if nothing is given", function() {
      (GLOBAL.insertDashes()).should.equal("");
    });
    it("should return an empty string if anything but a string is given", function() {
      (GLOBAL.insertDashes(51)).should.equal("");
      (GLOBAL.insertDashes(null)).should.equal("");
      (GLOBAL.insertDashes(undefined)).should.equal("");
      (GLOBAL.insertDashes({})).should.equal("");
      (GLOBAL.insertDashes(true)).should.equal("");
    });
    it("should return the same string if there are no numbers in the string", function() {
      (GLOBAL.insertDashes("ball")).should.equal("ball");
      (GLOBAL.insertDashes("cat")).should.equal("cat");
    });
    it("should return a string with dashes between consecutive odd integers", function() {
      (GLOBAL.insertDashes("456792")).should.equal("4567-92");
      (GLOBAL.insertDashes("13542897")).should.equal("1-3-54289-7");
      (GLOBAL.insertDashes("planet 77")).should.equal("planet 7-7");
    });
    it("should return integer", function() {
      (GLOBAL.insertDashes("1")).should.equal("1");
      (GLOBAL.insertDashes("2")).should.equal("2");
    });
    it("should return negative integer", function() {
      (GLOBAL.insertDashes("-1")).should.equal("-1");
      (GLOBAL.insertDashes("-2")).should.equal("-2");
    });
  });
  describe("#checkOdd", function() {
    it("should be a function", function() {
      (typeof GLOBAL.checkOdd).should.equal("function");
    });
    it("should return true if char is an odd number", function() {
      (GLOBAL.checkOdd("3")).should.equal(true);
      (GLOBAL.checkOdd("23")).should.equal(true);
    });
    it("should return false if char is anything but an odd number", function() {
      (GLOBAL.checkOdd("8")).should.equal(false);
      (GLOBAL.checkOdd("k")).should.equal(false);
      (GLOBAL.checkOdd(" ")).should.equal(false);
      (GLOBAL.checkOdd("")).should.equal(false);
    });
  });
});
