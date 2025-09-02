import { setupDynamicSection } from './utils.js';

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
            target.previousElementSibling.appendChild(document.getElementById('affect-template').content.cloneNode(true));
        }
    });
}

export function generateSetSection() {
    const setCards = document.querySelectorAll('#sets-container .set-card');
    if (setCards.length === 0) return '#SET\n#0\n\n';

    let section = '#SET\n';
    setCards.forEach(card => {
        const id = card.querySelector('.set-id').value;
        const name = card.querySelector('.set-name').value;
        section += `${id} ${name}~\n`;

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
        });
        section += 'End\n';
    });
    section += '#0\n\n';
    return section;
}