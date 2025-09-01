export function setupDynamicSection(buttonId, containerId, templateId, cardSelector, vnumRangeCheckFunction = null, vnumSelector = null) {
    const addButton = document.getElementById(buttonId);
    const container = document.getElementById(containerId);
    const template = document.getElementById(templateId);
    if (!addButton) return;

    addButton.addEventListener('click', () => {
        if (vnumRangeCheckFunction && !vnumRangeCheckFunction()) {
            alert('¡Atención! Debes definir un rango de VNUMs válido en la sección #AREA para poder añadir elementos.');
            return;
        }
        const newCard = template.content.cloneNode(true);
        container.appendChild(newCard);

        if (vnumSelector) {
            const vnumInputs = container.querySelectorAll(vnumSelector);
            let maxVnum = 0;
            vnumInputs.forEach(input => {
                const vnum = parseInt(input.value);
                if (!isNaN(vnum) && vnum > maxVnum) {
                    maxVnum = vnum;
                }
            });
            // Set the new vnum to the last added card's vnum input
            const newVnumInput = container.lastElementChild.querySelector(vnumSelector);
            if (newVnumInput) {
                if (maxVnum === 0) {
                    const areaVnumStart = parseInt(document.getElementById('area-vnum-start').value);
                    newVnumInput.value = !isNaN(areaVnumStart) ? areaVnumStart : 1;
                } else {
                    newVnumInput.value = maxVnum + 1;
                }
            }
        }
    });
    container.addEventListener('click', e => {
        if (e.target.classList.contains('remove-btn')) e.target.closest(cardSelector).remove();
    });
}

export function getFlagString(container, selector) {
    const flags = Array.from(container.querySelectorAll(selector)).filter(cb => cb.checked).map(cb => cb.value).join('');
    return flags || '0';
}