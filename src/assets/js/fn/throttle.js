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
