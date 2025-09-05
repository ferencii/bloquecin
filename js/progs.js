import { setupDynamicSection } from './utils.js';

export function setupProgsSection(type, vnumRangeCheckFunction, vnumSelector, vnumDisplaySelector, nameInputSelector, nameDisplaySelector) {
    const buttonType = type.replace('s', '');
    setupDynamicSection(`add-${buttonType}-btn`, `${type}-container`, 'prog-template', '.prog-card', vnumRangeCheckFunction, vnumSelector, vnumDisplaySelector, nameInputSelector, nameDisplaySelector);
}

export function generateProgsSection(containerId, sectionName) {
    const cards = document.querySelectorAll(`#${containerId} .prog-card`);
    if (cards.length === 0) return `#${sectionName}\n#0\n\n`;
    let section = `#${sectionName}\n`;
    cards.forEach(card => {
        const vnum = card.querySelector('.prog-vnum').value;
        const code = card.querySelector('.prog-code').value;
        if (vnum && code) {
            section += `#${vnum}\n${code}~\n`;
        }
    });
    return section + '#0\n\n';
}