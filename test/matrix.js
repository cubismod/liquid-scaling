var expect = require('chai').expect;
var assert = require('chai').assert;

var Matrix = require('../lib/matrix');

var Pixel = require('../lib/pixel');
var Seam = require('../lib/seam');

describe('Matrix', function() {

    var pixels = [];

    beforeEach(function() {
        pixels = [
            [
                new Pixel(0, 0, 0, 255),
                new Pixel(0, 0, 0, 255),
                new Pixel(0, 255, 0, 255),
                new Pixel(0, 0, 0, 255),
                new Pixel(0, 0, 0, 255),
            ],
            [
                new Pixel(0, 0, 0, 255),
                new Pixel(0, 0, 0, 255),
                new Pixel(0, 255, 0, 255),
                new Pixel(0, 0, 0, 255),
                new Pixel(0, 0, 0, 255),
            ],
            [
                new Pixel(0, 0, 0, 255),
                new Pixel(0, 0, 0, 255),
                new Pixel(0, 255, 0, 255),
                new Pixel(0, 0, 0, 255),
                new Pixel(0, 0, 0, 255),
            ],
            [
                new Pixel(0, 0, 0, 255),
                new Pixel(0, 0, 0, 255),
                new Pixel(0, 255, 0, 255),
                new Pixel(0, 0, 0, 255),
                new Pixel(0, 0, 0, 255),
            ],
        ];

    });

    it('can be created', function() {

        var matrix = new Matrix(pixels);

        expect(matrix).to.be.instanceof(Matrix);

    });

    it('can get width/height', function() {

        var matrix = new Matrix(pixels);

        expect(matrix.getWidth()).to.be.equal(5);
        expect(matrix.getHeight()).to.be.equal(4);

    });

    it('can get/set color', function() {

        var matrix = new Matrix(pixels);

        var color = matrix.getColor(0, 0);

        expect(color.r).to.equal(0);
        expect(color.g).to.equal(0);
        expect(color.b).to.equal(0);
        expect(color.a).to.equal(255);

    });

    it('can getHeat', function() {

        var matrix = new Matrix(pixels);
        expect(matrix.getHeat(1,1)).to.be.equal(1020);
        expect(matrix.getHeat(2,2)).to.be.equal(0);

    });

    it('can check isDeleted and markAsDeleted', function() {

        var matrix = new Matrix(pixels);

        expect(matrix.isDeleted(1,1)).to.be.false;

        matrix.markAsDeleted(1, 1);
        expect(matrix.isDeleted(1,1)).to.be.true;


    });

    it('can getMaxHeat', function() {

        var matrix = new Matrix(pixels);

        // very clever test, but covers 100% of heatmap ;)
        expect(matrix.getMaxHeat()).to.be.equal(1020);

    });

    it('can generateSeams and getSeams', function() {

        var matrix = new Matrix(pixels);

        matrix.generateSeams();

        expect(matrix.numberOfSeams()).to.be.equal(2);

        var seams = matrix.getSeams();

        expect(seams[0]).to.be.instanceof(Seam);
        expect(seams[1]).to.be.instanceof(Seam);

        matrix.generateSeams();
        expect(matrix.numberOfSeams()).to.be.equal(2);

    });

    it('can flip matrix', function() {

        var matrix = new Matrix(pixels);

        var flipped = matrix.flip();

        expect(flipped).to.be.instanceof(Matrix);

    });

    it('can getReduceWidth', function() {

        var matrix = new Matrix(pixels);

        matrix.generateSeams();
        var reduced = matrix.getReduceWidth(4);

        expect(reduced).to.be.instanceof(Matrix);
        expect(reduced.getWidth()).to.be.equal(4);
        expect(reduced.getHeight()).to.be.equal(4);

    });

    it('can getReduceWidth, request more then seams', function() {

        var matrix = new Matrix(pixels);

        matrix.generateSeams();
        var reduced = matrix.getReduceWidth(2);

        expect(reduced).to.be.instanceof(Matrix);
        expect(reduced.getWidth()).to.be.equal(3);
        expect(reduced.getHeight()).to.be.equal(4);

    });

    it('can getReduceHeight', function() {

        var matrix = new Matrix(pixels);

        matrix.generateSeams();
        var reduced = matrix.getReduceHeight(3);

        expect(reduced).to.be.instanceof(Matrix);
        expect(reduced.getWidth()).to.be.equal(5);
        expect(reduced.getHeight()).to.be.equal(3);

    });

    it('can getReduceHeight, request more then seams', function() {

        var matrix = new Matrix(pixels);
        matrix = matrix.flip();
        var reduced = matrix.getReduceHeight(2);

        expect(reduced).to.be.instanceof(Matrix);
        expect(reduced.getWidth()).to.be.equal(4);
        expect(reduced.getHeight()).to.be.equal(3);

    });

    it('can getReduced', function() {

        var matrix = new Matrix(pixels);

        reduced = matrix.getReduced({
            width:4,
            height:3
        });

        expect(reduced).to.be.instanceof(Matrix);
        expect(reduced.getWidth()).to.be.equal(4);
        expect(reduced.getHeight()).to.be.equal(3);

    });

    it('can getReduced without width', function() {

        var matrix = new Matrix(pixels);

        reduced = matrix.getReduced({
            height:3
        });

        expect(reduced).to.be.instanceof(Matrix);
        expect(reduced.getWidth()).to.be.equal(5);
        expect(reduced.getHeight()).to.be.equal(3);

    });

    it('can getReduced without height', function() {

        var matrix = new Matrix(pixels);

        reduced = matrix.getReduced({
            width:4
        });

        expect(reduced).to.be.instanceof(Matrix);
        expect(reduced.getWidth()).to.be.equal(4);
        expect(reduced.getHeight()).to.be.equal(4);

    });

    it('can unreduced as requested', function() {

        var matrix = new Matrix(pixels);

        reduced = matrix.getReduced({
            width:5,
            height:4
        });

        expect(reduced).to.be.instanceof(Matrix);
        expect(reduced.getWidth()).to.be.equal(5);
        expect(reduced.getHeight()).to.be.equal(4);

    });


});

