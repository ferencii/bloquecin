import { populateAffectBitSelect, populateObjectTypeSelect, updateObjectValuesUI } from './objects.js';
import { refrescarOpcionesResets } from './resets.js';
import { poblarSelectsTienda } from './shops.js';
import { poblarSelectEspecial } from './specials.js';

export function parseAreFile(content) {
    console.log('Parsing .are file...');

    clearAllForms(); // Clear existing forms before parsing and populating

    const sections = {};
    let currentSection = '';
    let sectionContent = [];

    const lines = content.split(/\r?\n/);

    for (const line of lines) {
        if (line.startsWith('#') && line.length > 1 && line !== '#$') {
            if (currentSection) {
                sections[currentSection] = sectionContent.join('\n');
            }
            currentSection = line;
            sectionContent = [];
        } else if (line === '#$') {
            if (currentSection) {
                sections[currentSection] = sectionContent.join('\n');
            }
            currentSection = ''; // Reset current section
            sectionContent = [];
        } else {
            sectionContent.push(line);
        }
    }

    // Handle the last section if the file doesn't end with #$
    if (currentSection) {
        sections[currentSection] = sectionContent.join('\n');
    }

    console.log('Parsed sections:', sections);

    const parsedData = {};

    if (sections['#AREA']) {
        parsedData.area = parseAreaSection(sections['#AREA']);
        populateAreaForm(parsedData.area);
    }

    if (sections['#MOBILES']) {
        parsedData.mobiles = parseMobilesSection(sections['#MOBILES']);
        populateMobilesSection(parsedData.mobiles);
    }

    if (sections['#OBJECTS']) {
        parsedData.objects = parseObjectsSection(sections['#OBJECTS']);
        populateObjectsSection(parsedData.objects);
    }

    if (sections['#ROOMS']) {
        parsedData.rooms = parseRoomsSection(sections['#ROOMS']);
        populateRoomsSection(parsedData.rooms);
    }

    if (sections['#RESETS']) {
        parsedData.resets = parseResetsSection(sections['#RESETS']);
        populateResetsSection(parsedData.resets);
    }

    refrescarOpcionesResets();

    if (sections['#SET']) {
        parsedData.sets = parseSetSection(sections['#SET']);
        populateSetSection(parsedData.sets);
    }

    if (sections['#SHOPS']) {
        parsedData.shops = parseShopsSection(sections['#SHOPS']);
        populateShopsSection(parsedData.shops);
    }

    if (sections['#SPECIALS']) {
        parsedData.specials = parseSpecialsSection(sections['#SPECIALS']);
        populateSpecialsSection(parsedData.specials);
    }

    if (sections['#MOBPROGS']) {
        parsedData.mobprogs = parseProgsSection(sections['#MOBPROGS']);
        populateProgsSection(parsedData.mobprogs, 'mobprogs-container', 'prog-template');
    }

    if (sections['#OBJPROGS']) {
        parsedData.objprogs = parseProgsSection(sections['#OBJPROGS']);
        populateProgsSection(parsedData.objprogs, 'objprogs-container', 'prog-template');
    }

    if (sections['#ROOMPROGS']) {
        parsedData.roomprogs = parseProgsSection(sections['#ROOMPROGS']);
        populateProgsSection(parsedData.roomprogs, 'roomprogs-container', 'prog-template');
    }

    alert('Archivo cargado y listo para parsear!');
}

function parseAreaSection(sectionContent) {
    const lines = sectionContent.split('\n').filter(line => line.trim() !== '');
    const areaData = {};

    // Expected order: filename, name, min/max level, creator, start/end vnum, region
    areaData.filename = lines[0] ? lines[0].trim() : '';
    areaData.name = lines[1] ? lines[1].replace(/~$/, '').trim() : '';
    const levelMatch = lines[2] ? lines[2].match(/\{ (\d+) (\d+)\}/) : null;
    areaData.minLevel = levelMatch ? parseInt(levelMatch[1]) : '';
    areaData.maxLevel = levelMatch ? parseInt(levelMatch[2]) : '';
    areaData.creator = lines[3] ? lines[3].replace(/~$/, '').trim() : '';
    const vnumMatch = lines[4] ? lines[4].match(/(\d+) (\d+)/) : null;
    areaData.vnumStart = vnumMatch ? parseInt(vnumMatch[1]) : '';
    areaData.vnumEnd = vnumMatch ? parseInt(vnumMatch[2]) : '';
    areaData.region = lines[5] ? lines[5].replace(/~$/, '').trim() : '';

    return areaData;
}

function populateAreaForm(areaData) {
    document.getElementById('area-filename').value = areaData.filename;
    document.getElementById('area-name').value = areaData.name;
    document.getElementById('area-min-level').value = areaData.minLevel;
    document.getElementById('area-max-level').value = areaData.maxLevel;
    document.getElementById('area-creator').value = areaData.creator;
    document.getElementById('area-vnum-start').value = areaData.vnumStart;
    document.getElementById('area-vnum-end').value = areaData.vnumEnd;
    document.getElementById('area-region').value = areaData.region;
}

function parseMobilesSection(sectionContent) {
    const mobiles = [];
    const lines = sectionContent.split('\n').filter(line => line.trim() !== '');
    let i = 0;
    while (i < lines.length) {
        if (lines[i].startsWith('#')) {
            const mob = {};
            mob.vnum = parseInt(lines[i].substring(1));
            i++;
            mob.keywords = lines[i++].replace(/~$/, '').trim();
            mob.shortDesc = lines[i++].replace(/~$/, '').trim();
            mob.longDesc = lines[i++].replace(/~$/, '').trim();
            mob.lookDesc = lines[i++].replace(/~$/, '').trim();
            mob.race = lines[i++].replace(/~$/, '').trim();

            // Act Flags, Affect Flags, Alignment, Group, Level, Hitroll
            const line6 = lines[i++].split(' ').filter(s => s !== '');
            mob.actFlags = line6[0];
            mob.affectFlags = line6[1];
            mob.alignment = parseInt(line6[2]);
            mob.group = parseInt(line6[3]);
            mob.level = parseInt(line6[4]);
            mob.hitroll = parseInt(line6[5]);

            // HP, Mana, Damage
            const line7 = lines[i++].split(' ').filter(s => s !== '');
            mob.hpDice = line7[0];
            mob.manaDice = line7[1];
            mob.damageDice = line7[2];

            mob.damageType = lines[i++].trim();

            // ACs
            const line9 = lines[i++].split(' ').filter(s => s !== '');
            mob.acPierce = parseInt(line9[0]);
            mob.acBash = parseInt(line9[1]);
            mob.acSlash = parseInt(line9[2]);
            mob.acMagic = parseInt(line9[3]);

            mob.offensiveFlags = lines[i++].trim();

            // Imm/Res/Vul
            const line11 = lines[i++].split(' ').filter(s => s !== '');
            mob.immFlags = line11[0];
            mob.resFlags = line11[1];
            mob.vulFlags = line11[2];

            // Positions, Sex, Gold
            const line12 = lines[i++].split(' ').filter(s => s !== '');
            mob.position = line12[0];
            mob.defaultPosition = line12[1];
            mob.sex = line12[2];
            mob.gold = parseInt(line12[3]);

            // Form/Parts, Size, Material
            const line13 = lines[i++].split(' ').filter(s => s !== '');
            mob.form = line13[0];
            mob.parts = line13[1];
            mob.size = line13[2];
            mob.material = line13[3].replace(/~$/, '').trim();

            mobiles.push(mob);
        }
        i++; // Move to the next line, skipping #0 or S
    }
    return mobiles;
}

function populateMobilesSection(mobilesData) {
    const container = document.getElementById('mobiles-container');
    const template = document.getElementById('mob-template');

    mobilesData.forEach(mob => {
        const newCard = template.content.cloneNode(true);
        const addedCardElement = newCard.querySelector('.mob-card');

        addedCardElement.querySelector('.mob-vnum').value = mob.vnum;
        addedCardElement.querySelector('.mob-keywords').value = mob.keywords;
        addedCardElement.querySelector('.mob-short-desc').value = mob.shortDesc;
        addedCardElement.querySelector('.mob-long-desc').value = mob.longDesc;
        addedCardElement.querySelector('.mob-look-desc').value = mob.lookDesc;
        addedCardElement.querySelector('.mob-race').value = mob.race;
        addedCardElement.querySelector('.mob-alignment').value = mob.alignment;
        addedCardElement.querySelector('.mob-group').value = mob.group;
        addedCardElement.querySelector('.mob-level').value = mob.level;
        addedCardElement.querySelector('.mob-hitroll').value = mob.hitroll;
        addedCardElement.querySelector('.mob-sex').value = mob.sex;
        addedCardElement.querySelector('.mob-gold').value = mob.gold;
        addedCardElement.querySelector('.mob-size').value = mob.size;
        addedCardElement.querySelector('.mob-material').value = mob.material;

        // Flags (Act, Affect, Offensive, Imm/Res/Vul, Form, Parts)
        populateCheckboxesFromFlags(addedCardElement, '.mob-act-flags', mob.actFlags);
        populateCheckboxesFromFlags(addedCardElement, '.mob-affect-flags', mob.affectFlags);
        populateCheckboxesFromFlags(addedCardElement, '.mob-offensive-flags', mob.offensiveFlags);
        populateCheckboxesFromFlags(addedCardElement, '.mob-imm-flags', mob.immFlags);
        populateCheckboxesFromFlags(addedCardElement, '.mob-res-flags', mob.resFlags);
        populateCheckboxesFromFlags(addedCardElement, '.mob-vul-flags', mob.vulFlags);
        populateCheckboxesFromFlags(addedCardElement, '.mob-form-flags', mob.form);
        populateCheckboxesFromFlags(addedCardElement, '.mob-parts-flags', mob.parts);

        // Dice (HP, Mana, Damage)
        addedCardElement.querySelector('.mob-hp-dice').value = mob.hpDice;
        addedCardElement.querySelector('.mob-mana-dice').value = mob.manaDice;
        addedCardElement.querySelector('.mob-damage-dice').value = mob.damageDice;
        addedCardElement.querySelector('.mob-damage-type').value = mob.damageType;

        // ACs
        addedCardElement.querySelector('.mob-ac-pierce').value = mob.acPierce;
        addedCardElement.querySelector('.mob-ac-bash').value = mob.acBash;
        addedCardElement.querySelector('.mob-ac-slash').value = mob.acSlash;
        addedCardElement.querySelector('.mob-ac-magic').value = mob.acMagic;

        // Positions
        addedCardElement.querySelector('.mob-position').value = mob.position;
        addedCardElement.querySelector('.mob-default-position').value = mob.defaultPosition;

        // Update Vnum and Name display in header
        addedCardElement.querySelector('.mob-vnum-display').textContent = mob.vnum;
        addedCardElement.querySelector('.mob-name-display').textContent = mob.shortDesc;

        container.appendChild(addedCardElement);
    });
}

function parseObjectsSection(sectionContent) {
    const objects = [];
    const lines = sectionContent.split('\n').filter(line => line.trim() !== '');
    let i = 0;
    while (i < lines.length) {
        if (lines[i].startsWith('#')) {
            const obj = {};
            obj.vnum = parseInt(lines[i].substring(1));
            i++;
            obj.keywords = lines[i++].replace(/~$/, '').trim();
            obj.shortDesc = lines[i++].replace(/~$/, '').trim();
            obj.longDesc = lines[i++].replace(/~$/, '').trim();
            obj.material = lines[i++].trim();
            obj.type = lines[i++].trim();
            obj.flags = lines[i++].trim();
            obj.wearLocation = lines[i++].trim();

            // V0-V4
            const vValues = lines[i++].split(' ').filter(s => s !== '');
            obj.v0 = vValues[0] ?? '0';
            obj.v1 = vValues[1] ?? '0';
            obj.v2 = vValues[2] ?? '0';
            obj.v3 = vValues[3] ?? '0';
            obj.v4 = vValues[4] ?? '0';

            obj.level = parseInt(lines[i++]);
            obj.weight = parseInt(lines[i++]);
            obj.price = parseInt(lines[i++]);

            // Optional S, A, F, E sections
            obj.set = null;
            obj.applies = [];
            obj.affects = [];
            obj.extraDescriptions = [];

            while (i < lines.length && !lines[i].startsWith('#') && lines[i].trim() !== '0') {
                const line = lines[i].trim();
                if (line.startsWith('S ')) {
                    obj.set = line.substring(2).trim();
                } else if (line.startsWith('A ')) {
                    const parts = line.substring(2).trim().split(' ').map(Number);
                    obj.applies.push({ location: parts[0], modifier: parts[1] });
                } else if (line.startsWith('F ')) {
                    const parts = line.substring(2).trim().split(' ');
                    obj.affects.push({ type: parts[0], bits: parts.slice(3).join('') });
                } else if (line.startsWith('E ')) {
                    const keywordLine = line.substring(2).trim();
                    const keywordMatch = keywordLine.match(/^(.*?~)\s*(.*)/);
                    if (keywordMatch) {
                        obj.extraDescriptions.push({
                            keywords: keywordMatch[1].trim(),
                            description: keywordMatch[2].replace(/~$/, '').trim()
                        });
                    }
                }
                i++;
            }
            objects.push(obj);
        }
        i++; // Move to the next line, skipping #0 or S
    }
    return objects;
}

function populateObjectsSection(objectsData) {
    const container = document.getElementById('objects-container');
    const template = document.getElementById('object-template');

    objectsData.forEach(obj => {
        const newCard = template.content.cloneNode(true);
        const addedCardElement = newCard.querySelector('.object-card');

        populateObjectTypeSelect(addedCardElement);
        addedCardElement.querySelector('.obj-type').value = obj.type;
        updateObjectValuesUI(addedCardElement);

        addedCardElement.querySelector('.obj-vnum').value = obj.vnum;
        addedCardElement.querySelector('.obj-keywords').value = obj.keywords;
        addedCardElement.querySelector('.obj-short-desc').value = obj.shortDesc;
        addedCardElement.querySelector('.obj-long-desc').value = obj.longDesc;
        addedCardElement.querySelector('.obj-material').value = obj.material;
        populateCheckboxesFromFlags(addedCardElement, '.obj-flags-checkbox-group', obj.flags);
        addedCardElement.querySelector('.obj-wear-location').value = obj.wearLocation;

        // V0-V4
        addedCardElement.querySelector('.obj-v0').value = obj.v0;
        addedCardElement.querySelector('.obj-v1').value = obj.v1;
        addedCardElement.querySelector('.obj-v2').value = obj.v2;
        addedCardElement.querySelector('.obj-v3').value = obj.v3;
        addedCardElement.querySelector('.obj-v4').value = obj.v4;

        addedCardElement.querySelector('.obj-level').value = obj.level;
        addedCardElement.querySelector('.obj-weight').value = obj.weight;
        addedCardElement.querySelector('.obj-price').value = obj.price;

        // Optional sections (S, A, F, E) - will require more complex population logic
        if (obj.set) console.log(`Object ${obj.vnum} Set: ${obj.set}`);
        if (obj.applies.length > 0) {
            populateApplies(addedCardElement, obj.applies);
        }
        if (obj.affects.length > 0) {
            populateAffects(addedCardElement, obj.affects);
        }
        if (obj.extraDescriptions.length > 0) {
            populateExtraDescriptions(addedCardElement, obj.extraDescriptions);
        }

        // Update Vnum and Name display in header
        addedCardElement.querySelector('.obj-vnum-display').textContent = obj.vnum;
        addedCardElement.querySelector('.obj-name-display').textContent = obj.shortDesc;

        container.appendChild(addedCardElement);
    });
}

function populateApplies(containerElement, appliesData) {
    const appliesContainer = containerElement.querySelector('.applies-container');
    const applyTemplate = document.getElementById('apply-template');

    appliesData.forEach(apply => {
        const newApply = applyTemplate.content.cloneNode(true);
        const addedApplyElement = newApply.querySelector('.sub-item-row');

        addedApplyElement.querySelector('.apply-location').value = apply.location;
        addedApplyElement.querySelector('.apply-modifier').value = apply.modifier;

        appliesContainer.appendChild(addedApplyElement);
    });
}

function populateAffects(containerElement, affectsData) {
    const affectsContainer = containerElement.querySelector('.affects-container');
    const affectTemplate = document.getElementById('affect-template');

    affectsData.forEach(affect => {
        const newAffect = affectTemplate.content.cloneNode(true);
        const addedAffectElement = newAffect.querySelector('.sub-item-row');

        addedAffectElement.querySelector('.affect-type').value = affect.type;
        populateAffectBitSelect(addedAffectElement);
        addedAffectElement.querySelector('.affect-bits').value = affect.bits;

        affectsContainer.appendChild(addedAffectElement);
    });
}

function populateExtraDescriptions(containerElement, extraDescriptionsData) {
    const extraDescsContainer = containerElement.querySelector('.extra-descs-container');
    const extraDescTemplate = document.getElementById('extra-desc-template');

    extraDescriptionsData.forEach(extraDesc => {
        const newExtraDesc = extraDescTemplate.content.cloneNode(true);
        const addedExtraDescElement = newExtraDesc.querySelector('.sub-item-row');

        addedExtraDescElement.querySelector('.extra-keyword').value = extraDesc.keywords;
        addedExtraDescElement.querySelector('.extra-desc').value = extraDesc.description;

        extraDescsContainer.appendChild(addedExtraDescElement);
    });
}

function parseRoomsSection(sectionContent) {
    const rooms = [];
    const lines = sectionContent.split('\n').filter(line => line.trim() !== '');
    let i = 0;
    while (i < lines.length) {
        if (lines[i].startsWith('#')) {
            const room = {};
            room.vnum = parseInt(lines[i].substring(1));
            i++;
            room.name = lines[i++].replace(/~$/, '').trim();
            room.description = lines[i++].replace(/~$/, '').trim();

            const line4 = lines[i++].split(' ').filter(s => s !== '');
            room.flags = line4[0];
            room.sectorType = parseInt(line4[1]);

            room.exits = [];
            room.extraDescriptions = [];
            room.manaRegen = '';
            room.healthRegen = '';
            room.clan = '';

            while (i < lines.length && !lines[i].startsWith('S')) {
                const line = lines[i].trim();
                if (line.startsWith('D')) {
                    const parts = line.substring(1).trim().split(' ').filter(s => s !== '');
                    const exit = {
                        direction: parseInt(parts[0]),
                        description: lines[i + 1].replace(/~$/, '').trim(),
                        keywords: lines[i + 2].replace(/~$/, '').trim(),
                        doorState: parseInt(parts[3]),
                        keyVnum: parseInt(parts[4]),
                        destinationVnum: parseInt(parts[5])
                    };
                    room.exits.push(exit);
                    i += 5; // Advance past exit lines
                } else if (line.startsWith('E')) {
                    const keywordLine = line.substring(1).trim();
                    const keywordMatch = keywordLine.match(/^(.*?~)\s*(.*)/);
                    if (keywordMatch) {
                        room.extraDescriptions.push({
                            keywords: keywordMatch[1].trim(),
                            description: keywordMatch[2].replace(/~$/, '').trim()
                        });
                    }
                } else if (line.startsWith('M')) {
                    room.manaRegen = parseInt(line.substring(1).trim());
                } else if (line.startsWith('H')) {
                    room.healthRegen = parseInt(line.substring(1).trim());
                } else if (line.startsWith('C')) {
                    room.clan = line.substring(1).replace(/~$/, '').trim();
                }
                i++;
            }
            rooms.push(room);
        }
        i++; // Move to the next line, skipping #0 or S
    }
    return rooms;
}

function populateRoomsSection(roomsData) {
    const container = document.getElementById('rooms-container');
    const template = document.getElementById('room-template');

    roomsData.forEach(room => {
        const newCard = template.content.cloneNode(true);
        const addedCardElement = newCard.querySelector('.room-card');

        addedCardElement.querySelector('.room-vnum').value = room.vnum;
        addedCardElement.querySelector('.room-name').value = room.name;
        addedCardElement.querySelector('.room-desc').value = room.description;
        addedCardElement.querySelector('.room-sector').value = room.sectorType;
        addedCardElement.querySelector('.room-mana-regen').value = room.manaRegen;
        addedCardElement.querySelector('.room-health-regen').value = room.healthRegen;
        addedCardElement.querySelector('.room-clan').value = room.clan;

        // Flags (room.flags) - requires checkbox population
        populateCheckboxesFromFlags(addedCardElement, '.room-flags-checkbox-group', room.flags);

        if (room.extraDescriptions.length > 0) {
            populateExtraDescriptions(addedCardElement, room.extraDescriptions);
        }
        if (room.exits.length > 0) {
            populateExits(addedCardElement, room.exits);
        }

        // Update Vnum and Name display in header
        addedCardElement.querySelector('.room-vnum-display').textContent = room.vnum;
        addedCardElement.querySelector('.room-name-display').textContent = room.name;

        container.appendChild(addedCardElement);
    });
}

function populateExits(containerElement, exitsData) {
    const exitsContainer = containerElement.querySelector('.exits-container');
    const exitTemplate = document.getElementById('exit-template');

    exitsData.forEach(exit => {
        const newExit = exitTemplate.content.cloneNode(true);
        const addedExitElement = newExit.querySelector('.sub-item-row-grid');

        addedExitElement.querySelector('.exit-dir').value = exit.direction;
        addedExitElement.querySelector('.exit-keyword').value = exit.keywords;
        addedExitElement.querySelector('.exit-door-state').value = exit.doorState;
        addedExitElement.querySelector('.exit-key-vnum').value = exit.keyVnum;
        addedExitElement.querySelector('.exit-dest-vnum').value = exit.destinationVnum;
        addedExitElement.querySelector('.exit-desc').value = exit.description;

        exitsContainer.appendChild(addedExitElement);
    });
}

function parseResetsSection(sectionContent) {
    const resets = [];
    const lines = sectionContent.split('\n').filter(line => line.trim() !== '');
    for (const line of lines) {
        const parts = line.trim().split(/\s+/);
        const type = parts[0];
        const reset = { type: type };

        switch (type) {
            case 'M': // M 0 <vnum mob> <límite total> <vnum habitación> <límite local>
                reset.vnumMob = parseInt(parts[2]);
                reset.limitTotal = parseInt(parts[3]);
                reset.vnumRoom = parseInt(parts[4]);
                reset.limitLocal = parseInt(parts[5]);
                break;
            case 'O': // O 0 <vnum objeto> <límite> <vnum habitación>
                reset.vnumObject = parseInt(parts[2]);
                reset.limit = parseInt(parts[3]);
                reset.vnumRoom = parseInt(parts[4]);
                break;
            case 'P': // P 1 <vnum objeto contenido> <límite> <vnum contenedor> <límite local>
                reset.vnumContent = parseInt(parts[2]);
                reset.limit = parseInt(parts[3]);
                reset.vnumContainer = parseInt(parts[4]);
                reset.limitLocal = parseInt(parts[5]);
                break;
            case 'G': // G 1 <vnum objeto> <límite>
                reset.vnumObject = parseInt(parts[2]);
                reset.limit = parseInt(parts[3]);
                break;
            case 'E': // E 1 <vnum objeto> <límite> <lugar de vestir>
                reset.vnumObject = parseInt(parts[2]);
                reset.limit = parseInt(parts[3]);
                reset.wearLocation = parseInt(parts[4]);
                break;
            case 'D': // D 0 <vnum habitación> <dirección> <estado>
                reset.vnumRoom = parseInt(parts[2]);
                reset.direction = parseInt(parts[3]);
                reset.state = parseInt(parts[4]);
                break;
            case 'R': // R 0 <vnum habitación> <clase de maze>
                reset.vnumRoom = parseInt(parts[2]);
                reset.mazeClass = parseInt(parts[3]);
                break;
            case 'S': // End of resets section
                // This 'S' is handled by the section splitting, but good to have here for completeness
                break;
            default:
                console.warn('Unknown reset type:', line);
        }
        if (type !== 'S') { // Don't add the final 'S' as a reset object
            resets.push(reset);
        }
    }
    return resets;
}

function populateResetsSection(resetsData) {
    const container = document.getElementById('resets-list');
    // Clear existing resets first (already done by clearAllForms, but good to be explicit)
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    resetsData.forEach(reset => {
        const resetRowTemplate = document.getElementById('reset-row-template');
        const newResetRow = resetRowTemplate.content.cloneNode(true);
        const addedResetRowElement = newResetRow.querySelector('.reset-row');

        addedResetRowElement.querySelector('.reset-type-indicator').textContent = reset.type;

        const resetInputsContainer = addedResetRowElement.querySelector('.reset-inputs');
        let specificTemplate;

        switch (reset.type) {
            case 'M':
                specificTemplate = document.getElementById('reset-m-template');
                const mInputs = specificTemplate.content.cloneNode(true);
                mInputs.querySelector('.reset-mob-vnum').value = reset.vnumMob;
                mInputs.querySelector('.reset-limit-total').value = reset.limitTotal;
                mInputs.querySelector('.reset-room-vnum').value = reset.vnumRoom;
                mInputs.querySelector('.reset-limit-local').value = reset.limitLocal;
                resetInputsContainer.appendChild(mInputs);
                break;
            case 'O':
                specificTemplate = document.getElementById('reset-o-template');
                const oInputs = specificTemplate.content.cloneNode(true);
                oInputs.querySelector('.reset-obj-vnum').value = reset.vnumObject;
                oInputs.querySelector('.reset-limit').value = reset.limit;
                oInputs.querySelector('.reset-room-vnum').value = reset.vnumRoom;
                resetInputsContainer.appendChild(oInputs);
                break;
            case 'P':
                specificTemplate = document.getElementById('reset-p-template');
                const pInputs = specificTemplate.content.cloneNode(true);
                pInputs.querySelector('.reset-content-vnum').value = reset.vnumContent;
                pInputs.querySelector('.reset-limit').value = reset.limit;
                pInputs.querySelector('.reset-container-vnum').value = reset.vnumContainer;
                pInputs.querySelector('.reset-limit-local').value = reset.limitLocal;
                resetInputsContainer.appendChild(pInputs);
                break;
            case 'G':
                specificTemplate = document.getElementById('reset-g-template');
                const gInputs = specificTemplate.content.cloneNode(true);
                gInputs.querySelector('.reset-obj-vnum').value = reset.vnumObject;
                gInputs.querySelector('.reset-limit').value = reset.limit;
                resetInputsContainer.appendChild(gInputs);
                break;
            case 'E':
                specificTemplate = document.getElementById('reset-e-template');
                const eInputs = specificTemplate.content.cloneNode(true);
                eInputs.querySelector('.reset-obj-vnum').value = reset.vnumObject;
                eInputs.querySelector('.reset-limit').value = reset.limit;
                eInputs.querySelector('.reset-wear-location').value = reset.wearLocation;
                resetInputsContainer.appendChild(eInputs);
                break;
            case 'D':
                specificTemplate = document.getElementById('reset-d-template');
                const dInputs = specificTemplate.content.cloneNode(true);
                dInputs.querySelector('.reset-room-vnum').value = reset.vnumRoom;
                dInputs.querySelector('.reset-direction').value = reset.direction;
                dInputs.querySelector('.reset-state').value = reset.state;
                resetInputsContainer.appendChild(dInputs);
                break;
            case 'R':
                specificTemplate = document.getElementById('reset-r-template');
                const rInputs = specificTemplate.content.cloneNode(true);
                rInputs.querySelector('.reset-room-vnum').value = reset.vnumRoom;
                rInputs.querySelector('.reset-maze-class').value = reset.mazeClass;
                resetInputsContainer.appendChild(rInputs);
                break;
            default:
                console.warn('Unknown reset type for population:', reset.type, reset);
        }

        container.appendChild(addedResetRowElement);
    });
}

function parseSetSection(sectionContent) {
    const sets = [];
    const lines = sectionContent.split('\n').filter(line => line.trim() !== '');
    let i = 0;
    while (i < lines.length) {
        if (lines[i].startsWith('#')) { // Should be #<ID>
            const set = {};
            set.id = parseInt(lines[i].substring(1));
            i++;
            set.name = lines[i++].replace(/~$/, '').trim();
            set.tiers = [];

            while (i < lines.length && lines[i].trim() !== 'End') {
                const line = lines[i].trim();
                if (line.startsWith('T ')) {
                    const tier = { pieces: parseInt(line.substring(2).trim()), applies: [], affects: [] };
                    set.tiers.push(tier);
                } else if (line.startsWith('A ')) {
                    const parts = line.substring(2).trim().split(' ').map(Number);
                    if (set.tiers.length > 0) {
                        set.tiers[set.tiers.length - 1].applies.push({ location: parts[0], modifier: parts[1] });
                    }
                } else if (line.startsWith('F ')) {
                    const parts = line.substring(2).trim().split(' ');
                    if (set.tiers.length > 0) {
                        set.tiers[set.tiers.length - 1].affects.push({ type: parts[0], bits: parts.slice(1).join(' ') });
                    }
                }
                i++;
            }
            sets.push(set);
        }
        i++; // Move to the next line, skipping End or #0
    }
    return sets;
}

function populateSetSection(setsData) {
    const container = document.getElementById('sets-container');
    const template = document.getElementById('set-template');

    setsData.forEach(set => {
        const newCard = template.content.cloneNode(true);
        const addedCardElement = newCard.querySelector('.set-card');

        addedCardElement.querySelector('.set-id').value = set.id;
        addedCardElement.querySelector('.set-name').value = set.name;

        // Populate Tiers, Applies, Affects
        if (set.tiers.length > 0) {
            populateTiers(addedCardElement, set.tiers);
        }

        // Update ID and Name display in header
        addedCardElement.querySelector('.set-id-display').textContent = set.id;
        addedCardElement.querySelector('.set-name-display').textContent = set.name;

        container.appendChild(addedCardElement);
    });
}

function populateTiers(containerElement, tiersData) {
    const tiersContainer = containerElement.querySelector('.tiers-container');
    const tierTemplate = document.getElementById('tier-template');

    tiersData.forEach(tier => {
        const newTier = tierTemplate.content.cloneNode(true);
        const addedTierElement = newTier.querySelector('.tier-card');

        addedTierElement.querySelector('.tier-pieces').value = tier.pieces;

        if (tier.applies.length > 0) {
            populateApplies(addedTierElement, tier.applies);
        }
        if (tier.affects.length > 0) {
            populateAffects(addedTierElement, tier.affects);
        }

        tiersContainer.appendChild(addedTierElement);
    });
}

function parseShopsSection(sectionContent) {
    const shops = [];
    const lines = sectionContent.split('\n').map(l => l.trim()).filter(l => l !== '');
    lines.forEach(line => {
        if (line === '0') return;
        let comment = '';
        let data = line;
        const idx = line.indexOf('*');
        if (idx !== -1) {
            comment = line.substring(idx + 1).trim();
            data = line.substring(0, idx).trim();
        }
        const parts = data.split(/\s+/).map(Number);
        if (parts.length < 10) return;
        const [vnum, v0, v1, v2, v3, v4, buyProfit, sellProfit, open, close] = parts;
        shops.push({
            vnumSeller: vnum,
            buyTypes: [v0, v1, v2, v3, v4],
            buyProfit,
            sellProfit,
            openHour: open,
            closeHour: close,
            comment
        });
    });
    return shops;
}

function populateShopsSection(shopsData) {
    const container = document.getElementById('shops-container');
    const template = document.getElementById('shop-template');

    shopsData.forEach(shop => {
        const fragment = template.content.cloneNode(true);
        const card = fragment.querySelector('.shop-card');
        poblarSelectsTienda(card);

        card.querySelector('.shop-vnum').value = shop.vnumSeller;
        const typeSelects = card.querySelectorAll('.shop-buy-type');
        shop.buyTypes.forEach((val, idx) => {
            if (typeSelects[idx]) typeSelects[idx].value = String(val);
        });
        card.querySelector('.shop-buy-profit').value = String(shop.buyProfit);
        card.querySelector('.shop-sell-profit').value = String(shop.sellProfit);
        card.querySelector('.shop-open-hour').value = String(shop.openHour);
        card.querySelector('.shop-close-hour').value = String(shop.closeHour);
        const commentInput = card.querySelector('.shop-comment');
        if (shop.comment) commentInput.value = shop.comment;
        card.querySelector('.shop-comment-display').textContent = shop.comment || '';
        card.querySelector('.shop-vnum-display').textContent = shop.vnumSeller;

        container.appendChild(fragment);
    });
}

function parseSpecialsSection(sectionContent) {
    const specials = [];
    const lines = sectionContent.split('\n').filter(line => line.trim() !== '');
    let i = 0;
    while (i < lines.length) {
        if (lines[i].trim() === 'S') { // End of specials section
            i++;
            continue;
        }
        const special = {};
        special.vnumMob = parseInt(lines[i++]);
        special.type = lines[i++].trim();

        if (lines[i] && lines[i].startsWith('*')) {
            special.comment = lines[i++].substring(1).trim();
        } else {
            special.comment = '';
        }
        specials.push(special);
    }
    return specials;
}

function populateSpecialsSection(specialsData) {
    const container = document.getElementById('specials-container');
    const template = document.getElementById('special-template');

    specialsData.forEach(special => {
        const newCard = template.content.cloneNode(true);
        const addedCardElement = newCard.querySelector('.special-card');
        poblarSelectEspecial(addedCardElement);

        addedCardElement.querySelector('.special-vnum').value = special.vnumMob;
        const select = addedCardElement.querySelector('.special-name');
        select.value = special.type;
        select.dispatchEvent(new Event('change'));
        select.dispatchEvent(new Event('input'));
        if (special.comment) {
            addedCardElement.querySelector('.special-comment').value = special.comment;
        }
        addedCardElement.querySelector('.special-vnum-display').textContent = special.vnumMob;
        addedCardElement.querySelector('.special-name-display').textContent = special.type;

        container.appendChild(addedCardElement);
    });
}

function parseProgsSection(sectionContent) {
    const progs = [];
    const lines = sectionContent.split('\n').filter(line => line.trim() !== '');
    let i = 0;
    while (i < lines.length) {
        if (lines[i].startsWith('#')) {
            const prog = {};
            prog.vnum = parseInt(lines[i].substring(1));
            i++;
            // Read code block until next # or end of section
            let codeBlock = [];
            while (i < lines.length && !lines[i].startsWith('#') && lines[i].trim() !== '0') {
                codeBlock.push(lines[i]);
                i++;
            }
            prog.code = codeBlock.join('\n');
            progs.push(prog);
        }
        i++; // Move to the next line, skipping #0 or S
    }
    return progs;
}

function populateProgsSection(progsData, containerId, templateId) {
    const container = document.getElementById(containerId);
    const template = document.getElementById(templateId);

    progsData.forEach(prog => {
        const newCard = template.content.cloneNode(true);
        const addedCardElement = newCard.querySelector('.prog-card');

        addedCardElement.querySelector('.prog-vnum').value = prog.vnum;
        addedCardElement.querySelector('.prog-code').value = prog.code;

        // Update Vnum display in header
        addedCardElement.querySelector('.prog-vnum-display').textContent = prog.vnum;

        container.appendChild(addedCardElement);
    });
}

function populateCheckboxesFromFlags(containerElement, checkboxGroupSelector, flagString) {
    if (!flagString || flagString === '0') return;
    const checkboxes = containerElement.querySelectorAll(`${checkboxGroupSelector} input[type="checkbox"]`);
    checkboxes.forEach(checkbox => {
        if (flagString.includes(checkbox.value)) {
            checkbox.checked = true;
        }
    });
}

function clearAllForms() {
    // Clear Area Form
    document.getElementById('area-filename').value = '';
    document.getElementById('area-name').value = '';
    document.getElementById('area-min-level').value = '';
    document.getElementById('area-max-level').value = '';
    document.getElementById('area-creator').value = '';
    document.getElementById('area-vnum-start').value = '';
    document.getElementById('area-vnum-end').value = '';
    document.getElementById('area-region').value = '';

    // Clear Dynamic Sections
    const dynamicContainers = [
        'mobiles-container',
        'objects-container',
        'rooms-container',
        'resets-list', // Resets are handled differently, but clear its content
        'sets-container',
        'shops-container',
        'specials-container',
        'mobprogs-container',
        'objprogs-container',
        'roomprogs-container'
    ];

    dynamicContainers.forEach(containerId => {
        const container = document.getElementById(containerId);
        if (container) {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        }
    });
}

