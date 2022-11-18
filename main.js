import {
    todoVisitado, 
    elegirHeuristica1, 
    elegirHeuristica2,
    mostrar,
    ponerPrecio
} from './caballo.js'


import {reglasAplicablesCaballo, Regla} from './regla.js'
import {crearCanva} from './canvas.js';

let tablero;
let matriz;

const sleep = ms => new Promise(r => setTimeout(r, ms));







//ALGORITMOS DEL CABALLO
async function saltoDelCaballo(m, i, j, paso) {
    m[i][j] = paso;
    if (todoVisitado(m)) {
         return true;
    }
    let L1 = reglasAplicablesCaballo(m, i, j);
    await sleep(500);
    while (L1.length != 0) {
        let R = L1.shift(); //elegir primero
        tablero.deshacer();
        tablero.dibujarLinea(i, j, R.fil, R.col);
        tablero.pintarNumero(paso, i, j);
        tablero.dibujarCaballo(R.fil, R.col);
        if (await saltoDelCaballo(m, R.fil, R.col, paso + 1)) {
            return true;
        }
        tablero.deshacer();
        tablero.deshacer();
        m[R.fil][R.col] = 0;
    }
    return false;
}



//Con la primer (1er) heuristica
async function saltoCaballoH1(m, i, j, paso) {
    m[i][j] = paso;
    if (todoVisitado(m)) {
        return true;
    }
    let L1 = reglasAplicablesCaballo(m, i, j);
    await sleep(20);
    while (L1.length != 0) {
        let R = elegirHeuristica1(m, L1);
        tablero.deshacer();
        tablero.dibujarLinea(i, j, R.fil, R.col);
        tablero.pintarNumero(paso, i, j);
        tablero.dibujarCaballo(R.fil, R.col);
        if (await saltoCaballoH1(m, R.fil, R.col, paso + 1)) {
            return true;
        }
        tablero.deshacer();
        tablero.deshacer();
        m[R.fil][R.col] = 0;
    }
    return false;
}


//con la 2da heuristica
async function saltoCaballoH2(m, i, j, paso, x) {
    m[i][j] = paso;
    if (todoVisitado(m)) {
         return true;
    }
    let L1 = reglasAplicablesCaballo(m, i, j);
    await sleep(80);
    while (L1.length != 0) {
        let R = elegirHeuristica2(x, L1); 
        tablero.deshacer();
        tablero.dibujarLinea(i, j, R.fil, R.col);
        tablero.pintarNumero(paso, i, j);
        tablero.dibujarCaballo(R.fil, R.col);
        if (await saltoCaballoH2(m, R.fil, R.col, paso + 1, x)) {
            return true;
        }
        tablero.deshacer();
        tablero.deshacer();
        m[R.fil][R.col] = 0;
    }
    return false;
}




//logica para interactuar con el frontend


//quitar todo el async await 


document.getElementById('btn-crear').addEventListener('click', () => {
    let m = parseInt(document.getElementById('m').value);
    let n = parseInt(document.getElementById('n').value);
    tablero = crearCanva(m, n);
    tablero.ctx.lineWidth = 10;
    matriz = [];
    for (let i = 0; i < m; i++) {
        matriz[i] = [];
        for (let j = 0; j < n; j++) {
            matriz[i][j] = 0;
        }
    }
    document.getElementById('datos').style.display = 'none';
    document.getElementById('carga-algoritmo').style.display = 'flex';

});




document.getElementById('btn-ejecutar').addEventListener('click', async () => {
    let nro = parseInt(document.getElementById('sel').value);
    let i = parseInt(document.getElementById('posi').value);
    let j = parseInt(document.getElementById('posj').value);
    document.getElementById('carga-algoritmo').style.display = 'none';
    if (nro === 1) {
        tablero.pintarNumero(1, i, j);
        tablero.dibujarCaballo(i, j);
        await saltoDelCaballo(matriz, i, j, 1);

    } else if (nro === 2) {
        tablero.pintarNumero(1, i, j);
        tablero.dibujarCaballo(i, j);
        await saltoCaballoH1(matriz, i, j, 1);

    } else if (nro === 3) {
        let precios = [];
        for (let i = 0; i < matriz.length; i++) {
            precios[i] = [];
            for (let j = 0; j < matriz[i].length; j++) {
                precios[i][j] = 0;
            }
        }
        tablero.pintarNumero(1, i, j);
        tablero.dibujarCaballo(i, j);
        ponerPrecio(precios);
        saltoCaballoH2(matriz, i, j, 1, precios);
    }
    mostrar(matriz);
});




// document.getElementById('btn').addEventListener('click', () => {
//     tablero.dibujarLinea(3, 5, 0, 6);
// });