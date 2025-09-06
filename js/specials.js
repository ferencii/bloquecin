import { setupDynamicSection } from './utils.js';
import { gameData } from './config.js';

export function poblarSelectEspecial(card) {
    const select = card.querySelector('.special-name');
    const nameDisplay = card.querySelector('.special-name-display');
    const commentInput = card.querySelector('.special-comment');
    const commentDisplay = card.querySelector('.special-comment-display');
    const hyphenSpan = card.querySelector('.special-hyphen');
    if (!select) return;
    select.innerHTML = '';
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = '-- selecciona --';
    select.appendChild(placeholder);
    gameData.specials.forEach(esp => {
        const option = document.createElement('option');
        option.value = esp.value;
        option.textContent = esp.value;
        option.title = esp.descripcion;
        select.appendChild(option);
    });
    select.addEventListener('change', () => {
        const seleccionado = gameData.specials.find(s => s.value === select.value);
        select.title = seleccionado ? seleccionado.descripcion : '';
        if (nameDisplay) nameDisplay.textContent = select.value;
    });

    if (commentInput && commentDisplay && hyphenSpan) {
        commentInput.addEventListener('input', () => {
            const texto = commentInput.value.replace(/^\*\s*/, '');
            commentInput.value = texto;
            commentDisplay.textContent = texto;
            hyphenSpan.style.display = texto ? '' : 'none';
        });
        commentInput.dispatchEvent(new Event('input'));
    }
}

export function inicializarTarjetaSpecial(cardElement) {
    const header = cardElement.querySelector('.collapsible-header');
    const content = cardElement.querySelector('.collapsible-content');
    if (header && content && !header.dataset.colapsado) {
        header.addEventListener('click', () => {
            content.classList.toggle('collapsed');
        });
        header.dataset.colapsado = 'true';
    }

    const vnumInput = cardElement.querySelector('.special-vnum');
    const vnumDisplay = cardElement.querySelector('.special-vnum-display');
    if (vnumInput && vnumDisplay && !vnumInput.dataset.vnumEscucha) {
        vnumInput.addEventListener('input', () => {
            vnumDisplay.textContent = vnumInput.value;
        });
        vnumInput.dataset.vnumEscucha = 'true';
    }
}

export function setupSpecialsSection(vnumRangeCheckFunction, vnumSelector, vnumDisplaySelector, nameInputSelector, nameDisplaySelector) {
    setupDynamicSection('add-special-btn', 'specials-container', 'special-template', '.special-card', vnumRangeCheckFunction, vnumSelector, vnumDisplaySelector, nameInputSelector, nameDisplaySelector, (card) => {
        poblarSelectEspecial(card);
        inicializarTarjetaSpecial(card);
    });
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