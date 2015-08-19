var expect = require('chai').expect;
describe('server', function(){
    var fs;
    var http;
    var path;
    var server;

    beforeEach(function(){
        fs = require('fs');
        http = require('http');
        path = require('path');

        var Server = require('../../src/server/server');
        server = new Server(3000);
        server.start();
    });

    it('should respond with index.html', function(done){
        var indexPath = path.join(__dirname, '..', '..', 'src', 'public', 'index.html');
        var indexContent = fs.readFileSync(indexPath, { encoding: 'utf8' });

        http.get('http://localhost:3000/', function(res){
            var data = '';
            res.setEncoding('utf8');
            res.on('data', function(chunk) { data += chunk; });
            res.on('end', function() {
                expect(data).to.equal(indexContent);
                done();
            })
        });
    });

    it('should respond with file content', function(done){
        var filePath = path.join(__dirname, '..', '..', 'src', 'public', 'index.html');
        var fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
        http.get('http://localhost:3000/index.html', function(res){
            var data = '';
            res.setEncoding('utf8');
            res.on('data', function(chunk) { data += chunk; });
            res.on('end', function(){
                expect(data).to.equal(fileContent);
                done();
            });
        });
    });

    afterEach(function(){
        server.stop();
    });
});