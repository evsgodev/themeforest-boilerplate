const isTouchDevices = ('ontouchstart' in window) || (window.DocumentTouch && document instanceof window.DocumentTouch);
const isMobilePlatform = /iPhone|iPad|Android|blackberry|windows phone|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isPlatformIOS = /iPhone|iPad/i.test(navigator.userAgent);
