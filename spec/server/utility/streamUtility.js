var stream = require('stream');

var utility = {
    createStringReadStream: function (data){
        var readableStream = new stream.Readable({ encoding: 'utf8' });
        readableStream._read = function(){
            var count = data.length;
            for(var i = 0; i < count; i++){
                readableStream.push(data[i]);
            }
            readableStream.push(null);
        };
        return readableStream;
    },
    createStringWriteStream: function(chunks){
        var writableStream = new stream.Writable({ decodeStrings: false });
        writableStream._write = function(chunk, enc, next){
            chunks.push(chunk);
            next();
        };
        return writableStream;
    }
};

module.exports = utility;