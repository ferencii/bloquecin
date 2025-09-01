import { setupDynamicSection, getFlagString } from './utils.js';

export function setupMobilesSection(vnumRangeCheckFunction) {
    setupDynamicSection('add-mob-btn', 'mobiles-container', 'mob-template', '.mob-card', vnumRangeCheckFunction);
}

export function generateMobilesSection() {
    const mobCards = document.querySelectorAll('#mobiles-container .mob-card');
    if (mobCards.length === 0) return '#MOBILES\n#0\n\n';

    let section = '#MOBILES\n';
    mobCards.forEach(mob => {
        section += `#${mob.querySelector('.mob-vnum').value}\n`;
        section += `${mob.querySelector('.mob-keywords').value}~\n`;
        section += `${mob.querySelector('.mob-short-desc').value}~\n`;
        section += `${mob.querySelector('.mob-long-desc').value.replace(/\n/g, ' ')}~\n`;
        section += `${mob.querySelector('.mob-look-desc').value.replace(/\n/g, ' ')}~\n`;
        section += `${mob.querySelector('.mob-race').value}~\n`;

        const actFlags = getFlagString(mob, 'fieldset[legend="Act Flags"] input[type="checkbox"]');
        const afectFlags = getFlagString(mob, 'fieldset[legend="Afect Flags"] input[type="checkbox"]');
        section += `${actFlags} ${afectFlags} ${mob.querySelector('.mob-alignment').value} ${mob.querySelector('.mob-group').value}\n`;

        section += `${mob.querySelector('.mob-level').value} ${mob.querySelector('.mob-hitroll').value} `;
        section += `${mob.querySelector('.mob-hp-dice-num').value}d${mob.querySelector('.mob-hp-dice-sides').value}+${mob.querySelector('.mob-hp-dice-bonus').value} `;
        section += `${mob.querySelector('.mob-mana-dice-num').value}d${mob.querySelector('.mob-mana-dice-sides').value}+${mob.querySelector('.mob-mana-dice-bonus').value} `;
        section += `${mob.querySelector('.mob-dam-dice-num').value}d${mob.querySelector('.mob-dam-dice-sides').value}+${mob.querySelector('.mob-dam-dice-bonus').value} `;
        section += `${mob.querySelector('.mob-dam-type').value}\n`;

        section += `${mob.querySelector('.mob-ac-pierce').value} ${mob.querySelector('.mob-ac-bash').value} ${mob.querySelector('.mob-ac-slash').value} ${mob.querySelector('.mob-ac-exotic').value} ${mob.querySelector('.mob-ac-magic').value}\n`;

        const offFlags = getFlagString(mob, 'fieldset[legend="Ofensivo Flags"] input[type="checkbox"]');
        const immFlags = getFlagString(mob, 'fieldset[legend="Inmunidades"] input[type="checkbox"]');
        const resFlags = getFlagString(mob, 'fieldset[legend="Resistencias"] input[type="checkbox"]');
        const vulnFlags = getFlagString(mob, 'fieldset[legend="Vulnerabilidades"] input[type="checkbox"]');
        section += `${offFlags} ${immFlags} ${resFlags} ${vulnFlags}\n`;

        section += `${mob.querySelector('.mob-start-pos').value} ${mob.querySelector('.mob-default-pos').value} ${mob.querySelector('.mob-sex').value} ${mob.querySelector('.mob-gold').value}\n`;

        const formFlags = getFlagString(mob, 'fieldset[legend="Forma"] input[type="checkbox"]');
        const partFlags = getFlagString(mob, 'fieldset[legend="Partes"] input[type="checkbox"]');
        section += `${formFlags} ${partFlags} ${mob.querySelector('.mob-size').value} ${mob.querySelector('.mob-material').value}\n`;
    });
    section += '#0\n\n';
    return section;
}