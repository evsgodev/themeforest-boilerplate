import { createRequire } from 'module';
import { loadPlugins } from './config.js';
const plugins = createRequire(import.meta.url)('gulp-load-plugins');
const $ = plugins(loadPlugins);
const browser = $.browserSync.create();

const reload = done => {
    browser.reload();
    done();
};

const notifyErr = title => {
    return $.notify.onError(err => {
        return {
            title: title,
            message: err.message
        };
    });
};

export {
    $,
    browser,
    reload,
    notifyErr
};
