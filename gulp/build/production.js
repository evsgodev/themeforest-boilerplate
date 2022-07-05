import gulp from 'gulp';
import * as config from '../config.js';
import { $ } from '../helper.js';
const { src, dest, series } = gulp;

export default class Production {
    static tasks() {
        return series(
            Production.productionCopy,
            Production.productionCopyStyles
        );
    }

    static productionCopy() {
        return src([
            `${config.developer}/**/*.*`,
            `!${config.developer}/{**/*demo*,img/**/*.*}`
        ])
            .pipe($.debug({ title: 'copy:production' }))
            .pipe(dest(config.production));
    }

    static productionCopyStyles() {
        return src([
            `${config.sourceFolder}/styles/**/*.*`,
            `!${config.sourceFolder}/styles/demo.scss`
        ])
            .pipe($.debug({ title: 'copy:production' }))
            .pipe(dest(`${config.production}/styles`));
    }
}
