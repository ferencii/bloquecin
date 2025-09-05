import { gameData } from './config.js';

function extractFirstJsonBlock(text) {
    const firstBrace = text.indexOf('{');
    const firstBracket = text.indexOf('[');

    if (firstBrace === -1 && firstBracket === -1) {
        return null;
    }

    let start = firstBrace;
    let openChar = '{';
    let closeChar = '}';

    if (firstBracket !== -1 && (firstBrace === -1 || firstBracket < firstBrace)) {
        start = firstBracket;
        openChar = '[';
        closeChar = ']';
    }

    let depth = 0;
    let inString = false;
    let escape = false;

    for (let i = start; i < text.length; i++) {
        const ch = text[i];

        if (inString) {
            if (escape) {
                escape = false;
            } else if (ch === '\\') {
                escape = true;
            } else if (ch === '"') {
                inString = false;
            }
            continue;
        }

        if (ch === '"') {
            inString = true;
        } else if (ch === openChar) {
            depth++;
        } else if (ch === closeChar) {
            depth--;
            if (depth === 0) {
                return text.slice(start, i + 1);
            }
        }
    }

    return null;
}

// Generic function to handle AI description generation
async function generateDescriptions(generateBtn, promptText, promptInstructions, targetFields) {
    if (!promptText) {
        alert('Por favor, introduce un prompt para la IA.');
        return;
    }

    if (!gameData.apiKeys || gameData.apiKeys.length === 0 || gameData.apiKeys[0] === 'TU_API_KEY_AQUI') {
        alert('Por favor, añade tu API Key en el archivo js/config.js');
        return;
    }

    const fullPrompt = promptInstructions.replace('${promptText}', promptText);

    generateBtn.textContent = 'Generando...';
    generateBtn.disabled = true;

    let lastError = null;

    try {
        for (const apiKey of gameData.apiKeys) {
            for (const model of gameData.modelFallbackOrder) {
                try {

                    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            contents: [{
                                parts: [{
                                    text: fullPrompt
                                }]
                            }]
                        })
                    });


                    if (!response.ok) {
                        let errorMessage = `Error de la API con ${model}: ${response.status} ${response.statusText}`;
                        try {
                            const errorData = await response.json();
                            if (errorData && errorData.error && errorData.error.message) {
                                errorMessage = `Error de la API con ${model}: ${errorData.error.message}`;
                            } else {
                                errorMessage = `Error de la API con ${model}: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`;
                            }
                        } catch (jsonError) {
                            errorMessage = `Error de la API con ${model}: ${response.status} ${response.statusText} - No se pudo parsear el error JSON.`;
                        }
                        lastError = new Error(errorMessage);
                        console.warn(lastError.message);
                        continue; // Try next model/API key
                    }

                    const data = await response.json();


                    if (!data || !data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0] || !data.candidates[0].content.parts[0].text) {
                        lastError = new Error('La respuesta de la IA no contiene el texto esperado (estructura de datos inesperada).');
                        console.warn(lastError.message);
                        continue; // Try next model/API key
                    }
                    const textResponse = data.candidates[0].content.parts[0].text;


                    try {
                        const jsonString = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();

                        let parsedData;
                        try {
                            parsedData = JSON.parse(jsonString);
                        } catch (initialError) {
                            const extracted = extractFirstJsonBlock(jsonString);
                            if (extracted) {
                                parsedData = JSON.parse(extracted);
                            } else {
                                throw initialError;
                            }
                        }

                        let descriptions;
                        if (Array.isArray(parsedData)) {
                            if (parsedData.length === 0) {
                                lastError = new Error('La IA devolvió un array vacío de descripciones.');
                                console.warn(lastError.message);
                                continue; // Try next model/API key
                            }
                            descriptions = parsedData[0];
                        } else if (typeof parsedData === 'object' && parsedData !== null) {
                            descriptions = parsedData;
                        } else {
                            lastError = new Error('La IA no devolvió un objeto JSON válido.');
                            console.warn(lastError.message);
                            continue; // Try next model/API key
                        }

                        for (const key in targetFields) {
                            if (targetFields.hasOwnProperty(key) && descriptions.hasOwnProperty(key)) {
                                targetFields[key].value = descriptions[key] || '';
                            }
                        }

                        return; // Exit successfully
                    } catch (parseError) {
                        console.error("Error al parsear la respuesta JSON de la IA:", textResponse);
                        alert(`Error al procesar la respuesta de la IA. La IA respondió con:\n\n${textResponse}\n\nPor favor, revisa el formato.`);
                        lastError = new Error('La respuesta de la IA no tenía el formato JSON esperado.');
                        console.warn(lastError.message);
                        continue; // Try next model/API key
                    }

                } catch (error) {
                    lastError = error;
                    console.warn(`Error general en generateDescriptions para modelo ${model} y API Key ${apiKey.substring(0, 5)}:`, error);
                    continue; // Try next model/API key
                }
            }
        }

        // If all API keys and models failed
        if (lastError) {
            alert(`Hubo un error después de intentar con todas las API Keys y modelos: ${lastError.message}`);
        } else {
            alert('No se pudo generar la descripción. Por favor, revisa tu conexión a internet y tus API Keys.');
        }

    } finally {
        generateBtn.textContent = 'Generar Descripciones';
        generateBtn.disabled = false;

    }
}

// Mob-specific AI generation handler
async function handleMobAiGeneration(e) {
    const generateBtn = e.target;
    const card = generateBtn.closest('.mob-card');
    if (!card) return;

    const promptText = card.querySelector('.ai-prompt').value;
    const shortDescInput = card.querySelector('.mob-short-desc');
    const longDescInput = card.querySelector('.mob-long-desc');
    const lookDescInput = card.querySelector('.mob-look-desc');

    const promptInstructions = gameData.aiPrompts.mob.shortLongLook;;

    const targetFields = {
        short_desc: shortDescInput,
        long_desc: longDescInput,
        look_desc: lookDescInput
    };

    await generateDescriptions(generateBtn, promptText, promptInstructions, targetFields);
}

// Object Short/Long-specific AI generation handler
async function handleObjectShortLongAiGeneration(e) {
    const generateBtn = e.target;
    const card = generateBtn.closest('.object-card'); // Note: object-card
    if (!card) return;

    const promptText = card.querySelector('.ai-prompt').value;
    const shortDescInput = card.querySelector('.obj-short-desc'); // Note: obj-short-desc
    const longDescInput = card.querySelector('.obj-long-desc');   // Note: obj-long-desc

    const promptInstructions = gameData.aiPrompts.object.shortLong;;

    const targetFields = {
        short_desc: shortDescInput,
        long_desc: longDescInput
    };

    await generateDescriptions(generateBtn, promptText, promptInstructions, targetFields);
}

// Extra Description AI generation handler for objects and rooms
async function handleExtraDescAiGeneration(e) {
    const generateBtn = e.target;
    const card = generateBtn.closest('.sub-item-row');
    if (!card) return;

    const promptText = card.querySelector('.ai-prompt').value;
    const extraDescInput = card.querySelector('.extra-desc');

    let promptInstructions;
    if (generateBtn.closest('.object-card')) {
        promptInstructions = gameData.aiPrompts.object.extra;
    } else if (generateBtn.closest('.room-card')) {
        promptInstructions = gameData.aiPrompts.room.extra;
    } else {
        promptInstructions = gameData.aiPrompts.object.extra;
    }

    const targetFields = {
        extra_desc: extraDescInput
    };

    await generateDescriptions(generateBtn, promptText, promptInstructions, targetFields);
}

// Room Description AI generation handler
async function handleRoomAiGeneration(e) {
    const generateBtn = e.target;
    const card = generateBtn.closest('.room-card'); // Note: closest room-card
    if (!card) return;

    const promptText = card.querySelector('.ai-prompt').value;
    const roomDescInput = card.querySelector('.room-desc'); // Note: room-desc

    const promptInstructions = gameData.aiPrompts.room.description;;

    const targetFields = {
        room_desc: roomDescInput
    };

    await generateDescriptions(generateBtn, promptText, promptInstructions, targetFields);
}


export function setupDynamicSection(buttonId, containerId, templateId, cardSelector, vnumRangeCheckFunction = null, vnumSelector = null, vnumDisplaySelector = null, nameInputSelector = null, nameDisplaySelector = null, postAddCallback = null) {
    const addButton = document.getElementById(buttonId);
    const container = document.getElementById(containerId);
    if (!addButton) return;

    addButton.addEventListener('click', () => {
        const template = document.getElementById(templateId);
        if (!template) {
            console.error(`Template with ID '${templateId}' not found.`);
            alert(`Error: No se pudo encontrar la plantilla para este elemento.`);
            return;
        }

        if (vnumRangeCheckFunction && !vnumRangeCheckFunction()) {
            alert('¡Atención! Debes definir un rango de VNUMs válido en la sección #AREA para poder añadir elementos.');
            return;
        }
        const newCard = template.content.cloneNode(true);
        container.appendChild(newCard);

        const addedCardElement = container.lastElementChild;

        // Populate race dropdown if it exists in the new card
        const raceSelect = addedCardElement.querySelector('.mob-race');
        if (raceSelect) {
            gameData.races.forEach(race => {
                const option = document.createElement('option');
                option.value = race;
                option.textContent = race;
                if (race === 'humano') {
                    option.selected = true;
                }
                raceSelect.appendChild(option);
            });
        }

        // Populate damage type dropdown if it exists in the new card
        const damageTypeSelect = addedCardElement.querySelector('.mob-dam-type');
        if (damageTypeSelect) {
            gameData.damageTypes.forEach(type => {
                const option = document.createElement('option');
                option.value = type.value;
                option.textContent = type.description;
                if (type.value === 'none') { // Set 'none' as default if it exists
                    option.selected = true;
                }
                damageTypeSelect.appendChild(option);
            });
        }

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
                if (!isNaN(areaVnumEnd) && proposedVnum > areaVnumEnd) {
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
                nameInput.addEventListener('input', () => {
                    nameDisplay.textContent = nameInput.value;
                });
                // Trigger the event immediately to set the initial state
                nameInput.dispatchEvent(new Event('input'));
            }
        }

        // Execute post-add callback if provided
        if (postAddCallback && typeof postAddCallback === 'function') {
            postAddCallback(addedCardElement);
        }

        return addedCardElement; // Return the added card element
    });

    container.addEventListener('click', e => {
        if (e.target.classList.contains('remove-btn')) {
            e.target.closest(cardSelector).remove();
        }
        // Dispatch AI generation based on data-ai-target
        else if (e.target.classList.contains('ai-generate-btn')) {
            const aiTarget = e.target.dataset.aiTarget;
            if (aiTarget === 'mob-short-long-look') { // Original mob button
                handleMobAiGeneration(e);
            } else if (aiTarget === 'object-short-long') { // New object button
                handleObjectShortLongAiGeneration(e);
            } else if (aiTarget === 'extra-description') { // New extra description button
                handleExtraDescAiGeneration(e);
            } else if (aiTarget === 'room-description') {
                handleRoomAiGeneration(e);
            }
            // Add more conditions here for other AI buttons
        }
    });
}

export function getFlagString(container, legendText) { // Changed selector to legendText
    let targetFieldset = null;
    const fieldsets = container.querySelectorAll('fieldset'); // Get all fieldsets within the container
    for (const fieldset of fieldsets) {
        const legend = fieldset.querySelector('legend');
        if (legend && legend.textContent.trim() === legendText) {
            targetFieldset = fieldset;
            break;
        }
    }

    if (!targetFieldset) {
        console.error(`Fieldset with legend "${legendText}" not found in container.`);
        return '0'; // Return default if fieldset not found
    }
    const checkboxes = Array.from(targetFieldset.querySelectorAll('input[type="checkbox"]'));
    const flags = checkboxes.filter(cb => cb.checked).map(cb => cb.value).join('');
    return flags || '0';
}

export function populateCheckboxesFromFlags(container, selector, flagString) {
    const checkboxes = container.querySelectorAll(selector);
    checkboxes.forEach(cb => {
        cb.checked = flagString.includes(cb.value);
    });
}
