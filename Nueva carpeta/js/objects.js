import { setupDynamicSection, getFlagString } from './utils.js';
import { gameData } from './config.js';
import { refrescarOpcionesResets } from './resets.js';
import { actualizarPropietariosProgs } from './progs.js';

export function updateObjectValuesUI(objectCard) {
    const type = objectCard.querySelector('.obj-type').value;
    const labels = gameData.objectValueLabels[type] || gameData.objectValueLabels['default'];
    const optionsConfig = (gameData.objectValueOptions && gameData.objectValueOptions[type]) || {};

    for (let i = 0; i < 5; i++) {
        const fieldSelector = `.obj-v${i}`;
        let field = objectCard.querySelector(fieldSelector);
        const vConfig = optionsConfig[`v${i}`];
        const vOptions = Array.isArray(vConfig) ? vConfig : vConfig?.options;

        // Si previamente era fieldset pero ya no corresponde, restaurar el campo básico
        if (field && field.tagName.toLowerCase() === 'fieldset' && !(vConfig && vConfig.type === 'checkbox')) {
            const grupo = document.createElement('div');
            grupo.className = 'form-group';
            const etiqueta = document.createElement('label');
            etiqueta.dataset.labelFor = `v${i}`;
            etiqueta.textContent = labels[i] + ':';
            const input = document.createElement('input');
            input.type = 'text';
            input.className = fieldSelector.slice(1);
            input.value = '0';
            grupo.appendChild(etiqueta);
            grupo.appendChild(input);
            field.replaceWith(grupo);
            field = input;
        }

        // Campo configurado como checkboxes
        if (vConfig && vConfig.type === 'checkbox') {
            const fieldset = document.createElement('fieldset');
            fieldset.className = fieldSelector.slice(1);
            const legend = document.createElement('legend');
            legend.textContent = labels[i];
            fieldset.appendChild(legend);
            (vOptions || []).forEach(opt => {
                const etiqueta = document.createElement('label');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = typeof opt === 'object' ? opt.value : opt;
                etiqueta.appendChild(checkbox);
                etiqueta.append(` ${typeof opt === 'object' ? opt.label : opt}`);
                fieldset.appendChild(etiqueta);
            });
            if (field) field.parentElement.replaceWith(fieldset);
            else objectCard.querySelector('.v-values-container').appendChild(fieldset);
            continue;
        }

        const labelElement = objectCard.querySelector(`label[data-label-for="v${i}"]`);
        if (labelElement) labelElement.textContent = labels[i] + ':';

        const currentValue = field ? field.value : '0';

        if (vOptions && vOptions.length > 0) {
            let select;
            if (!field || field.tagName.toLowerCase() !== 'select') {
                select = document.createElement('select');
                select.className = fieldSelector.slice(1);
                if (field) field.replaceWith(select);
                field = select;
            } else {
                select = field;
            }

            select.innerHTML = '';
            vOptions.forEach((opt, idx) => {
                const optionEl = document.createElement('option');
                if (typeof opt === 'object') {
                    optionEl.value = opt.value;
                    optionEl.textContent = opt.label;
                } else {
                    optionEl.value = opt;
                    optionEl.textContent = opt;
                }
                optionEl.dataset.index = idx;
                select.appendChild(optionEl);
            });

            const values = vOptions.map(opt => typeof opt === 'object' ? opt.value : opt);
            if (values.includes(currentValue)) {
                select.value = currentValue;
            } else {
                select.selectedIndex = 0;
            }
        } else {
            if (!field || field.tagName.toLowerCase() !== 'input') {
                const input = document.createElement('input');
                input.type = 'text';
                input.className = fieldSelector.slice(1);
                input.value = '0';
                if (field) field.replaceWith(input);
                field = input;
            }
            if (field.value === '' || field.value === undefined) field.value = '0';
        }
    }
}

export function populateObjectTypeSelect(objectCard) {
    const selectElement = objectCard.querySelector('.obj-type');
    if (selectElement) {
        // Clear existing options (if any) y poblar con etiquetas en español.
        selectElement.innerHTML = '';
        gameData.objectTypes.forEach(type => {
            const option = document.createElement('option');
            if (typeof type === 'object') {
                option.value = type.value;
                option.textContent = type.label;
            } else {
                option.value = type;
                option.textContent = type;
            }
            selectElement.appendChild(option);
        });

        // Set default values for V0-V4 to 0
        for (let i = 0; i < 5; i++) {
            const vInput = objectCard.querySelector(`.obj-v${i}`);
            if (vInput) vInput.value = '0';
        }

        // Trigger UI update for V0-V4 labels after populating
        updateObjectValuesUI(objectCard);
    }
}

export function populateAffectBitSelect(row) {
    const type = row.querySelector('.affect-type').value;
    const select = row.querySelector('.affect-bits');
    const options = gameData.affectBitOptions[type] || [];
    select.innerHTML = '';
    options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = `${opt.value} - ${opt.label}`;
        select.appendChild(option);
    });
    if (options.length > 0) select.selectedIndex = 0;
}

// Configura los eventos de colapso y actualización de encabezados para una tarjeta de objeto
export function inicializarTarjetaObjeto(cardElement) {
    const header = cardElement.querySelector('.collapsible-header');
    const content = cardElement.querySelector('.collapsible-content');
    if (header && content && !header.dataset.colapsado) {
        header.addEventListener('click', () => {
            content.classList.toggle('collapsed');
        });
        header.dataset.colapsado = 'true';
    }

    const vnumInput = cardElement.querySelector('.obj-vnum');
    const vnumDisplay = cardElement.querySelector('.obj-vnum-display');
    if (vnumInput && vnumDisplay && !vnumInput.dataset.vnumEscucha) {
        vnumInput.addEventListener('input', () => {
            vnumDisplay.textContent = vnumInput.value;
        });
        vnumInput.dataset.vnumEscucha = 'true';
    }

    const nameInput = cardElement.querySelector('.obj-keywords');
    const nameDisplay = cardElement.querySelector('.obj-name-display');
    if (nameInput && nameDisplay && !nameInput.dataset.nombreEscucha) {
        nameInput.addEventListener('input', () => {
            nameDisplay.textContent = nameInput.value;
        });
        nameInput.dataset.nombreEscucha = 'true';
        nameInput.dispatchEvent(new Event('input'));
    }

    const triggersInput = cardElement.querySelector('.obj-triggers');
    if (triggersInput && !triggersInput.dataset.trigEscucha) {
        triggersInput.addEventListener('input', actualizarPropietariosProgs);
        triggersInput.dataset.trigEscucha = 'true';
    }
}

export function setupObjectsSection(vnumRangeCheckFunction, vnumSelector, vnumDisplaySelector, nameInputSelector, nameDisplaySelector) {
    setupDynamicSection('add-object-btn', 'objects-container', 'object-template', '.object-card', vnumRangeCheckFunction, vnumSelector, vnumDisplaySelector, nameInputSelector, nameDisplaySelector, (card) => {
        populateObjectTypeSelect(card);
        inicializarTarjetaObjeto(card);
        refrescarOpcionesResets();
    });

    // Add event listener for type change on newly added cards
    const container = document.getElementById('objects-container');
    container.addEventListener('change', e => {
        if (e.target.classList.contains('obj-type')) {
            updateObjectValuesUI(e.target.closest('.object-card'));
        } else if (e.target.classList.contains('affect-type')) {
            populateAffectBitSelect(e.target.closest('.sub-item-row'));
        }
    });

    container.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('remove-btn')) {
            target.closest('.object-card').remove();
            actualizarPropietariosProgs();
        }
        else if (target.classList.contains('add-apply-btn')) target.previousElementSibling.appendChild(document.getElementById('apply-template').content.cloneNode(true));
        else if (target.classList.contains('add-affect-btn')) {
            const container = target.previousElementSibling;
            const fragment = document.getElementById('affect-template').content.cloneNode(true);
            container.appendChild(fragment);
            populateAffectBitSelect(container.lastElementChild);
        }
        else if (target.classList.contains('add-extra-btn')) target.previousElementSibling.appendChild(document.getElementById('extra-desc-template').content.cloneNode(true));
        else if (target.classList.contains('remove-sub-btn')) target.parentElement.remove();
    });

    container.querySelectorAll('.object-card').forEach(card => {
        inicializarTarjetaObjeto(card);
    });
}

export function generateObjectsSection() {
    const objectCards = document.querySelectorAll('#objects-container .object-card');
    if (objectCards.length === 0) return '#OBJECTS - 0\n#0\n\n';

    let section = `#OBJECTS - ${objectCards.length}\n`;
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

        const vValores = [];
        for (let i = 0; i < 5; i++) {
            const vConfig = gameData.objectValueOptions[type]?.[`v${i}`];
            if (vConfig && vConfig.type === 'checkbox') {
                const legend = gameData.objectValueLabels[type]?.[i] || `V${i}`;
                vValores.push(getFlagString(obj, legend));
            } else {
                vValores.push(obj.querySelector(`.obj-v${i}`).value);
            }
        }
        section += `${vValores.join(' ')}\n`;
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

        const triggersText = obj.querySelector('.obj-triggers').value.trim();
        if (triggersText) {
            triggersText.split('\n').forEach(linea => {
                if (linea.trim() !== '') section += `O ${linea.trim()}~\n`;
            });
        }

        section += '\n';
    });
    section += '#0\n\n';
    return section;
}
