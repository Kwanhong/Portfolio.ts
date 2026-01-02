export class PerlinNoise {

    private perm: number[] = new Array(512);
    static default = new PerlinNoise()
    static setSeed(seed: number) {
        this.default = new PerlinNoise(seed)
    }

    constructor(seed = Math.random() * 65536) {
        const p = new Array(256);

        for (let i = 0; i < 256; i++) p[i] = i;

        let n = seed | 0;
        for (let i = 255; i > 0; i--) {
            n = (n * 16807) % 2147483647;
            const j = n % (i + 1);
            [p[i], p[j]] = [p[j], p[i]];
        }

        for (let i = 0; i < 512; i++) {
            this.perm[i] = p[i & 255];
        }
    }

    private fade(t: number): number {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    private lerp(t: number, a: number, b: number): number {
        return a + t * (b - a);
    }

    private grad(hash: number, x: number, y: number): number {
        switch (hash & 3) {
            case 0: return x + y;
            case 1: return -x + y;
            case 2: return x - y;
            case 3: return -x - y;
            default: return 0;
        }
    }

    noise2D(x: number, y: number): number {
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;

        const xf = x - Math.floor(x);
        const yf = y - Math.floor(y);

        const u = this.fade(xf);
        const v = this.fade(yf);

        const aa = this.perm[X + this.perm[Y]];
        const ab = this.perm[X + this.perm[Y + 1]];
        const ba = this.perm[X + 1 + this.perm[Y]];
        const bb = this.perm[X + 1 + this.perm[Y + 1]];

        const x1 = this.lerp(
            u,
            this.grad(aa, xf, yf),
            this.grad(ba, xf - 1, yf)
        );

        const x2 = this.lerp(
            u,
            this.grad(ab, xf, yf - 1),
            this.grad(bb, xf - 1, yf - 1)
        );

        // -1 ~ 1 → 0 ~ 1
        return (this.lerp(v, x1, x2) + 1) / 2;
    }
}