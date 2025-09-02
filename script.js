import { setupAreaSection, generateAreaSection } from './js/area.js';
import { setupMobilesSection, generateMobilesSection } from './js/mobiles.js';
import { setupObjectsSection, generateObjectsSection } from './js/objects.js';
import { setupRoomsSection, generateRoomsSection } from './js/rooms.js';
import { setupResetsSection, generateResetsSection } from './js/resets.js';
import { setupSetSection, generateSetSection } from './js/sets.js';
import { setupShopsSection, generateShopsSection } from './js/shops.js';
import { setupSpecialsSection, generateSpecialsSection } from './js/specials.js';
import { setupProgsSection, generateProgsSection } from './js/progs.js';
import { parseAreFile } from './js/parser.js';


document.addEventListener('DOMContentLoaded', () => {
    // Setup navigation
    document.querySelectorAll('.nav-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
            document.getElementById(button.dataset.section).classList.add('active');
        });
    });

    // Setup all sections
    setupAreaSection();
    setupMobilesSection(isValidVnumRange, '.mob-vnum', '.mob-vnum-display', '.mob-short-desc', '.mob-name-display');
    setupObjectsSection(isValidVnumRange, '.obj-vnum', '.obj-vnum-display', '.obj-short-desc', '.obj-name-display');
    setupRoomsSection(isValidVnumRange, '.room-vnum', '.room-vnum-display', '.room-name', '.room-name-display');
    setupResetsSection();
    setupSetSection(null, '.set-id', '.set-id-display', '.set-name', '.set-name-display');
    setupShopsSection(isValidVnumRange, '.shop-vnum', '.shop-vnum-display', null, null);
    setupSpecialsSection(isValidVnumRange, '.special-vnum', '.special-vnum-display', '.special-name', '.special-name-display');
    setupProgsSection('mobprogs', isValidVnumRange, '.prog-vnum', '.prog-vnum-display', null, null);
    setupProgsSection('objprogs', isValidVnumRange, '.prog-vnum', '.prog-vnum-display', null, null);
    setupProgsSection('roomprogs', isValidVnumRange, '.prog-vnum', '.prog-vnum-display', null, null);

    // Setup main generate button
    document.getElementById('generate-btn').addEventListener('click', generateAreFile);

    // Setup file loading
    const loadFileInput = document.getElementById('load-file-input');
    const loadFileBtn = document.getElementById('load-file-btn');

    loadFileBtn.addEventListener('click', () => {
        loadFileInput.click();
    });

    loadFileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                parseAreFile(content);
            };
            reader.readAsText(file);
        }
    });
});

function isValidVnumRange() {
    const vnumStartInput = document.getElementById('area-vnum-start');
    const vnumEndInput = document.getElementById('area-vnum-end');
    const start = parseInt(vnumStartInput.value);
    const end = parseInt(vnumEndInput.value);
    return !isNaN(start) && !isNaN(end) && start <= end;
}

function generateAreFile() {
    let c = '' // fileContent
    c += generateAreaSection();
    c += generateMobilesSection();
    c += generateObjectsSection();
    c += generateRoomsSection();
    c += generateResetsSection();
    c += generateSetSection();
    c += generateShopsSection();
    c += generateSpecialsSection();
    c += generateProgsSection('mobprogs', 'MOBPROGS');
    c += generateProgsSection('objprogs', 'OBJPROGS');
    c += generateProgsSection('roomprogs', 'ROOMPROGS');
    c += '#$\n';

    const blob = new Blob([c.replace(/\n/g, '\r\n')], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = document.getElementById('area-filename').value.trim() || 'default.are';
    link.click();
    link.remove();
}
