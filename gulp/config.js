import env from '../user.config.js';

export const argvMode = Object.assign({}, env, {
    env: {
        production: process.env.NODE_ENV === 'production'
    },
    htmlCache: true,
    htmlPreview: null,
    minifyCss: null,
    build: `${env.FOLDER_BUILD}`,
    preview: `${env.FOLDER_BUILD}/preview`,
    production: `${env.FOLDER_BUILD}/production/HTML`
});

export const {
    sourceFolder,
    developer,
    imageFolderName,
    build,
    preview,
    production
} = argvMode;

export const loadPlugins = {
    pattern: ['gulp-*', 'gulp.*', 'del', 'browser-*', 'imagemin-*', 'main-*', 'run-*', 'require-*', 'stream-*', 'event-*', 'browser-sync', 'postcss-*', 'webpack', 'webpack-*'],
    replaceString: /^gulp(-|\.)/,
    lazy: true,
    camelize: true
};

const templateDataFileName = '__snapshot-data-components__.json';

const getTemplateExt = () => {
    switch (argvMode.templatePreproc) {
        case 'pug':
            return 'pug';
        case 'nunjucks':
            return '{njk,html}';
        default:
            break;
    }

    return 'pug';
};

const template = {
    src: [
        `${sourceFolder}/pages/**/[^_]*.${getTemplateExt()}`,
        `!${sourceFolder}/**/{components,templates}/**/*.${getTemplateExt()}`
    ],
    dataFileName: templateDataFileName,
    dataFiles: [
        `${sourceFolder}/components/**/*.json`,
        `!${sourceFolder}/components/**/${templateDataFileName}`
    ],
    distComponents: `${sourceFolder}/components/`,
    render: [
        `${sourceFolder}/pages`,
        `${sourceFolder}/pages/templates`,
        `${sourceFolder}/components`
    ],
    dist: `${developer}/`
};

const email = {
    src: `${sourceFolder}/emails`,
    filesSrc: `${sourceFolder}/emails/[^_]*.html`,
    dist: `${developer}/emails/`
};

const styles = {
    src: `${sourceFolder}/styles/**/*.scss`,
    dist: `${developer}/css/`
};

const scripts = {
    src: [
        `${sourceFolder}/assets/js/*.js`,
        `!${sourceFolder}/assets/js/vendor/**`
    ],
    srcConcat: [
        `${sourceFolder}/{assets/js,components}/**/*.js`,
        `!${sourceFolder}/assets/js/{common.js,demo.js,vendor/**/*.js}`
    ],
    dist: `${developer}/js/'`
};

const imagesPath = {
    src: `${sourceFolder}/assets/${imageFolderName}`,
    spriteSrc: `${sourceFolder}/assets/${imageFolderName}/content/sprite`,
    spriteStylesDist: `${sourceFolder}/styles/include/plugins`,
    svgSrc: `${sourceFolder}/assets/${imageFolderName}/icons`,
    dist: `${developer}/${imageFolderName}`
};

const servePath = {
    baseDir: `./${developer}`,
    index: argvMode.SERVER_INDEX_PAGE
};

const filesPath = {
    src: `${sourceFolder}/assets/misc/**/*`,
    dist: `${developer}/`
};

const watchPath = {
    templates: [
        `${sourceFolder}/**/[^_]*.${getTemplateExt()}`
    ],
    data: [
        `${sourceFolder}/components/**/*.json`,
        `!${sourceFolder}/components/**/${templateDataFileName}`
    ],
    email: `${sourceFolder}/emails/*.html`,
    css: `${sourceFolder}/styles/**/*.scss`,
    js: `${sourceFolder}/{components,assets/js}/**/*.js`,
    sprite: `${imagesPath.src}/content/sprite/**/*.png`,
    svg: `${imagesPath.src}/icons/*.svg`,
    assets: `${sourceFolder}/assets/**/*.*`,
    files: `${sourceFolder}/assets/misc/**/*`
};

export {
    template,
    email,
    styles,
    scripts,
    imagesPath,
    servePath,
    filesPath,
    watchPath
};
