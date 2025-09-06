import { setupDynamicSection, getFlagString } from './utils.js';
import { gameData } from './config.js';
import { refrescarOpcionesResets } from './resets.js';
import { actualizarPropietariosProgs } from './progs.js';

// autoAjustar indica si se deben calcular estadísticas al inicializar
export function inicializarTarjetaMob(cardElement, autoAjustar = true) {
    const levelInput = cardElement.querySelector('.mob-level');
    const hitrollInput = cardElement.querySelector('.mob-hitroll');
    const hpDiceNumInput = cardElement.querySelector('.mob-hp-dice-num');
    const hpDiceSidesInput = cardElement.querySelector('.mob-hp-dice-sides');
    const hpDiceBonusInput = cardElement.querySelector('.mob-hp-dice-bonus');
    const manaDiceNumInput = cardElement.querySelector('.mob-mana-dice-num');
    const manaDiceSidesInput = cardElement.querySelector('.mob-mana-dice-sides');
    const manaDiceBonusInput = cardElement.querySelector('.mob-mana-dice-bonus');
    const damDiceNumInput = cardElement.querySelector('.mob-dam-dice-num');
    const damDiceSidesInput = cardElement.querySelector('.mob-dam-dice-sides');
    const damDiceBonusInput = cardElement.querySelector('.mob-dam-dice-bonus');
    const acPierceInput = cardElement.querySelector('.mob-ac-pierce');
    const acBashInput = cardElement.querySelector('.mob-ac-bash');
    const acSlashInput = cardElement.querySelector('.mob-ac-slash');
    const acMagicInput = cardElement.querySelector('.mob-ac-magic');

    const updateMobStats = () => {
        const level = parseInt(levelInput.value);
        if (isNaN(level)) {
            hitrollInput.value = '';
            hpDiceNumInput.value = '';
            hpDiceSidesInput.value = '';
            hpDiceBonusInput.value = '';
            manaDiceNumInput.value = '';
            manaDiceSidesInput.value = '';
            manaDiceBonusInput.value = '';
            damDiceNumInput.value = '';
            damDiceSidesInput.value = '';
            damDiceBonusInput.value = '';
            acPierceInput.value = '';
            acBashInput.value = '';
            acSlashInput.value = '';
            acMagicInput.value = '';
            return;
        }

        let recommendedHitroll = 0;
        for (const rec of gameData.hitrollRecommendations) {
            if (level >= rec.levelStart && level <= rec.levelEnd) {
                const levelRatio = (level - rec.levelStart) / (rec.levelEnd - rec.levelStart);
                recommendedHitroll = Math.round(rec.hitrollMin + levelRatio * (rec.hitrollMax - rec.hitrollMin));
                break;
            } else if (level < rec.levelStart) {
                recommendedHitroll = rec.hitrollMin;
                break;
            } else if (level > gameData.hitrollRecommendations[gameData.hitrollRecommendations.length - 1].levelEnd) {
                recommendedHitroll = gameData.hitrollRecommendations[gameData.hitrollRecommendations.length - 1].hitrollMax;
                break;
            }
        }
        hitrollInput.value = recommendedHitroll;

        let mobStats = null;
        for (let i = gameData.mobStatsRecommendations.length - 1; i >= 0; i--) {
            if (level >= gameData.mobStatsRecommendations[i].level) {
                mobStats = gameData.mobStatsRecommendations[i];
                break;
            }
        }

        if (mobStats) {
            hpDiceNumInput.value = mobStats.hpManaDice.num;
            hpDiceSidesInput.value = mobStats.hpManaDice.sides;
            hpDiceBonusInput.value = mobStats.hpManaDice.bonus;

            manaDiceNumInput.value = 1;
            manaDiceSidesInput.value = 10;
            manaDiceBonusInput.value = 100 * level;

            damDiceNumInput.value = mobStats.damageDice.num;
            damDiceSidesInput.value = mobStats.damageDice.sides;
            damDiceBonusInput.value = mobStats.damageDice.bonus;

            acPierceInput.value = mobStats.armor;
            acBashInput.value = mobStats.armor;
            acSlashInput.value = mobStats.armor;

            const ac = parseInt(mobStats.armor);
            if (!isNaN(ac)) {
                acMagicInput.value = Math.round(((ac - 10) / 3) + 10);
            }
        } else {
            const firstStats = gameData.mobStatsRecommendations[0];
            hpDiceNumInput.value = firstStats.hpManaDice.num;
            hpDiceSidesInput.value = firstStats.hpManaDice.sides;
            hpDiceBonusInput.value = firstStats.hpManaDice.bonus;

            manaDiceNumInput.value = firstStats.hpManaDice.num;
            manaDiceSidesInput.value = firstStats.hpManaDice.sides;
            manaDiceBonusInput.value = firstStats.hpManaDice.bonus;

            damDiceNumInput.value = firstStats.damageDice.num;
            damDiceSidesInput.value = firstStats.damageDice.sides;
            damDiceBonusInput.value = firstStats.damageDice.bonus;

            acPierceInput.value = firstStats.armor;
            acBashInput.value = firstStats.armor;
            acSlashInput.value = firstStats.armor;

            const ac = parseInt(firstStats.armor);
            if (!isNaN(ac)) {
                acMagicInput.value = Math.round(((ac - 10) / 3) + 10);
            }
        }
    };

    if (levelInput) {
        levelInput.addEventListener('input', updateMobStats);
        if (autoAjustar) {
            updateMobStats();
        }
    }

    const header = cardElement.querySelector('.collapsible-header');
    const content = cardElement.querySelector('.collapsible-content');
    if (header && content && !header.dataset.colapsado) {
        header.addEventListener('click', () => {
            content.classList.toggle('collapsed');
        });
        header.dataset.colapsado = 'true';
    }

    const vnumInput = cardElement.querySelector('.mob-vnum');
    const vnumDisplay = cardElement.querySelector('.mob-vnum-display');
    if (vnumInput && vnumDisplay && !vnumInput.dataset.vnumEscucha) {
        vnumInput.addEventListener('input', () => {
            vnumDisplay.textContent = vnumInput.value;
        });
        vnumInput.dataset.vnumEscucha = 'true';
    }

    const nameInput = cardElement.querySelector('.mob-short-desc');
    const nameDisplay = cardElement.querySelector('.mob-name-display');
    if (nameInput && nameDisplay && !nameInput.dataset.nombreEscucha) {
        nameInput.addEventListener('input', () => {
            nameDisplay.textContent = nameInput.value;
        });
        nameInput.dataset.nombreEscucha = 'true';
    }

    const triggersInput = cardElement.querySelector('.mob-triggers');
    if (triggersInput && !triggersInput.dataset.trigEscucha) {
        triggersInput.addEventListener('input', actualizarPropietariosProgs);
        triggersInput.dataset.trigEscucha = 'true';
    }
}

export function setupMobilesSection(vnumRangeCheckFunction, vnumSelector, vnumDisplaySelector, nameInputSelector, nameDisplaySelector) {
    const mobContainer = document.getElementById('mobiles-container');

    setupDynamicSection('add-mob-btn', 'mobiles-container', 'mob-template', '.mob-card', vnumRangeCheckFunction, vnumSelector, vnumDisplaySelector, nameInputSelector, nameDisplaySelector, (cardElement) => {
        inicializarTarjetaMob(cardElement);
        refrescarOpcionesResets();
    });

    mobContainer.querySelectorAll('.mob-card').forEach(card => {
        inicializarTarjetaMob(card);
    });

    mobContainer.addEventListener('click', e => {
        if (e.target.classList.contains('remove-btn')) {
            actualizarPropietariosProgs();
        }
    });
}

export function generateMobilesSection() {
    const mobCards = document.querySelectorAll('#mobiles-container .mob-card');
    if (mobCards.length === 0) return '#MOBILES - 0\n#0\n\n';

    let section = `#MOBILES - ${mobCards.length}\n`;
    mobCards.forEach(mob => {
        section += `#${mob.querySelector('.mob-vnum').value}\n`;
        section += `${mob.querySelector('.mob-keywords').value}~\n`;
        section += `${mob.querySelector('.mob-short-desc').value}~\n`;
        section += `${mob.querySelector('.mob-long-desc').value.replace(/\n/g, ' ')}\n~\n`;
        section += `${mob.querySelector('.mob-look-desc').value.replace(/\n/g, ' ')}\n~\n`;
        section += `${mob.querySelector('.mob-race').value}~\n`;

        //const actFlags = getFlagString(mob, 'fieldset[legend="Act Flags"] input[type="checkbox"]');
        //const afectFlags = getFlagString(mob, 'fieldset[legend="Afect Flags"] input[type="checkbox"]');
        const actFlags = getFlagString(mob, 'Act Flags');
        const afectFlags = getFlagString(mob, 'Afect Flags');
        section += `${actFlags} ${afectFlags} ${mob.querySelector('.mob-alignment').value} ${mob.querySelector('.mob-group').value}\n`;

        section += `${mob.querySelector('.mob-level').value} ${mob.querySelector('.mob-hitroll').value} `;
        section += `${mob.querySelector('.mob-hp-dice-num').value}d${mob.querySelector('.mob-hp-dice-sides').value}+${mob.querySelector('.mob-hp-dice-bonus').value} `;
        section += `${mob.querySelector('.mob-mana-dice-num').value}d${mob.querySelector('.mob-mana-dice-sides').value}+${mob.querySelector('.mob-mana-dice-bonus').value} `;
        section += `${mob.querySelector('.mob-dam-dice-num').value}d${mob.querySelector('.mob-dam-dice-sides').value}+${mob.querySelector('.mob-dam-dice-bonus').value} `;
        section += `${mob.querySelector('.mob-dam-type').value}\n`;

        section += `${mob.querySelector('.mob-ac-pierce').value} ${mob.querySelector('.mob-ac-bash').value} ${mob.querySelector('.mob-ac-slash').value} ${mob.querySelector('.mob-ac-magic').value}\n`;

        //const offFlags = getFlagString(mob, 'fieldset[legend="Ofensivo Flags"] input[type="checkbox"]');
        //const immFlags = getFlagString(mob, 'fieldset[legend="Inmunidades"] input[type="checkbox"]');
        //const resFlags = getFlagString(mob, 'fieldset[legend="Resistencias"] input[type="checkbox"]');
        //const vulnFlags = getFlagString(mob, 'fieldset[legend="Vulnerabilidades"] input[type="checkbox"]');
        const offFlags = getFlagString(mob, 'Ofensivo Flags');
        const immFlags = getFlagString(mob, 'Inmunidades');
        const resFlags = getFlagString(mob, 'Resistencias');
        const vulnFlags = getFlagString(mob, 'Vulnerabilidades');
        section += `${offFlags} ${immFlags} ${resFlags} ${vulnFlags}\n`;

        section += `${mob.querySelector('.mob-start-pos').value} ${mob.querySelector('.mob-default-pos').value} ${mob.querySelector('.mob-sex').value} ${mob.querySelector('.mob-gold').value}\n`;

        const formFlags = getFlagString(mob, 'Forma');
        const partFlags = getFlagString(mob, 'Partes');
        section += `${formFlags} ${partFlags} ${mob.querySelector('.mob-size').value} ${mob.querySelector('.mob-material').value}\n`;

        const triggersText = mob.querySelector('.mob-triggers').value.trim();
        if (triggersText) {
            triggersText.split('\n').forEach(linea => {
                if (linea.trim() !== '') section += `M ${linea.trim()}~\n`;
            });
        }
    });
    section += '#0\n\n';
    return section;
}