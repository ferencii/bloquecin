export function setupAreaSection() {
    const vnumStartInput = document.getElementById('area-vnum-start');
    const vnumEndInput = document.getElementById('area-vnum-end');
    const vnumRangeMessage = document.getElementById('vnum-range-message');

    const updateButtons = () => {
        const start = parseInt(vnumStartInput.value);
        const end = parseInt(vnumEndInput.value);
        const isValidRange = !isNaN(start) && !isNaN(end) && start <= end;

        if (!isValidRange) {
            vnumRangeMessage.textContent = '¡Atención! Define un rango de VNUMs válido para habilitar la creación de elementos.';
            vnumRangeMessage.className = 'info-message error-message'; // Add error-message class
            vnumRangeMessage.style.display = 'block';
        } else {
            vnumRangeMessage.textContent = '';
            vnumRangeMessage.className = 'info-message'; // Remove error-message class
            vnumRangeMessage.style.display = 'none';
        }
    };

    vnumStartInput.addEventListener('input', updateButtons);
    vnumEndInput.addEventListener('input', updateButtons);

    // Initial call to set button states on page load
    updateButtons();
}

export function generateAreaSection() {
    const filename = document.getElementById('area-filename').value.trim();
    const areaName = document.getElementById('area-name').value.trim();
    const minLevel = document.getElementById('area-min-level').value;
    const maxLevel = document.getElementById('area-max-level').value;
    const creator = document.getElementById('area-creator').value.trim();
    const vnumStart = document.getElementById('area-vnum-start').value;
    const vnumEnd = document.getElementById('area-vnum-end').value;
    const region = document.getElementById('area-region').value.trim();

    let section = '#AREA\n';
    section += `${filename || 'default.are'}~\n`;
    section += `${areaName}~\n`;
    section += `{ ${minLevel || 0} ${maxLevel || 0} } ${creator}~\n`;
    section += `VNUMs ${vnumStart || 0} ${vnumEnd || 0}\n`;
    if (region) {
        section += `Region ${region}~\n`;
    }
    section += '~\n\n';
    return section;
}