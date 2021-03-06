var path = require('path');

var Movie = function(moviePath, fs){
    this._moviePath = moviePath;
    this._fs = fs || require('fs');
};

Movie.prototype.getTitle = function(){
    return path.basename(this.getPath(), '.mp4');
};

Movie.prototype.getPath = function(){
    return this._moviePath;
};

Movie.prototype.getThumbnail = function(){
    var thumbnailPath = this.getPath().replace('.mp4', '.jpg');
    if (!this._fs.existsSync(thumbnailPath))
        return undefined;

    var buffer = this._fs.readFileSync(thumbnailPath);
    return buffer.toString('base64');
};

Movie.prototype.getSize = function(){
    var stat = this._fs.statSync(this.getPath());
    return stat.size;
};

Movie.prototype.playChunk = function(target, start, end){
    var options = {
        start: start,
        end: end
    };
    var movieStream = this._fs.createReadStream(this.getPath(), options);
    movieStream.pipe(target);
};

Movie.prototype.getModel = function(){
    return {
        title: this.getTitle(),
        thumbnail: this.getThumbnail()
    }
};

module.exports = Movie;