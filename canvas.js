export function crearCanva(m, n) {
    
    const FILAS = m;
    const COLUMNAS = n;
    
    const WIDTH = 1000;
    const HEIGHT = 1000;
    

    const WIDTH_CASILLA = WIDTH / COLUMNAS;
    const HEIGHT_CASILLA = HEIGHT / FILAS;
    
    const helper = WIDTH_CASILLA < HEIGHT_CASILLA ? WIDTH_CASILLA : HEIGHT_CASILLA;

    const colores = {
        claro: '#ffffff',
        oscuro: '#696969',
    }
    
    const newCanvas = document.createElement('canvas');
    const ctx = newCanvas.getContext('2d', {willReadFrequently: true});
    const sectionDibujo = document.getElementById('dibujo');

    let restore = []
    newCanvas.width = WIDTH;
    newCanvas.height = HEIGHT;
    newCanvas.style.backgroundColor = '#ff0000';
    
    ctx.beginPath();
    for (let i = 0; i < FILAS; i++) {
        for (let j = 0; j < COLUMNAS; j++) {
            let colorCelda = colores.claro;
            let colorTexto = colores.oscuro;

            if ((i + j) % 2) {
                colorCelda = colores.oscuro;
                colorTexto = colores.claro;
            }
            ctx.fillStyle = colorCelda;
            ctx.fillRect(j * WIDTH_CASILLA, i * HEIGHT_CASILLA, WIDTH_CASILLA, HEIGHT_CASILLA);

            ctx.fillStyle = colorTexto;
            ctx.textBaseline = 'top';  
            ctx.textAlign = 'start';
            let x = (helper * 0.15) + 'px';
            ctx.font = x + ' arial';
            ctx.fillText(`[${i}, ${j}]`, j * WIDTH_CASILLA + (helper * 0.05), i * HEIGHT_CASILLA + (helper * 0.05));
        }   
    }
    ctx.closePath();

    restore.push(ctx.getImageData(0, 0, newCanvas.width, newCanvas.height));

    sectionDibujo.appendChild(newCanvas);
    document.body.parentElement.style.height = '100%';
    
    let tablero = {
        width: WIDTH,
        height: HEIGHT,
        filas: FILAS,
        columnas: COLUMNAS,
        widthCasilla: WIDTH_CASILLA,
        heightCasilla: HEIGHT_CASILLA,
        colores: colores,
        canvas: newCanvas,
        ctx: ctx,
        restore: restore,
        index: 0,
        helper: helper
    }

    tablero.dibujarLinea = (x1, y1, x2, y2) => {
        tablero.ctx.lineWidth = tablero.helper * 0.06;
        tablero.ctx.strokeStyle = 'red'; 
        tablero.ctx.beginPath();
        tablero.ctx.moveTo(y1 * tablero.widthCasilla + (tablero.widthCasilla / 2), x1 * tablero.heightCasilla + (tablero.heightCasilla / 2));
        tablero.ctx.lineTo(y2 * tablero.widthCasilla + (tablero.widthCasilla / 2), x2 * tablero.heightCasilla + (tablero.heightCasilla / 2));
        tablero.ctx.stroke();
        tablero.ctx.closePath();
        tablero.restore.push(tablero.ctx.getImageData(0, 0, tablero.canvas.width, tablero.canvas.height));
        tablero.index++;
    } 

    tablero.deshacer = () => {
        if (tablero.index <= 0) {
            tablero.ctx.clearRect(0, 0, tablero.canvas.width, tablero.canvas.height);
        } else {
            tablero.index--;
            tablero.restore.pop();
            tablero.ctx.putImageData(tablero.restore[tablero.index], 0, 0);
        }
    }

    tablero.dibujarCaballo = (i, j) => {
        tablero.ctx.beginPath();
        tablero.ctx.fillStyle = '#fdffa8';
        tablero.ctx.textBaseline = 'middle';  
        tablero.ctx.textAlign = 'center';
        tablero.ctx.font = (tablero.helper * 0.8) + 'px arial';
        tablero.ctx.fillText('♞', j * tablero.widthCasilla + (tablero.widthCasilla / 2), i * tablero.heightCasilla + (tablero.heightCasilla / 2) + (helper * 0.15));
        tablero.ctx.fillStyle = '#000000';

        tablero.ctx.fillText('♘', j * tablero.widthCasilla + (tablero.widthCasilla  / 2), i * tablero.heightCasilla + (tablero.heightCasilla/ 2) + (helper * 0.15));
        tablero.ctx.closePath();
        tablero.restore.push(tablero.ctx.getImageData(0, 0, tablero.canvas.width, tablero.canvas.height));
        tablero.index++;
    }


    //update: tambien puede pintar textos
    tablero.pintarNumero = (n, i, j) => {
        let colorTexto = tablero.colores.oscuro;
        if ((i + j) % 2) {
            colorTexto = tablero.colores.claro;
        }
        tablero.ctx.beginPath();
        tablero.ctx.fillStyle = colorTexto;
        tablero.ctx.textBaseline = 'middle';  
        tablero.ctx.textAlign = 'center';
        tablero.ctx.font = (tablero.helper * 0.4) + 'px arial';
        tablero.ctx.fillText(n, j * tablero.widthCasilla + (tablero.widthCasilla  / 2), i * tablero.heightCasilla + (tablero.heightCasilla/ 2));

        tablero.ctx.closePath();
        tablero.restore.push(tablero.ctx.getImageData(0, 0, tablero.canvas.width, tablero.canvas.height));
        tablero.index++;
    }




    return tablero;

}





















//antigua funcion, hecho con divs y css
//hecho con divs y css
// function crearTablero(n) {
//     const tablero = document.getElementById('tab');
//     tablero.style.width = (n*50) + 'px';
//     tablero.style.height = (n*50) + 'px';
//     for (let i = 0; i < n; i++) {
//         let fil = document.createElement('div');
//         for(let j = 0; j < n; j++) {
//             let col = document.createElement('div');
//             fil.appendChild(col);
//         }
//         tablero.appendChild(fil);
//     }   
// }


//Configuracion del tablero;