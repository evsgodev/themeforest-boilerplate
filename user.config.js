const env = {
    'PROJECT_VERSION': null, // "1.0"
    'BACKUP': true,
    'EMAILS_BUILD': false,
    'FOLDER_BUILD': 'dist',
    'SERVER_INDEX_PAGE': 'index.html',
    'ONLY_MINIFY_VENDOR': false,
    'OPTIMIZE_IMAGES': true,
    'PNG_OPTIMIZE': false,
    'PNG_SPRITE': false,
    sourceFolder: 'src',
    developer: 'dev',
    imageFolderName: 'img',
    templatePreproc: 'pug', // Values 'pug' or 'nunjucks'
    templateLocals: {
        symbolsInject: true,
        pathPrefix: '__static__'
    },
    styles: {
        pathPrefix: '__static__'
    },
    prettify: {
        'indent_char': ' ',
        'indent_size': 4,
        'indent_level': 1,
        'preserve_newlines': true,
        'max_preserve_newlines': 1
    },
    htmlMinify: false
};

export default env;
