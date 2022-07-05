import gulp from 'gulp';
import * as config from '../config.js';
import { $ } from '../helper.js';
const { src, dest } = gulp;
const { PNG_SPRITE } = config.argvMode;

const pngSprite = done => {
    if (PNG_SPRITE) {
        setTimeout(() => src(`${config.imagesPath.spriteSrc}/**/*.png`)
            .pipe($.spritesmith({
                imgName: 'sprite.png',
                retinaSrcFilter: `${config.imagesPath.spriteSrc}/**/*@2x.png`,
                retinaImgName: 'sprite@2x.png',
                retinaImgPath: `${config.imagesPath.dist}/content`,
                cssName: '_sprite.scss',
                algorithm: 'top-down',
                padding: 2
            }))
            .pipe($.debug({ title: 'sprites' }))
            .pipe(
                $.if(/[.]png$/, dest(`${config.imagesPath.dist}/content`))
            )
            .pipe(
                $.if(/[.]scss$/, dest(config.imagesPath.spriteStylesDist))
            ), 300);
    }

    return done();
};

export default pngSprite;
