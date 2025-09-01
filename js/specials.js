import { setupDynamicSection } from './utils.js';

export function setupSpecialsSection(vnumRangeCheckFunction) {
    setupDynamicSection('add-special-btn', 'specials-container', 'special-template', '.special-card', vnumRangeCheckFunction, '.special-vnum', '.special-vnum-display');
}

export function generateSpecialsSection() {
    const cards = document.querySelectorAll('#specials-container .special-card');
    if (cards.length === 0) return '#SPECIALS\nS\n\n';
    let section = '#SPECIALS\n';
    cards.forEach(card => {
        const vnum = card.querySelector('.special-vnum').value;
        const name = card.querySelector('.special-name').value;
        const comment = card.querySelector('.special-comment').value;
        if (vnum && name) {
            section += `M ${vnum} ${name} ${comment || ''}\n`;
        }
    });
    return section + 'S\n\n';
}