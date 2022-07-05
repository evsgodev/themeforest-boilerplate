const debounce = (cb, delay) => {
    let timeoutHandler = null;

    return (...args) => {
        clearTimeout(timeoutHandler);
        timeoutHandler = setTimeout(() => cb.apply(null, args), delay);
    };
};

const delay = time => {
    return new Promise(resolve => setTimeout(resolve, time));
};

const isTouchDevices = ('ontouchstart' in window) || (window.DocumentTouch && document instanceof window.DocumentTouch);
const isMobilePlatform = /iPhone|iPad|Android|blackberry|windows phone|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isPlatformIOS = /iPhone|iPad/i.test(navigator.userAgent);

const imageReady = (el, cb) => {
    const container = imagesLoaded(el);

    container.on('always', cb);
};

class ThemeStyle {
    constructor(a, b, cssVariable = true) {
        this.theme = document.documentElement.dataset.theme;
        this.props = {
            a,
            b,
            cssVariable
        };

        this.setStyle();
    }

    getStyle(color) {
        return getComputedStyle(document.documentElement).getPropertyValue(color);
    }

    setStyle() {
        const { a, b, cssVariable } = this.props;

        if (typeof b !== 'undefined' && b !== '') {
            if (this.theme === 'light') {
                return cssVariable ? this.getStyle(a) : a;
            }

            if (this.theme === 'dark') {
                return cssVariable ? this.getStyle(b) : b;
            }
        }

        if ((typeof b === 'undefined' || b === '') && !cssVariable) {
            return a;
        }

        return this.getStyle(a);
    }
}

const themeStyle = new ThemeStyle();

const throttle = (cb, delay) => {
    let timeoutHandler = null;

    return (...args) => {
        if (timeoutHandler === null) {
            timeoutHandler = setTimeout(() => {
                cb.apply(null, args);
                timeoutHandler = null;
            }, delay);
        }
    };
};

const triggerEvent = (typeEvent, elem, bubbles = true) => {
    let event;

    if (typeEvent === 'click') {
        event = new MouseEvent('click', {
            bubbles,
            cancelable: true,
            view: window
        });
    } else {
        event = new Event(typeEvent, {
            bubbles,
            cancelable: true
        });
    }

    elem.dispatchEvent(event);
};

class Header {
    constructor() {
        this.onInit();
    }

    onInit() {
        console.log('header');
    }
}
