class Demo {
    constructor() {
        this.nodes = {
            panel: document.querySelector('.demo-panel'),
            toggle: document.querySelector('.demo-toggle'),
            toggleClose: document.querySelector('.demo-panel__close')
        };

        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
        this.escape = this.escape.bind(this);

        this.onInit();
    }

    show(event) {
        const { panel } = this.nodes;

        event.preventDefault();

        panel.classList.add('show');
    }

    close(event) {
        const { panel } = this.nodes;

        event.preventDefault();

        panel.classList.remove('show');
    }

    escape(event) {
        const { panel } = this.nodes;

        if (event.keyCode === 27) {
            if (panel.classList.contains('show')) {
                panel.classList.remove('show');
            }
        }
    }

    onInit() {
        const { toggle, toggleClose } = this.nodes;

        toggle.addEventListener('click', this.show);
        toggleClose.addEventListener('click', this.close);
        document.addEventListener('keyup', this.escape);
    }

    dispose() { }
}

$(function () {
    'use strict';

    const demo = new Demo();
});
