const temasPredefinidos = {
    oscuro: {
        nombre: 'Oscuro clásico',
        colores: {
            '--bg-color': '#000000',
            '--primary-color': '#0a0a0a',
            '--secondary-color': '#1a1a1a',
            '--text-color': '#00ff00',
            '--header-color': '#33ff33',
            '--input-bg': '#111111',
            '--border-color': '#008800'
        }
    },
    claro: {
        nombre: 'Claro',
        colores: {
            '--bg-color': '#ffffff',
            '--primary-color': '#f0f0f0',
            '--secondary-color': '#e0e0e0',
            '--text-color': '#000000',
            '--header-color': '#006600',
            '--input-bg': '#ffffff',
            '--border-color': '#006600'
        }
    },
    azul: {
        nombre: 'Azul',
        colores: {
            '--bg-color': '#e6f0ff',
            '--primary-color': '#cce0ff',
            '--secondary-color': '#99c2ff',
            '--text-color': '#003366',
            '--header-color': '#0055aa',
            '--input-bg': '#ffffff',
            '--border-color': '#0055aa'
        }
    },
    vampirico: {
        nombre: 'Vampírico',
        colores: {
            '--bg-color': '#1a0000',
            '--primary-color': '#330000',
            '--secondary-color': '#660000',
            '--text-color': '#ff3333',
            '--header-color': '#ff6666',
            '--input-bg': '#330000',
            '--border-color': '#990000'
        }
    },
    druida: {
        nombre: 'Druida del Bosque',
        colores: {
            '--bg-color': '#002b00',
            '--primary-color': '#004400',
            '--secondary-color': '#006600',
            '--text-color': '#ccffcc',
            '--header-color': '#33aa33',
            '--input-bg': '#003300',
            '--border-color': '#336633'
        }
    },
    taberna: {
        nombre: 'Taberna de Ron',
        colores: {
            '--bg-color': '#2b1d0e',
            '--primary-color': '#3e2a16',
            '--secondary-color': '#5c3c1f',
            '--text-color': '#f2e1c2',
            '--header-color': '#d4a76a',
            '--input-bg': '#3e2a16',
            '--border-color': '#d4a76a'
        }
    },
    arcano: {
        nombre: 'Arcano Místico',
        colores: {
            '--bg-color': '#0e0e2b',
            '--primary-color': '#1a1a3e',
            '--secondary-color': '#242467',
            '--text-color': '#d1c4e9',
            '--header-color': '#7e57c2',
            '--input-bg': '#1a1a3e',
            '--border-color': '#7e57c2'
        }
    },
    hielo: {
        nombre: 'Fortaleza de Hielo',
        colores: {
            '--bg-color': '#e0f7ff',
            '--primary-color': '#c2e9fb',
            '--secondary-color': '#a6dcef',
            '--text-color': '#004d66',
            '--header-color': '#0099cc',
            '--input-bg': '#ffffff',
            '--border-color': '#0099cc'
        }
    },
    dragon: {
        nombre: 'Guarida de Dragón',
        colores: {
            '--bg-color': '#330000',
            '--primary-color': '#661a00',
            '--secondary-color': '#993300',
            '--text-color': '#ffcc66',
            '--header-color': '#ff6600',
            '--input-bg': '#661a00',
            '--border-color': '#cc3300'
        }
    },
    payaso: {
        nombre: 'Circo del Payaso',
        colores: {
            '--bg-color': '#ffffe6',
            '--primary-color': '#fff2cc',
            '--secondary-color': '#ffe0e0',
            '--text-color': '#000099',
            '--header-color': '#ff00ff',
            '--input-bg': '#ffffff',
            '--border-color': '#ff66ff'
        }
    },
    bardo: {
        nombre: 'Bardo Errante',
        colores: {
            '--bg-color': '#2e003e',
            '--primary-color': '#4b006e',
            '--secondary-color': '#7a1fa2',
            '--text-color': '#ffd700',
            '--header-color': '#ffb300',
            '--input-bg': '#3a0052',
            '--border-color': '#b8860b'
        }
    },
    paladin: {
        nombre: 'Luz de Paladín',
        colores: {
            '--bg-color': '#f8f8f5',
            '--primary-color': '#fff2cc',
            '--secondary-color': '#e6e6e6',
            '--text-color': '#664400',
            '--header-color': '#daa520',
            '--input-bg': '#ffffff',
            '--border-color': '#b8860b'
        }
    },
    bruja: {
        nombre: 'Caldero de Bruja',
        colores: {
            '--bg-color': '#1f0026',
            '--primary-color': '#2e0039',
            '--secondary-color': '#550066',
            '--text-color': '#c5e1a5',
            '--header-color': '#66bb6a',
            '--input-bg': '#2e0039',
            '--border-color': '#7cb342'
        }
    },
    forajido: {
        nombre: 'Camino del Forajido',
        colores: {
            '--bg-color': '#2a2a2a',
            '--primary-color': '#3b3b3b',
            '--secondary-color': '#5c5c5c',
            '--text-color': '#f0e68c',
            '--header-color': '#cd853f',
            '--input-bg': '#333333',
            '--border-color': '#8b4513'
        }
    },
    monje: {
        nombre: 'Monasterio Silente',
        colores: {
            '--bg-color': '#f5f5dc',
            '--primary-color': '#eae8c9',
            '--secondary-color': '#d6d4b2',
            '--text-color': '#4b3621',
            '--header-color': '#8b7765',
            '--input-bg': '#ffffff',
            '--border-color': '#8b7765'
        }
    },
    pirata: {
        nombre: 'Cubierta Pirata',
        colores: {
            '--bg-color': '#001f3f',
            '--primary-color': '#003366',
            '--secondary-color': '#004c99',
            '--text-color': '#ffddaa',
            '--header-color': '#cc5500',
            '--input-bg': '#002b5c',
            '--border-color': '#996515'
        }
    },
    ninja: {
        nombre: 'Sombra Ninja',
        colores: {
            '--bg-color': '#0d0d0d',
            '--primary-color': '#1a1a1a',
            '--secondary-color': '#262626',
            '--text-color': '#e60073',
            '--header-color': '#660066',
            '--input-bg': '#1a1a1a',
            '--border-color': '#660066'
        }
    },
    golem: {
        nombre: 'Taller de Gólem',
        colores: {
            '--bg-color': '#3d3d3d',
            '--primary-color': '#555555',
            '--secondary-color': '#777777',
            '--text-color': '#e0e0e0',
            '--header-color': '#9e9e9e',
            '--input-bg': '#444444',
            '--border-color': '#7f7f7f'
        }
    },
    caballero: {
        nombre: 'Corte del Caballero',
        colores: {
            '--bg-color': '#2e0000',
            '--primary-color': '#4b0000',
            '--secondary-color': '#660000',
            '--text-color': '#ffd7b5',
            '--header-color': '#aa0000',
            '--input-bg': '#3a0000',
            '--border-color': '#800000'
        }
    },
    orco: {
        nombre: 'Campamento Orco',
        colores: {
            '--bg-color': '#1a3300',
            '--primary-color': '#2e4d00',
            '--secondary-color': '#446600',
            '--text-color': '#e6ffb3',
            '--header-color': '#669900',
            '--input-bg': '#2e4d00',
            '--border-color': '#6b8e23'
        }
    },
    hada: {
        nombre: 'Bosque de Hadas',
        colores: {
            '--bg-color': '#e0ffe6',
            '--primary-color': '#ccffdd',
            '--secondary-color': '#ffccff',
            '--text-color': '#006666',
            '--header-color': '#ff66cc',
            '--input-bg': '#ffffff',
            '--border-color': '#66cc99'
        }
    },
    tortuga: {
        nombre: 'Caparazón de Tortuga',
        colores: {
            '--bg-color': '#003333',
            '--primary-color': '#004c4c',
            '--secondary-color': '#006666',
            '--text-color': '#ccffcc',
            '--header-color': '#009999',
            '--input-bg': '#004040',
            '--border-color': '#009999'
        }
    },
    mercader: {
        nombre: 'Mercado Bullicioso',
        colores: {
            '--bg-color': '#332200',
            '--primary-color': '#664400',
            '--secondary-color': '#996600',
            '--text-color': '#fff0b3',
            '--header-color': '#ffcc33',
            '--input-bg': '#4d3300',
            '--border-color': '#cc9933'
        }
    },
    zombi: {
        nombre: 'Cementerio Zombi',
        colores: {
            '--bg-color': '#1a1a1a',
            '--primary-color': '#333333',
            '--secondary-color': '#4d4d4d',
            '--text-color': '#99ff99',
            '--header-color': '#66cc66',
            '--input-bg': '#2b2b2b',
            '--border-color': '#339933'
        }
    },
    gnomo: {
        nombre: 'Laboratorio Gnomo',
        colores: {
            '--bg-color': '#330033',
            '--primary-color': '#660066',
            '--secondary-color': '#993399',
            '--text-color': '#ffcc66',
            '--header-color': '#ff66cc',
            '--input-bg': '#4d004d',
            '--border-color': '#cc6699'
        }
    },
    troll: {
        nombre: 'Puente Troll',
        colores: {
            '--bg-color': '#332211',
            '--primary-color': '#4d331a',
            '--secondary-color': '#665c33',
            '--text-color': '#e0d8c0',
            '--header-color': '#b8860b',
            '--input-bg': '#3d2a14',
            '--border-color': '#8b5a2b'
        }
    },
    demonio: {
        nombre: 'Abismo Demoníaco',
        colores: {
            '--bg-color': '#1a000d',
            '--primary-color': '#33001a',
            '--secondary-color': '#660033',
            '--text-color': '#ff6666',
            '--header-color': '#cc0033',
            '--input-bg': '#33001a',
            '--border-color': '#990033'
        }
    },
    angel: {
        nombre: 'Cielo Angelical',
        colores: {
            '--bg-color': '#f0ffff',
            '--primary-color': '#e6f7ff',
            '--secondary-color': '#d9efff',
            '--text-color': '#336699',
            '--header-color': '#6699cc',
            '--input-bg': '#ffffff',
            '--border-color': '#6699cc'
        }
    },
    naufrago: {
        nombre: 'Isla Náufraga',
        colores: {
            '--bg-color': '#f5deb3',
            '--primary-color': '#e6c899',
            '--secondary-color': '#d1b07a',
            '--text-color': '#00334d',
            '--header-color': '#006680',
            '--input-bg': '#fff8dc',
            '--border-color': '#cc9966'
        }
    },
    sirena: {
        nombre: 'Gruta de Sirenas',
        colores: {
            '--bg-color': '#e0ffff',
            '--primary-color': '#b3ffff',
            '--secondary-color': '#80e5ff',
            '--text-color': '#004d66',
            '--header-color': '#ff66b3',
            '--input-bg': '#ffffff',
            '--border-color': '#ff99cc'
        }
    },
    triton: {
        nombre: 'Palacio del Tritón',
        colores: {
            '--bg-color': '#003333',
            '--primary-color': '#004c4c',
            '--secondary-color': '#006b6b',
            '--text-color': '#b3ffff',
            '--header-color': '#00cccc',
            '--input-bg': '#004040',
            '--border-color': '#009999'
        }
    },
    enano: {
        nombre: 'Mina Enana',
        colores: {
            '--bg-color': '#2b2b2b',
            '--primary-color': '#3d3d3d',
            '--secondary-color': '#555555',
            '--text-color': '#ffd700',
            '--header-color': '#b8860b',
            '--input-bg': '#333333',
            '--border-color': '#b8860b'
        }
    },
    kobold: {
        nombre: 'Cubil Kobold',
        colores: {
            '--bg-color': '#331a00',
            '--primary-color': '#4d2600',
            '--secondary-color': '#663300',
            '--text-color': '#ffdd99',
            '--header-color': '#cc6600',
            '--input-bg': '#402000',
            '--border-color': '#b35900'
        }
    },
    lich: {
        nombre: 'Torre Liche',
        colores: {
            '--bg-color': '#1a1a2e',
            '--primary-color': '#2e2e44',
            '--secondary-color': '#44445c',
            '--text-color': '#c1c1d7',
            '--header-color': '#666699',
            '--input-bg': '#24243a',
            '--border-color': '#666699'
        }
    },
    hechicero: {
        nombre: 'Academia Hechicera',
        colores: {
            '--bg-color': '#001a33',
            '--primary-color': '#002b4d',
            '--secondary-color': '#003d66',
            '--text-color': '#ffdd99',
            '--header-color': '#0099ff',
            '--input-bg': '#002240',
            '--border-color': '#0066cc'
        }
    },
    fantasma: {
        nombre: 'Mansión Fantasma',
        colores: {
            '--bg-color': '#f5f5f5',
            '--primary-color': '#e0e0e0',
            '--secondary-color': '#cccccc',
            '--text-color': '#666666',
            '--header-color': '#999999',
            '--input-bg': '#ffffff',
            '--border-color': '#999999'
        }
    },
    mediano: {
        nombre: 'Campamento Mediano',
        colores: {
            '--bg-color': '#f4e1d2',
            '--primary-color': '#eac7b8',
            '--secondary-color': '#d9b09c',
            '--text-color': '#5c4033',
            '--header-color': '#a9714b',
            '--input-bg': '#ffffff',
            '--border-color': '#a9714b'
        }
    },
    bandido: {
        nombre: 'Guarida Bandida',
        colores: {
            '--bg-color': '#220000',
            '--primary-color': '#330000',
            '--secondary-color': '#550000',
            '--text-color': '#ff9999',
            '--header-color': '#990000',
            '--input-bg': '#330000',
            '--border-color': '#660000'
        }
    },
    robot: {
        nombre: 'Núcleo Robótico',
        colores: {
            '--bg-color': '#e6e6e6',
            '--primary-color': '#cccccc',
            '--secondary-color': '#b3b3b3',
            '--text-color': '#333333',
            '--header-color': '#0066cc',
            '--input-bg': '#ffffff',
            '--border-color': '#808080'
        }
    },
    gato: {
        nombre: 'Taberna del Gato',
        colores: {
            '--bg-color': '#3b2f2f',
            '--primary-color': '#5c4a3d',
            '--secondary-color': '#8c7251',
            '--text-color': '#ffe4c4',
            '--header-color': '#d2691e',
            '--input-bg': '#4a3a32',
            '--border-color': '#a0522d'
        }
    },
    queso: {
        nombre: 'Ciudad de Queso',
        colores: {
            '--bg-color': '#fff5cc',
            '--primary-color': '#ffeb99',
            '--secondary-color': '#ffd966',
            '--text-color': '#663300',
            '--header-color': '#ffcc00',
            '--input-bg': '#ffffff',
            '--border-color': '#cc9900'
        }
    },
    duende: {
        nombre: 'Mercadillo Duende',
        colores: {
            '--bg-color': '#004d00',
            '--primary-color': '#006600',
            '--secondary-color': '#008000',
            '--text-color': '#ffcc66',
            '--header-color': '#ff6600',
            '--input-bg': '#005500',
            '--border-color': '#cc5500'
        }
    },
    sombra: {
        nombre: 'Reino de Sombras',
        colores: {
            '--bg-color': '#0d0d1a',
            '--primary-color': '#1a1a33',
            '--secondary-color': '#26264d',
            '--text-color': '#e6e6ff',
            '--header-color': '#4d4d80',
            '--input-bg': '#1a1a33',
            '--border-color': '#333366'
        }
    },
    cactus: {
        nombre: 'Oasis del Cactus',
        colores: {
            '--bg-color': '#334d00',
            '--primary-color': '#4d6600',
            '--secondary-color': '#668000',
            '--text-color': '#e6ffb3',
            '--header-color': '#99cc33',
            '--input-bg': '#405500',
            '--border-color': '#739900'
        }
    },
    mapache: {
        nombre: 'Rincón Mapache',
        colores: {
            '--bg-color': '#2b2b2b',
            '--primary-color': '#3d3d3d',
            '--secondary-color': '#555555',
            '--text-color': '#ffdead',
            '--header-color': '#a0522d',
            '--input-bg': '#333333',
            '--border-color': '#8b4513'
        }
    },
    biblioteca: {
        nombre: 'Biblioteca Escondida',
        colores: {
            '--bg-color': '#2b0013',
            '--primary-color': '#4d0020',
            '--secondary-color': '#66002b',
            '--text-color': '#ffcc99',
            '--header-color': '#b22222',
            '--input-bg': '#3a001a',
            '--border-color': '#8b1a1a'
        }
    },
    oficina: {
        nombre: 'Oficina del Mago',
        colores: {
            '--bg-color': '#f3e5f5',
            '--primary-color': '#e1bee7',
            '--secondary-color': '#ce93d8',
            '--text-color': '#4a148c',
            '--header-color': '#7b1fa2',
            '--input-bg': '#ffffff',
            '--border-color': '#9c27b0'
        }
    },
    patata: {
        nombre: 'Imperio Patata',
        colores: {
            '--bg-color': '#4d3319',
            '--primary-color': '#664422',
            '--secondary-color': '#805529',
            '--text-color': '#ffe0b3',
            '--header-color': '#cc9933',
            '--input-bg': '#5c3a1f',
            '--border-color': '#a67c52'
        }
    },
    hongo: {
        nombre: 'Bosque de Hongos',
        colores: {
            '--bg-color': '#1a331a',
            '--primary-color': '#2e4d2e',
            '--secondary-color': '#446644',
            '--text-color': '#e6ffe6',
            '--header-color': '#9966cc',
            '--input-bg': '#244024',
            '--border-color': '#775ca8'
        }
    },
    flamenco: {
        nombre: 'Fiesta Flamenca',
        colores: {
            '--bg-color': '#ffe6f2',
            '--primary-color': '#ffb3d9',
            '--secondary-color': '#ff99cc',
            '--text-color': '#660033',
            '--header-color': '#ff3366',
            '--input-bg': '#ffffff',
            '--border-color': '#ff6699'
        }
    }
};

const variablesTema = [
    { var: '--bg-color', etiqueta: 'Fondo' },
    { var: '--primary-color', etiqueta: 'Primario' },
    { var: '--secondary-color', etiqueta: 'Secundario' },
    { var: '--text-color', etiqueta: 'Texto' },
    { var: '--header-color', etiqueta: 'Encabezado' },
    { var: '--input-bg', etiqueta: 'Fondo de entrada' },
    { var: '--border-color', etiqueta: 'Borde' }
];

export function aplicarTema(colores) {
    const raiz = document.documentElement;
    Object.entries(colores).forEach(([propiedad, valor]) => {
        raiz.style.setProperty(propiedad, valor);
        const input = document.querySelector(`input[data-var="${propiedad}"]`);
        if (input) input.value = valor;
    });
    window.dispatchEvent(new CustomEvent('tema-aplicado', { detail: colores }));
}

function guardarTema(colores) {
    localStorage.setItem('temaPersonalizado', JSON.stringify(colores));
}

export function obtenerColoresActuales() {
    const estilos = getComputedStyle(document.documentElement);
    const resultado = {};
    variablesTema.forEach(cfg => {
        resultado[cfg.var] = estilos.getPropertyValue(cfg.var).trim();
    });
    return resultado;
}

export function cargarTema() {
    const datos = localStorage.getItem('temaPersonalizado');
    if (datos) {
        try {
            const colores = JSON.parse(datos);
            aplicarTema(colores);
        } catch (e) {}
    }
    const selectorModo = document.getElementById('modo-tema');
    if (selectorModo) {
        const nombre = Object.keys(temasPredefinidos).find(n => compararTemas(temasPredefinidos[n].colores, obtenerColoresActuales()));
        selectorModo.value = nombre || 'personalizado';
    }
}

function compararTemas(a, b) {
    return Object.keys(a).every(k => a[k].toLowerCase() === b[k]?.toLowerCase());
}

export function setupTemaSection() {
    const contenedor = document.getElementById('colores-personalizados');
    variablesTema.forEach(cfg => {
        const div = document.createElement('div');
        div.className = 'form-group';
        const label = document.createElement('label');
        label.textContent = cfg.etiqueta;
        const input = document.createElement('input');
        input.type = 'color';
        input.dataset.var = cfg.var;
        input.addEventListener('input', () => {
            const colores = obtenerColoresActuales();
            colores[cfg.var] = input.value;
            aplicarTema(colores);
            guardarTema(colores);
            document.getElementById('modo-tema').value = 'personalizado';
        });
        div.appendChild(label);
        div.appendChild(input);
        contenedor.appendChild(div);
    });

    const selectorModo = document.getElementById('modo-tema');
    Object.entries(temasPredefinidos).forEach(([clave, datos]) => {
        const opcion = document.createElement('option');
        opcion.value = clave;
        opcion.textContent = datos.nombre;
        selectorModo.appendChild(opcion);
    });

    selectorModo.addEventListener('change', () => {
        const datos = temasPredefinidos[selectorModo.value];
        if (datos) {
            aplicarTema(datos.colores);
            guardarTema(datos.colores);
        }
    });

    aplicarTema(obtenerColoresActuales());
    cargarTema();
}
