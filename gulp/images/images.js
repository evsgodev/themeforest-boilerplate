import gulp from 'gulp';
import imagesOptimize from './compression.js';
import pngSprite from './png.js';
import svgSprite from './svg.js';
const { parallel, series } = gulp;

export default class IMAGES {
    static tasks() {
        return series(
            imagesOptimize,
            parallel(
                pngSprite,
                svgSprite
            )
        );
    }
}

export {
    imagesOptimize,
    pngSprite,
    svgSprite
};
