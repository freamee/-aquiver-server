export class Vector2Mp {
    constructor(public x: number = 0, public y: number = 0) {}

    distanceTo(v: this) {
        return Math.sqrt(this.distanceToSquared(v));
    }

    distanceToSquared(v: this) {
        const dx = this.x - v.x,
            dy = this.y - v.y;
        return dx * dx + dy * dy;
    }
}