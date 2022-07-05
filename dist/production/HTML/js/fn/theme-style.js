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
