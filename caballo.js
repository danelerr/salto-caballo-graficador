import {reglasAplicablesCaballo, Regla} from "./regla.js"; 


//true si la posicion i, j es valida dentro de m
export const posValida = (m, i, j) => {
    return (i >= 0 && i < m.length) && (j >= 0 && j < m[i].length) && m[i][j] == 0;
}

//false si existe una casilla sin visitar
export const todoVisitado = (m) => {
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            if (m[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}

//muestra la matriz a por consola
export const mostrar = (a) => {
    for (let i = 0; i < a.length; i++) {
        let s = '';
        for (let j = 0; j < a[i].length; j++) {
            s += a[i][j] + ', '
        }
        console.log(s);
    }
    console.log('');
}

//heuristica 1: elegir la posiciones que tengan menos posibilidades
export const elegirHeuristica1 = (m, l) => {
    let index = 0;
    let min = Number.MAX_VALUE;
    for (let k = 0; k < l.length; k++) {
        let x = (reglasAplicablesCaballo(m, l[k].fil, l[k].col)).length;
        if (x < min) {
            min = x;
            index = k;
        }
    }
    return l.splice(index, 1)[0];
}


//heuristica 2: 
//matriz de costos: funcion auxiliar para la heuristica 
export const ponerPrecio = (m) => {
    let a = [];
    for (let i = 0; i < m.length; i++) {
        a[i] = [];
        for (let j = 0; j < m[i].length; j++) {
            a[i][j] = 0;
        }
    }
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            m[i][j] = reglasAplicablesCaballo(a, i, j).length;
        }
    }
}

//algoritmo que usa la matriz de costos para elegir una regla
export const elegirHeuristica2 = (m, l) => {
    let index = 0;
    let min = Number.MAX_VALUE;
    for (let k = 0; k < l.length; k++) {
        let x = m[l[k].fil][l[k].col];
        if (x < min) {
            min = x;
            index = k;
        }
    }
    return l.splice(index, 1)[0];
}