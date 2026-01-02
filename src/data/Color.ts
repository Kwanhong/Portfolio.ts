type colorType =
    'foreground.primary' |
    'foreground.secondary' |
    'background.primary' |
    'background.secondary' |
    'accent.primary' |
    'accent.secondary' |
    'text.primary' |
    'text.secondary' |
    'light.primary' |
    'light.secondary' |
    'light.ambient' |
    'button.blur' |
    'button.press' |
    'button.hover';

const colors = {
    'foreground.primary': '#999999',
    'foreground.secondary': '#4a4a4a',
    'background.primary': '#333333',
    'background.secondary': '#272727',
    'accent.primary': '#ECB939',
    'accent.secondary': '#f0c75e',
    'text.primary': '#FFFFFF',
    'text.secondary': '#CCCCCC',
    'light.primary': '#ffcbb6',
    'light.secondary': '#aed7ff',
    'light.ambient': '#5d5e8c',
    'button.blur': '#696969',
    'button.press': '#444444',
    'button.hover': '#a9a9a9',
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
    getHexNumber(colorType: colorType): number {
        return parseInt(this.colors[colorType].replace('#', '0x'));
    }
}