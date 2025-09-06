import { setupDynamicSection } from './utils.js';

export function inicializarTarjetaProg(cardElement) {
    const header = cardElement.querySelector('.collapsible-header');
    const content = cardElement.querySelector('.collapsible-content');
    if (header && content && !header.dataset.colapsado) {
        header.addEventListener('click', () => {
            content.classList.toggle('collapsed');
        });
        header.dataset.colapsado = 'true';
    }

    const vnumInput = cardElement.querySelector('.prog-vnum');
    const vnumDisplay = cardElement.querySelector('.prog-vnum-display');
    if (vnumInput && vnumDisplay && !vnumInput.dataset.vnumEscucha) {
        vnumInput.addEventListener('input', () => {
            vnumDisplay.textContent = vnumInput.value;
            actualizarPropietariosProgs();
        });
        vnumInput.dataset.vnumEscucha = 'true';
    }
}

export function actualizarPropietariosProgs() {
    const progCards = document.querySelectorAll('.prog-card');
    progCards.forEach(card => {
        const vnum = parseInt(card.querySelector('.prog-vnum').value);
        const owners = [];
        if (vnum) {
            if (card.closest('#mobprogs-container')) {
                document.querySelectorAll('#mobiles-container .mob-card').forEach(m => {
                    const lineas = m.querySelector('.mob-triggers')?.value.split('\n') || [];
                    if (lineas.some(l => parseInt(l.trim().split(/\s+/)[1]) === vnum)) {
                        const v = m.querySelector('.mob-vnum').value;
                        const nombre = m.querySelector('.mob-name-display').textContent;
                        owners.push(`Mob ${v} ${nombre}`);
                    }
                });
            } else if (card.closest('#objprogs-container')) {
                document.querySelectorAll('#objects-container .object-card').forEach(o => {
                    const lineas = o.querySelector('.obj-triggers')?.value.split('\n') || [];
                    if (lineas.some(l => parseInt(l.trim().split(/\s+/)[1]) === vnum)) {
                        const v = o.querySelector('.obj-vnum').value;
                        const nombre = o.querySelector('.obj-name-display').textContent;
                        owners.push(`Objeto ${v} ${nombre}`);
                    }
                });
            } else if (card.closest('#roomprogs-container')) {
                document.querySelectorAll('#rooms-container .room-card').forEach(r => {
                    const lineas = r.querySelector('.room-triggers')?.value.split('\n') || [];
                    if (lineas.some(l => parseInt(l.trim().split(/\s+/)[1]) === vnum)) {
                        const v = r.querySelector('.room-vnum').value;
                        const nombre = r.querySelector('.room-name-display').textContent;
                        owners.push(`Habitación ${v} ${nombre}`);
                    }
                });
            }
        }
        const ownerSelect = card.querySelector('.prog-owner-display');
        if (ownerSelect) {
            ownerSelect.innerHTML = '';
            if (owners.length === 0) {
                const opt = document.createElement('option');
                opt.textContent = 'Sin propietarios';
                ownerSelect.appendChild(opt);
            } else {
                owners.forEach(t => {
                    const opt = document.createElement('option');
                    opt.textContent = t;
                    ownerSelect.appendChild(opt);
                });
            }
        }
    });
}

export function setupProgsSection(type, vnumRangeCheckFunction, vnumSelector, vnumDisplaySelector, nameInputSelector, nameDisplaySelector) {
    const buttonType = type.replace('s', '');
    setupDynamicSection(`add-${buttonType}-btn`, `${type}-container`, 'prog-template', '.prog-card', vnumRangeCheckFunction, vnumSelector, vnumDisplaySelector, nameInputSelector, nameDisplaySelector, (card) => {
        inicializarTarjetaProg(card);
        actualizarPropietariosProgs();
    });

    const container = document.getElementById(`${type}-container`);
    container.querySelectorAll('.prog-card').forEach(card => {
        inicializarTarjetaProg(card);
    });
    container.addEventListener('click', e => {
        if (e.target.classList.contains('remove-btn')) {
            actualizarPropietariosProgs();
        }
    });
    actualizarPropietariosProgs();
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