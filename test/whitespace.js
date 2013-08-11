var assert = require('assert');
var wordwrap2 = require('../');

var fs = require('fs');
var content = fs.readFileSync(__dirname + '/whitespace.json', 'utf8'),
    data = JSON.parse(content);

exports.stop30 = function () {
    var wrapD = wordwrap2(30),
        wrapC = wordwrap2(30, {whitespace: 'collapse'}),
        wrapL = wordwrap2(30, {whitespace: 'line'}),
        wrapA = wordwrap2(30, {whitespace: 'all'});

    var text = data.text,
        resD = wrapD(text),
        resC = wrapC(text),
        resL = wrapL(text),
        resA = wrapA(text);

    assert.equal(resD, data.resD);
    assert.equal(resC, data.resC);
    assert.equal(resL, data.resL);
    assert.equal(resA, data.resA);

    resD.split(/\n/).forEach(function (line) {
        assert.ok(line.length <= 30, 'line > 30 columns');
    });
    resC.split(/\n/).forEach(function (line) {
        assert.ok(line.length <= 30, 'line > 30 columns');
    });
    resL.split(/\n/).forEach(function (line) {
        assert.ok(line.length <= 30, 'line > 30 columns');
    });
    resA.split(/\n/).forEach(function (line) {
        assert.ok(line.length <= 30, 'line > 30 columns');
    });
};

exports.start10stop40 = function () {
    var wrapDS = wordwrap2(10, 40, {whitespace: 'invalid value'}),
        wrapCS = wordwrap2(10, 40, {whitespace: 'collapse'}),
        wrapLS = wordwrap2(10, 40, {whitespace: 'line'}),
        wrapAS = wordwrap2(10, 40, {whitespace: 'all'});

    var text = data.text,
        resDS = wrapDS(text),
        resCS = wrapCS(text),
        resLS = wrapLS(text),
        resAS = wrapAS(text);

    var prefix = new Array(11).join(' ');

    assert.equal(resDS, data.resDS);
    assert.equal(resCS, data.resCS);
    assert.equal(resLS, data.resLS);
    assert.equal(resAS, data.resAS);

    resDS.split(/\n/).forEach(function (line) {
        assert.ok(line.length <= 40, 'line > 40 columns');
        assert.equal(line.substring(0, 10), prefix);
    });
    resCS.split(/\n/).forEach(function (line) {
        assert.ok(line.length <= 40, 'line > 40 columns');
        assert.equal(line.substring(0, 10), prefix);
    });
    resLS.split(/\n/).forEach(function (line) {
        assert.ok(line.length <= 40, 'line > 40 columns');
        assert.equal(line.substring(0, 10), prefix);
    });
    resAS.split(/\n/).forEach(function (line) {
        assert.ok(line.length <= 40, 'line > 40 columns');
        assert.equal(line.substring(0, 10), prefix);
    });
};
