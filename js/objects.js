import { setupDynamicSection, getFlagString } from './utils.js';

const OBJECT_VALUE_LABELS = {
    'weapon': ['Weap Type', 'Num Dice', 'Side Dices', 'Dam Type', 'Weap Flags'],
    'proteccion': ['Pierce', 'Bash', 'Slash', 'Exotic', 'Bulk'],
    'light': ['0', '0', 'Light Dur', '0', '0'],
    'money': ['Silver', 'Gold', '0', '0', '0'],
    'drink_container': ['Max Capac', 'Cur Capac', 'Liquid', '0/A=Pois', '0'],
    'fountain': ['-1', '-1', 'Liquid', '0', '0'],
    'wand': ['Spel Lv', 'Max Charg', 'Cur Charg', 'Spell', '0'],
    'staff': ['Spel Lv', 'Max Charg', 'Cur Charg', 'Spell', '0'],
    'potion': ['Spel Lv', 'Spell', 'Spell', 'Spell', 'Spell'],
    'scroll': ['Spel Lv', 'Spell', 'Spell', 'Spell', 'Spell'],
    'pill': ['Spel Lv', 'Spell', 'Spell', 'Spell', 'Spell'],
    'container': ['Max Wei', 'Flags', 'Key Vnum', 'Obj Max', 'Wei Mult'],
    'food': ['Hours Full', 'Hour Hung', '0', '0/A=Pois', '0'],
    'food_buff': ['Duracion', 'Cantidad', 'Apply Code', 'A/I/R/V', 'Flags/A=Pois'],
    'portal': ['Cargas', 'Exit Flags', 'Gate Flags', 'Dest Vnum', '0'],
    'furniture': ['Gente', 'Total Wei', 'Fur Flags', 'Heal Bon', 'Mana Bon'],
    'emblema': ['Clan ID', 'Rango', '0', '0', '0'],
    'default': ['Valor 0', 'Valor 1', 'Valor 2', 'Valor 3', 'Valor 4']
};

function updateObjectValuesUI(objectCard) {
    const type = objectCard.querySelector('.obj-type').value;
    const labels = OBJECT_VALUE_LABELS[type] || OBJECT_VALUE_LABELS['default'];
    for (let i = 0; i < 5; i++) {
        const labelElement = objectCard.querySelector(`label[data-label-for="v${i}"]`);
        if (labelElement) labelElement.textContent = labels[i] + ':';
    }
}

export function setupObjectsSection(vnumRangeCheckFunction, vnumSelector, vnumDisplaySelector, nameInputSelector, nameDisplaySelector) {
    setupDynamicSection('add-object-btn', 'objects-container', 'object-template', '.object-card', vnumRangeCheckFunction, vnumSelector, vnumDisplaySelector, nameInputSelector, nameDisplaySelector);

    // Add event listener for type change on newly added cards
    const container = document.getElementById('objects-container');
    container.addEventListener('change', e => {
        if (e.target.classList.contains('obj-type')) {
            updateObjectValuesUI(e.target.closest('.object-card'));
        }
    });

    container.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('remove-btn')) target.closest('.object-card').remove();
        else if (target.classList.contains('add-apply-btn')) target.previousElementSibling.appendChild(document.getElementById('apply-template').content.cloneNode(true));
        else if (target.classList.contains('add-affect-btn')) target.previousElementSibling.appendChild(document.getElementById('affect-template').content.cloneNode(true));
        else if (target.classList.contains('add-extra-btn')) target.previousElementSibling.appendChild(document.getElementById('extra-desc-template').content.cloneNode(true));
        else if (target.classList.contains('remove-sub-btn')) target.parentElement.remove();
    });
}

export function generateObjectsSection() {
    const objectCards = document.querySelectorAll('#objects-container .object-card');
    if (objectCards.length === 0) return '#OBJECTS\n#0\n\n';

    let section = '#OBJECTS\n';
    objectCards.forEach(obj => {
        section += `#${obj.querySelector('.obj-vnum').value}\n`;
        section += `${obj.querySelector('.obj-keywords').value}~\n`;
        section += `${obj.querySelector('.obj-short-desc').value}~\n`;
        section += `${obj.querySelector('.obj-long-desc').value.replace(/\n/g, ' ')}~\n`;
        section += `${obj.querySelector('.obj-material').value}~\n`;
        
        const type = obj.querySelector('.obj-type').value;
        const extraFlags = getFlagString(obj, 'fieldset[legend="Flags"] input[type="checkbox"]');
        const wearFlags = getFlagString(obj, 'fieldset[legend="Lugar de Vestir"] input[type="checkbox"]');
        section += `${type} ${extraFlags} ${wearFlags}\n`;

        section += `${obj.querySelector('.obj-v0').value || 0} ${obj.querySelector('.obj-v1').value || 0} ${obj.querySelector('.obj-v2').value || 0} ${obj.querySelector('.obj-v3').value || 0} ${obj.querySelector('.obj-v4').value || 0}\n`;
        section += `${obj.querySelector('.obj-level').value} ${obj.querySelector('.obj-weight').value} ${obj.querySelector('.obj-price').value}\n`;

        obj.querySelectorAll('.applies-container .sub-item-row').forEach(row => {
            const location = row.querySelector('.apply-location').value;
            const modifier = row.querySelector('.apply-modifier').value;
            if (location && modifier) section += `A ${location} ${modifier}\n`;
        });

        obj.querySelectorAll('.affects-container .sub-item-row').forEach(row => {
            const type = row.querySelector('.affect-type').value;
            const bits = row.querySelector('.affect-bits').value;
            if (bits) section += `F ${type} 0 0 ${bits}\n`;
        });

        obj.querySelectorAll('.extras-container .sub-item-row').forEach(row => {
            const keyword = row.querySelector('.extra-keyword').value;
            const desc = row.querySelector('.extra-desc').value;
            if (keyword && desc) section += `E\n${keyword}~\n${desc}~\n`;
        });
        section += '\n';
    });
    section += '#0\n\n';
    return section;
}
