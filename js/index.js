var fs = require('fs');
function get(options) {
    return (function (params) {
        var filePath = options.filePathMaker(params);
        var ws = fs.createWriteStream(filePath);
        return { stream: ws, streamInfo: { filePath: filePath } };
    });
}
exports.get = get;
