const temasPredefinidos = {
    oscuro: {
        '--bg-color': '#000000',
        '--primary-color': '#0a0a0a',
        '--secondary-color': '#1a1a1a',
        '--text-color': '#00ff00',
        '--header-color': '#33ff33',
        '--input-bg': '#111111',
        '--border-color': '#008800'
    },
    claro: {
        '--bg-color': '#ffffff',
        '--primary-color': '#f0f0f0',
        '--secondary-color': '#e0e0e0',
        '--text-color': '#000000',
        '--header-color': '#006600',
        '--input-bg': '#ffffff',
        '--border-color': '#006600'
    },
    azul: {
        '--bg-color': '#e6f0ff',
        '--primary-color': '#cce0ff',
        '--secondary-color': '#99c2ff',
        '--text-color': '#003366',
        '--header-color': '#0055aa',
        '--input-bg': '#ffffff',
        '--border-color': '#0055aa'
    },
    vampirico: {
        '--bg-color': '#1a0000',
        '--primary-color': '#330000',
        '--secondary-color': '#660000',
        '--text-color': '#ff3333',
        '--header-color': '#ff6666',
        '--input-bg': '#330000',
        '--border-color': '#990000'
    },
    druida: {
        '--bg-color': '#002b00',
        '--primary-color': '#004400',
        '--secondary-color': '#006600',
        '--text-color': '#ccffcc',
        '--header-color': '#33aa33',
        '--input-bg': '#003300',
        '--border-color': '#336633'
    },
    taberna: {
        '--bg-color': '#2b1d0e',
        '--primary-color': '#3e2a16',
        '--secondary-color': '#5c3c1f',
        '--text-color': '#f2e1c2',
        '--header-color': '#d4a76a',
        '--input-bg': '#3e2a16',
        '--border-color': '#d4a76a'
    },
    arcano: {
        '--bg-color': '#0e0e2b',
        '--primary-color': '#1a1a3e',
        '--secondary-color': '#242467',
        '--text-color': '#d1c4e9',
        '--header-color': '#7e57c2',
        '--input-bg': '#1a1a3e',
        '--border-color': '#7e57c2'
    },
    hielo: {
        '--bg-color': '#e0f7ff',
        '--primary-color': '#c2e9fb',
        '--secondary-color': '#a6dcef',
        '--text-color': '#004d66',
        '--header-color': '#0099cc',
        '--input-bg': '#ffffff',
        '--border-color': '#0099cc'
    },
    dragon: {
        '--bg-color': '#330000',
        '--primary-color': '#661a00',
        '--secondary-color': '#993300',
        '--text-color': '#ffcc66',
        '--header-color': '#ff6600',
        '--input-bg': '#661a00',
        '--border-color': '#cc3300'
    },
    payaso: {
        '--bg-color': '#ffffe6',
        '--primary-color': '#fff2cc',
        '--secondary-color': '#ffe0e0',
        '--text-color': '#000099',
        '--header-color': '#ff00ff',
        '--input-bg': '#ffffff',
        '--border-color': '#ff66ff'
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

function aplicarTema(colores) {
    const raiz = document.documentElement;
    Object.entries(colores).forEach(([propiedad, valor]) => {
        raiz.style.setProperty(propiedad, valor);
        const input = document.querySelector(`input[data-var="${propiedad}"]`);
        if (input) input.value = valor;
    });
}

function guardarTema(colores) {
    localStorage.setItem('temaPersonalizado', JSON.stringify(colores));
}

function obtenerColoresActuales() {
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
        const nombre = Object.keys(temasPredefinidos).find(n => compararTemas(temasPredefinidos[n], obtenerColoresActuales()));
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
    selectorModo.addEventListener('change', () => {
        const colores = temasPredefinidos[selectorModo.value];
        if (colores) {
            aplicarTema(colores);
            guardarTema(colores);
        }
    });

    aplicarTema(obtenerColoresActuales());
    cargarTema();
}
