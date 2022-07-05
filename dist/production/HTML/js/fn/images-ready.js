const imageReady = (el, cb) => {
    const container = imagesLoaded(el);

    container.on('always', cb);
};
