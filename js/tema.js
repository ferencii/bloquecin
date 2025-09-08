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

function cargarTema() {
    const datos = localStorage.getItem('temaPersonalizado');
    if (datos) {
        try {
            const colores = JSON.parse(datos);
            aplicarTema(colores);
        } catch (e) {}
    }
    const selectorModo = document.getElementById('modo-tema');
    const nombre = Object.keys(temasPredefinidos).find(n => compararTemas(temasPredefinidos[n], obtenerColoresActuales()));
    selectorModo.value = nombre || 'personalizado';
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
