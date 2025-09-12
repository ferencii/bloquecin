import { gameData } from './config.js';

function obtenerOpcionesDesdeTarjetas(selectorTarjeta, selectorVnum, selectorNombre) {
    return Array.from(document.querySelectorAll(selectorTarjeta)).map(card => {
        const vnum = card.querySelector(selectorVnum)?.value || '';
        const nombre = card.querySelector(selectorNombre)?.textContent || '';
        return { value: vnum, label: `${vnum} - ${nombre}` };
    });
}

function poblarSelect(select, opciones) {
    const valorPrevio = select.value;
    select.innerHTML = '';
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = '-- selecciona --';
    select.appendChild(placeholder);
    opciones.forEach(opt => {
        const optionEl = document.createElement('option');
        optionEl.value = opt.value;
        optionEl.textContent = opt.label;
        select.appendChild(optionEl);
    });
    if (valorPrevio) select.value = valorPrevio;
}

export function refrescarOpcionesResets() {
    const opcionesMobs = obtenerOpcionesDesdeTarjetas('.mob-card', '.mob-vnum', '.mob-name-display');
    const opcionesObjs = obtenerOpcionesDesdeTarjetas('.object-card', '.obj-vnum', '.obj-name-display');
    const opcionesRooms = obtenerOpcionesDesdeTarjetas('.room-card', '.room-vnum', '.room-name-display');

    document.querySelectorAll('.reset-mob-vnum').forEach(select => poblarSelect(select, opcionesMobs));
    document.querySelectorAll('.reset-obj-vnum').forEach(select => poblarSelect(select, opcionesObjs));
    document.querySelectorAll('.reset-content-vnum').forEach(select => poblarSelect(select, opcionesObjs));
    document.querySelectorAll('.reset-container-vnum').forEach(select => poblarSelect(select, opcionesObjs));
    document.querySelectorAll('.reset-room-vnum').forEach(select => poblarSelect(select, opcionesRooms));
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.reset-row:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) return { offset: offset, element: child };
        else return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function addResetRow(type) {
    const list = document.getElementById('resets-list');
    const rowClone = document.getElementById('reset-row-template').content.cloneNode(true);
    const row = rowClone.querySelector('.reset-row');
    row.querySelector('.reset-type-indicator').textContent = type;
    row.dataset.type = type;

    const specificTemplate = document.getElementById(`reset-${type.toLowerCase()}-template`).content.cloneNode(true);
    row.querySelector('.reset-inputs').replaceWith(specificTemplate);

    switch (type) {
        case 'E':
            poblarSelect(row.querySelector('.reset-wear-location'), gameData.resetWearLocations);
            break;
        case 'D':
            poblarSelect(row.querySelector('.reset-direction'), gameData.resetDirections);
            poblarSelect(row.querySelector('.reset-state'), gameData.resetDoorStates);
            break;
        case 'R':
            poblarSelect(row.querySelector('.reset-maze-class'), gameData.resetMazeClasses);
            break;
    }

    list.appendChild(rowClone);
    refrescarOpcionesResets();
    if (window.actualizarResumenYContadores) window.actualizarResumenYContadores();
}

export function setupResetsSection() {
    const toolbar = document.getElementById('resets-toolbar');
    const list = document.getElementById('resets-list');
    if (!toolbar) return;

    toolbar.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-reset-btn')) addResetRow(e.target.dataset.type);
    });

    list.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-sub-btn')) {
            e.target.closest('.reset-row').remove();
            refrescarOpcionesResets();
            if (window.actualizarResumenYContadores) window.actualizarResumenYContadores();
        }
    });

    let draggedItem = null;
    list.addEventListener('dragstart', (e) => {
        draggedItem = e.target;
        setTimeout(() => e.target.style.opacity = '0.5', 0);
    });
    list.addEventListener('dragend', (e) => {
        setTimeout(() => draggedItem.style.opacity = '', 0);
    });
    list.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(list, e.clientY);
        if (afterElement == null) list.appendChild(draggedItem);
        else list.insertBefore(draggedItem, afterElement);
    });
}

export function generateResetsSection() {
    const resetRows = document.querySelectorAll('#resets-list .reset-row');
    if (resetRows.length === 0) return '#RESETS\nS\n\n';
    let section = '#RESETS\n';
    resetRows.forEach(row => {
        const type = row.dataset.type;
        const userComment = row.querySelector('.reset-comment').value.trim();
        switch (type) {
            case 'M': {
                const vnumMob = row.querySelector('.reset-mob-vnum').value || 0;
                const comment = userComment || `Mob ${vnumMob}`;
                section += `M 0 ${vnumMob} ${row.querySelector('.reset-limit-total').value || 0} ${row.querySelector('.reset-room-vnum').value || 0} ${row.querySelector('.reset-limit-local').value || 0} * ${comment}\n`;
                break;
            }
            case 'O': {
                const vnumObj = row.querySelector('.reset-obj-vnum').value || 0;
                const comment = userComment || `Obj ${vnumObj}`;
                section += `O 0 ${vnumObj} ${row.querySelector('.reset-limit').value || 0} ${row.querySelector('.reset-room-vnum').value || 0} * ${comment}\n`;
                break;
            }
            case 'P': {
                const comment = userComment || 'Obj in Obj';
                section += `P 1 ${row.querySelector('.reset-content-vnum').value || 0} ${row.querySelector('.reset-limit').value || 0} ${row.querySelector('.reset-container-vnum').value || 0} ${row.querySelector('.reset-limit-local').value || 0} * ${comment}\n`;
                break;
            }
            case 'G': {
                const vnumObj = row.querySelector('.reset-obj-vnum').value || 0;
                const comment = userComment || `Dar ${vnumObj}`;
                section += `G 1 ${vnumObj} ${row.querySelector('.reset-limit').value || 0} * ${comment}\n`;
                break;
            }
            case 'E': {
                const vnumObj = row.querySelector('.reset-obj-vnum').value || 0;
                const comment = userComment || `Equipar ${vnumObj}`;
                section += `E 1 ${vnumObj} ${row.querySelector('.reset-limit').value || 0} ${row.querySelector('.reset-wear-location').value || 0} * ${comment}\n`;
                break;
            }
            case 'D': {
                const comment = userComment || 'Puerta';
                section += `D 0 ${row.querySelector('.reset-room-vnum').value || 0} ${row.querySelector('.reset-direction').value || 0} ${row.querySelector('.reset-state').value || 0} * ${comment}\n`;
                break;
            }
            case 'R': {
                const comment = userComment || 'Random Exits';
                section += `R 0 ${row.querySelector('.reset-room-vnum').value || 0} ${row.querySelector('.reset-maze-class').value || 0} * ${comment}\n`;
                break;
            }
        }
    });
    section += 'S\n\n';
    return section;
}

