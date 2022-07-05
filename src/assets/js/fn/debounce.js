const debounce = (cb, delay) => {
    let timeoutHandler = null;

    return (...args) => {
        clearTimeout(timeoutHandler);
        timeoutHandler = setTimeout(() => cb.apply(null, args), delay);
    };
};
