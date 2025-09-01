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

    const inputs = {
        'M': `<span>Mob Vnum:</span><input type="number" data-id="vnum"> <span>Límite Total:</span><input type="number" data-id="total_limit"> <span>Room Vnum:</span><input type="number" data-id="room_vnum"> <span>Límite Local:</span><input type="number" data-id="local_limit">`,
        'O': `<span>Obj Vnum:</span><input type="number" data-id="vnum"> <span>Límite:</span><input type="number" data-id="limit"> <span>Room Vnum:</span><input type="number" data-id="room_vnum">`,
        'P': `<span>Obj Contenido Vnum:</span><input type="number" data-id="vnum"> <span>Límite:</span><input type="number" data-id="limit"> <span>Contenedor Vnum:</span><input type="number" data-id="container_vnum"> <span>Límite Local:</span><input type="number" data-id="local_limit">`,
        'G': `<span>Obj Vnum:</span><input type="number" data-id="vnum"> <span>Límite:</span><input type="number" data-id="limit">`,
        'E': `<span>Obj Vnum:</span><input type="number" data-id="vnum"> <span>Límite:</span><input type="number" data-id="limit"> <span>Lugar (código):</span><input type="number" data-id="wear_loc">`,
        'D': `<span>Room Vnum:</span><input type="number" data-id="room_vnum"> <span>Dirección:</span><input type="number" data-id="direction"> <span>Estado:</span><input type="number" data-id="state">`,
        'R': `<span>Room Vnum:</span><input type="number" data-id="room_vnum"> <span>Clase Maze:</span><input type="number" data-id="maze_class">`
    };
    row.querySelector('.reset-inputs').innerHTML = inputs[type];
    list.appendChild(rowClone);
}

export function setupResetsSection() {
    const toolbar = document.getElementById('resets-toolbar');
    const list = document.getElementById('resets-list');
    if (!toolbar) return;

    toolbar.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-reset-btn')) addResetRow(e.target.dataset.type);
    });

    list.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-sub-btn')) e.target.closest('.reset-row').remove();
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
        const getVal = (id) => row.querySelector(`input[data-id="${id}"]`).value || 0;
        switch (type) {
            case 'M': section += `M 0 ${getVal('vnum')} ${getVal('total_limit')} ${getVal('room_vnum')} ${getVal('local_limit')} * Mob ${getVal('vnum')}\n`; break;
            case 'O': section += `O 0 ${getVal('vnum')} ${getVal('limit')} ${getVal('room_vnum')} * Obj ${getVal('vnum')}\n`; break;
            case 'P': section += `P 1 ${getVal('vnum')} ${getVal('limit')} ${getVal('container_vnum')} ${getVal('local_limit')} * Obj in Obj\n`; break;
            case 'G': section += `G 1 ${getVal('vnum')} ${getVal('limit')} * Give Obj\n`; break;
            case 'E': section += `E 1 ${getVal('vnum')} ${getVal('limit')} ${getVal('wear_loc')} * Equip Obj\n`; break;
            case 'D': section += `D 0 ${getVal('room_vnum')} ${getVal('direction')} ${getVal('state')} * Door\n`; break;
            case 'R': section += `R 0 ${getVal('room_vnum')} ${getVal('maze_class')} * Random Exits\n`; break;
        }
    });
    section += 'S\n\n';
    return section;
}