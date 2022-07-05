import gulp from 'gulp';
import * as config from './config.js';
import { $ } from './helper.js';
const { src, dest, parallel } = gulp;
const { OPTIMIZE_IMAGES } = config.argvMode;
const { production } = config.argvMode.env;
const assetsSrc = [
    `${config.sourceFolder}/assets/**/*`,
    `!${config.sourceFolder}/assets/{js,misc}/**`
];

if (OPTIMIZE_IMAGES && production) {
    assetsSrc.push(`!${config.imagesPath.src}/**`);
}

export default class Copy {
    static tasks() {
        return parallel(
            Copy.scriptsCopy,
            Copy.filesCopy,
            Copy.assetsCopy
        );
    }

    static scriptsCopy() {
        return src(`${config.sourceFolder}/assets/js/**/*`)
            .pipe($.newer(`${config.developer}/js`))
            .pipe($.debug('scripts'))
            .pipe(dest(`${config.developer}/js`));
    }

    static filesCopy() {
        return src(config.filesPath.src)
            .pipe($.newer(config.filesPath.dist))
            .pipe($.debug('files'))
            .pipe(dest(config.filesPath.dist));
    }

    static assetsCopy() {
        return src(assetsSrc)
            .pipe($.newer(config.developer))
            .pipe($.debug('assets'))
            .pipe(dest(config.developer));
    }
}
