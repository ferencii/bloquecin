import { gameData } from './config.js';

// Generic function to handle AI description generation
async function generateDescriptions(generateBtn, promptText, promptInstructions, targetFields) {
    if (!promptText) {
        alert('Por favor, introduce un prompt para la IA.');
        return;
    }

    if (!gameData.apiKey || gameData.apiKey === 'TU_API_KEY_AQUI') {
        alert('Por favor, añade tu API Key en el archivo js/config.js');
        return;
    }

    const fullPrompt = promptInstructions.replace('${promptText}', promptText);

    generateBtn.textContent = 'Generando...';
    generateBtn.disabled = true;

    try {
        console.log('Paso 1: Iniciando fetch a la API.'); // Debug log
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${gameData.apiKey}`, {
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
        console.log('Paso 2: Respuesta de fetch recibida. Status:', response.status); // Debug log

        if (!response.ok) {
            let errorMessage = `Error de la API: ${response.status} ${response.statusText}`;
            try {
                const errorData = await response.json();
                if (errorData && errorData.error && errorData.error.message) {
                    errorMessage = `Error de la API: ${errorData.error.message}`;
                } else {
                    errorMessage = `Error de la API: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`;
                }
            } catch (jsonError) {
                errorMessage = `Error de la API: ${response.status} ${response.statusText} - No se pudo parsear el error JSON.`;
            }
            throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log('Paso 3: Datos de la API parseados:', data); // Debug log

        if (!data || !data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0] || !data.candidates[0].content.parts[0].text) {
            throw new Error('La respuesta de la IA no contiene el texto esperado (estructura de datos inesperada).');
        }
        const textResponse = data.candidates[0].content.parts[0].text;
        console.log('Paso 4: textResponse extraído:', textResponse); // Debug log

        try {
            const jsonString = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
            console.log('Paso 5: jsonString limpio:', jsonString); // Debug log
            const allDescriptions = JSON.parse(jsonString);
            console.log('Paso 6: Descripciones parseadas:', allDescriptions); // Debug log

            if (!Array.isArray(allDescriptions) || allDescriptions.length === 0) {
                // If it's not an array, assume it's a single object (AI might return directly)
                if (typeof allDescriptions === 'object' && allDescriptions !== null) {
                    // If it's an object, use it directly
                    const descriptions = allDescriptions;
                    // Assign values to target fields
                    for (const key in targetFields) {
                        if (targetFields.hasOwnProperty(key) && descriptions.hasOwnProperty(key)) {
                            targetFields[key].value = descriptions[key] || '';
                        }
                    }
                    console.log('Paso 7: Campos rellenados.'); // Debug log
                    return; // Exit successfully
                }
                throw new Error('La IA no devolvió un array de descripciones válido ni un objeto JSON directo.');
            }

            const descriptions = allDescriptions[0]; // Take the first set of descriptions

            // Assign values to target fields
            for (const key in targetFields) {
                if (targetFields.hasOwnProperty(key) && descriptions.hasOwnProperty(key)) {
                    targetFields[key].value = descriptions[key] || '';
                }
            }
            console.log('Paso 7: Campos rellenados.'); // Debug log

        } catch (parseError) {
            console.error("Error al parsear la respuesta JSON de la IA:", textResponse);
            alert(`Error al procesar la respuesta de la IA. La IA respondió con:\n\n${textResponse}\n\nPor favor, revisa el formato.`);
            throw new Error('La respuesta de la IA no tenía el formato JSON esperado.');
        }

    } catch (error) {
        console.error('Error general en generateDescriptions:', error);
        alert(`Hubo un error: ${error.message}`);
    } finally {
        generateBtn.textContent = 'Generar Descripciones';
        generateBtn.disabled = false;
        console.log('Paso Final: Botón re-habilitado.'); // Debug log
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

    const promptInstructions = `Basado en la siguiente idea: ${promptText}, genera UN ÚNICO objeto JSON con tres descripciones para un PNJ (mob) de un juego MUD. Las descripciones deben seguir estas reglas:\n\n"short_desc": Descripción super breve (máximo 20 caracteres). Si es un mob genérico (barrendero, perro, guardia), usa el artículo: "El barrendero", "El perro", "El guardia", "La tendera". Si el mob tiene un nombre propio, no uses artículo: "Arturo", "Cleopatra", "Thor".\n\n"long_desc": No muy extensa. Nombra al mob y describe lo que está haciendo o una característica clave. Ejemplos: "Un troll de piedra con una sonrisa pétrea.", "Arturo está sentado en el suelo afilando la espada.", "El asesino acecha en las sombras."

"look_desc": Extensa y muy descriptiva. Describe profundamente el mob, sus detalles, apariencia, etc.

Responde solo con el objeto JSON, sin texto adicional ni markdown.`;

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

    const promptInstructions = `Basado en la siguiente idea: ${promptText}, genera UN ÚNICO objeto JSON con la descripción para un objeto de un juego MUD. Las descripciones deben seguir estas reglas:\n\n"short_desc": Descripción muy breve (máximo 10 palabras). Es la que se usa en el inventario. Ejemplos: "un anillo de oro", "la espada excalibur", "un zurrón lleno de remaches".\n\n"long_desc": No muy extensa. Es la que se ve cuando llegas a la sala. Nombra al objeto y describe lo que está haciendo o una característica clave. Ejemplos: "Una llave con el anagrama del Hotel Renedo y una pequeña inscripción.", "Un cofre de madera reposa en el centro de la sala."

Responde solo con el objeto JSON, sin texto adicional ni markdown.`;

    const targetFields = {
        short_desc: shortDescInput,
        long_desc: longDescInput
    };

    await generateDescriptions(generateBtn, promptText, promptInstructions, targetFields);
}

// Object Extra Description AI generation handler
async function handleExtraDescAiGeneration(e) {
    const generateBtn = e.target;
    const card = generateBtn.closest('.sub-item-row'); // Note: closest sub-item-row
    if (!card) return;

    const promptText = card.querySelector('.ai-prompt').value;
    const extraDescInput = card.querySelector('.extra-desc'); // Note: extra-desc

    const promptInstructions = `Basado en la siguiente idea: ${promptText}, genera UN ÚNICO objeto JSON con una descripción extra para un objeto de un juego MUD. Esta descripción debe ser extensa y muy descriptiva, similar a la descripción al mirar de un mob, detallando el objeto, su apariencia, historia, etc. Responde solo con el objeto JSON, usando la clave "extra_desc".`;

    const targetFields = {
        extra_desc: extraDescInput
    };

    await generateDescriptions(generateBtn, promptText, promptInstructions, targetFields);
}


export function setupDynamicSection(buttonId, containerId, templateId, cardSelector, vnumRangeCheckFunction = null, vnumSelector = null, vnumDisplaySelector = null, nameInputSelector = null, nameDisplaySelector = null) {
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
            }
            // Add more conditions here for other AI buttons
        }
    });
}

export function getFlagString(container, selector) {
    const flags = Array.from(container.querySelectorAll(selector)).filter(cb => cb.checked).map(cb => cb.value).join('');
    return flags || '0';
}

export function populateCheckboxesFromFlags(container, selector, flagString) {
    const checkboxes = container.querySelectorAll(selector);
    checkboxes.forEach(cb => {
        cb.checked = flagString.includes(cb.value);
    });
}