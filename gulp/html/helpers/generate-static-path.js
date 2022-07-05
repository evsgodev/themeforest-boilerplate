import through2 from 'through2';
import path from 'path';
import Buffer from 'buffer';
import * as config from '../../config.js';
const bufferObj = Buffer.Buffer;
const { templateLocals } = config.argvMode;
const getStaticPrefix = pageDepth => `${pageDepth.join('')}`;

const generateStaticPath = () => {
    return through2.obj(function (chunk, enc, done) {
        const chunkObj = chunk;
        const directoriesArray = path.parse(chunk.relative).dir.split(path.sep);
        const pageDepthGetPath = value => {
            return value ? '../' : '';
        };
        const pageDepth = directoriesArray.map(pageDepthGetPath);
        let newPageContent = chunk.contents.toString();

        newPageContent = newPageContent
            .split(templateLocals.pathPrefix)
            .join(getStaticPrefix(pageDepth));

        chunkObj.contents = bufferObj.from(newPageContent);

        this.push(chunkObj);

        return done();
    }, done => done());
};

export default generateStaticPath;
