import gulp from 'gulp';
import IMAGES from './images/images.js';
import HTML, { HTMLPreproc } from './html/html.js';
import Styles from './css-compile.js';
import Scripts from './js-compile.js';
import Copy from './copy.js';
import zip from './zip.js';
import Clean from './clean.js';
import Preview from './build/preview.js';
import Production from './build/production.js';
const { parallel, series } = gulp;


const build = series(
    Clean.cleanBuild,
    Copy.tasks(),
    IMAGES.tasks(),
    parallel(
        HTML.tasks(),
        Styles.cssBuild,
        Scripts.concat
    ),
    Preview.tasks(),
    parallel(
        HTMLPreproc.htmlCompile,
        Styles.cssCompile
    ),
    Preview.previewServe,
    Production.tasks(),
    zip
);

export default build;
