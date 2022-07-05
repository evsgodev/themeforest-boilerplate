import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import nodeSass from 'node-sass';
import { argvMode, imageFolderName, styles } from './config.js';
import { $, browser, notifyErr } from './helper.js';
const { src, dest } = gulp;
const preprocSass = gulpSass(nodeSass);
const { ONLY_MINIFY_VENDOR } = argvMode;
let { minifyCss } = argvMode;
const { pathPrefix } = argvMode.styles;
const replaceCssPathName = `../${imageFolderName}/`;

export default class Styles {
    static cssCompile() {
        minifyCss = false;

        return Styles.task();
    }

    static cssBuild() {
        minifyCss = true;

        return Styles.task();
    }

    static task() {
        return src(styles.src)
            .pipe($.newer(styles.dist))
            .pipe($.if(
                !minifyCss,
                $.sourcemaps.init()
            ))
            .pipe($.plumber(notifyErr()))
            .pipe(preprocSass({
                outputStyle: 'expanded'
            }).on('error', () => browser.notify('<strong>FAIL</strong> Sass')))
            .pipe($.autoprefixer())
            .pipe($.replaceTask({
                patterns: [{
                    match: pathPrefix,
                    replacement: replaceCssPathName
                }],
                usePrefix: false
            }))
            .pipe($.if(
                !ONLY_MINIFY_VENDOR,
                $.if(
                    minifyCss,
                    $.cssnano({
                        autoprefixer: {
                            remove: false
                        },
                        discardUnused: false,
                        reduceIdents: false,
                        zindex: false
                    })
                )
            ))
            .pipe($.if(
                !minifyCss,
                $.sourcemaps.write('./')
            ))
            .pipe(dest(styles.dist));
    }
}
