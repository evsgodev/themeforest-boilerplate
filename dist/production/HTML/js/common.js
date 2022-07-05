class AppComponent {
    constructor() {
        this.onReady = this.onReady.bind(this);
        this.onImageReady = this.onImageReady.bind(this);
        this.setDetected();
        this.init();
    }

    setDetected() {
        if (isTouchDevices) {
            document.documentElement.classList.add('is-touch');
        }

        if (isMobilePlatform) {
            document.documentElement.classList.add('is-mobile-platform');
        }

        if (isPlatformIOS) {
            document.documentElement.classList.add('ios');
        }
    }

    onImageReady() {
        document.body.classList.add('load');
    }

    onReady() {
        imageReady(document.body, this.onImageReady);

        new Header();
    }

    init() {
        document.addEventListener('DOMContentLoaded', this.onReady);
    }

    dispose() {

    }
}

$(function () {
    'use strict';

    const app = new AppComponent();
}());
