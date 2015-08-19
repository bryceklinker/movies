var expect = require('chai').expect;

describe('config', function(){
    var config;

    beforeEach(function(){
        config = require('../src/config');
    });

    it('should define videos path', function(){
        expect(config.videosPath).to.equal('C:\\Users\\Bryce\\Videos');
    });

    it('should define api url', function(){
        expect(config.apiUrl).to.equal('http://bryce-8:3000');
    });
});