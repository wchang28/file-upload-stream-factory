import * as busboyPipe from 'busboy-pipe';
export interface FilePathMaker {
    (params: busboyPipe.FilePipeParams): string;
}
export interface Options {
    filePathMaker: FilePathMaker;
}
export declare function get(options: Options): busboyPipe.WriteStreamFactory;
