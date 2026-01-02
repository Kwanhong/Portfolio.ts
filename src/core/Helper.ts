import { PerlinNoise } from "./PerlinNoise";

export class Helper {

    static constrain(n: number, low: number, high: number): number {
        return Math.max(Math.min(n, high), low);
    }

    static map(n: number, start1: number, stop1: number, start2: number, stop2: number, withinBounds?: boolean): number {
        const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
        if (!withinBounds) {
            return newval;
        }
        if (start2 < stop2) {
            return this.constrain(newval, start2, stop2);
        } else {
            return this.constrain(newval, stop2, start2);
        }
    }

    static lerp(start: number, end: number, amt: number): number {
        return (1 - amt) * start + amt * end;
    }

    static noise(x: number, y: number) {
        return PerlinNoise.default.noise2D(x, y)
    }
}