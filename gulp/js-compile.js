import gulp from 'gulp';
import * as config from './config.js';
import { $ } from './helper.js';
const { src, dest } = gulp;

export default class Scripts {
    static eslint() {
        return src(config.scripts.src)
            .pipe($.plumber())
            .pipe($.eslint())
            .pipe($.eslint.format())
            .pipe($.if(!$.browserSync.active, $.eslint.failOnError()));
    }

    static concat() {
        return src(config.scripts.srcConcat)
            .pipe($.concat('components.js'))
            .pipe(dest(`${config.developer}/js/`));
    }
}
