require('../app/validateComparison.js');
const { expect } = require('chai');
describe('validateComparison Function Tests', function () {

  it('5 vs 6 → 6', function () {
    expect(validateComparison(5, 6)).to.equal(6);
  });

  it('4 vs 3 → 4', function () {
    expect(validateComparison(4, 3)).to.equal(4);
  });

  it('3 vs 3 → equal', function () {
    expect(validateComparison(3, 3)).to.equal("The amounts are equal");
  });

  it('a vs 5 → error Value 1', function () {
    expect(validateComparison("a", 5)).to.equal("Please enter a number in Value 1");
  });

  it('5 vs a → error Value 2', function () {
    expect(validateComparison(5, "a")).to.equal("Please enter a number in Value 2");
  });

  it('"" vs 5 → error Value 1', function () {
    expect(validateComparison("", 5)).to.equal("Please enter a number in Value 1");
  });

  it('5 vs "" → error Value 2', function () {
    expect(validateComparison(5, "")).to.equal("Please enter a number in Value 2");
  });

  it('-1 vs 5 → 5', function () {
    expect(validateComparison(-1, 5)).to.equal(5);
  });

  it('+34 vs -30 → 34', function () {
    expect(validateComparison("+34", -30)).to.equal(34);
  });

  it('-5 vs -6 → -5', function () {
    expect(validateComparison(-5, -6)).to.equal(-5);
  });

  it('5 vs -1 → 5', function () {
    expect(validateComparison(5, -1)).to.equal(5);
  });

  it('1.5 vs 2 → 2', function () {
    expect(validateComparison(1.5, 2)).to.equal(2);
  });

  it('2 vs 1.5 → 2', function () {
    expect(validateComparison(2, 1.5)).to.equal(2);
  });

  it('3/4 vs 1 → error Value 1', function () {
    expect(validateComparison("3/4", 1)).to.equal("Please enter a number in Value 1");
  });

  it('5b vs 3 → error Value 1', function () {
    expect(validateComparison("5b", 3)).to.equal("Please enter a number in Value 1");
  });

  it('3 vs 5b → error Value 2', function () {
    expect(validateComparison(3, "5b")).to.equal("Please enter a number in Value 2");
  });

});
