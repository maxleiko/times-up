// Created by leiko on 18/08/14 16:25
var expect = require('chai').expect;
var timesUp = require('../times-up');

describe('timesUp test', function () {
    it('should throw an error cause time is up', function (done) {
        this.timeout(3000);

        function foo(cb) { setTimeout(cb, 2000); }

        foo(timesUp(1000, function (err) {
            expect(err).to.not.be.a('null');
            expect(err).to.not.be.a('undefined');
            expect(err.message).to.equal('Method timed out (1000ms)');
            done();
        }));
    });

    it('should not throw an err', function (done) {
        this.timeout(2000);

        function foo(cb) { setTimeout(cb, 500); }

        foo(timesUp(1000, function (err) {
            expect(err).to.be.equal(undefined);
            done();
        }));
    });

    it('should throw "Method foo() timed out (1042ms)" error', function (done) {
        this.timeout(3000);

        function foo(cb) { setTimeout(cb, 2000); }

        foo(timesUp('foo()', 1042, function (err) {
            expect(err).to.not.be.a('null');
            expect(err).to.not.be.a('undefined');
            expect(err.message).to.equal('Method foo() timed out (1042ms)');
            done();
        }));
    });

    it('should not throw an err and give params back in callback', function (done) {
        var foo = 'foo',
            fortytwo = 42,
            obj = {bar: new Date()};

        function bar(cb) { cb(null, foo, fortytwo, obj); }

        bar(timesUp(function (err, one, two, three) {
            expect(err).to.be.equal(null);
            expect(one).to.equal(foo);
            expect(two).to.equal(fortytwo);
            expect(three).to.equal(obj);
            done();
        }));
    });

    it('should throw an error because the inner function failed', function (done) {
        this.timeout(3000);

        function foo(cb) {
            cb(new Error('Something went wrong there'));
        }

        foo(timesUp('foo()', function (err) {
            expect(err).to.not.be.a('null');
            expect(err.message).to.be.equal('Something went wrong there');
            done();
        }));
    });
});