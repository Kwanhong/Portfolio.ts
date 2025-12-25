type colorType =
    'foreground.primary' |
    'foreground.secondary' |
    'background.primary' |
    'background.secondary' |
    'accent.primary' |
    'accent.secondary' |
    'text.primary' |
    'text.secondary' 

const colors = {
    'foreground.primary': '#999999',
    'foreground.secondary': '#777777',
    'background.primary': '#333333',
    'background.secondary': '#111111',
    'accent.primary': '#ECB939',
    'accent.secondary': '#f0c75e',
    'text.primary': '#FFFFFF',
    'text.secondary': '#CCCCCC',
}

import { Color as THREEColor } from 'three';

export class Color {
    static helper = new Color();
    private colors: Record<colorType, string> = colors
    get(colorType: colorType): THREEColor {
        return new THREEColor(this.colors[colorType]);
    }
    getHex(colorType: colorType): string {
        return this.colors[colorType];
    }
}