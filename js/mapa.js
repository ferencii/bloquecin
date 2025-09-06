// Dibuja un mapa simple de las habitaciones utilizando un canvas

export function setupMapaSection() {
    const boton = document.getElementById('generar-mapa-btn');
    const lienzo = document.getElementById('mapa-canvas');
    if (boton && lienzo) boton.addEventListener('click', () => dibujarMapa(lienzo));
}

function dibujarMapa(lienzo) {
    const ctx = lienzo.getContext('2d');
    ctx.clearRect(0, 0, lienzo.width, lienzo.height);

    const habitaciones = Array.from(document.querySelectorAll('#rooms-container .room-card'));
    if (!habitaciones.length) return;

    const obtenerTarjeta = vnum => habitaciones.find(r => r.querySelector('.room-vnum').value === vnum);

    const posiciones = {};
    const cola = [];
    const inicio = habitaciones[0].querySelector('.room-vnum').value;
    posiciones[inicio] = { x: 0, y: 0 };
    cola.push(inicio);

    const deltas = {
        '0': { x: 0, y: -1 }, // Norte
        '1': { x: 1, y: 0 },  // Este
        '2': { x: 0, y: 1 },  // Sur
        '3': { x: -1, y: 0 }  // Oeste
    };

    while (cola.length) {
        const vnum = cola.shift();
        const tarjeta = obtenerTarjeta(vnum);
        const { x, y } = posiciones[vnum];
        tarjeta.querySelectorAll('.exits-container .sub-item-row-grid').forEach(fila => {
            const dir = fila.querySelector('.exit-dir').value;
            const destino = fila.querySelector('.exit-dest-vnum').value;
            const delta = deltas[dir];
            if (!destino || !delta) return;
            if (!(destino in posiciones)) {
                posiciones[destino] = { x: x + delta.x, y: y + delta.y };
                cola.push(destino);
            }
        });
    }

    const coords = Object.values(posiciones);
    const minX = Math.min(...coords.map(p => p.x));
    const minY = Math.min(...coords.map(p => p.y));
    const maxX = Math.max(...coords.map(p => p.x));
    const maxY = Math.max(...coords.map(p => p.y));
    const escala = 60;
    const offsetX = (lienzo.width - (maxX - minX + 1) * escala) / 2;
    const offsetY = (lienzo.height - (maxY - minY + 1) * escala) / 2;

    ctx.strokeStyle = '#00ff00';
    ctx.fillStyle = '#00ff00';
    ctx.font = '12px monospace';

    for (const [v, p] of Object.entries(posiciones)) {
        const x = offsetX + (p.x - minX) * escala;
        const y = offsetY + (p.y - minY) * escala;
        ctx.strokeRect(x, y, 40, 40);
        ctx.fillText(v, x + 5, y + 25);
    }

    for (const [v, p] of Object.entries(posiciones)) {
        const tarjeta = obtenerTarjeta(v);
        const x = offsetX + (p.x - minX) * escala + 20;
        const y = offsetY + (p.y - minY) * escala + 20;
        tarjeta.querySelectorAll('.exits-container .sub-item-row-grid').forEach(fila => {
            const dir = fila.querySelector('.exit-dir').value;
            const destino = fila.querySelector('.exit-dest-vnum').value;
            const delta = deltas[dir];
            if (!destino || !delta || !(destino in posiciones)) return;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(offsetX + (posiciones[destino].x - minX) * escala + 20,
                       offsetY + (posiciones[destino].y - minY) * escala + 20);
            ctx.stroke();
        });
    }
}
