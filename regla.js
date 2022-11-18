import { posValida } from "./caballo.js";

export class Regla {
    constructor(fil, col) {
        this.fil = fil;
        this.col = col;
    }

    toString() {
        let s = `(${this.fil}, ${this.col})`;
        console.log(s);
    }
}

export const reglasAplicables = (m, i, j) => {
    let L1 = [];
    if (posValida(m, i, j - 1)) {
        L1.push(new Regla(i, j - 1));
    }
    if (posValida(m, i - 1, j)) {
        L1.push(new Regla(i - 1, j));
    }
    if (posValida(m, i, j + 1)) {
        L1.push(new Regla(i, j + 1));
    }
    if (posValida(m, i + 1, j)) {
        L1.push(new Regla(i + 1, j));
    }
    return L1;
}

export const reglasAplicablesCaballo = (m, i, j) => {
    let L1 = [];
    if (posValida(m, i - 2, j - 1)) {
        L1.push(new Regla(i - 2, j - 1));
    }
    if (posValida(m, i - 2, j + 1)) {
        L1.push(new Regla(i - 2, j + 1));
    }
    if (posValida(m, i - 1, j - 2)) {
        L1.push(new Regla(i - 1, j - 2));
    }
    if (posValida(m, i + 1, j - 2)) {
        L1.push(new Regla(i + 1, j - 2));
    }
    if (posValida(m, i + 2, j - 1)) {
        L1.push(new Regla(i + 2, j - 1));
    }
    if (posValida(m, i + 2, j + 1)) {
        L1.push(new Regla(i + 2, j + 1));
    }
    if (posValida(m, i - 1, j + 2)) {
        L1.push(new Regla(i - 1, j + 2));
    }
    if (posValida(m, i + 1, j + 2)) {
        L1.push(new Regla(i + 1, j + 2));
    }
    return L1;
}

