import { createRequire } from 'module';
import gulp from 'gulp';
import * as config from './config.js';
import { $ } from './helper.js';
const { name, version } = createRequire(import.meta.url)('../package.json');
const { src, dest } = gulp;
const { build } = config;
const { PROJECT_VERSION, BACKUP } = config.argvMode;

const zip = (cb) => {
    const fileName = `${name}_${PROJECT_VERSION || version}`;
    const now = new Date();
    const year = now.getFullYear().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    if (BACKUP) {
        src(`${build}/**/*`)
            .pipe($.zip(`${fileName}_${year}-${month}-${day}_${hours}-${minutes}.zip`))
            .pipe(dest('./'));
    }

    return cb();
};

export default zip;
