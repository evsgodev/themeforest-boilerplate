import gulp from 'gulp';
import * as config from '../config.js';
import { $ } from '../helper.js';
const { src, dest } = gulp;

const svgSprite = () => {
    return src(`${config.imagesPath.svgSrc}/**/*.svg`)
        .pipe($.debug({ title: 'svg' }))
        .pipe($.svgSymbols(
            {
                templates: [
                    `gulp/images/helpers/svg-symbols-template.svg`
                ],
                transformData: (svg, defaultData) => {
                    return {
                        id: defaultData.id,
                        width: svg.width,
                        height: svg.height,
                        name: svg.name
                    };
                }
            }
        ))
        .pipe($.if(/[.]svg$/, $.rename({ basename: 'svg-symbols' })))
        .pipe($.if(/[.]svg$/, dest(config.imagesPath.dist)));
};


export default svgSprite;
