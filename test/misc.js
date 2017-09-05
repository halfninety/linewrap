var assert = require('chai').assert;
var linewrap = require('../');

describe('misc', function () {
it('bulge', function() {
    var text = "  text sample with extraordinarily long word  ";
    var res = linewrap(10, {whitespace: 'all'})(text);
    assert.equal(res, "  text \nsample \nwith \nextraordinarily\n long word\n  ");
});

it('blankline', function() {
    var text = "    \n  text sample";
    var res = linewrap(2, 12, {whitespace: 'line'})(text);
    assert.equal(res, "  \n    text\n  sample");
});

it('hardblank', function() {
    var text = "              text sample";
    var res = linewrap.hard(2, 12, {whitespace: 'line'})(text);
    assert.equal(res, "  \n      text\n  sample");
});

it('multiline', function() {
    var text = "   text   \n            \n   text   \n";
    var res = linewrap.hard(10, {whitespace: 'line'})(text);
    assert.equal(res, "   text\n\n\n   text\n");
});

it('colorall', function() {
    var text = "text text\x1B[1;2;3m      ";
    var res = linewrap(10, {skipScheme: 'ansi-color', whitespace: 'all'})(text);
    assert.equal(res, "text text\x1B[1;2;3m \n     ");
});

it('colorall2', function() {
    var text = "the \x1B[1;2;3mextraordinarily\x1B[0m long word";
    var res = linewrap(10, {skipScheme: 'ansi-color', whitespace: 'all'})(text);
    assert.equal(res, "the \x1B[1;2;3m\nextraordinarily\n\x1B[0m long word");
});

it('cleanvsnew', function() {
    var text = " text text  <tag>  text";
    var res = linewrap.hard(10, {skipScheme: 'html', whitespace: 'line'})(text);
    assert.equal(res, " text text\n<tag>text");
});

it('collapse', function() {
    var text = "  text  text  \n  \n text  ";
    var res = linewrap(10, {whitespace: 'collapse', respectLineBreaks:'s2'})(text);
    assert.equal(res, "text text\ntext");
});

it('wrapall', function() {
    var text = "  text                                      text    ";
    var res = linewrap(10, {whitespace: 'all'})(text);
    assert.equal(res, "  text    \n          \n          \n          \n    text  \n  ");
});

it('wrapline', function() {
    var text = "  text          \n                         text    ";
    var res = linewrap(10, {whitespace: 'line'})(text);
    assert.equal(res, "  text\n\n\n     text");
});
});

