import gulp from 'gulp';
import path from 'path';
import * as config from './config.js';
import { $, browser, reload } from './helper.js';
import IMAGES, * as images from './images/images.js';
import HTML from './html/html.js';
import Styles from './css-compile.js';
import Scripts from './js-compile.js';
import Copy from './copy.js';
import Clean from './clean.js';
const { watch, series, parallel } = gulp;
const { developer, watchPath } = config;
const { SERVER_INDEX_PAGE, PNG_SPRITE } = config.argvMode;

const deleteEventFile = (filePath, resolve, src = `${config.sourceFolder}/assets`) => {
    const sourcesFiles = path.relative(path.resolve(src), filePath);
    const destFiles = path.resolve(resolve, sourcesFiles);
    $.del.sync(destFiles);
};

const serveWatch = () => {
    browser.init({
        server: {
            baseDir: `./${developer}`,
            index: SERVER_INDEX_PAGE
        },
        watchOptions: {
            ignoreInitial: true
        },
        port: 8080,
        tunnel: false,
        online: false,
        notify: false,
        logConnections: true,
        ui: false
    });

    watch(watchPath.templates, HTML.templates()).on('all', (event, file) => {
        if (event === 'unlink') {
            global.emittyPugChangedFile = undefined;
        } else {
            global.emittyPugChangedFile = file;
        }
    });

    watch(watchPath.data, HTML.data());
    watch(watchPath.email, HTML.emails());
    watch(watchPath.css, series(Styles.cssCompile, reload));

    watch(watchPath.js, series(Copy.scriptsCopy, Scripts.concat, reload))
        .on('unlink', event => deleteEventFile(event, config.developer));

    watch(watchPath.assets, series(Copy.assetsCopy, reload))
        .on('unlink', event => deleteEventFile(event, config.developer));

    watch(watchPath.files, series(Copy.filesCopy, reload))
        .on('unlink', event => deleteEventFile(event, config.developer, `${config.sourceFolder}/assets/misc`));

    if (PNG_SPRITE) {
        watch(watchPath.sprite, series(images.pngSprite, reload));
    }

    watch(watchPath.svg, series(images.svgSprite, reload));
};

const dev = series(
    Clean.cleanDev,
    Copy.tasks(),
    IMAGES.tasks(),
    parallel(
        HTML.tasks(),
        Styles.cssCompile,
        Scripts.concat
    ),
    serveWatch
);

export default dev;
