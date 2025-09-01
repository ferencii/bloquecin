export function setupDynamicSection(buttonId, containerId, templateId, cardSelector, vnumRangeCheckFunction = null) {
    const addButton = document.getElementById(buttonId);
    const container = document.getElementById(containerId);
    const template = document.getElementById(templateId);
    if (!addButton) return;

    addButton.addEventListener('click', () => {
        if (vnumRangeCheckFunction && !vnumRangeCheckFunction()) {
            alert('¡Atención! Debes definir un rango de VNUMs válido en la sección #AREA para poder añadir elementos.');
            return;
        }
        container.appendChild(template.content.cloneNode(true));
    });
    container.addEventListener('click', e => {
        if (e.target.classList.contains('remove-btn')) e.target.closest(cardSelector).remove();
    });
}

export function getFlagString(container, selector) {
    const flags = Array.from(container.querySelectorAll(selector)).filter(cb => cb.checked).map(cb => cb.value).join('');
    return flags || '0';
}