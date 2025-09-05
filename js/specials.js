import { setupDynamicSection } from './utils.js';

export function inicializarTarjetaEspecial(card) {
    const comentarioInput = card.querySelector('.special-comment');
    const especialInput = card.querySelector('.special-name');
    const encabezado = card.querySelector('.special-header-display');

    function actualizarEncabezado() {
        const comentario = comentarioInput.value.trim();
        const especial = especialInput.value.trim();
        encabezado.textContent = comentario ? `${comentario} - ${especial}` : especial;
    }

    if (comentarioInput && especialInput && encabezado) {
        comentarioInput.addEventListener('input', actualizarEncabezado);
        especialInput.addEventListener('input', actualizarEncabezado);
        actualizarEncabezado();
    }
}

export function setupSpecialsSection(vnumRangeCheckFunction, vnumSelector, vnumDisplaySelector) {
    setupDynamicSection('add-special-btn', 'specials-container', 'special-template', '.special-card', vnumRangeCheckFunction, vnumSelector, vnumDisplaySelector, null, null, inicializarTarjetaEspecial);
}

export function generateSpecialsSection() {
    const cards = document.querySelectorAll('#specials-container .special-card');
    if (cards.length === 0) return '#SPECIALS\nS\n\n';
    let section = '#SPECIALS\n';
    cards.forEach(card => {
        const vnum = card.querySelector('.special-vnum').value;
        const name = card.querySelector('.special-name').value;
        const comment = card.querySelector('.special-comment').value.trim();
        if (vnum && name) {
            section += `M ${vnum} ${name}${comment ? ` * ${comment}` : ''}\n`;
        }
    });
    return section + 'S\n\n';
}