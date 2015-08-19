var path = require('path');

var Movie = function(moviePath, fs){
    this._moviePath = moviePath;
    this._fs = fs || require('fs');
};

Movie.prototype.getTitle = function(){
    return this.getPath().replace('.mp4', '');
};

Movie.prototype.getPath = function(){
    return this._moviePath;
};

Movie.prototype.getThumbnail = function(){
    var thumbnailPath = this.getPath().replace('.mp4', '.png');
    if (!this._fs.existsSync(thumbnailPath))
        return undefined;

    var buffer = this._fs.readFileSync(thumbnailPath);
    return buffer.toString('base64');
};

Movie.prototype.play = function(target){
    var movieStream = this._fs.createReadStream(this.getPath());
    movieStream.pipe(target);
};

Movie.prototype.getModel = function(){
    return {
        title: this.getTitle(),
        thumbnail: this.getThumbnail()
    }
};

module.exports = Movie;