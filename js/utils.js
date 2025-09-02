export function setupDynamicSection(buttonId, containerId, templateId, cardSelector, vnumRangeCheckFunction = null, vnumSelector = null, vnumDisplaySelector = null, nameInputSelector = null, nameDisplaySelector = null) {
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

        const addedCardElement = container.lastElementChild;

        // Vnum auto-suggestion
        if (vnumSelector) {
            const vnumInputs = container.querySelectorAll(vnumSelector);
            let maxVnum = 0;
            vnumInputs.forEach(input => {
                const vnum = parseInt(input.value);
                if (!isNaN(vnum) && vnum > maxVnum) {
                    maxVnum = vnum;
                }
            });
            const newVnumInput = addedCardElement.querySelector(vnumSelector);
            if (newVnumInput) {
                let proposedVnum;
                if (maxVnum === 0) {
                    const areaVnumStart = parseInt(document.getElementById('area-vnum-start').value);
                    proposedVnum = !isNaN(areaVnumStart) ? areaVnumStart : 1;
                } else {
                    proposedVnum = maxVnum + 1;
                }

                const areaVnumEnd = parseInt(document.getElementById('area-vnum-end').value);
                if (isNaN(areaVnumEnd) || proposedVnum > areaVnumEnd) {
                    alert(`El VNUM ${proposedVnum} excede el VNUM final del área (${areaVnumEnd}). Por favor, ajusta el rango del área o el VNUM.`);
                    addedCardElement.remove(); // Remove the partially added card
                    return;
                }

                const existingVnums = Array.from(container.querySelectorAll(vnumSelector)).map(input => parseInt(input.value));
                if (existingVnums.includes(proposedVnum)) {
                    alert(`El VNUM ${proposedVnum} ya existe en esta sección. Por favor, elige un VNUM diferente.`);
                    addedCardElement.remove(); // Remove the partially added card
                    return;
                }

                newVnumInput.value = proposedVnum;

                // Update vnum display in header
                if (vnumDisplaySelector) {
                    addedCardElement.querySelector(vnumDisplaySelector).textContent = newVnumInput.value;
                }
            }
        }

        // Collapsible logic
        const collapsibleHeader = addedCardElement.querySelector('.collapsible-header');
        const collapsibleContent = addedCardElement.querySelector('.collapsible-content');
        if (collapsibleHeader && collapsibleContent) {
            collapsibleHeader.addEventListener('click', () => {
                collapsibleContent.classList.toggle('collapsed');
            });
            // New cards are expanded by default, existing ones (on load) could be collapsed
            // For now, all new cards start expanded.
        }

        // Update vnum display on input change
        if (vnumSelector && vnumDisplaySelector) {
            const vnumInput = addedCardElement.querySelector(vnumSelector);
            const vnumDisplay = addedCardElement.querySelector(vnumDisplaySelector);
            if (vnumInput && vnumDisplay) {
                vnumInput.addEventListener('input', () => {
                    vnumDisplay.textContent = vnumInput.value;
                });
            }
        }

        // Update name display on input change
        if (nameInputSelector && nameDisplaySelector) {
            const nameInput = addedCardElement.querySelector(nameInputSelector);
            const nameDisplay = addedCardElement.querySelector(nameDisplaySelector);
            if (nameInput && nameDisplay) {
                // Set initial name display
                nameDisplay.textContent = nameInput.value || nameDisplay.textContent; // Use existing text if input is empty

                nameInput.addEventListener('input', () => {
                    nameDisplay.textContent = nameInput.value || 'Nuevo Elemento'; // Default text if input is cleared
                });
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