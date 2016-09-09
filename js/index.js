var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
function get(options) {
    return (function (params) {
        var filePath = null;
        if (options && options.filePathMaker && typeof options.filePathMaker === 'function')
            filePath = options.filePathMaker(params);
        try {
            if (!filePath)
                throw 1;
            var parsed = path.parse(filePath);
            var dir = parsed.dir;
            if (!dir)
                throw 1;
            mkdirp.sync(dir);
            var ws = fs.createWriteStream(filePath);
            if (!ws)
                throw 1;
            return { stream: ws, streamInfo: { filePath: filePath } };
        }
        catch (e) {
            return { stream: null, streamInfo: null };
        }
    });
}
exports.get = get;
