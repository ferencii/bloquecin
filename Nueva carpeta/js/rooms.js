import { setupDynamicSection, getFlagString } from './utils.js';
import { refrescarOpcionesResets } from './resets.js';
import { actualizarPropietariosProgs } from './progs.js';

export function inicializarTarjetaRoom(cardElement) {
    const header = cardElement.querySelector('.collapsible-header');
    const content = cardElement.querySelector('.collapsible-content');
    if (header && content && !header.dataset.colapsado) {
        header.addEventListener('click', () => {
            content.classList.toggle('collapsed');
        });
        header.dataset.colapsado = 'true';
    }

    const vnumInput = cardElement.querySelector('.room-vnum');
    const vnumDisplay = cardElement.querySelector('.room-vnum-display');
    if (vnumInput && vnumDisplay && !vnumInput.dataset.vnumEscucha) {
        vnumInput.addEventListener('input', () => {
            vnumDisplay.textContent = vnumInput.value;
        });
        vnumInput.dataset.vnumEscucha = 'true';
    }

    const nameInput = cardElement.querySelector('.room-name');
    const nameDisplay = cardElement.querySelector('.room-name-display');
    if (nameInput && nameDisplay && !nameInput.dataset.nombreEscucha) {
        nameInput.addEventListener('input', () => {
            nameDisplay.textContent = nameInput.value;
        });
        nameInput.dataset.nombreEscucha = 'true';
        nameInput.dispatchEvent(new Event('input'));
    }

    const triggersInput = cardElement.querySelector('.room-triggers');
    if (triggersInput && !triggersInput.dataset.trigEscucha) {
        triggersInput.addEventListener('input', actualizarPropietariosProgs);
        triggersInput.dataset.trigEscucha = 'true';
    }
}

export function setupRoomsSection(vnumRangeCheckFunction, vnumSelector, vnumDisplaySelector, nameInputSelector, nameDisplaySelector) {
    setupDynamicSection('add-room-btn', 'rooms-container', 'room-template', '.room-card', vnumRangeCheckFunction, vnumSelector, vnumDisplaySelector, nameInputSelector, nameDisplaySelector, (cardElement) => {
        inicializarTarjetaRoom(cardElement);
        refrescarOpcionesResets();
    });

    const container = document.getElementById('rooms-container');
    container.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('remove-btn')) {
            target.closest('.room-card').remove();
            actualizarPropietariosProgs();
        }
        else if (target.classList.contains('add-exit-btn')) target.previousElementSibling.appendChild(document.getElementById('exit-template').content.cloneNode(true));
        else if (target.classList.contains('add-room-extra-btn')) target.previousElementSibling.appendChild(document.getElementById('extra-desc-template').content.cloneNode(true));
        else if (target.classList.contains('remove-sub-btn')) target.closest('.sub-item-row, .sub-item-row-grid').remove();
    });
}

export function generateRoomsSection() {
    const roomCards = document.querySelectorAll('#rooms-container .room-card');
    if (roomCards.length === 0) return '#ROOMS - 0\n#0\n\n';

    let section = `#ROOMS - ${roomCards.length}\n`;
    roomCards.forEach(room => {
        section += `#${room.querySelector('.room-vnum').value}\n`;
        section += `${room.querySelector('.room-name').value}~\n`;
        section += `${room.querySelector('.room-desc').value.replace(/\n/g, ' ')}~\n`;

        const roomFlags = getFlagString(room, 'Flags de Habitación');
        section += `0 ${roomFlags} ${room.querySelector('.room-sector').value}\n`;

        room.querySelectorAll('.exits-container .sub-item-row-grid').forEach(row => {
            section += `D${row.querySelector('.exit-dir').value}\n`;
            section += `${row.querySelector('.exit-desc').value}~\n`;
            section += `${row.querySelector('.exit-keyword').value}~\n`;
            section += `${row.querySelector('.exit-door-state').value} ${row.querySelector('.exit-key-vnum').value || -1} ${row.querySelector('.exit-dest-vnum').value}\n`;
        });

        room.querySelectorAll('.room-extras-container .sub-item-row').forEach(row => {
            const keyword = row.querySelector('.extra-keyword').value;
            const desc = row.querySelector('.extra-desc').value;
            if (keyword && desc) section += `E\n${keyword}~\n${desc}~\n`;
        });

        const manaRegen = room.querySelector('.room-mana-regen').value;
        if (manaRegen) section += `M ${manaRegen}\n`;
        
        const healthRegen = room.querySelector('.room-health-regen').value;
        if (healthRegen) section += `H ${healthRegen}\n`;

        const clan = room.querySelector('.room-clan').value;
        if (clan) section += `C ${clan}~\n`;

        const triggersText = room.querySelector('.room-triggers').value.trim();
        if (triggersText) {
            triggersText.split('\n').forEach(linea => {
                if (linea.trim() !== '') section += `R ${linea.trim()}~\n`;
            });
        }

        section += 'S\n';
    });
    section += '#0\n\n';
    return section;
}