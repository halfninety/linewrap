/* eslint-env node, mocha */

var assert = require('chai').assert;
var linewrap = require('../');

var fs = require('fs');
var path = require('path');
var textBL = fs.readFileSync(path.join(__dirname, 'paragraph.txt'), 'utf8'),
    resultBL = fs.readFileSync(path.join(__dirname, 'paragraph-res.txt'), 'utf8').replace(/\r\n/g, '\n'),
    textID = fs.readFileSync(path.join(__dirname, 'paragraph2.txt'), 'utf8'),
    resultID = fs.readFileSync(path.join(__dirname, 'paragraph2-res.txt'), 'utf8').replace(/\r\n/g, '\n');

describe('paragraph', function () {
it('blankline', function () {
    var wrap = linewrap(80, { respectLineBreaks: 'multi', whitespace: 'line' }),
        res = wrap(textBL);

    fs.writeFileSync(path.join(__dirname, 'paragraph-out.txt'), res, 'utf8');

    res.split(/\n/).forEach(function (line) {
        assert.ok(line.length <= 80, 'line > 80 columns');
        if (line.length > 0) {
            assert.ok(line[line.length - 1] !== ' ', 'trailing space not stripped');
        }
    });

    assert.equal(res, resultBL);
});

it('identation', function () {
    var wrap = linewrap(80, { respectLineBreaks: 's4', whitespace: 'line' }),
        res = wrap(textID);

    fs.writeFileSync(path.join(__dirname, 'paragraph2-out.txt'), res, 'utf8');

    res.split(/\n/).forEach(function (line) {
        assert.ok(line.length <= 80, 'line > 80 columns');
        if (line.length > 0) {
            assert.ok(line[line.length - 1] !== ' ', 'trailing space not stripped');
        }
    });

    assert.equal(res, resultID);
});
});

