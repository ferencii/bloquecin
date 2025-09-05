import { gameData } from './config.js';

// Blockly espera colores en formato de matiz (0-360). Usar números
// evita que todas las categorías se vean del mismo verde por defecto.
const COLORES = {
    eventos: 210,        // Azul
    condiciones: 120,    // Verde
    acciones: 330,       // Rosa/morado
    logica: 290,         // Violeta
    variables: 20        // Naranja
};

let espacioTrabajo = null;
let areaCodigoActual = null;
let areaXmlActual = null;
let resumenActual = null;
let preCodigoActual = null;

/*
 * El editor se abre en una ventana modal para disponer de todo el espacio.
 * Se guarda tanto el código generado como el XML del espacio de trabajo para
 * permitir futuras ediciones.
 */
function opcionesVariables() {
    return gameData.progVariables.map(v => [v.label, v.value]);
}

function crearToolbox() {
    const bloquesVariables = gameData.progVariables
        .map(v => `<block type="var_${v.value.replace('$', '')}"></block>`)
        .join('');
    return `<xml xmlns="https://developers.google.com/blockly/xml">

  <category name="Eventos" colour="${COLORES.eventos}">
    <block type="event_speech"></block>
    <block type="event_act"></block>
    <block type="event_random"></block>
    <block type="event_greet"></block>
    <block type="event_give"></block>
  </category>

  <category name="Condiciones" colour="${COLORES.condiciones}">
    <block type="cond_ispc"></block>
    <block type="cond_level"></block>
    <block type="cond_alineacion"></block>
    <block type="cond_carries"></block>
    <block type="cond_pquestactiva"></block>
    <block type="cond_pquestfase"></block>
    <block type="cond_pquestfin"></block>
  </category>
  <category name="Acciones" colour="${COLORES.acciones}">
    <block type="action_echo"></block>
    <block type="action_echoat"></block>
    <block type="action_mload"></block>
    <block type="action_oload"></block>
    <block type="action_transfer"></block>
    <block type="action_force"></block>
    <block type="action_pquestinicio"></block>
    <block type="action_pquestfase"></block>
    <block type="action_pquestfin"></block>
    <block type="action_sleep"></block>
    <block type="action_break"></block>
  </category>
  <category name="Lógica" colour="${COLORES.logica}">
    <block type="mprog_if"></block>
  </category>
  <category name="Variables" colour="${COLORES.variables}">
    ${bloquesVariables}
  </category>
</xml>`;
}

function abrirModal(tipoSeccion, areaCodigo, areaXml, resumen, preCodigo) {
    const modal = document.getElementById('blockly-modal');
    modal.removeAttribute('hidden');

    areaCodigoActual = areaCodigo;
    areaXmlActual = areaXml;
    resumenActual = resumen;
    preCodigoActual = preCodigo;

    if (!espacioTrabajo) {
        espacioTrabajo = Blockly.inject('blockly-workspace', { toolbox: crearToolbox() });
    }

    espacioTrabajo.programType = tipoSeccion === 'mobprogs' ? 'mob' : tipoSeccion === 'objprogs' ? 'obj' : 'room';
    espacioTrabajo.clear();
    if (areaXml.value) {
        const dom = Blockly.Xml.textToDom(areaXml.value);
        Blockly.Xml.domToWorkspace(dom, espacioTrabajo);
    }
}

function cerrarModal() {
    document.getElementById('blockly-modal').setAttribute('hidden', true);
}

function guardarModal() {
    if (!espacioTrabajo) return;
    const codigo = Blockly.JavaScript.workspaceToCode(espacioTrabajo).trim();
    areaCodigoActual.value = codigo;
    const dom = Blockly.Xml.workspaceToDom(espacioTrabajo);
    areaXmlActual.value = Blockly.Xml.domToText(dom);
    resumenActual.textContent = codigo ? codigo.split('\n')[0] : '(sin acciones)';
    if (!preCodigoActual.hasAttribute('hidden')) {
        preCodigoActual.textContent = codigo;
    }
    cerrarModal();
}

// Se exporta una función para enlazar los controles del modal una vez que
// el DOM está cargado. Antes se realizaba en la carga del módulo y fallaba
// porque los botones aún no existían.
export function initBlocklyModalControls() {
    const btnCerrar = document.getElementById('blockly-close');
    const btnGuardar = document.getElementById('blockly-save');
    if (btnCerrar) btnCerrar.addEventListener('click', cerrarModal);
    if (btnGuardar) btnGuardar.addEventListener('click', guardarModal);
}

export function initProgBlockly(tarjeta, tipoSeccion) {
    const btnEditar = tarjeta.querySelector('.edit-prog-btn');
    const btnCodigo = tarjeta.querySelector('.show-code-btn');
    const areaCodigo = tarjeta.querySelector('.prog-code');
    const areaXml = tarjeta.querySelector('.prog-xml');
    const resumen = tarjeta.querySelector('.prog-summary');
    const preCodigo = tarjeta.querySelector('.prog-code-display');

    btnEditar.addEventListener('click', () => abrirModal(tipoSeccion, areaCodigo, areaXml, resumen, preCodigo));

    btnCodigo.addEventListener('click', () => {
        preCodigo.textContent = areaCodigo.value;
        preCodigo.toggleAttribute('hidden');
    });

    resumen.textContent = areaCodigo.value ? areaCodigo.value.split('\n')[0] : '(sin acciones)';
}

// Bloques de Eventos
Blockly.Blocks['event_speech'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Cuando un jugador diga')
            .appendField(new Blockly.FieldTextInput('hola'), 'TEXTO');
        this.appendStatementInput('CUERPO').setCheck(null).appendField('hacer');
        this.setColour(COLORES.eventos);
        this.setTooltip('Se activa cuando un jugador dice la palabra o frase especificada en la misma habitación.');
        this.hat = 'cap';
    }
};

Blockly.JavaScript['event_speech'] = function (block) {
    const texto = block.getFieldValue('TEXTO');
    const cuerpo = Blockly.JavaScript.statementToCode(block, 'CUERPO');
    return `speech ${texto}\n${cuerpo}`;
};

Blockly.Blocks['event_act'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Cuando ocurra una acción que contenga')
            .appendField(new Blockly.FieldTextInput('texto'), 'TEXTO');
        this.appendStatementInput('CUERPO').setCheck(null).appendField('hacer');
        this.setColour(COLORES.eventos);
        this.setTooltip('Se activa cuando en la habitación ocurre una acción que contiene el texto indicado.');
        this.hat = 'cap';
    }
};

Blockly.JavaScript['event_act'] = function (block) {
    const texto = block.getFieldValue('TEXTO');
    const cuerpo = Blockly.JavaScript.statementToCode(block, 'CUERPO');
    return `act ${texto}\n${cuerpo}`;
};

Blockly.Blocks['event_random'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('De forma aleatoria (probabilidad % )')
            .appendField(new Blockly.FieldNumber(50, 0, 100), 'NUM');
        this.appendStatementInput('CUERPO').setCheck(null).appendField('hacer');
        this.setColour(COLORES.eventos);
        this.setTooltip('Se activa al azar según el porcentaje indicado.');
        this.hat = 'cap';
    }
};

Blockly.JavaScript['event_random'] = function (block) {
    const num = block.getFieldValue('NUM');
    const cuerpo = Blockly.JavaScript.statementToCode(block, 'CUERPO');
    return `random ${num}\n${cuerpo}`;
};

Blockly.Blocks['event_greet'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Cuando alguien entre en la habitación')
            .appendField(new Blockly.FieldDropdown([
                ['si el personaje es visible', 'greet'],
                ['siempre', 'grall']
            ]), 'TIPO')
            .appendField('con probabilidad %')
            .appendField(new Blockly.FieldNumber(100, 0, 100), 'NUM');
        this.appendStatementInput('CUERPO').setCheck(null).appendField('hacer');
        this.setColour(COLORES.eventos);
        this.setTooltip('Se activa cuando cualquier personaje entra en la habitación.');
        this.hat = 'cap';
    }
};

Blockly.JavaScript['event_greet'] = function (block) {
    const tipo = block.getFieldValue('TIPO');
    const num = block.getFieldValue('NUM');
    const cuerpo = Blockly.JavaScript.statementToCode(block, 'CUERPO');
    return `${tipo} ${num}\n${cuerpo}`;
};

Blockly.Blocks['event_give'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Cuando se le entregue el objeto')
            .appendField(new Blockly.FieldTextInput('objeto'), 'OBJ');
        this.appendStatementInput('CUERPO').setCheck(null).appendField('hacer');
        this.setColour(COLORES.eventos);
        this.setTooltip('Se activa cuando un jugador da un objeto específico.');
        this.hat = 'cap';
    }
};

Blockly.JavaScript['event_give'] = function (block) {
    const obj = block.getFieldValue('OBJ');
    const cuerpo = Blockly.JavaScript.statementToCode(block, 'CUERPO');
    return `give ${obj}\n${cuerpo}`;
};

// Bloque IF
Blockly.Blocks['mprog_if'] = {
    init: function () {
        this.appendValueInput('COND').setCheck('Boolean').appendField('Si');
        this.appendStatementInput('ENTONCES').setCheck(null).appendField('hacer');
        this.appendStatementInput('SINO').setCheck(null).appendField('si no');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORES.logica);
        this.setTooltip('Si... hacer... si no...');
    }
};

Blockly.JavaScript['mprog_if'] = function (block) {
    const cond = Blockly.JavaScript.valueToCode(block, 'COND', Blockly.JavaScript.ORDER_NONE) || '';
    const entonces = Blockly.JavaScript.statementToCode(block, 'ENTONCES');
    const sino = Blockly.JavaScript.statementToCode(block, 'SINO');
    let code = `if ${cond.trim()}\n${entonces}`;
    if (sino.trim()) {
        code += `else\n${sino}`;
    }
    code += 'endif\n';
    return code;
};

// Bloques de Condición
Blockly.Blocks['cond_ispc'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(opcionesVariables()), 'VAR')
            .appendField('es')
            .appendField(new Blockly.FieldDropdown([
                ['un jugador', 'ispc'],
                ['un NPC', 'isnpc']
            ]), 'TIPO');
        this.setOutput(true, 'Boolean');
        this.setColour(COLORES.condiciones);
        this.setTooltip('Comprueba si el objetivo es jugador o NPC.');
    }
};

Blockly.JavaScript['cond_ispc'] = function (block) {
    const variable = block.getFieldValue('VAR');
    const tipo = block.getFieldValue('TIPO');
    return [`${tipo} ${variable}`, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['cond_level'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('el nivel de')
            .appendField(new Blockly.FieldDropdown(opcionesVariables()), 'VAR')
            .appendField(new Blockly.FieldDropdown([
                ['=', '=='],
                ['!=', '!='],
                ['>', '>'],
                ['<', '<'],
                ['>=', '>='],
                ['<=', '<=']
            ]), 'OP')
            .appendField(new Blockly.FieldNumber(0, 0, 200), 'NUM');
        this.setOutput(true, 'Boolean');
        this.setColour(COLORES.condiciones);
        this.setTooltip('Compara el nivel del personaje indicado.');
    }
};

Blockly.JavaScript['cond_level'] = function (block) {
    const variable = block.getFieldValue('VAR');
    const op = block.getFieldValue('OP');
    const num = block.getFieldValue('NUM');
    return [`level ${variable} ${op} ${num}`, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['cond_alineacion'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('la alineación de')
            .appendField(new Blockly.FieldDropdown(opcionesVariables()), 'VAR')
            .appendField('es')
            .appendField(new Blockly.FieldDropdown([
                ['buena', 'isgood'],
                ['neutral', 'isneutral'],
                ['mala', 'isevil']
            ]), 'AL');
        this.setOutput(true, 'Boolean');
        this.setColour(COLORES.condiciones);
        this.setTooltip('Verifica la alineación del personaje.');
    }
};

Blockly.JavaScript['cond_alineacion'] = function (block) {
    const variable = block.getFieldValue('VAR');
    const al = block.getFieldValue('AL');
    return [`${al} ${variable}`, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['cond_carries'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(opcionesVariables()), 'VAR')
            .appendField('lleva el objeto')
            .appendField(new Blockly.FieldTextInput('vnum'), 'OBJ');
        this.setOutput(true, 'Boolean');
        this.setColour(COLORES.condiciones);
        this.setTooltip('Comprueba si el personaje lleva un objeto.');
    }
};

Blockly.JavaScript['cond_carries'] = function (block) {
    const variable = block.getFieldValue('VAR');
    const obj = block.getFieldValue('OBJ');
    return [`carries ${variable} ${obj}`, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['cond_pquestactiva'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('la quest')
            .appendField(new Blockly.FieldTextInput('nombre'), 'QUEST')
            .appendField('está activa para')
            .appendField(new Blockly.FieldDropdown(opcionesVariables()), 'VAR');
        this.setOutput(true, 'Boolean');
        this.setColour(COLORES.condiciones);
        this.setTooltip('Verifica si una quest está activa.');
    }
};

Blockly.JavaScript['cond_pquestactiva'] = function (block) {
    const quest = block.getFieldValue('QUEST');
    const variable = block.getFieldValue('VAR');
    return [`pquestactiva ${variable} '${quest}'`, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['cond_pquestfase'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('la quest')
            .appendField(new Blockly.FieldTextInput('nombre'), 'QUEST')
            .appendField('está en fase')
            .appendField(new Blockly.FieldNumber(1, 0, 100), 'FASE')
            .appendField('para')
            .appendField(new Blockly.FieldDropdown(opcionesVariables()), 'VAR');
        this.setOutput(true, 'Boolean');
        this.setColour(COLORES.condiciones);
        this.setTooltip('Comprueba la fase de una quest.');
    }
};

Blockly.JavaScript['cond_pquestfase'] = function (block) {
    const quest = block.getFieldValue('QUEST');
    const fase = block.getFieldValue('FASE');
    const variable = block.getFieldValue('VAR');
    return [`pquestfase ${variable} '${quest}' ${fase}`, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['cond_pquestfin'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('la quest')
            .appendField(new Blockly.FieldTextInput('nombre'), 'QUEST')
            .appendField('está finalizada para')
            .appendField(new Blockly.FieldDropdown(opcionesVariables()), 'VAR');
        this.setOutput(true, 'Boolean');
        this.setColour(COLORES.condiciones);
        this.setTooltip('Comprueba si una quest ha finalizado.');
    }
};

Blockly.JavaScript['cond_pquestfin'] = function (block) {
    const quest = block.getFieldValue('QUEST');
    const variable = block.getFieldValue('VAR');
    return [`pquestfin ${variable} '${quest}'`, Blockly.JavaScript.ORDER_NONE];
};

// Bloques de Acción
Blockly.Blocks['action_echo'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('decir a todos en la sala:')
            .appendField(new Blockly.FieldTextInput('texto'), 'TEXTO');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORES.acciones);
        this.setTooltip('Muestra un mensaje a todos en la sala.');
    }
};

Blockly.JavaScript['action_echo'] = function (block) {
    const texto = block.getFieldValue('TEXTO');
    const tipo = block.workspace.programType;
    return `${tipo} echo ${texto}\n`;
};

Blockly.Blocks['action_echoat'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('decir solo a')
            .appendField(new Blockly.FieldDropdown(opcionesVariables()), 'VAR')
            .appendField(':')
            .appendField(new Blockly.FieldTextInput('texto'), 'TEXTO');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORES.acciones);
        this.setTooltip('Envía un mensaje solo al personaje indicado.');
    }
};

Blockly.JavaScript['action_echoat'] = function (block) {
    const variable = block.getFieldValue('VAR');
    const texto = block.getFieldValue('TEXTO');
    const tipo = block.workspace.programType;
    return `${tipo} echoat ${variable} ${texto}\n`;
};

Blockly.Blocks['action_mload'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('crear el mob con VNUM')
            .appendField(new Blockly.FieldNumber(0, 0), 'VNUM');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORES.acciones);
        this.setTooltip('Crea un mob con el VNUM dado.');
    }
};

Blockly.JavaScript['action_mload'] = function (block) {
    const vnum = block.getFieldValue('VNUM');
    const tipo = block.workspace.programType;
    return `${tipo} mload ${vnum}\n`;
};

Blockly.Blocks['action_oload'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('crear el objeto con VNUM')
            .appendField(new Blockly.FieldNumber(0, 0), 'VNUM')
            .appendField('y ponerlo en')
            .appendField(new Blockly.FieldDropdown([
                ['inventario', 'inventario'],
                ['suelo', 'suelo'],
                ['equipado', 'equipado']
            ]), 'LUGAR');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORES.acciones);
        this.setTooltip('Crea un objeto y lo coloca en el lugar indicado.');
    }
};

Blockly.JavaScript['action_oload'] = function (block) {
    const vnum = block.getFieldValue('VNUM');
    const lugar = block.getFieldValue('LUGAR');
    const tipo = block.workspace.programType;
    return `${tipo} oload ${vnum} ${lugar}\n`;
};

Blockly.Blocks['action_transfer'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('transferir a')
            .appendField(new Blockly.FieldDropdown(opcionesVariables()), 'VAR')
            .appendField('a la habitación VNUM')
            .appendField(new Blockly.FieldNumber(0, 0), 'VNUM');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORES.acciones);

        this.setTooltip('Transfiere al personaje a otra habitación.');
    }
};

Blockly.JavaScript['action_transfer'] = function (block) {
    const variable = block.getFieldValue('VAR');
    const vnum = block.getFieldValue('VNUM');
    const tipo = block.workspace.programType;
    return `${tipo} transfer ${variable} ${vnum}\n`;
};

Blockly.Blocks['action_force'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('forzar a')
            .appendField(new Blockly.FieldDropdown(opcionesVariables()), 'VAR')
            .appendField('a ejecutar')
            .appendField(new Blockly.FieldTextInput('comando'), 'CMD');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORES.acciones);
        this.setTooltip('Hace que el personaje ejecute un comando.');
    }
};

Blockly.JavaScript['action_force'] = function (block) {
    const variable = block.getFieldValue('VAR');
    const cmd = block.getFieldValue('CMD');
    const tipo = block.workspace.programType;
    return `${tipo} force ${variable} ${cmd}\n`;
};

Blockly.Blocks['action_pquestinicio'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('iniciar la quest')
            .appendField(new Blockly.FieldTextInput('nombre'), 'QUEST')
            .appendField('para')
            .appendField(new Blockly.FieldDropdown(opcionesVariables()), 'VAR');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORES.acciones);
        this.setTooltip('Inicia una quest para el personaje.');
    }
};

Blockly.JavaScript['action_pquestinicio'] = function (block) {
    const quest = block.getFieldValue('QUEST');
    const variable = block.getFieldValue('VAR');
    const tipo = block.workspace.programType;
    return `${tipo} pquestinicio ${variable} '${quest}'\n`;
};

Blockly.Blocks['action_pquestfase'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('cambiar la fase de la quest')
            .appendField(new Blockly.FieldTextInput('nombre'), 'QUEST')
            .appendField('a')
            .appendField(new Blockly.FieldNumber(1, 0, 100), 'FASE')
            .appendField('para')
            .appendField(new Blockly.FieldDropdown(opcionesVariables()), 'VAR');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORES.acciones);
        this.setTooltip('Cambia la fase de una quest.');
    }
};

Blockly.JavaScript['action_pquestfase'] = function (block) {
    const quest = block.getFieldValue('QUEST');
    const fase = block.getFieldValue('FASE');
    const variable = block.getFieldValue('VAR');
    const tipo = block.workspace.programType;
    return `${tipo} pquestfase ${variable} '${quest}' ${fase}\n`;
};

Blockly.Blocks['action_pquestfin'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('finalizar la quest')
            .appendField(new Blockly.FieldTextInput('nombre'), 'QUEST')
            .appendField('para')
            .appendField(new Blockly.FieldDropdown(opcionesVariables()), 'VAR');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORES.acciones);
        this.setTooltip('Finaliza una quest para el personaje.');
    }
};

Blockly.JavaScript['action_pquestfin'] = function (block) {
    const quest = block.getFieldValue('QUEST');
    const variable = block.getFieldValue('VAR');
    const tipo = block.workspace.programType;
    return `${tipo} pquestfin ${variable} '${quest}'\n`;
};

Blockly.Blocks['action_sleep'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('esperar')
            .appendField(new Blockly.FieldNumber(1, 0), 'NUM')
            .appendField('segundos');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(COLORES.acciones);
        this.setTooltip('Detiene el programa durante el número de segundos indicado.');
    }
};

Blockly.JavaScript['action_sleep'] = function (block) {
    const num = block.getFieldValue('NUM');
    return `sleep ${num}\n`;
};

Blockly.Blocks['action_break'] = {
    init: function () {
        this.appendDummyInput().appendField('detener este programa');
        this.setPreviousStatement(true, null);
        this.setColour(COLORES.acciones);
        this.setTooltip('Detiene el programa de inmediato.');
    }
};

Blockly.JavaScript['action_break'] = function () {
    return 'break\n';
};

// Bloques de Variables
gameData.progVariables.forEach(v => {
    const nombre = `var_${v.value.replace('$', '')}`;
    Blockly.Blocks[nombre] = {
        init: function () {
            this.appendDummyInput().appendField(v.label);
            this.setOutput(true, null);
            this.setColour(COLORES.variables);
            this.setTooltip(v.label);
        }
    };
    Blockly.JavaScript[nombre] = function () {
        return [v.value, Blockly.JavaScript.ORDER_ATOMIC];
    };
});

