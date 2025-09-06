import { gameData } from './config.js';

// Contenedor de la documentación cargada desde documentos/*.md
let textoDocumentacion = '';
// Historial simple de mensajes para contextualizar a la IA
const historial = [];

async function cargarDocumentacion() {
    const textos = await Promise.all(
        gameData.archivosDocumentacion.map(async nombre => {
            try {
                const respuesta = await fetch(`documentos/${encodeURIComponent(nombre)}`);
                return respuesta.ok ? await respuesta.text() : '';
            } catch (e) {
                return '';
            }
        })
    );
    textoDocumentacion = textos.join('\n');
}

function agregarMensaje(origen, mensaje) {
    const registro = document.getElementById('registro-chat');
    const p = document.createElement('p');
    p.textContent = `${origen}: ${mensaje}`;
    registro.appendChild(p);
    registro.scrollTop = registro.scrollHeight;
    return p;
}

async function enviarMensaje() {
    const entrada = document.getElementById('mensaje-usuario');
    const texto = entrada.value.trim();
    if (!texto) return;
    agregarMensaje('Usuario', texto);
    historial.push({ rol: 'usuario', contenido: texto });
    entrada.value = '';
    const mensajeIA = agregarMensaje('IA', 'Procesando...');
    const respuesta = await consultarIA(texto);
    mensajeIA.textContent = `IA: ${respuesta}`;
    historial.push({ rol: 'ia', contenido: respuesta });
}

async function consultarIA(textoUsuario) {
    const instrucciones = `Eres una IA experta en la aplicación web para crear áreas del MUD Petria. Solo respondes preguntas sobre la aplicación y documentos relacionados. Si la pregunta no se relaciona con la aplicación web o su documentación, responde: "Lo siento, solo puedo ayudar con la aplicación.". Estructura bien el contenido que vas a mostrar usando bien los saltos de línea, usa lenguaje que sea fácil de entender, y apóyate en los documentos instrucciones.md y resumen.md para dar respuestas específicas del uso de la aplicación web, el resto de documentos es para entender como funcionan las cosas, lo mas importante de todo "orienta todas las pregunta a la funcionalida de la aplicación web, no interesa nada que se explique que no tenga que ver con la Aplicación Web de Petria. Pon ejemplos siempre que puedas. Usa la siguiente documentación para tus respuestas:\n${textoDocumentacion}`;
    const historialPlano = historial.map(m => `${m.rol === 'usuario' ? 'Usuario' : 'IA'}: ${m.contenido}`).join('\n');
    const promptCompleto = `${instrucciones}\n\nHistorial:\n${historialPlano}\n\nUsuario: ${textoUsuario}\nIA:`;

    let ultimoError = null;
    for (const key of gameData.apiKeys) {
        for (const modelo of gameData.modelFallbackOrder) {
            try {
                const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${key}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ contents: [{ parts: [{ text: promptCompleto }] }] })
                });
                if (!resp.ok) {
                    ultimoError = new Error(`Error de la API con ${modelo}: ${resp.status} ${resp.statusText}`);
                    continue;
                }
                const data = await resp.json();
                const texto = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
                if (texto) return texto;
                ultimoError = new Error('Respuesta vacía de la IA');
            } catch (e) {
                ultimoError = e;
            }
        }
    }
    console.warn(ultimoError);
    return 'Ocurrió un error al consultar la IA.';
}

// Eventos de UI

document.getElementById('enviar-mensaje').addEventListener('click', enviarMensaje);
document.getElementById('mensaje-usuario').addEventListener('keydown', e => {
    if (e.key === 'Enter') enviarMensaje();
});

cargarDocumentacion();
