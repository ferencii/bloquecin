import { setupDynamicSection } from './utils.js';
import { populateAffectBitSelect } from './objects.js';

export function setupSetSection(vnumRangeCheckFunction, vnumSelector, vnumDisplaySelector, nameInputSelector, nameDisplaySelector) {
    setupDynamicSection('add-set-btn', 'sets-container', 'set-template', '.set-card', vnumRangeCheckFunction, vnumSelector, vnumDisplaySelector, nameInputSelector, nameDisplaySelector);

    const container = document.getElementById('sets-container');
    container.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('add-tier-btn')) {
            target.previousElementSibling.appendChild(document.getElementById('tier-template').content.cloneNode(true));
        } else if (target.classList.contains('remove-sub-btn')) {
            target.closest('.tier-card').remove();
        } else if (target.classList.contains('add-apply-btn')) {
            target.previousElementSibling.appendChild(document.getElementById('apply-template').content.cloneNode(true));
        } else if (target.classList.contains('add-affect-btn')) {
            const container = target.previousElementSibling;
            const fragment = document.getElementById('affect-template').content.cloneNode(true);
            container.appendChild(fragment);
            populateAffectBitSelect(container.lastElementChild);
        }
    });
    container.addEventListener('change', e => {
        if (e.target.classList.contains('affect-type')) {
            populateAffectBitSelect(e.target.closest('.sub-item-row'));
        }
    });
}

export function inicializarTarjetaSet(cardElement) {
    const header = cardElement.querySelector('.collapsible-header');
    const content = cardElement.querySelector('.collapsible-content');
    if (header && content && !header.dataset.colapsado) {
        header.addEventListener('click', () => {
            content.classList.toggle('collapsed');
        });
        header.dataset.colapsado = 'true';
    }

    const idInput = cardElement.querySelector('.set-id');
    const idDisplay = cardElement.querySelector('.set-id-display');
    if (idInput && idDisplay && !idInput.dataset.vnumEscucha) {
        idInput.addEventListener('input', () => {
            idDisplay.textContent = idInput.value;
        });
        idInput.dataset.vnumEscucha = 'true';
    }

    const nameInput = cardElement.querySelector('.set-name');
    const nameDisplay = cardElement.querySelector('.set-name-display');
    if (nameInput && nameDisplay && !nameInput.dataset.nombreEscucha) {
        nameInput.addEventListener('input', () => {
            nameDisplay.textContent = nameInput.value;
        });
        nameInput.dataset.nombreEscucha = 'true';
        nameInput.dispatchEvent(new Event('input'));
    }
}

export function generateSetSection() {
    const setCards = document.querySelectorAll('#sets-container .set-card');
    if (setCards.length === 0) return '#SET - 0\n#0\n\n';

    let section = `#SET - ${setCards.length}\n`;
    setCards.forEach(card => {
        const id = card.querySelector('.set-id').value;
        const name = card.querySelector('.set-name').value;
        section += `#${id}\n${name}~\n`;

        card.querySelectorAll('.tier-card').forEach(tier => {
            section += `T ${tier.querySelector('.tier-pieces').value}\n`;
            tier.querySelectorAll('.applies-container .sub-item-row').forEach(row => {
                const location = row.querySelector('.apply-location').value;
                const modifier = row.querySelector('.apply-modifier').value;
                if (location && modifier) section += `A ${location} ${modifier}\n`;
            });
            tier.querySelectorAll('.affects-container .sub-item-row').forEach(row => {
                const type = row.querySelector('.affect-type').value;
                const bits = row.querySelector('.affect-bits').value;
                if (bits) section += `F ${type} 0 0 ${bits}\n`;
            });
            section += 'End\n';
        });
        section += '\n';
    });
    section += '#0\n\n';
    return section;
}