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
