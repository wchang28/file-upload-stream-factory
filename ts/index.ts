import * as busboyPipe from 'busboy-pipe';
import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';

export interface FilePathMaker {
    (params: busboyPipe.FilePipeParams): string
}

export interface Options {
    filePathMaker: FilePathMaker;
}

export function get(options: Options) : busboyPipe.WriteStreamFactory {
    return ((params: busboyPipe.FilePipeParams) : busboyPipe.WriteStreamInfo => {
        let filePath:string = null;
        if (options && options.filePathMaker && typeof options.filePathMaker === 'function') filePath = options.filePathMaker(params);
        try {
            if (!filePath) throw 1;
            let parsed = path.parse(filePath);
            let dir = parsed.dir;
            if (!dir) throw 1;
            mkdirp.sync(dir);
            let ws = fs.createWriteStream(filePath);
            if (!ws) throw 1;
            return {stream: ws, streamInfo: {filePath: filePath}};
        } catch (e) {
            return {stream: null, streamInfo: null};
        }
    });
}