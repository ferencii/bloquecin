import { setupDynamicSection, getFlagString } from './utils.js';
import { gameData } from './config.js';

function updateObjectValuesUI(objectCard) {
    const type = objectCard.querySelector('.obj-type').value;
    const labels = gameData.objectValueLabels[type] || gameData.objectValueLabels['default'];
    for (let i = 0; i < 5; i++) {
        const labelElement = objectCard.querySelector(`label[data-label-for="v${i}"]`);
        if (labelElement) labelElement.textContent = labels[i] + ':';
    }
}

function populateObjectTypeSelect(objectCard) {
    const selectElement = objectCard.querySelector('.obj-type');
    if (selectElement) {
        // Clear existing options (if any)
        selectElement.innerHTML = '';
        gameData.objectTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            selectElement.appendChild(option);
        });
        // Trigger UI update for V0-V4 labels after populating
        updateObjectValuesUI(objectCard);
    }
}

export function setupObjectsSection(vnumRangeCheckFunction, vnumSelector, vnumDisplaySelector, nameInputSelector, nameDisplaySelector) {
    setupDynamicSection('add-object-btn', 'objects-container', 'object-template', '.object-card', vnumRangeCheckFunction, vnumSelector, vnumDisplaySelector, nameInputSelector, nameDisplaySelector, populateObjectTypeSelect);

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
        const extraFlags = getFlagString(obj, 'Flags');
        const wearFlags = getFlagString(obj, 'Lugar de Vestir');
        section += `${type} ${extraFlags} ${wearFlags}\n`;

        section += `${obj.querySelector('.obj-v0').value} ${obj.querySelector('.obj-v1').value} ${obj.querySelector('.obj-v2').value} ${obj.querySelector('.obj-v3').value} ${obj.querySelector('.obj-v4').value}\n`;
        const isDrinkContainer = obj.querySelector('.obj-is-drink-container').checked ? 'G' : 'P';
        section += `${obj.querySelector('.obj-level').value} ${obj.querySelector('.obj-weight').value} ${obj.querySelector('.obj-price').value} ${isDrinkContainer}\n`;

        const setIdInput = obj.querySelector('.obj-set-id');
        if (setIdInput && setIdInput.value.trim() !== '') {
            section += `S ${setIdInput.value.trim()}\n`;
        }

        obj.querySelectorAll('.applies-container .sub-item-row').forEach(row => {
            const location = row.querySelector('.apply-location').value;
            const modifier = row.querySelector('.apply-modifier').value;
            if (location && modifier) {
                section += `A\n`;
                section += `${location} ${modifier}\n`;
            }
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
