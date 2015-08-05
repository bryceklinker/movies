var fs = require('fs');
var path = require('path');

var Movie = function(filePath){
    this._filePath = filePath;
};

Movie.prototype.getPath = function(){
    return this._filePath;
};

Movie.prototype.getTitle = function(){
    return path.basename(this.getPath());
};

Movie.prototype.play = function(writeStream){
    var readStream = fs.createReadStream(this.getPath());
    readStream.pipe(writeStream);
};

Movie.prototype.getThumbnail = function(){
    var thumbnailPath = this.getPath().replace('.mp4', '.png');
    if (!fs.existsSync(thumbnailPath))
        return undefined;

    var buffer = fs.readFileSync(thumbnailPath);
    return buffer.toString('base64');
};

module.exports = Movie;