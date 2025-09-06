import { setupAreaSection, generateAreaSection } from './js/area.js';
import { setupMobilesSection, generateMobilesSection } from './js/mobiles.js';
import { setupObjectsSection, generateObjectsSection } from './js/objects.js';
import { setupRoomsSection, generateRoomsSection } from './js/rooms.js';
import { setupResetsSection, generateResetsSection, refrescarOpcionesResets } from './js/resets.js';
import { setupSetSection, generateSetSection } from './js/sets.js';
import { setupShopsSection, generateShopsSection } from './js/shops.js';
import { setupSpecialsSection, generateSpecialsSection } from './js/specials.js';
import { setupProgsSection, generateProgsSection } from './js/progs.js';
import { gameData } from './js/config.js';
import { parseAreFile } from './js/parser.js';


function populateMaterialsDatalist() {
    const datalist = document.getElementById('materials-list');
    if (datalist) {
        gameData.materials.forEach(material => {
            const option = document.createElement('option');
            option.value = material;
            option.textContent = material; // Added textContent for clarity, though value is often enough
            datalist.appendChild(option);
        });
    }
    // Removed else block with console.error
}

document.addEventListener('DOMContentLoaded', () => {
    // Setup navigation
    document.querySelectorAll('.nav-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
            document.getElementById(button.dataset.section).classList.add('active');
        });
    });

    // Setup all sections
    setupAreaSection();
    setupObjectsSection(isValidVnumRange, '.obj-vnum', '.obj-vnum-display', '.obj-keywords', '.obj-name-display');
    setupMobilesSection(isValidVnumRange, '.mob-vnum', '.mob-vnum-display', '.mob-keywords', '.mob-name-display');
    setupRoomsSection(isValidVnumRange, '.room-vnum', '.room-vnum-display', '.room-name', '.room-name-display');
    setupResetsSection();
    refrescarOpcionesResets();
    setupSetSection(null, '.set-id', '.set-id-display', '.set-name', '.set-name-display');
    setupShopsSection(isValidVnumRange, '.shop-vnum', '.shop-vnum-display', '.shop-comment', '.shop-comment-display');
    setupSpecialsSection(isValidVnumRange, '.special-vnum', '.special-vnum-display', null, null);
    setupProgsSection('mobprogs', isValidVnumRange, '.prog-vnum', '.prog-vnum-display', null, null);
    setupProgsSection('objprogs', isValidVnumRange, '.prog-vnum', '.prog-vnum-display', null, null);
    setupProgsSection('roomprogs', isValidVnumRange, '.prog-vnum', '.prog-vnum-display', null, null);

    populateMaterialsDatalist(); // Call the new function here

    actualizarResumenYContadores();

    document.addEventListener('input', actualizarResumenYContadores);

    // Controles para contraer y expandir todas las tarjetas de una sección
    document.querySelectorAll('.collapse-all-btn').forEach(boton => {
        boton.addEventListener('click', () => {
            const seccion = boton.closest('.content-section');
            seccion.querySelectorAll('.collapsible-content').forEach(contenido => contenido.classList.add('collapsed'));
        });
    });

    document.querySelectorAll('.expand-all-btn').forEach(boton => {
        boton.addEventListener('click', () => {
            const seccion = boton.closest('.content-section');
            seccion.querySelectorAll('.collapsible-content').forEach(contenido => contenido.classList.remove('collapsed'));
        });
    });

    // Setup main generate button
    document.getElementById('generate-btn').addEventListener('click', generateAreFile);

    // Setup file loading
    const loadFileInput = document.getElementById('load-file-input');
    const loadFileBtn = document.getElementById('load-file-btn');

    loadFileBtn.addEventListener('click', () => {
        loadFileInput.click();
    });

    loadFileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                parseAreFile(content);
            };
            reader.readAsText(file);
        }
    });
});

function isValidVnumRange() {
    const vnumStartInput = document.getElementById('area-vnum-start');
    const vnumEndInput = document.getElementById('area-vnum-end');
    const start = parseInt(vnumStartInput.value);
    const end = parseInt(vnumEndInput.value);
    return !isNaN(start) && !isNaN(end) && start <= end;
}

function generateAreFile() {
    let c = '' // fileContent
    c += generateAreaSection();
    c += generateMobilesSection();
    c += generateObjectsSection();
    c += generateRoomsSection();
    c += generateResetsSection();
    c += generateSetSection();
    c += generateShopsSection();
    c += generateSpecialsSection();
    c += generateProgsSection('mobprogs', 'MOBPROGS');
    c += generateProgsSection('objprogs', 'OBJPROGS');
    c += generateProgsSection('roomprogs', 'ROOMPROGS');
    c += '#$\n';

    const blob = new Blob([c.replace(/\n/g, '\r\n')], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = document.getElementById('area-filename').value.trim() || 'default.are';
    link.click();
    link.remove();
}

const resumenConfig = [
    {
        id: 'mobiles',
        label: '#MOBILES',
        container: '#mobiles-container',
        cardSelector: '.mob-card',
        headerId: 'mobiles-header',
        stat: () => {
            const niveles = Array.from(document.querySelectorAll('#mobiles-container .mob-level'))
                .map(i => parseInt(i.value)).filter(n => !isNaN(n));
            const promedio = niveles.length ? (niveles.reduce((a, b) => a + b, 0) / niveles.length).toFixed(1) : 0;
            return `Nivel promedio: ${promedio}`;
        }
    },
    {
        id: 'objects',
        label: '#OBJECTS',
        container: '#objects-container',
        cardSelector: '.object-card',
        headerId: 'objects-header',
        stat: () => {
            const pesos = Array.from(document.querySelectorAll('#objects-container .object-card .obj-weight'))
                .map(i => parseInt(i.value)).filter(n => !isNaN(n));
            const total = pesos.reduce((a, b) => a + b, 0);
            return `Peso total: ${total}`;
        }
    },
    {
        id: 'rooms',
        label: '#ROOMS',
        container: '#rooms-container',
        cardSelector: '.room-card',
        headerId: 'rooms-header',
        stat: () => {
            const sectores = new Set(Array.from(document.querySelectorAll('#rooms-container .room-sector')).map(s => s.value));
            return `Sectores distintos: ${sectores.size}`;
        }
    },
    {
        id: 'resets',
        label: '#RESETS',
        container: '#resets-list',
        cardSelector: '.reset-row',
        headerId: 'resets-header',
        stat: () => {
            const tipos = {};
            document.querySelectorAll('#resets-list .reset-row').forEach(r => {
                const t = r.dataset.type;
                tipos[t] = (tipos[t] || 0) + 1;
            });
            return Object.keys(tipos).length > 0 ?
                'Tipos: ' + Object.entries(tipos).map(([k, v]) => `${k}:${v}`).join(', ') :
                'Sin resets';
        }
    },
    {
        id: 'set',
        label: '#SET',
        container: '#sets-container',
        cardSelector: '.set-card',
        headerId: 'set-header',
        stat: () => {
            const tiers = document.querySelectorAll('#sets-container .tier-card').length;
            return `Tiers totales: ${tiers}`;
        }
    },
    {
        id: 'shops',
        label: '#SHOPS',
        container: '#shops-container',
        cardSelector: '.shop-card',
        headerId: 'shops-header',
        stat: () => {
            const compras = Array.from(document.querySelectorAll('#shops-container .shop-buy-profit'))
                .map(s => parseInt(s.value)).filter(n => !isNaN(n));
            const ventas = Array.from(document.querySelectorAll('#shops-container .shop-sell-profit'))
                .map(s => parseInt(s.value)).filter(n => !isNaN(n));
            const promCompra = compras.length ? (compras.reduce((a,b)=>a+b,0)/compras.length).toFixed(1) : 0;
            const promVenta = ventas.length ? (ventas.reduce((a,b)=>a+b,0)/ventas.length).toFixed(1) : 0;
            return `Beneficio compra medio: ${promCompra}, venta: ${promVenta}`;
        }
    },
    {
        id: 'specials',
        label: '#SPECIALS',
        container: '#specials-container',
        cardSelector: '.special-card',
        headerId: 'specials-header',
        stat: () => {
            const conComentario = Array.from(document.querySelectorAll('#specials-container .special-comment'))
                .filter(c => c.value.trim() !== '').length;
            return `Con comentario: ${conComentario}`;
        }
    },
    {
        id: 'mobprogs',
        label: '#MOBPROGS',
        container: '#mobprogs-container',
        cardSelector: '.prog-card',
        headerId: 'mobprogs-header',
        stat: () => {
            const lineas = Array.from(document.querySelectorAll('#mobprogs-container .prog-code'))
                .reduce((acc, t) => acc + t.value.split('\n').length, 0);
            return `Líneas de código: ${lineas}`;
        }
    },
    {
        id: 'objprogs',
        label: '#OBJPROGS',
        container: '#objprogs-container',
        cardSelector: '.prog-card',
        headerId: 'objprogs-header',
        stat: () => {
            const lineas = Array.from(document.querySelectorAll('#objprogs-container .prog-code'))
                .reduce((acc, t) => acc + t.value.split('\n').length, 0);
            return `Líneas de código: ${lineas}`;
        }
    },
    {
        id: 'roomprogs',
        label: '#ROOMPROGS',
        container: '#roomprogs-container',
        cardSelector: '.prog-card',
        headerId: 'roomprogs-header',
        stat: () => {
            const lineas = Array.from(document.querySelectorAll('#roomprogs-container .prog-code'))
                .reduce((acc, t) => acc + t.value.split('\n').length, 0);
            return `Líneas de código: ${lineas}`;
        }
    }
];

function actualizarResumenYContadores() {
    const resumenDiv = document.getElementById('resumen-contenido');
    if (resumenDiv) resumenDiv.innerHTML = '';
    resumenConfig.forEach(cfg => {
        const count = document.querySelectorAll(`${cfg.container} ${cfg.cardSelector}`).length;
        const header = document.getElementById(cfg.headerId);
        if (header) header.textContent = `${cfg.label} - ${count}`;
        const navBtn = document.querySelector(`nav button[data-section="${cfg.id}"]`);
        if (navBtn) navBtn.textContent = `${cfg.label} (${count})`;
        if (resumenDiv) {
            const bloque = document.createElement('div');
            const titulo = document.createElement('h3');
            titulo.textContent = `${cfg.label} - ${count}`;
            const dato = document.createElement('p');
            dato.textContent = cfg.stat();
            bloque.appendChild(titulo);
            bloque.appendChild(dato);
            resumenDiv.appendChild(bloque);
        }
    });
}

window.actualizarResumenYContadores = actualizarResumenYContadores;