var Server = require('./../../src/server/server.js');
var request = require('request');
var fs = require('fs');
var path = require('path');

describe('server', function(){
    var server;

    beforeEach(function(){
        server = new Server(3000);
        server.start();
    });

    it('should return index page', function(done){
        request('http://localhost:3000/', function(error, response, body){
            var indexPath = path.join(__dirname, './../../src/client/index.html');
            var indexContent = fs.readFileSync(indexPath, {encoding: 'utf8'});
            expect(body).toBe(indexContent);
            done();
        });
    });

    it('should return files in client dist', function(done){
        request('http://localhost:3000/dist/js/bootstrap.min.js', function(error, response, body){
            var bootstrapPath = path.join(__dirname, './../../src/client/dist/js/bootstrap.min.js');
            var bootstrapContent = fs.readFileSync(bootstrapPath, {encoding: 'utf8'});
            expect(body).toBe(bootstrapContent);
            done();
        });
    });

    afterEach(function(){
        server.close();
    });
});