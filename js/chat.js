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
}

async function enviarMensaje() {
    const entrada = document.getElementById('mensaje-usuario');
    const texto = entrada.value.trim();
    if (!texto) return;
    agregarMensaje('Usuario', texto);
    historial.push({ rol: 'usuario', contenido: texto });
    entrada.value = '';
    const respuesta = await consultarIA(texto);
    agregarMensaje('IA', respuesta);
    historial.push({ rol: 'ia', contenido: respuesta });
}

async function consultarIA(textoUsuario) {
    const instrucciones = `Eres una IA experta en la aplicación web para crear áreas del MUD Petria. Solo respondes preguntas sobre la aplicación y documentos relacionados. Si la pregunta no se relaciona, responde: "Lo siento, solo puedo ayudar con la aplicación." Usa la siguiente documentación para tus respuestas:\n${textoDocumentacion}`;
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
