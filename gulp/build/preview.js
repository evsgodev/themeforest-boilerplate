import { createRequire } from 'module';
import gulp from 'gulp';
import * as config from '../config.js';
import { $, browser } from '../helper.js';
const { src, dest, series } = gulp;
const {
    preview,
    ONLY_MINIFY_VENDOR,
    SERVER_INDEX_PAGE
} = config.argvMode;
const { dataFileName, distComponents } = config.template;
let data;
let concatObj;
let concatSrcFiles;
let concatMinifyFiles;

const concatObjectIterable = object => {
    concatSrcFiles = [];

    object.array.forEach(el => {
        const element = el;

        if (element.slice(-4) === '.css') {
            concatSrcFiles.push(object.css(element));
        } else {
            concatSrcFiles.push(object.js(element));
        }
    });
};

export default class Preview {
    static tasks() {
        return series(
            Preview.previewCopy,
            Preview.previewConcatRun,
            Preview.previewMinify,
            Preview.previewClean
        );
    }

    static previewCopy() {
        return src([
            `${config.developer}/**/*.*`,
            `!${config.developer}/img/**/*.*`
        ])
            .pipe($.debug({ title: 'copy:preview' }))
            .pipe(dest(config.preview));
    }

    static previewConcatRun() {
        if (typeof data === 'undefined') {
            data = createRequire(import.meta.url)(`../../${distComponents + dataFileName}`);
            concatObj = Object.freeze({
                vendor: {
                    array: [...data.concat.css, ...data.concat.js],
                    css: el => `${config.preview}/css/${el}`,
                    js: el => `${config.preview}/js/vendor/${el}`
                },
                common: {
                    array: [...data.concat.commonCss, ...data.concat.commonJs],
                    css: el => `${config.preview}/css/${el}`,
                    js: el => `${config.preview}/js/${el}`
                }
            });
        }

        if (!concatMinifyFiles) {
            concatObjectIterable(concatObj.vendor);

            return src(concatSrcFiles)
                .pipe($.if(/[.]css$/,
                    $.concat({ path: 'vendor.min.css' }),
                    $.concat({ path: 'vendor.min.js' })))
                .pipe($.if(/[.]css$/,
                    dest(`${config.preview}/css/`),
                    dest(`${config.preview}/js/`)));
        }

        concatObjectIterable(concatObj.common);

        return src(concatSrcFiles)
            .pipe($.if(/[.]css$/,
                $.concat({ path: 'common.css' }),
                $.concat({ path: 'common.js' })))
            .pipe($.if(/[.]js$/, $.if(
                !ONLY_MINIFY_VENDOR,
                $.babel({ presets: ['@babel/env'] })
            )))
            .pipe($.if(/[.]js$/, $.if(
                !ONLY_MINIFY_VENDOR,
                $.uglify()
            )))
            .pipe($.if(/[.]css$/,
                dest(`${config.preview}/css/`),
                dest(`${config.preview}/js/`)));
    }

    static previewMinify() {
        concatMinifyFiles = true;

        return Preview.previewConcatRun();
    }

    static previewClean() {
        return $.del([
            `${config.preview}/{css/*.css,js/*.js,js/vendor/}`,
            `!${config.preview}/{css/{common,vendor.min}.css,js/{common,vendor.min}.js}`
        ]);
    }

    static previewServe(cb) {
        browser.init({
            server: {
                baseDir: `./${preview}`,
                index: SERVER_INDEX_PAGE
            },
            watchOptions: {
                ignoreInitial: true
            },
            port: 8081,
            tunnel: false,
            online: false,
            notify: false,
            logConnections: true,
            ui: false
        });

        return cb();
    }
}
