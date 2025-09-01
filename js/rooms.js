import { getFlagString } from './utils.js';

export function setupRoomsSection(vnumRangeCheckFunction) {
    const btn = document.getElementById('add-room-btn');
    const container = document.getElementById('rooms-container');
    if (!btn) return;

    btn.addEventListener('click', () => {
        if (vnumRangeCheckFunction && !vnumRangeCheckFunction()) {
            alert('¡Atención! Debes definir un rango de VNUMs válido en la sección #AREA para poder añadir elementos.');
            return;
        }
        container.appendChild(document.getElementById('room-template').content.cloneNode(true));
    });

    container.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('remove-btn')) target.closest('.room-card').remove();
        else if (target.classList.contains('add-exit-btn')) target.previousElementSibling.appendChild(document.getElementById('exit-template').content.cloneNode(true));
        else if (target.classList.contains('add-room-extra-btn')) target.previousElementSibling.appendChild(document.getElementById('extra-desc-template').content.cloneNode(true));
        else if (target.classList.contains('remove-sub-btn')) target.closest('.sub-item-row, .sub-item-row-grid').remove();
    });
}

export function generateRoomsSection() {
    const roomCards = document.querySelectorAll('#rooms-container .room-card');
    if (roomCards.length === 0) return '#ROOMS\n#0\n\n';

    let section = '#ROOMS\n';
    roomCards.forEach(room => {
        section += `#${room.querySelector('.room-vnum').value}\n`;
        section += `${room.querySelector('.room-name').value}~\n`;
        section += `${room.querySelector('.room-desc').value.replace(/\n/g, ' ')}~\n`;

        const roomFlags = getFlagString(room, 'fieldset[legend="Flags de Habitación"] input[type="checkbox"]');
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

        section += 'S\n';
    });
    section += '#0\n\n';
    return section;
}