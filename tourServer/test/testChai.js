const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();

// Chai assert
describe('Array via Assert Style', function() {
    const numbers = [1, 2, 3, 4, 5];
    it('is array of numbers', function() {
        assert.isArray(numbers, 'is array of numbers');
    });
    it('array contains 2', function() {
        assert.include(numbers, 2, 'array contains 2');
    });
    it('array contains 5 numbers', function() {
        assert.lengthOf(numbers, 5, 'array contains 5 numbers');
    });
});

// Expect style from Chai
describe('Array tests via Expect style', function() {
    const numbers = [1, 2, 3, 4, 5];
    it('A test with multiple assertions', function() {
        expect(numbers).to.be.an('array').that.includes(2);
        expect(numbers).to.have.lengthOf(5);
    });
});

// Should style from Chai
describe('Array tests via Should style', function(){
    const numbers = [1, 2, 3, 4, 5];
    it('Includes test', function() {
        numbers.should.be.an('array').that.includes(2);
    });
    it('Length test', function() {
        numbers.should.have.lengthOf(5);
    });
});