import * as config from './config.js';
import { $ } from './helper.js';
const { preview, production } = config;

export default class Clean {
    static cleanDev() {
        return $.del(`./${config.developer}`);
    }

    static cleanBuild() {
        return $.del([
            `./*.zip`,
            `./${config.developer}`,
            `{${preview},${production}}/**/*`,
            `!{${preview},${production}}/img/**`
        ]);
    }
}
