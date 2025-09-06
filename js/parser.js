import { populateAffectBitSelect, populateObjectTypeSelect, updateObjectValuesUI } from './objects.js';
import { refrescarOpcionesResets } from './resets.js';
import { poblarSelectsTienda } from './shops.js';
import { poblarSelectEspecial } from './specials.js';
import { gameData } from './config.js';
import { inicializarTarjetaMob } from './mobiles.js';
import { inicializarTarjetaRoom } from './rooms.js';

// Rellena un <select> con las opciones indicadas y un placeholder inicial.
// Se usa al reconstruir la sección de resets al importar un área.
function poblarSelectBasico(select, opciones) {
    const valorPrevio = select.dataset.value || '';
    select.innerHTML = '';
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = '-- selecciona --';
    select.appendChild(placeholder);
    opciones.forEach(opt => {
        const opcion = document.createElement('option');
        opcion.value = opt.value;
        opcion.textContent = opt.label;
        select.appendChild(opcion);
    });
    if (valorPrevio) select.value = valorPrevio;
}

function limpiarAdvertencias() {
    ['advertencias-mobiles', 'advertencias-objetos', 'advertencias-rooms', 'advertencias-resets'].forEach(id => {
        const lista = document.getElementById(id);
        if (lista) lista.innerHTML = '';
    });
}

function agregarAdvertencias(mensajes, categoria) {
    const ids = {
        'MOBILES': 'advertencias-mobiles',
        'OBJETOS': 'advertencias-objetos',
        'ROOMS': 'advertencias-rooms',
        'RESETS': 'advertencias-resets'
    };
    const lista = document.getElementById(ids[categoria]);
    if (!lista) return;
    mensajes.forEach(msj => {
        const item = document.createElement('li');
        item.textContent = msj;
        lista.appendChild(item);
    });
}

export function parseAreFile(content) {
    console.log('Parsing .are file...');
    limpiarAdvertencias();
    clearAllForms(); // Clear existing forms before parsing and populating

    const sections = {};
    let currentSection = '';
    let sectionContent = [];
    // Lista de secciones principales del formato .are
    const seccionesPrincipales = [
        '#AREA',
        '#MOBILES',
        '#OBJECTS',
        '#ROOMS',
        '#RESETS',
        '#SET',
        '#SHOPS',
        '#SPECIALS',
        '#MOBPROGS',
        '#OBJPROGS',
        '#ROOMPROGS',
        '#HELPS'
    ];

    const lineas = content.split(/\r?\n/);

    for (const linea of lineas) {
        const limpia = linea.trim();
        if (seccionesPrincipales.includes(limpia)) {
            if (currentSection) {
                sections[currentSection] = sectionContent.join('\n');
            }
            currentSection = limpia;
            sectionContent = [];
        } else if (limpia === '#$') {
            if (currentSection) {
                sections[currentSection] = sectionContent.join('\n');
            }
            currentSection = '';
            sectionContent = [];
        } else {
            sectionContent.push(linea);
        }
    }

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
        parsedData.resets = parseResetsSection(sections['#RESETS'], parsedData);
        populateResetsSection(parsedData.resets);
    }

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

    // Formato esperado: filename, nombre, linea de niveles + creador + región, vnums
    areaData.filename = lines[0] ? lines[0].replace(/~$/, '').trim() : '';
    areaData.name = lines[1] ? lines[1].replace(/~$/, '').trim() : '';

    const lineaNivel = lines[2] || '';
    const levelMatch = lineaNivel.match(/\{\s*(\d+)\s*[-\s]*\s*(\d+)\s*\}/);
    areaData.minLevel = levelMatch ? parseInt(levelMatch[1]) : '';
    areaData.maxLevel = levelMatch ? parseInt(levelMatch[2]) : '';

    // Extraer creador y región del resto de la línea
    let resto = lineaNivel.replace(/\{.*?\}/, '').replace(/~$/, '').trim();
    const partes = resto.split(/\s+/);
    areaData.creator = partes.shift() || '';
    areaData.region = partes.join(' ') || '';

    const vnumMatch = lines[3] ? lines[3].match(/(\d+)\s+(\d+)/) : null;
    areaData.vnumStart = vnumMatch ? parseInt(vnumMatch[1]) : '';
    areaData.vnumEnd = vnumMatch ? parseInt(vnumMatch[2]) : '';

    return areaData;
}

function populateAreaForm(areaData) {
    document.getElementById('area-filename').value = areaData.filename;
    document.getElementById('area-name').value = areaData.name;
    document.getElementById('area-min-level').value = areaData.minLevel;
    document.getElementById('area-max-level').value = areaData.maxLevel;
    document.getElementById('area-creator').value = areaData.creator;

    const vnumStartInput = document.getElementById('area-vnum-start');
    const vnumEndInput = document.getElementById('area-vnum-end');

    vnumStartInput.value = areaData.vnumStart;
    vnumEndInput.value = areaData.vnumEnd;

    // Actualiza el aviso de rango de VNUMs tras importar un área
    vnumStartInput.dispatchEvent(new Event('input'));
    vnumEndInput.dispatchEvent(new Event('input'));

    document.getElementById('area-region').value = areaData.region;
}

function parseMobilesSection(sectionContent) {
    const mobiles = [];
    const lineas = sectionContent.split('\n');
    let i = 0;

    while (i < lineas.length) {
        const linea = lineas[i].trim();
        if (linea === '#0') break; // Fin de la sección
        if (!linea.startsWith('#')) { i++; continue; }

        const mob = {};
        mob.vnum = parseInt(linea.substring(1));
        i++;
        mob.keywords = lineas[i++].replace(/~$/, '').trim();
        mob.shortDesc = lineas[i++].replace(/~$/, '').trim();

        // Descripciones multilínea
        const longRes = extraerTextoHastaTilde(lineas, i);
        mob.longDesc = longRes.texto.trim();
        i = longRes.indice;

        const lookRes = extraerTextoHastaTilde(lineas, i);
        mob.lookDesc = lookRes.texto.trim();
        i = lookRes.indice;

        mob.race = lineas[i++].replace(/~$/, '').trim();

        // Act Flags, Affect Flags, Alineamiento, Grupo
        const lineaAct = lineas[i++].trim().split(/\s+/);
        mob.actFlags = lineaAct[0] || '0';
        mob.affectFlags = lineaAct[1] || '0';
        mob.alignment = parseInt(lineaAct[2]) || 0;
        mob.group = parseInt(lineaAct[3]) || 0;

        // Nivel, Hitroll y dados
        const lineaStats = lineas[i++].trim().split(/\s+/);
        mob.level = parseInt(lineaStats[0]) || 0;
        mob.hitroll = parseInt(lineaStats[1]) || 0;
        mob.hpDice = parsearDados(lineaStats[2]);
        mob.manaDice = parsearDados(lineaStats[3]);
        mob.damageDice = parsearDados(lineaStats[4]);
        mob.damageType = lineaStats[5] || '';

        // Armaduras
        const lineaAc = lineas[i++].trim().split(/\s+/);
        mob.acPierce = parseInt(lineaAc[0]) || 0;
        mob.acBash = parseInt(lineaAc[1]) || 0;
        mob.acSlash = parseInt(lineaAc[2]) || 0;
        mob.acMagic = parseInt(lineaAc[3]) || 0;

        // Flags ofensivas e inmunidades
        const lineaRes = lineas[i++].trim().split(/\s+/);
        mob.offensiveFlags = lineaRes[0] || '0';
        mob.immFlags = lineaRes[1] || '0';
        mob.resFlags = lineaRes[2] || '0';
        mob.vulFlags = lineaRes[3] || '0';

        // Posiciones, sexo y oro
        const lineaPos = lineas[i++].trim().split(/\s+/);
        mob.startPos = lineaPos[0];
        mob.defaultPos = lineaPos[1];
        mob.sex = lineaPos[2];
        mob.gold = parseInt(lineaPos[3]) || 0;

        // Forma, partes, tamaño y material
        const lineaForm = lineas[i++].trim().split(/\s+/);
        mob.form = lineaForm[0] || '0';
        mob.parts = lineaForm[1] || '0';
        mob.size = lineaForm[2] || '';
        mob.material = (lineaForm[3] || '').replace(/~$/, '').trim();

        // Saltar líneas adicionales como mobprogs
        while (i < lineas.length && !lineas[i].trim().startsWith('#') && lineas[i].trim() !== '') {
            i++;
        }

        mobiles.push(mob);
    }
    return mobiles;
}

function extraerTextoHastaTilde(lineas, inicio) {
    const texto = [];
    let indice = inicio;
    while (indice < lineas.length && lineas[indice].trim() !== '~') {
        texto.push(lineas[indice]);
        indice++;
    }
    indice++; // saltar la línea con '~'
    return { texto: texto.join('\n'), indice };
}

function parsearDados(cadena) {
    const match = cadena ? cadena.match(/(\d+)d(\d+)\+(\d+)/) : null;
    if (match) {
        return { num: parseInt(match[1]), lados: parseInt(match[2]), bono: parseInt(match[3]) };
    }
    return { num: 0, lados: 0, bono: 0 };
}

function populateMobilesSection(mobilesData) {
    const container = document.getElementById('mobiles-container');
    const template = document.getElementById('mob-template');
    const advertencias = [];

    mobilesData.forEach(mob => {
        const newCard = template.content.cloneNode(true);
        const addedCardElement = newCard.querySelector('.mob-card');

        // Poblar listas desplegables de raza y tipo de daño antes de asignar valores
        const raceSelect = addedCardElement.querySelector('.mob-race');
        if (raceSelect) {
            gameData.races.forEach(race => {
                const option = document.createElement('option');
                option.value = race;
                option.textContent = race;
                raceSelect.appendChild(option);
            });
        }

        const damageTypeSelect = addedCardElement.querySelector('.mob-dam-type');
        if (damageTypeSelect) {
            gameData.damageTypes.forEach(type => {
                const option = document.createElement('option');
                option.value = type.value;
                option.textContent = type.description;
                damageTypeSelect.appendChild(option);
            });
        }

        // Función auxiliar para verificar valores de <select>
        const verificarValor = (selector, valor, nombreCampo, valoresPermitidos = null) => {
            const select = addedCardElement.querySelector(selector);
            if (!select) return;
            select.value = valor;
            const opciones = valoresPermitidos || Array.from(select.options).map(o => o.value);
            if (!opciones.includes(valor)) {
                advertencias.push(`${nombreCampo} desconocido en mob ${mob.vnum} (${mob.shortDesc}): ${valor}`);
            }
        };

        // Función auxiliar para poblar y verificar flags por leyenda
        const verificarFlags = (leyenda, flags, nombreCampo) => {
            poblarCheckboxesPorLeyenda(addedCardElement, leyenda, flags);
            if (!flags || flags === '0') return;
            let valores = [];
            const fieldsets = addedCardElement.querySelectorAll('fieldset');
            for (const fieldset of fieldsets) {
                const legend = fieldset.querySelector('legend');
                if (legend && legend.textContent.trim() === leyenda) {
                    valores = Array.from(fieldset.querySelectorAll('input[type="checkbox"]')).map(cb => cb.value);
                    break;
                }
            }
            let restante = flags;
            valores.sort((a, b) => b.length - a.length).forEach(val => {
                restante = restante.split(val).join('');
            });
            if (restante.trim() !== '') {
                advertencias.push(`${nombreCampo} desconocidos en mob ${mob.vnum} (${mob.shortDesc}): ${restante}`);
            }
        };

        // Asignación de valores básicos
        addedCardElement.querySelector('.mob-vnum').value = mob.vnum;
        addedCardElement.querySelector('.mob-keywords').value = mob.keywords;
        addedCardElement.querySelector('.mob-short-desc').value = mob.shortDesc;
        addedCardElement.querySelector('.mob-long-desc').value = mob.longDesc;
        addedCardElement.querySelector('.mob-look-desc').value = mob.lookDesc;
        verificarValor('.mob-race', mob.race, 'Raza', gameData.races);
        addedCardElement.querySelector('.mob-alignment').value = mob.alignment;
        addedCardElement.querySelector('.mob-group').value = mob.group;
        addedCardElement.querySelector('.mob-level').value = mob.level;
        addedCardElement.querySelector('.mob-hitroll').value = mob.hitroll;
        verificarValor('.mob-sex', mob.sex, 'Sexo');
        addedCardElement.querySelector('.mob-gold').value = mob.gold;
        verificarValor('.mob-size', mob.size, 'Tamaño');
        addedCardElement.querySelector('.mob-material').value = mob.material;

        // Flags (Act, Affect, Offensive, Imm/Res/Vul, Form, Parts)
        verificarFlags('Act Flags', mob.actFlags, 'Act Flags');
        verificarFlags('Afect Flags', mob.affectFlags, 'Afect Flags');
        verificarFlags('Ofensivo Flags', mob.offensiveFlags, 'Ofensivo Flags');
        verificarFlags('Inmunidades', mob.immFlags, 'Inmunidades');
        verificarFlags('Resistencias', mob.resFlags, 'Resistencias');
        verificarFlags('Vulnerabilidades', mob.vulFlags, 'Vulnerabilidades');
        verificarFlags('Forma', mob.form, 'Forma');
        verificarFlags('Partes', mob.parts, 'Partes');

        // Dados (HP, Mana, Daño)
        addedCardElement.querySelector('.mob-hp-dice-num').value = mob.hpDice.num;
        addedCardElement.querySelector('.mob-hp-dice-sides').value = mob.hpDice.lados;
        addedCardElement.querySelector('.mob-hp-dice-bonus').value = mob.hpDice.bono;
        addedCardElement.querySelector('.mob-mana-dice-num').value = mob.manaDice.num;
        addedCardElement.querySelector('.mob-mana-dice-sides').value = mob.manaDice.lados;
        addedCardElement.querySelector('.mob-mana-dice-bonus').value = mob.manaDice.bono;
        addedCardElement.querySelector('.mob-dam-dice-num').value = mob.damageDice.num;
        addedCardElement.querySelector('.mob-dam-dice-sides').value = mob.damageDice.lados;
        addedCardElement.querySelector('.mob-dam-dice-bonus').value = mob.damageDice.bono;
        verificarValor('.mob-dam-type', mob.damageType, 'Tipo de daño', gameData.damageTypes.map(dt => dt.value));

        // Armaduras
        addedCardElement.querySelector('.mob-ac-pierce').value = mob.acPierce;
        addedCardElement.querySelector('.mob-ac-bash').value = mob.acBash;
        addedCardElement.querySelector('.mob-ac-slash').value = mob.acSlash;
        addedCardElement.querySelector('.mob-ac-magic').value = mob.acMagic;

        // Posiciones
        verificarValor('.mob-start-pos', mob.startPos, 'Posición inicial');
        verificarValor('.mob-default-pos', mob.defaultPos, 'Posición por defecto');

        // Actualizar encabezado
        addedCardElement.querySelector('.mob-vnum-display').textContent = mob.vnum;
        addedCardElement.querySelector('.mob-name-display').textContent = mob.shortDesc;

        container.appendChild(addedCardElement);
        // No ajusta estadísticas al importar para preservar valores originales
        inicializarTarjetaMob(addedCardElement, false);
    });

    if (advertencias.length > 0) {
        alert('Advertencias al importar mobs:\n' + advertencias.join('\n'));
        agregarAdvertencias(advertencias, 'MOBILES');
    }
}

function parseObjectsSection(sectionContent) {
    const objetos = [];
    const lineas = sectionContent.split('\n');
    let i = 0;
    while (i < lineas.length) {
        const linea = lineas[i].trim();
        if (linea === '#0') break; // Fin de la sección
        if (!linea.startsWith('#')) { i++; continue; }

        const obj = {};
        obj.vnum = parseInt(linea.substring(1));
        i++;
        obj.keywords = (lineas[i++] || '').replace(/~$/, '').trim();
        obj.shortDesc = (lineas[i++] || '').replace(/~$/, '').trim();
        // La descripción larga puede ocupar varias líneas hasta encontrar una que termine en "~"
        const descLarga = [];
        while (i < lineas.length) {
            const lineaDesc = lineas[i];
            descLarga.push(lineaDesc.replace(/~$/, ''));
            i++;
            if (lineaDesc.trim().endsWith('~')) break;
        }
        obj.longDesc = descLarga.join('\n').trim();
        obj.material = (lineas[i++] || '').replace(/~$/, '').trim();

        const tipoLinea = (lineas[i++] || '').trim().split(/\s+/);
        obj.type = tipoLinea[0] || '';
        obj.flags = tipoLinea[1] || '0';
        obj.wearLocation = tipoLinea[2] || '0';

        const vLinea = (lineas[i++] || '').trim();
        const vValores = vLinea.match(/'[^']*'|\S+/g) || [];
        obj.v0 = vValores[0] || '0';
        obj.v1 = vValores[1] || '0';
        obj.v2 = vValores[2] || '0';
        obj.v3 = vValores[3] || '0';
        obj.v4 = vValores[4] || '0';

        const stats = (lineas[i++] || '').trim().split(/\s+/);
        obj.level = parseInt(stats[0]) || 0;
        obj.weight = parseInt(stats[1]) || 0;
        obj.price = parseInt(stats[2]) || 0;
        obj.containerType = stats[3] || 'P';
        obj.isDrinkContainer = (obj.containerType === 'G');

        obj.set = null;
        obj.applies = [];
        obj.affects = [];
        obj.extraDescriptions = [];

        while (i < lineas.length) {
            const opt = lineas[i].trim();
            if (opt === '' || opt.startsWith('#')) break;
            if (opt === 'S' || opt.startsWith('S ')) {
                const partes = opt.split(/\s+/);
                obj.set = partes[1] || '';
                i++;
            } else if (opt === 'A' || opt.startsWith('A ')) {
                const partes = (opt === 'A' ? lineas[i + 1] : opt.substring(2)).trim().split(/\s+/).map(Number);
                obj.applies.push({ location: partes[0], modifier: partes[1] });
                i += (opt === 'A') ? 2 : 1;
            } else if (opt.startsWith('F ')) {
                const partes = opt.substring(2).trim().split(/\s+/);
                obj.affects.push({ type: partes[0], bits: partes.slice(3).join('') });
                i++;
            } else if (opt === 'E') {
                const keywords = (lineas[i + 1] || '').replace(/~$/, '').trim();
                const descRes = extraerTextoHastaTilde(lineas, i + 2);
                obj.extraDescriptions.push({ keywords, description: descRes.texto.trim() });
                i = descRes.indice;
            } else {
                i++;
            }
        }
        objetos.push(obj);
    }
    return objetos;
}

function populateObjectsSection(objectsData) {
    const container = document.getElementById('objects-container');
    const template = document.getElementById('object-template');
    const advertencias = [];

    objectsData.forEach(obj => {
        const newCard = template.content.cloneNode(true);
        const addedCardElement = newCard.querySelector('.object-card');

        populateObjectTypeSelect(addedCardElement);

        const tiposPermitidos = gameData.objectTypes.map(t => typeof t === 'object' ? t.value : t);

        const verificarValor = (selector, valor, nombreCampo, valoresPermitidos = null) => {
            const select = addedCardElement.querySelector(selector);
            if (!select) return;
            select.value = valor;
            const opciones = valoresPermitidos || Array.from(select.options).map(o => o.value);
            if (!opciones.includes(valor)) {
                advertencias.push(`${nombreCampo} desconocido en objeto ${obj.vnum} (${obj.shortDesc}): ${valor}`);
            }
        };

        const verificarFlags = (leyenda, flags, nombreCampo) => {
            poblarCheckboxesPorLeyenda(addedCardElement, leyenda, flags);
            if (!flags || flags === '0') return;
            let valores = [];
            const fieldsets = addedCardElement.querySelectorAll('fieldset');
            for (const fieldset of fieldsets) {
                const legend = fieldset.querySelector('legend');
                if (legend && legend.textContent.trim() === leyenda) {
                    valores = Array.from(fieldset.querySelectorAll('input[type="checkbox"]')).map(cb => cb.value);
                    break;
                }
            }
            let restante = flags;
            valores.sort((a, b) => b.length - a.length).forEach(val => {
                restante = restante.split(val).join('');
            });
            if (restante.trim() !== '') {
                advertencias.push(`${nombreCampo} desconocidos en objeto ${obj.vnum} (${obj.shortDesc}): ${restante}`);
            }
        };

        verificarValor('.obj-type', obj.type, 'Tipo de objeto', tiposPermitidos);
        updateObjectValuesUI(addedCardElement);

        addedCardElement.querySelector('.obj-vnum').value = obj.vnum;
        addedCardElement.querySelector('.obj-keywords').value = obj.keywords;
        addedCardElement.querySelector('.obj-short-desc').value = obj.shortDesc;
        addedCardElement.querySelector('.obj-long-desc').value = obj.longDesc;
        addedCardElement.querySelector('.obj-material').value = obj.material;
        // if (obj.material && !gameData.materials.includes(obj.material)) {
        //     advertencias.push(`Material desconocido en objeto ${obj.vnum} (${obj.shortDesc}): ${obj.material}`);
        // }

        verificarFlags('Flags', obj.flags, 'Flags');
        verificarFlags('Lugar de Vestir', obj.wearLocation, 'Lugar de Vestir');

        const verificarV = (indice, valor) => {
            const campo = addedCardElement.querySelector(`.obj-v${indice}`);
            if (!campo) return;
            if (campo.tagName.toLowerCase() === 'select') {
                const opciones = Array.from(campo.options).map(o => o.value);
                const normalizar = v => v.replace(/^'(.*)'$/, '$1');
                const opcionesNorm = opciones.map(normalizar);
                const valorNorm = normalizar(valor);
                const idx = opcionesNorm.indexOf(valorNorm);
                if (idx !== -1) {
                    campo.value = opciones[idx];
                } else if (valor.startsWith("'") && valor.endsWith("'")) {
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.className = campo.className;
                    input.value = valor;
                    campo.replaceWith(input);
                    advertencias.push(`V${indice} desconocido en objeto ${obj.vnum} (${obj.shortDesc}): ${valor}`);
                } else {
                    campo.value = valor;
                    advertencias.push(`V${indice} desconocido en objeto ${obj.vnum} (${obj.shortDesc}): ${valor}`);
                }
            } else {
                campo.value = valor;
            }
        };

        for (let v = 0; v <= 4; v++) {
            const vConfig = gameData.objectValueOptions[obj.type]?.[`v${v}`];
            if (vConfig && vConfig.type === 'checkbox') {
                const legend = gameData.objectValueLabels[obj.type]?.[v] || `V${v}`;
                verificarFlags(legend, obj[`v${v}`], legend);
            } else {
                verificarV(v, obj[`v${v}`]);
            }
        }

        addedCardElement.querySelector('.obj-level').value = obj.level;
        addedCardElement.querySelector('.obj-weight').value = obj.weight;
        addedCardElement.querySelector('.obj-price').value = obj.price;
        addedCardElement.querySelector('.obj-is-drink-container').checked = obj.isDrinkContainer;
        if (obj.containerType !== 'P' && obj.containerType !== 'G') {
            advertencias.push(`Tipo de contenedor desconocido en objeto ${obj.vnum} (${obj.shortDesc}): ${obj.containerType}`);
        }

        if (obj.set) {
            const setInput = addedCardElement.querySelector('.obj-set-id');
            if (setInput) setInput.value = obj.set;
        }

        if (obj.applies.length > 0) {
            populateApplies(addedCardElement, obj.applies, advertencias, obj);
        }
        if (obj.affects.length > 0) {
            populateAffects(addedCardElement, obj.affects, advertencias, obj);
        }
        if (obj.extraDescriptions.length > 0) {
            populateExtraDescriptions(addedCardElement, obj.extraDescriptions);
        }

        addedCardElement.querySelector('.obj-vnum-display').textContent = obj.vnum;
        addedCardElement.querySelector('.obj-name-display').textContent = obj.shortDesc;

        container.appendChild(addedCardElement);
    });

    if (advertencias.length > 0) {
        alert('Advertencias al importar objetos:\n' + advertencias.join('\n'));
        agregarAdvertencias(advertencias, 'OBJETOS');
    }
}

function populateApplies(containerElement, appliesData, advertencias = [], obj = null) {
    const appliesContainer = containerElement.querySelector('.applies-container');
    const applyTemplate = document.getElementById('apply-template');

    appliesData.forEach(apply => {
        const newApply = applyTemplate.content.cloneNode(true);
        const addedApplyElement = newApply.querySelector('.sub-item-row');

        const select = addedApplyElement.querySelector('.apply-location');
        select.value = apply.location;
        const opciones = Array.from(select.options).map(o => o.value);
        if (!opciones.includes(String(apply.location)) && obj) {
            advertencias.push(`Apply desconocido en objeto ${obj.vnum} (${obj.shortDesc}): ${apply.location}`);
        }
        addedApplyElement.querySelector('.apply-modifier').value = apply.modifier;

        appliesContainer.appendChild(addedApplyElement);
    });
}

function populateAffects(containerElement, affectsData, advertencias = [], obj = null) {
    const affectsContainer = containerElement.querySelector('.affects-container');
    const affectTemplate = document.getElementById('affect-template');

    affectsData.forEach(affect => {
        const newAffect = affectTemplate.content.cloneNode(true);
        const addedAffectElement = newAffect.querySelector('.sub-item-row');

        const typeSelect = addedAffectElement.querySelector('.affect-type');
        const tipos = Array.from(typeSelect.options).map(o => o.value);
        typeSelect.value = affect.type;
        if (!tipos.includes(affect.type) && obj) {
            advertencias.push(`Tipo de affect desconocido en objeto ${obj.vnum} (${obj.shortDesc}): ${affect.type}`);
        }
        populateAffectBitSelect(addedAffectElement);
        const bitSelect = addedAffectElement.querySelector('.affect-bits');
        bitSelect.value = affect.bits;
        const opciones = Array.from(bitSelect.options).map(o => o.value);
        if (!opciones.includes(affect.bits) && obj) {
            advertencias.push(`Bits de affect desconocidos en objeto ${obj.vnum} (${obj.shortDesc}): ${affect.bits}`);
        }

        affectsContainer.appendChild(addedAffectElement);
    });
}

function populateExtraDescriptions(containerElement, extraDescriptionsData, advertencias = [], entidad = null) {
    const extraDescsContainer =
        containerElement.querySelector('.extras-container') ||
        containerElement.querySelector('.room-extras-container') ||
        containerElement.querySelector('.extra-descs-container');
    const extraDescTemplate = document.getElementById('extra-desc-template');

    extraDescriptionsData.forEach(extraDesc => {
        const newExtraDesc = extraDescTemplate.content.cloneNode(true);
        const addedExtraDescElement = newExtraDesc.querySelector('.sub-item-row');

        addedExtraDescElement.querySelector('.extra-keyword').value = extraDesc.keywords;
        addedExtraDescElement.querySelector('.extra-desc').value = extraDesc.description;

        if (advertencias && entidad) {
            const id = entidad.name ? `${entidad.vnum} (${entidad.name})` : entidad.vnum;
            if (!extraDesc.keywords) advertencias.push(`Extra sin palabras clave en ${id}`);
            if (!extraDesc.description) advertencias.push(`Extra sin descripción en ${id}`);
        }

        extraDescsContainer.appendChild(addedExtraDescElement);
    });
}

function parseRoomsSection(sectionContent) {
    const habitaciones = [];
    const lineas = sectionContent.split('\n');
    let i = 0;
    while (i < lineas.length) {
        let linea = lineas[i].trim();
        if (linea === '#0') break; // Fin de la sección
        if (linea.startsWith('#')) {
            const room = {
                exits: [],
                extraDescriptions: [],
                manaRegen: '',
                healthRegen: '',
                clan: ''
            };
            room.vnum = parseInt(linea.substring(1));
            i++;
            room.name = lineas[i].replace(/~$/, '').trim();
            i++;

            const descLines = [];
            while (i < lineas.length && !lineas[i].includes('~')) {
                descLines.push(lineas[i]);
                i++;
            }
            descLines.push(lineas[i].replace(/~$/, ''));
            room.description = descLines.join('\n').trim();
            i++;

            const linea4 = lineas[i].trim().split(/\s+/);
            room.flags = linea4[1] || '0';
            room.sectorType = parseInt(linea4[2]) || 0;
            i++;

            while (i < lineas.length) {
                linea = lineas[i].trim();
                if (linea === 'S') { i++; break; }
                if (linea === '') { i++; continue; }

                if (linea.startsWith('D')) {
                    const direction = parseInt(linea.substring(1));
                    i++;
                    const exitDescLines = [];
                    while (i < lineas.length && !lineas[i].includes('~')) {
                        exitDescLines.push(lineas[i]);
                        i++;
                    }
                    exitDescLines.push(lineas[i].replace(/~$/, ''));
                    i++;

                    const keywordLines = [];
                    while (i < lineas.length && !lineas[i].includes('~')) {
                        keywordLines.push(lineas[i]);
                        i++;
                    }
                    keywordLines.push(lineas[i].replace(/~$/, ''));
                    i++;

                    const puerta = lineas[i].trim().split(/\s+/);
                    const doorState = parseInt(puerta[0]);
                    const keyVnum = parseInt(puerta[1]);
                    const destinationVnum = parseInt(puerta[2]);
                    i++;

                    room.exits.push({
                        direction,
                        description: exitDescLines.join('\n').trim(),
                        keywords: keywordLines.join(' ').trim(),
                        doorState,
                        keyVnum,
                        destinationVnum
                    });
                    continue;
                }

                if (linea === 'E') {
                    i++;
                    const keywords = lineas[i].replace(/~$/, '').trim();
                    i++;
                    const extraLines = [];
                    while (i < lineas.length && !lineas[i].includes('~')) {
                        extraLines.push(lineas[i]);
                        i++;
                    }
                    extraLines.push(lineas[i].replace(/~$/, ''));
                    i++;
                    room.extraDescriptions.push({
                        keywords,
                        description: extraLines.join('\n').trim()
                    });
                    continue;
                }

                if (linea.startsWith('M')) {
                    room.manaRegen = parseInt(linea.substring(1).trim());
                    i++;
                    continue;
                }
                if (linea.startsWith('H')) {
                    room.healthRegen = parseInt(linea.substring(1).trim());
                    i++;
                    continue;
                }
                if (linea.startsWith('C')) {
                    room.clan = linea.substring(1).replace(/~$/, '').trim();
                    i++;
                    continue;
                }

                i++;
            }
            habitaciones.push(room);
        } else {
            i++;
        }
    }
    return habitaciones;
}

function populateRoomsSection(roomsData) {
    const container = document.getElementById('rooms-container');
    const template = document.getElementById('room-template');
    const advertencias = [];

    roomsData.forEach(room => {
        const newCard = template.content.cloneNode(true);
        const addedCardElement = newCard.querySelector('.room-card');

        const verificarValor = (selector, valor, nombreCampo) => {
            const select = addedCardElement.querySelector(selector);
            if (!select) return;
            select.value = valor;
            const opciones = Array.from(select.options).map(o => o.value);
            if (!opciones.includes(String(valor))) {
                advertencias.push(`${nombreCampo} desconocido en habitación ${room.vnum} (${room.name}): ${valor}`);
            }
        };

        const verificarFlags = (leyenda, flags, nombreCampo) => {
            poblarCheckboxesPorLeyenda(addedCardElement, leyenda, flags);
            if (!flags || flags === '0') return;
            let valores = [];
            const fieldsets = addedCardElement.querySelectorAll('fieldset');
            for (const fieldset of fieldsets) {
                const legend = fieldset.querySelector('legend');
                if (legend && legend.textContent.trim() === leyenda) {
                    valores = Array.from(fieldset.querySelectorAll('input[type="checkbox"]')).map(cb => cb.value);
                    break;
                }
            }
            let restante = flags;
            valores.sort((a, b) => b.length - a.length).forEach(val => {
                restante = restante.split(val).join('');
            });
            if (restante.trim() !== '') {
                advertencias.push(`${nombreCampo} desconocidos en habitación ${room.vnum} (${room.name}): ${restante}`);
            }
        };

        addedCardElement.querySelector('.room-vnum').value = room.vnum;
        addedCardElement.querySelector('.room-name').value = room.name;
        addedCardElement.querySelector('.room-desc').value = room.description;
        verificarValor('.room-sector', room.sectorType, 'Tipo de sector');
        addedCardElement.querySelector('.room-mana-regen').value = room.manaRegen;
        addedCardElement.querySelector('.room-health-regen').value = room.healthRegen;
        addedCardElement.querySelector('.room-clan').value = room.clan;

        if (!room.name) advertencias.push(`Nombre vacío en habitación ${room.vnum}`);
        if (!room.description) advertencias.push(`Descripción vacía en habitación ${room.vnum}`);

        verificarFlags('Flags de Habitación', room.flags, 'Flags de Habitación');

        if (room.extraDescriptions.length > 0) {
            populateExtraDescriptions(addedCardElement, room.extraDescriptions, advertencias, room);
        }
        if (room.exits.length > 0) {
            populateExits(addedCardElement, room.exits, advertencias, room);
        }

        // Update Vnum and Name display in header
        addedCardElement.querySelector('.room-vnum-display').textContent = room.vnum;
        addedCardElement.querySelector('.room-name-display').textContent = room.name;

        container.appendChild(addedCardElement);
        inicializarTarjetaRoom(addedCardElement);
    });

    if (advertencias.length > 0) {
        alert('Advertencias al importar rooms:\n' + advertencias.join('\n'));
        agregarAdvertencias(advertencias, 'ROOMS');
    }
}

function populateExits(containerElement, exitsData, advertencias = [], room = null) {
    const exitsContainer = containerElement.querySelector('.exits-container');
    const exitTemplate = document.getElementById('exit-template');

    exitsData.forEach(exit => {
        const newExit = exitTemplate.content.cloneNode(true);
        const addedExitElement = newExit.querySelector('.sub-item-row-grid');

        const dirSelect = addedExitElement.querySelector('.exit-dir');
        dirSelect.value = exit.direction;
        if (advertencias && room) {
            const opcionesDir = Array.from(dirSelect.options).map(o => o.value);
            if (!opcionesDir.includes(String(exit.direction))) {
                advertencias.push(`Dirección desconocida en habitación ${room.vnum} (${room.name}): ${exit.direction}`);
            }
        }

        const keywordInput = addedExitElement.querySelector('.exit-keyword');
        keywordInput.value = exit.keywords;

        const stateSelect = addedExitElement.querySelector('.exit-door-state');
        stateSelect.value = exit.doorState;
        if (advertencias && room) {
            const opcionesState = Array.from(stateSelect.options).map(o => o.value);
            if (!opcionesState.includes(String(exit.doorState))) {
                advertencias.push(`Estado de puerta desconocido en habitación ${room.vnum} (${room.name}): ${exit.doorState}`);
            }
        }

        const keyVnumInput = addedExitElement.querySelector('.exit-key-vnum');
        keyVnumInput.value = exit.keyVnum;

        const destInput = addedExitElement.querySelector('.exit-dest-vnum');
        destInput.value = exit.destinationVnum;
        if (advertencias && room && isNaN(exit.destinationVnum)) {
            advertencias.push(`Destino inválido en habitación ${room.vnum} (${room.name}) dirección ${exit.direction}`);
        }

        const descTextarea = addedExitElement.querySelector('.exit-desc');
        descTextarea.value = exit.description;

        /*
          if (advertencias && room) {
              if (!exit.description.trim()) {
                  advertencias.push(`Salida sin descripción en habitación ${room.vnum} (${room.name}) dirección ${exit.direction}`);
              }
              if (exit.doorState > 0 && !exit.keywords.trim()) {
                  advertencias.push(`Puerta sin nombre en habitación ${room.vnum} (${room.name}) dirección ${exit.direction}`);
              }
          }
        */

        exitsContainer.appendChild(addedExitElement);
    });
}

function parseResetsSection(sectionContent, parsedData) {
    const resets = [];
    const advertencias = [];
    const lines = sectionContent.split('\n').filter(line => line.trim() !== '' && line.trim() !== 'S');
    const mobVnums = new Set(parsedData.mobiles?.map(m => m.vnum) || []);
    const objVnums = new Set(parsedData.objects?.map(o => o.vnum) || []);
    const roomVnums = new Set(parsedData.rooms?.map(r => r.vnum) || []);

    for (const line of lines) {
        let comentario = '';
        let contenido = line;
        const match = line.match(/[*#]/);
        if (match) {
            const idx = line.indexOf(match[0]);
            comentario = line.slice(idx + 1).trim();
            contenido = line.slice(0, idx).trim();
        }
        if (!contenido) continue;
        const parts = contenido.split(/\s+/);
        const type = parts[0];
        const reset = { type, comment: comentario };
        switch (type) {
            case 'M':
                reset.vnumMob = parseInt(parts[2]);
                reset.limitTotal = parseInt(parts[3]);
                reset.vnumRoom = parseInt(parts[4]);
                reset.limitLocal = parseInt(parts[5]);
                if (!mobVnums.has(reset.vnumMob)) advertencias.push(`Mob desconocido en reset M: ${reset.vnumMob}`);
                if (!roomVnums.has(reset.vnumRoom)) advertencias.push(`Habitación desconocida en reset M: ${reset.vnumRoom}`);
                break;
            case 'O':
                reset.vnumObject = parseInt(parts[2]);
                reset.limit = parseInt(parts[3]);
                reset.vnumRoom = parseInt(parts[4]);
                if (!objVnums.has(reset.vnumObject)) advertencias.push(`Objeto desconocido en reset O: ${reset.vnumObject}`);
                if (!roomVnums.has(reset.vnumRoom)) advertencias.push(`Habitación desconocida en reset O: ${reset.vnumRoom}`);
                break;
            case 'P':
                reset.vnumContent = parseInt(parts[2]);
                reset.limit = parseInt(parts[3]);
                reset.vnumContainer = parseInt(parts[4]);
                reset.limitLocal = parseInt(parts[5]);
                if (!objVnums.has(reset.vnumContent)) advertencias.push(`Objeto contenido desconocido en reset P: ${reset.vnumContent}`);
                if (!objVnums.has(reset.vnumContainer)) advertencias.push(`Contenedor desconocido en reset P: ${reset.vnumContainer}`);
                break;
            case 'G':
                reset.vnumObject = parseInt(parts[2]);
                reset.limit = parseInt(parts[3]);
                if (!objVnums.has(reset.vnumObject)) advertencias.push(`Objeto desconocido en reset G: ${reset.vnumObject}`);
                break;
            case 'E':
                reset.vnumObject = parseInt(parts[2]);
                reset.limit = parseInt(parts[3]);
                reset.wearLocation = parseInt(parts[4]);
                if (!objVnums.has(reset.vnumObject)) advertencias.push(`Objeto desconocido en reset E: ${reset.vnumObject}`);
                if (!gameData.resetWearLocations.some(opt => opt.value == reset.wearLocation)) advertencias.push(`Lugar de vestir desconocido en reset E: ${reset.wearLocation}`);
                break;
            case 'D':
                reset.vnumRoom = parseInt(parts[2]);
                reset.direction = parseInt(parts[3]);
                reset.state = parseInt(parts[4]);
                if (!roomVnums.has(reset.vnumRoom)) advertencias.push(`Habitación desconocida en reset D: ${reset.vnumRoom}`);
                if (!gameData.resetDirections.some(opt => opt.value == reset.direction)) advertencias.push(`Dirección desconocida en reset D: ${reset.direction}`);
                if (!gameData.resetDoorStates.some(opt => opt.value == reset.state)) advertencias.push(`Estado de puerta desconocido en reset D: ${reset.state}`);
                break;
            case 'R':
                reset.vnumRoom = parseInt(parts[2]);
                reset.mazeClass = parseInt(parts[3]);
                if (!roomVnums.has(reset.vnumRoom)) advertencias.push(`Habitación desconocida en reset R: ${reset.vnumRoom}`);
                if (!gameData.resetMazeClasses.some(opt => opt.value == reset.mazeClass)) advertencias.push(`Clase de maze desconocida en reset R: ${reset.mazeClass}`);
                break;
            default:
                console.warn('Tipo de reset desconocido:', line);
                advertencias.push(`Tipo de reset desconocido: ${line}`);
                break;
        }
        if (type && type !== 'S') resets.push(reset);
    }
    if (advertencias.length > 0) {
        alert('Advertencias al importar resets:\n' + advertencias.join('\n'));
        agregarAdvertencias(advertencias, 'RESETS');
    }
    return resets;
}

function populateResetsSection(resetsData) {
    const container = document.getElementById('resets-list');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    resetsData.forEach(reset => {
        const resetRowTemplate = document.getElementById('reset-row-template');
        const newResetRow = resetRowTemplate.content.cloneNode(true);
        const addedResetRowElement = newResetRow.querySelector('.reset-row');

        addedResetRowElement.querySelector('.reset-type-indicator').textContent = reset.type;
        addedResetRowElement.querySelector('.reset-comment').value = reset.comment || '';

        const resetInputsContainer = addedResetRowElement.querySelector('.reset-inputs');
        let specificTemplate;

        switch (reset.type) {
            case 'M':
                specificTemplate = document.getElementById('reset-m-template');
                const mInputs = specificTemplate.content.cloneNode(true);
                mInputs.querySelector('.reset-mob-vnum').dataset.value = reset.vnumMob;
                mInputs.querySelector('.reset-limit-total').value = reset.limitTotal;
                mInputs.querySelector('.reset-room-vnum').dataset.value = reset.vnumRoom;
                mInputs.querySelector('.reset-limit-local').value = reset.limitLocal;
                resetInputsContainer.appendChild(mInputs);
                break;
            case 'O':
                specificTemplate = document.getElementById('reset-o-template');
                const oInputs = specificTemplate.content.cloneNode(true);
                oInputs.querySelector('.reset-obj-vnum').dataset.value = reset.vnumObject;
                oInputs.querySelector('.reset-limit').value = reset.limit;
                oInputs.querySelector('.reset-room-vnum').dataset.value = reset.vnumRoom;
                resetInputsContainer.appendChild(oInputs);
                break;
            case 'P':
                specificTemplate = document.getElementById('reset-p-template');
                const pInputs = specificTemplate.content.cloneNode(true);
                pInputs.querySelector('.reset-content-vnum').dataset.value = reset.vnumContent;
                pInputs.querySelector('.reset-limit').value = reset.limit;
                pInputs.querySelector('.reset-container-vnum').dataset.value = reset.vnumContainer;
                pInputs.querySelector('.reset-limit-local').value = reset.limitLocal;
                resetInputsContainer.appendChild(pInputs);
                break;
            case 'G':
                specificTemplate = document.getElementById('reset-g-template');
                const gInputs = specificTemplate.content.cloneNode(true);
                gInputs.querySelector('.reset-obj-vnum').dataset.value = reset.vnumObject;
                gInputs.querySelector('.reset-limit').value = reset.limit;
                resetInputsContainer.appendChild(gInputs);
                break;
            case 'E':
                specificTemplate = document.getElementById('reset-e-template');
                const eInputs = specificTemplate.content.cloneNode(true);
                eInputs.querySelector('.reset-obj-vnum').dataset.value = reset.vnumObject;
                eInputs.querySelector('.reset-limit').value = reset.limit;
                const wearSelect = eInputs.querySelector('.reset-wear-location');
                wearSelect.dataset.value = reset.wearLocation;
                poblarSelectBasico(wearSelect, gameData.resetWearLocations);
                resetInputsContainer.appendChild(eInputs);
                break;
            case 'D':
                specificTemplate = document.getElementById('reset-d-template');
                const dInputs = specificTemplate.content.cloneNode(true);
                dInputs.querySelector('.reset-room-vnum').dataset.value = reset.vnumRoom;
                const dirSelect = dInputs.querySelector('.reset-direction');
                dirSelect.dataset.value = reset.direction;
                poblarSelectBasico(dirSelect, gameData.resetDirections);
                const stateSelect = dInputs.querySelector('.reset-state');
                stateSelect.dataset.value = reset.state;
                poblarSelectBasico(stateSelect, gameData.resetDoorStates);
                resetInputsContainer.appendChild(dInputs);
                break;
            case 'R':
                specificTemplate = document.getElementById('reset-r-template');
                const rInputs = specificTemplate.content.cloneNode(true);
                rInputs.querySelector('.reset-room-vnum').dataset.value = reset.vnumRoom;
                const mazeSelect = rInputs.querySelector('.reset-maze-class');
                mazeSelect.dataset.value = reset.mazeClass;
                poblarSelectBasico(mazeSelect, gameData.resetMazeClasses);
                resetInputsContainer.appendChild(rInputs);
                break;
            default:
                console.warn('Unknown reset type for population:', reset.type, reset);
        }

        container.appendChild(addedResetRowElement);
    });

    refrescarOpcionesResets();
    container.querySelectorAll('select[data-value]').forEach(sel => {
        sel.value = sel.dataset.value;
    });
}

function parseSetSection(sectionContent) {
    const conjuntos = [];
    const lineas = sectionContent.split('\n').filter(l => l.trim() !== '');
    let i = 0;
    while (i < lineas.length) {
        const linea = lineas[i].trim();
        if (linea === '#0') break; // Fin de la sección
        if (linea.startsWith('#')) {
            const set = {};
            set.id = parseInt(linea.substring(1));
            i++;
            set.name = lineas[i++].replace(/~$/, '').trim();
            set.tiers = [];

            while (i < lineas.length && lineas[i].trim() !== 'End') {
                const lineaTier = lineas[i].trim();
                if (lineaTier.startsWith('T ')) {
                    const tier = { pieces: parseInt(lineaTier.substring(2).trim()), applies: [], affects: [] };
                    set.tiers.push(tier);
                } else if (lineaTier.startsWith('A ')) {
                    const partes = lineaTier.substring(2).trim().split(' ').map(Number);
                    if (set.tiers.length > 0) {
                        set.tiers[set.tiers.length - 1].applies.push({ location: partes[0], modifier: partes[1] });
                    }
                } else if (lineaTier.startsWith('F ')) {
                    const partes = lineaTier.substring(2).trim().split(' ');
                    if (set.tiers.length > 0) {
                        set.tiers[set.tiers.length - 1].affects.push({ type: partes[0], bits: partes.slice(1).join(' ') });
                    }
                }
                i++;
            }
            conjuntos.push(set);
        }
        i++;
    }
    return conjuntos;
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
        const commentInput = addedCardElement.querySelector('.special-comment');
        if (special.comment) {
            commentInput.value = special.comment;
        }
        commentInput.dispatchEvent(new Event('input'));
        addedCardElement.querySelector('.special-vnum-display').textContent = special.vnumMob;

        container.appendChild(addedCardElement);
    });
}

function parseProgsSection(sectionContent) {
    const progs = [];
    const lineas = sectionContent.split('\n').filter(l => l.trim() !== '');
    let i = 0;
    while (i < lineas.length) {
        const linea = lineas[i].trim();
        if (linea === '#0') break; // Fin de la sección
        if (linea.startsWith('#')) {
            const prog = {};
            prog.vnum = parseInt(linea.substring(1));
            i++;
            let bloque = [];
            while (i < lineas.length && lineas[i].trim() !== '~') {
                bloque.push(lineas[i]);
                i++;
            }
            prog.code = bloque.join('\n');
            progs.push(prog);
            if (i < lineas.length && lineas[i].trim() === '~') i++;
        } else {
            i++;
        }
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

function poblarCheckboxesPorLeyenda(container, leyenda, flags) {
    if (!flags || flags === '0') return;
    const fieldsets = container.querySelectorAll('fieldset');
    for (const fieldset of fieldsets) {
        const legend = fieldset.querySelector('legend');
        if (legend && legend.textContent.trim() === leyenda) {
            const checks = fieldset.querySelectorAll('input[type="checkbox"]');
            checks.forEach(cb => {
                cb.checked = flags.includes(cb.value);
            });
            break;
        }
    }
}

function clearAllForms() {
    // Clear Area Form
    document.getElementById('area-filename').value = '';
    document.getElementById('area-name').value = '';
    document.getElementById('area-min-level').value = '';
    document.getElementById('area-max-level').value = '';
    document.getElementById('area-creator').value = '';

    const vnumStartInput = document.getElementById('area-vnum-start');
    const vnumEndInput = document.getElementById('area-vnum-end');

    vnumStartInput.value = '';
    vnumEndInput.value = '';

    // Restablece el aviso de rango de VNUMs al limpiar el formulario
    vnumStartInput.dispatchEvent(new Event('input'));
    vnumEndInput.dispatchEvent(new Event('input'));

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

