/* eslint-disable no-param-reassign */
import createModule from './generate/createModule';

export class CommandService {
    greet(name: string): string {
        if (name.endsWith('s')) {
            name = name.slice(0, -1);
        }
        createModule(name);
        return `generating module ${name}...`;
    }
}
