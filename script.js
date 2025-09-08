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
import { setupTemaSection } from './js/tema.js';


let ventanaChat = null; // Referencia a la ventana del chat IA

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
    setupTemaSection();

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

    // Botón flotante para abrir la ventana de chat con IA
    const botonChat = document.getElementById('btn-chat-ia');
    if (botonChat) {
        botonChat.addEventListener('click', () => {
            if (!ventanaChat || ventanaChat.closed) {
                ventanaChat = window.open('chat.html', 'ChatIA', 'width=400,height=600');
            } else {
                ventanaChat.focus();
            }
        });
    }
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
        etiqueta: '#MOBILES',
        contenedor: '#mobiles-container',
        selectorTarjeta: '.mob-card',
        idEncabezado: 'mobiles-header',
        selectorNombre: '.mob-name-display',
        selectorVnum: '.mob-vnum-display'
    },
    {
        id: 'objects',
        etiqueta: '#OBJECTS',
        contenedor: '#objects-container',
        selectorTarjeta: '.object-card',
        idEncabezado: 'objects-header',
        selectorNombre: '.obj-name-display',
        selectorVnum: '.obj-vnum-display'
    },
    {
        id: 'rooms',
        etiqueta: '#ROOMS',
        contenedor: '#rooms-container',
        selectorTarjeta: '.room-card',
        idEncabezado: 'rooms-header',
        selectorNombre: '.room-name-display',
        selectorVnum: '.room-vnum-display'
    },
    {
        id: 'resets',
        etiqueta: '#RESETS',
        contenedor: '#resets-list',
        selectorTarjeta: '.reset-row',
        idEncabezado: 'resets-header',
        obtenerNombre: fila => {
            const tipo = fila.dataset.type || '';
            const comentario = fila.querySelector('.reset-comment')?.value.trim();
            return comentario ? `${tipo} - ${comentario}` : tipo;
        },
        obtenerVnum: fila => {
            return Array.from(fila.querySelectorAll('[class*="vnum"]'))
                .map(el => el.value || el.textContent.trim())
                .filter(Boolean)
                .join('/');
        }
    },
    {
        id: 'set',
        etiqueta: '#SET',
        contenedor: '#sets-container',
        selectorTarjeta: '.set-card',
        idEncabezado: 'set-header',
        selectorNombre: '.set-name-display',
        selectorVnum: '.set-id-display'
    },
    {
        id: 'shops',
        etiqueta: '#SHOPS',
        contenedor: '#shops-container',
        selectorTarjeta: '.shop-card',
        idEncabezado: 'shops-header',
        obtenerNombre: tarjeta => {
            const comentario = tarjeta.querySelector('.shop-comment')?.value.trim();
            return comentario || 'Tienda';
        },
        selectorVnum: '.shop-vnum-display'
    },
    {
        id: 'specials',
        etiqueta: '#SPECIALS',
        contenedor: '#specials-container',
        selectorTarjeta: '.special-card',
        idEncabezado: 'specials-header',
        obtenerNombre: tarjeta => {
            const nombre = tarjeta.querySelector('.special-name-display')?.textContent.trim();
            const comentario = tarjeta.querySelector('.special-comment-display')?.textContent.trim();
            return comentario ? `${nombre} - ${comentario}` : nombre;
        },
        selectorVnum: '.special-vnum-display'
    },
    {
        id: 'mobprogs',
        etiqueta: '#MOBPROGS',
        contenedor: '#mobprogs-container',
        selectorTarjeta: '.prog-card',
        idEncabezado: 'mobprogs-header',
        obtenerNombre: tarjeta => {
            const propietario = tarjeta.querySelector('.prog-owner-display')?.selectedOptions[0]?.textContent.trim();
            return propietario || 'Prog';
        },
        selectorVnum: '.prog-vnum-display'
    },
    {
        id: 'objprogs',
        etiqueta: '#OBJPROGS',
        contenedor: '#objprogs-container',
        selectorTarjeta: '.prog-card',
        idEncabezado: 'objprogs-header',
        obtenerNombre: tarjeta => {
            const propietario = tarjeta.querySelector('.prog-owner-display')?.selectedOptions[0]?.textContent.trim();
            return propietario || 'Prog';
        },
        selectorVnum: '.prog-vnum-display'
    },
    {
        id: 'roomprogs',
        etiqueta: '#ROOMPROGS',
        contenedor: '#roomprogs-container',
        selectorTarjeta: '.prog-card',
        idEncabezado: 'roomprogs-header',
        obtenerNombre: tarjeta => {
            const propietario = tarjeta.querySelector('.prog-owner-display')?.selectedOptions[0]?.textContent.trim();
            return propietario || 'Prog';
        },
        selectorVnum: '.prog-vnum-display'
    }
];

function actualizarResumenYContadores() {
    const resumenDiv = document.getElementById('resumen-contenido');
    if (resumenDiv) resumenDiv.innerHTML = '';
    resumenConfig.forEach(cfg => {
        const tarjetas = document.querySelectorAll(`${cfg.contenedor} ${cfg.selectorTarjeta}`);
        const cantidad = tarjetas.length;
        const header = document.getElementById(cfg.idEncabezado);
        if (header) header.textContent = `${cfg.etiqueta} - ${cantidad}`;
        const navBtn = document.querySelector(`nav button[data-section="${cfg.id}"]`);
        if (navBtn) navBtn.textContent = `${cfg.etiqueta} (${cantidad})`;
        if (resumenDiv) {
            const detalles = document.createElement('details');
            const sumario = document.createElement('summary');
            sumario.textContent = `${cfg.etiqueta} - ${cantidad}`;
            detalles.appendChild(sumario);
            const lista = document.createElement('ul');
            tarjetas.forEach(tarjeta => {
                let nombre = '';
                if (cfg.selectorNombre) {
                    const elem = tarjeta.querySelector(cfg.selectorNombre);
                    if (elem) {
                        if (elem.tagName === 'INPUT' || elem.tagName === 'TEXTAREA') {
                            nombre = elem.value.trim();
                        } else if (elem.tagName === 'SELECT') {
                            nombre = elem.selectedOptions[0]?.textContent.trim() || '';
                        } else {
                            nombre = elem.textContent.trim();
                        }
                    }
                } else if (cfg.obtenerNombre) {
                    nombre = cfg.obtenerNombre(tarjeta);
                }
                let vnum = '';
                if (cfg.selectorVnum) {
                    const vnumElem = tarjeta.querySelector(cfg.selectorVnum);
                    if (vnumElem) vnum = vnumElem.textContent.trim() || vnumElem.value || '';
                } else if (cfg.obtenerVnum) {
                    vnum = cfg.obtenerVnum(tarjeta);
                }
                if (!nombre) nombre = '(sin nombre)';
                const li = document.createElement('li');
                li.textContent = vnum ? `${nombre} (${vnum})` : nombre;
                lista.appendChild(li);
            });
            if (!lista.childElementCount) {
                const li = document.createElement('li');
                li.textContent = 'Sin elementos';
                lista.appendChild(li);
            }
            detalles.appendChild(lista);
            resumenDiv.appendChild(detalles);
        }
    });
}

window.actualizarResumenYContadores = actualizarResumenYContadores;