export class Vector2 {
    public x: number;
    public y: number;

    constructor();
    constructor(vector: Vector2)
    constructor(x: number, y: number);
    constructor(xAndVector?: number | Vector2, y?: number) {
        if (xAndVector instanceof Vector2) {
            this.x = xAndVector.x;
            this.y = xAndVector.y;
        } else {
            this.x = xAndVector ?? 0;
            this.y = y ?? 0;
        }
    }

    public length(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2)
    }

    public add(vector: Vector2): Vector2 {
        return new Vector2(this.x + vector.x, this.y + vector.y);
    }

    public sub(vector: Vector2): Vector2 {
        return new Vector2(this.x - vector.x, this.y - vector.y);
    }

    public mul(scalar: number): Vector2 {
        this.x *= scalar;
        this.y *= scalar

        return this
    }

    public div(scalar: number): Vector2 {
        this.x /= scalar;
        this.y /= scalar

        return this
    }

    public magnitude(): number {
        return (this.x ** 2 + this.y ** 2)
    }

    public distanceTo(v: Vector2): number {
        return Math.sqrt((v.x - this.x) ** 2 + (v.y - this.x) ** 2);
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public reverse(): Vector2 {
        this.x = - this.x
        this.y = - this.y

        return this
    }

    public static one() {
        return new Vector2(1, 1)
    }

    public clone() {
        return new Vector2(this)
    }
    public toString() {
        return `{${this.getX()}, ${this.getY()}}`
    }
}