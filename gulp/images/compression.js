import gulp from 'gulp';
import * as config from '../config.js';
import { $ } from '../helper.js';
import imagemin, {
    gifsicle,
    mozjpeg,
    optipng
} from 'gulp-imagemin';
const { src, dest } = gulp;
const { OPTIMIZE_IMAGES, PNG_OPTIMIZE } = config.argvMode;

const imagesOptimize = done => {
    if (OPTIMIZE_IMAGES) {
        return src(`${config.imagesPath.src}/**/*.*`)
            .pipe($.newer(config.imagesPath.dist))
            .pipe($.debug({ title: 'images' }))
            .pipe(imagemin([
                gifsicle({
                    interlaced: true
                }),
                mozjpeg({
                    quality: 80,
                    progressive: true
                })
            ]))
            .pipe($.if(PNG_OPTIMIZE, imagemin([
                optipng({
                    optimizationLevel: 5
                })
            ])))
            .pipe($.if(/[.]svg$/, $.svgmin(() => {
                return {
                    js2svg: {
                        pretty: true,
                        indent: '\t'
                    },
                    plugins: [
                        {
                            cleanupIDs: false
                        }, {
                            removeViewBox: false
                        }, {
                            convertPathData: false
                        }, {
                            mergePaths: false
                        }
                    ]
                };
            })))
            .pipe(dest(config.imagesPath.dist));
    }

    return done();
};

export default imagesOptimize;
