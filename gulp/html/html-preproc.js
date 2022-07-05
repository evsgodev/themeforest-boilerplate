import { createRequire } from 'module';
import gulp from 'gulp';
import fs from 'fs';
import * as config from '../config.js';
import { $, browser, notifyErr } from '../helper.js';
import generateStaticPath from './helpers/generate-static-path.js';
import Data from './data.js';
const { src, dest } = gulp;
const {
    EMAILS_BUILD,
    templatePreproc,
    templateLocals,
    prettify,
    htmlMinify
} = config.argvMode;
const { production } = config.argvMode.env;
const emitty = createRequire(import.meta.url)('emitty').setup(config.sourceFolder, templatePreproc);
const patterns = [];
let { htmlCache, htmlPreview } = config.argvMode;
let previewLocals;

if (production) {
    htmlCache = false;
    htmlPreview = true;
    previewLocals = Object.assign({}, templateLocals, {
        isPreview: true
    });
}

if (templateLocals.symbolsInject) {
    patterns.push({
        match: '%symbols%',
        replacement: (() => fs.readFileSync(`${config.imagesPath.dist}/svg-symbols.svg`, 'utf8'))
    });
} else {
    patterns.push({
        match: '%symbols%',
        replacement: ''
    });
}

export default class HTMLPreproc {
    static htmlCompile() {
        if (!htmlCache) {
            return HTMLPreproc.task();
        }

        return new Promise((resolve, reject) => {
            emitty.scan(global.emittyPugChangedFile)
                .then(HTMLPreproc.task(resolve, reject))
                .catch(event => console.log(event));
        });
    }

    static emailsCompile(cb) {
        if (EMAILS_BUILD) {
            return src(config.email.filesSrc)
                .pipe($.plumber(notifyErr()))
                .pipe($.mjml())
                .pipe($.htmlBeautify(prettify))
                .pipe(dest(config.email.dist));
        }

        return cb();
    }

    static task(resolve, reject) {
        let dataLocals = htmlPreview ? previewLocals : templateLocals;

        return src(config.template.src)
            .pipe($.plumber(notifyErr()))
            .pipe($.if(htmlCache === true, emitty.filter(global.emittyPugChangedFile)))
            .pipe($.if(htmlCache === true, $.debug()))
            .pipe($.data(Data.parser()))
            .pipe($.if(templatePreproc === 'pug',
                $.pug({
                    pretty: true,
                    locals: dataLocals
                }).on('error', () => browser.notify('<strong>FAIL</strong> Pug')),
                $.nunjucksRender({
                    path: config.template.render,
                    data: dataLocals
                }).on('error', () => browser.notify('<strong>FAIL</strong> Nunjucks'))))
            .pipe(generateStaticPath())
            .pipe($.replaceTask({
                patterns: patterns,
                usePrefix: false
            }))
            .pipe($.htmlBeautify(prettify))
            .pipe($.if(htmlMinify === true && htmlPreview === true,
                $.htmlmin({
                    removeComments: true,
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: false,
                    removeEmptyAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    removeOptionalTags: true
                })))
            .pipe(dest(config.template.dist))
            .on('end', htmlCache ? resolve : () => {
                htmlPreview = false;
            })
            .on('error', htmlCache ? reject : () => {});
    }
}
