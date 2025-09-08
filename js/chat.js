import { gameData } from './config.js';
import { cargarTema, aplicarTema } from './tema.js';

// Contenedor de la documentación cargada desde documentos/*.md
let textoDocumentacion = '';
// Historial simple de mensajes para contextualizar a la IA
const historial = [];

cargarTema();
window.addEventListener('storage', cargarTema);
window.addEventListener('message', e => {
    if (e.data?.tipo === 'tema') aplicarTema(e.data.colores);
});

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
    p.classList.add(origen === 'Usuario' ? 'mensaje-usuario' : 'mensaje-ia');
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
    const instrucciones = `Eres una IA experta en la aplicación web para crear áreas del MUD Petria. 

DOCUMENTACIÓN DISPONIBLE:
${textoDocumentacion}

REGLAS DE USO:
1. Solo responde preguntas sobre la aplicación web y documentos relacionados
2. Si la pregunta no se relaciona con la aplicación web o su documentación, responde: "Lo siento, solo puedo ayudar con la aplicación."
3. Apóyate principalmente en instrucciones.md y resumen.md para dar respuestas específicas del uso de la aplicación web
4. El resto de documentos es para entender cómo funcionan las cosas
5. Orienta todas las preguntas a la funcionalidad de la aplicación web
6. Estructura bien el contenido usando saltos de línea y lenguaje fácil de entender
7. Pon ejemplos siempre que puedas
8. No uses formato MD ni otros formatos, solo texto plano en la respuesta
9. Revisa todos los documentos de la lista antes de responder
10. Cada afirmación debe poder ser verificada en los documentos
11. No inventes comandos, funciones o comportamientos que no estén explícitamente mencionados en los documentos

FORMATO DE RESPUESTA:
- Estructura bien con saltos de línea
- Lenguaje claro y fácil de entender  
- Incluye ejemplos SOLO si están en los documentos
- Enfoca todo a la funcionalidad de la aplicación web
- Cada afirmación debe poder ser verificada en los documentos
- No uses formato MD ni otros formatos, solo texto plano en la respuesta

ASOCIACÓN DE FUENTES SEGÚN TEMA:
- Preguntas sobre la aplicación web en general: instrucciones.md, resumen.md
- Preguntas sobre mobs: mobs.md.
- Preguntas sobre objetos: objects.md
- Preguntas sobre rooms: rooms.md
- Preguntas sobre resets: resets.md
- Preguntas sobre shops: shops.md
- Preguntas sobre specials: specials.md
- Preguntas sobre sets: sets.md
- Preguntas sobre ACT Flags (Acciones de NPCs): mob act.md
- Preguntas sobre AFF Flags (Atributos de NPCs): mob aff.md
- Preguntas sobre DAÑO de los mobs (Tipos de daño, resistencias, vulnerabilidades): mob daño.md
- Preguntas sobre INMUNIDADES, RESISTENCIAS y VULNERABILIDADES de los mobs: mob inm res vul.md
- Preguntas sobre OFF Flags de los mobs (Modos de ataque de NPCs): mob off.md
- Preguntas sobre OBJ Flags y WEAPON Flags, flags de armas y los flags de objetos en general: obj flags y weapon.md
- Preguntas sobre ROM Flags, los flags de as habitaciones o rooms: rom flags.md
- Preguntas sobre MOBPROG/OBJPROG/ROOMPROG: mobprog.md

LISTA COMPLETA DE DOCUMENTOS:
    * Documentación general:
        'mobs.md', // Documento crítico para mobs
        'objects.md', // Documento crítico para objetos
        'rooms.md', // Documento crítico para rooms
        'resets.md', // Documento crítico para resets
        'shops.md', // Documento crítico para shops
        'specials.md', // Documento crítico para specials
        'sets.md', // Documento crítico para sets
        'spec.md', // Documento crítico para spec

    * Documentación específica y concisa:
        'MOB ACT.md', // Documento crítico para MOB ACT
        'MOB AFF.MD', // Documento crítico para MOB AFF
        'MOB DAÑO.MD', // Documento crítico para MOB DAÑO
        'MOB INM RES VUL.MD', // Documento crítico para MOB INM RES VUL
        'MOB OFF.MD', // Documento crítico para MOB OFF
        'OBJ FLAGS Y WEAPON.MD', // Documento crítico para OBJ FLAGS y WEAPON
        'ROM FLAGS.MD', // Documento crítico para ROM FLAGS
        'mobprog.md', // Documento crítico para mobprog/objprog/roomprog
        'ankh.are.txt', // Ejemplo de área incluida para referencia
        'instrucciones.md', // Instrucciones específicas para la IA
        'resumen.md' // Resumen de la aplicación web para referencia rápida

Si se encuentra información en los documentos generales siempre hay que buscar confirmación en los documentos específicos y concisos.


REGLAS CRÍTICAS PARA MOBPROG/OBJPROG/ROOMPROG:
- Para preguntas sobre mobprog, objprog o roomprog, consulta ÚNICAMENTE el documento "mobprog.md"
- Si la información específica no está en mobprog.md, responde: "Esta funcionalidad no está documentada en mobprog.md"
- NO inventes comandos, funciones o comportamientos que no estén explícitamente mencionados
- Siempre indica la fuente: [Fuente: mobprog.md]


ANTES DE RESPONDER SOBRE MOBPROG:
1. Busca la información específica en mobprog.md
2. Si no la encuentras, admítelo
3. No hagas suposiciones


Usa TODA la documentación proporcionada arriba para responder, pero sé especialmente cuidadoso con mobprog para no inventar nada.
RECUERDA: Es mejor decir "no lo sé" que inventar información incorrecta.`;

    const historialPlano = historial.map(m => `${m.rol === 'usuario' ? 'Usuario' : 'IA'}: ${m.contenido}`).join('\n');
    const promptCompleto = `${instrucciones}\n\nHistorial:\n${historialPlano}\n\nUsuario: ${textoUsuario}\nIA:`;

    let ultimoError = null;
    for (const key of gameData.apiKeys) {
        for (const modelo of gameData.modelFallbackOrder) {
            try {
                const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${key}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: promptCompleto }] }],
                        generationConfig: {
                            temperature: 0.3,  // Un poco más alto que antes pero aún conservador
                            topP: 0.9,
                            topK: 20
                        }
                    })
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
