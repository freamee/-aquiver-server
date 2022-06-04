export default class Vector3Mp {
    constructor(public x: number = 0, public y: number = 0, public z: number = 0) {}

    add(vec: this) {
        this.x += vec.x;
        this.y += vec.y;
        this.z += vec.z;
        return this;
    }

    distanceTo(v: this) {
        return Math.sqrt(this.distanceToSquared(v));
    }

    distanceToSquared(v: this) {
        const dx = this.x - v.x,
            dy = this.y - v.y,
            dz = this.z - v.z;

        return dx * dx + dy * dy + dz * dz;
    }
}
