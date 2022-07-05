import gulp from 'gulp';
import fs from 'fs';
import * as config from '../config.js';
import { $ } from '../helper.js';
const { src, dest } = gulp;
const { dataFileName, dataFiles, distComponents } = config.template;

export default class Data {
    static dataRun() {
        return src(dataFiles)
            .pipe($.mergeJson({ fileName: dataFileName }))
            .pipe(dest(distComponents));
    }

    static parser() {
        return JSON.parse(fs.readFileSync(distComponents + dataFileName, 'utf8'));
    }
}
