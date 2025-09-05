*   **Configuración y Seguridad**:
    *   **Soporte para Múltiples API Keys y Fallback de Modelos**: Se modificó `js/config.js` para permitir un array de `apiKeys`. La función `generateDescriptions` ahora itera a través de estas claves y, para cada una, prueba los modelos en un orden de preferencia (`gemini-2.5-pro`, `gemini-2.5-flash`, `gemini-2.5-flash-lite`), conmutando automáticamente si se alcanza una cuota.
    *   **Corrección de Error de Sintaxis y Fallback de API Keys**: Se resolvió un `Uncaught SyntaxError: Unexpected token 'finally'` en `js/utils.js` moviendo el bloque `finally` para que envolviera toda la función `generateDescriptions`. Además, se implementó la lógica de fallback para las API keys y los modelos de IA, permitiendo que la aplicación intente con múltiples configuraciones hasta encontrar una exitosa.
    *   **Centralización de Prompts de IA**: Se movieron las instrucciones detalladas para la generación de descripciones de IA (para mobs, objetos y habitaciones) desde `js/utils.js` a un nuevo objeto `aiPrompts` dentro de `gameData` en `js/config.js`. Esto mejora la organización y facilita la gestión de los prompts. Las funciones de generación de IA en `utils.js` ahora acceden a estos prompts centralizados.
*   **Depuración y Robustez**:
    *   **Corrección de Errores de Sintaxis**: Se resolvieron `Uncaught SyntaxError: Identifier 'setupDynamicSection' has already been declared` y `Uncaught SyntaxError: Identifier 'generateMobilesSection' has already been declared` eliminando declaraciones de importación y funciones duplicadas en `js/mobiles.js`.
    *   **Resolución de Problema de Primer Clic**: Se corrigió el problema donde el botón "Añadir Mob" no funcionaba en el primer clic, refactorizando la forma en que se adjuntan los `event listeners` a las tarjetas de mob a través de un `postAddCallback` en `setupDynamicSection` en `js/utils.js`.
    *   **Depuración Adicional de Asignación de Campos**: Se añadieron logs `DEBUG Mob:` y comprobaciones de nulidad para los elementos de entrada en `handleMobAiGeneration` para diagnosticar por qué los campos no se rellenaban.
    *   **Gestión de Respuestas JSON de la IA**: Se añadió la función `extractFirstJsonBlock` en `js/utils.js` para extraer el primer bloque JSON válido de la respuesta de la IA y evitar errores cuando se devuelven múltiples objetos o texto adicional.
*   **Mejoras en la Sección Mobiles**:
    *   **Adición de Tipos de Daño**: Se añadió una nueva lista `damageTypes` al archivo `js/config.js` para definir los tipos de daño de los mobs, incluyendo su valor en inglés y su descripción en español.
    *   **Integración de Tipos de Daño en la UI**: Se modificó `index.html` para cambiar el campo 'Tipo de Daño' de un `input` de texto a un `select` en la plantilla del mob. Posteriormente, se actualizó `js/utils.js` para poblar dinámicamente este `select` con las opciones de `gameData.damageTypes`, permitiendo la selección de tipos de daño predefinidos y estableciendo 'none' como opción por defecto.
    *   **Auto-rellenado de Hitroll**: Se implementó la funcionalidad de auto-rellenado para el campo '+Hitroll' de los mobs. Se añadió una tabla de recomendaciones (`hitrollRecommendations`) a `js/config.js` y se desarrolló la lógica en `js/mobiles.js` para calcular el hitroll sugerido basándose en el nivel del mob, utilizando interpolación lineal para los rangos.
    *   **Auto-rellenado de HP, Mana, Armaduras y Daño**: Se añadió una tabla de recomendaciones (`mobStatsRecommendations`) a `js/config.js` para los valores de HP, Mana, Armaduras y Daño por nivel. Se modificó `js/mobiles.js` para auto-rellenar estos campos basándose en el nivel del mob. El cálculo de Mana se ajustó para seguir la fórmula `1d10 + 100 * Nivel`, y la Armadura Mágica se calcula con la fórmula `((ac - 10) / 3) + 10`.
*   **Mejoras en la Sección Objects**:
    *   **Campo Material (Datalist)**:
        *   **Funcionalidad**: Se implementó un campo de entrada para "Material" que permite seleccionar de una lista de sugerencias o escribir un valor personalizado. Esto se logró utilizando un elemento `<datalist>` en `index.html` vinculado al campo de entrada.
        *   **Configuración**: Se añadió la lista `materials` a `gameData` en `js/config.js`.
        *   **Población Dinámica**: Se implementó la lógica en `script.js` para poblar el `datalist` de materiales al cargar la aplicación.
        *   **Comportamiento UI**: Se ajustó el campo para que inicie vacío con un `placeholder` ("ej. acero"), y se confirmó que la lista de sugerencias aparece al borrar el campo y hacer clic en la flecha, o al escribir.
        *   **Depuración**: Se realizaron varias iteraciones de depuración para resolver errores de sintaxis (`Uncaught SyntaxError: Identifier 'populateMaterialsDatalist' has already been declared`) y asegurar la correcta carga y población del `datalist`, incluyendo la adición y posterior eliminación de `console.log`s.
    *   **Campo Tipo y Valores V0-V4 Dinámicos**:
        *   **Funcionalidad**: Se implementó el campo "Tipo" (`<select>`) para objetos, que al cambiar su valor, actualiza dinámicamente las etiquetas de los campos V0-V4 (`<input type="text">`) según el tipo de objeto seleccionado.
        *   **Configuración**: Se añadieron las listas `objectTypes` y `objectValueLabels` a `gameData` en `js/config.js`, definiendo las etiquetas específicas para cada tipo de objeto (ej. `weapon`, `proteccion`, `light`, etc.).
        *   **Población Dinámica**: Se modificó `js/objects.js` para importar `gameData` y para que la función `populateObjectTypeSelect` (pasada como `postAddCallback` a `setupDynamicSection`) rellene el `<select>` de "Tipo" con las opciones de `objectTypes`.
        *   **Actualización de Etiquetas**: La función `updateObjectValuesUI` en `js/objects.js` fue modificada para usar `gameData.objectValueLabels` y así cambiar las etiquetas de V0-V4 según el tipo seleccionado.
        *   **Depuración**: Se depuró un problema inicial donde el desplegable de "Tipo" aparecía vacío, lo que llevó a la confirmación de que las listas `objectTypes` y `objectValueLabels` no se habían añadido correctamente en una iteración anterior.
    *   **Tipos de objeto con etiquetas en español**:
        *   **Configuración**: `gameData.objectTypes` ahora almacena objetos con `value` (inglés) y `label` (español) para cada tipo de objeto.
        *   **Interfaz**: `populateObjectTypeSelect` en `js/objects.js` utiliza estas etiquetas, mostrando los nombres en español mientras mantiene los valores en inglés en el archivo generado.
    *   **Desplegables de V0-V4 por Tipo**:
        *   **Funcionalidad**: Dependiendo del tipo de objeto, los campos V0-V4 ahora pueden mostrarse como `<select>` con opciones predefinidas.
        *   **Configuración**: Se añadió la estructura `objectValueOptions` a `gameData` en `js/config.js`, permitiendo definir listas como tipos de armas, daños o flags para cada V.
        *   **Integración**: `js/objects.js` actualiza dinámicamente estos campos y `js/parser.js` fue adaptado para soportar los nuevos desplegables.
    *   **Eliminación de Campos Redundantes**:
        *   **V0-V4**: Se eliminó un grupo redundante de campos de entrada V0-V4 (`<input type="number">`) del `object-template` en `index.html`, asegurando que solo el `fieldset` con las etiquetas dinámicas sea el utilizado.
        *   **Flags y Lugar de Vestir**: Se eliminaron los campos de entrada de texto redundantes para "Flags" y "Lugar de vestir" del `object-template` en `index.html`, manteniendo solo los `fieldset`s con checkboxes.
        *   **Generación de Archivo**: Se confirmó que `generateObjectsSection` en `js/objects.js` lee correctamente los valores de V0-V4, Flags y Lugar de Vestir de los campos correctos (los `fieldset`s).
    *   **Bandera P/G después del Precio**:
        *   **Funcionalidad**: Se añadió un checkbox "Es Contenedor de Bebida (G)" en el `object-template` de `index.html` después del campo "Precio".
        *   **Generación de Archivo**: Se modificó `generateObjectsSection` en `js/objects.js` para que, al generar el archivo `.are`, añada `G` si el checkbox está marcado, y `P` si no lo está, después del valor del precio.
    *   **Flags y Lugar de Vestir (Checkboxes)**:
        *   **Funcionalidad**: Se aseguró que los checkboxes de "Flags" y "Lugar de Vestir" en el `object-template` funcionen correctamente, generando una cadena combinada de flags (`ej. ADGI`).
        *   **Depuración**: Se depuró un problema donde `getFlagString` devolvía `0` a pesar de que los checkboxes estaban marcados. Se descubrió que el selector `fieldset[legend="Flags"]` era incorrecto.
        *   **Solución**: Se refactorizó la función `getFlagString` en `js/utils.js` para que encuentre el `fieldset` correcto buscando por el texto de su `legend` (`legend.textContent.trim()`).
        *   **Confirmación**: Se verificó mediante `console.log` que `getFlagString` ahora identifica correctamente los `fieldset`s y recolecta los valores de los checkboxes marcados.
        *   **Limpieza**: Se eliminaron los `console.log` de depuración de `js/utils.js` y `js/objects.js`.
    *   **Affects (F) con Bits Desplegables**:
        *   **Funcionalidad**: Los Affects ahora utilizan un `<select>` para elegir los bits disponibles en lugar de un campo de texto libre.
        *   **Opciones Dinámicas**: Las opciones se cargan según el tipo de affect seleccionado (`A`, `I`, `R`, `V`), utilizando la nueva estructura `affectBitOptions` en `js/config.js`.
        *   **Integración**: La lógica se añadió en `js/objects.js`, `js/sets.js` y `js/parser.js` para poblar y mantener sincronizados estos desplegables.
*   **Mejoras en la Sección Rooms**:
    *   **Flags de Habitación**: Se corrigió la llamada a `getFlagString` en `js/rooms.js`, permitiendo que los flags seleccionados se escriban correctamente en el archivo `.are`.
    *   **Descripciones Adicionales con IA**: Se agregó un prompt específico para habitaciones y la lógica necesaria para que las descripciones extra utilicen instrucciones diferentes según si pertenecen a un objeto o a una habitación.
    *   **Salidas Diagonales**: El selector de salidas permite elegir direcciones diagonales (noreste, noroeste, sureste, suroeste).
*   **Mejoras en la Sección Resets**:
    *   **Selección Desplegable de VNUMs**: Los campos para mobs, objetos y habitaciones fueron reemplazados por menús desplegables que muestran las entidades ya creadas, reduciendo errores al escribir VNUMs manualmente.
    *   **Actualización Automática de Opciones**: Al añadir o eliminar mobs, objetos o habitaciones, las opciones de los reseteos se refrescan automáticamente para reflejar los cambios.
    *   **Comandos Claros**: Los botones M, O, P, G, E, D y R muestran su significado y un `tooltip` explicativo.
    *   **Parámetros Seleccionables**: Dirección, estado de puerta, lugar de vestir y clase de maze ahora se eligen desde listas definidas en `js/config.js`, incluyendo las direcciones diagonales.
    *   **Clase de Maze Ampliada**: Se añadió la clase `10` para laberintos que también consideran las salidas diagonales.
*   **Mejoras en la Sección Shops**:
    *   **Listas Desplegables Centralizadas**: Los tipos de objetos que compra la tienda, los porcentajes de compra/venta y las horas de apertura/cierre se seleccionan ahora desde desplegables, alimentados por las nuevas listas `shopObjectTypes`, `shopProfitOptions` y `shopHours` en `js/config.js`.
    *   **Comentarios de Tienda**: Cada tienda puede incluir un comentario opcional; si se especifica, se añade tras un `*` en la línea generada.
    *   **Encabezado con comentario**: El comentario de cada tienda se refleja en el título de la tarjeta para reconocerla cuando está contraída.
    *   **Parser y Generación Corregidos**: Se actualizó el formato de lectura y escritura para que cada tienda se procese en una sola línea conforme a la documentación.
*   **Mejoras en la Sección Specials**:
    *   **Desplegable de Especiales con Tooltips**: El tipo de especial ahora se elige desde un `<select>` poblado dinámicamente con `js/config.js`, mostrando un tooltip explicativo para cada opción.
    *   **Lista Centralizada de Especiales**: Se añadió `gameData.specials` con todos los nombres y descripciones, eliminando el `<datalist>` embebido en `index.html`.
    *   **Comentario en Encabezado**: El comentario opcional se muestra junto al nombre del especial en el título de la tarjeta para reconocerlo cuando está contraída.

*   **Progs**:
    *   Se eliminó la integración con Blockly y se volvió al editor de texto para MOBPROGS, OBJPROGS y ROOMPROGS.
*   **Carga de archivos .are**:
    *   Se corrigió el parser para reconocer solo las secciones principales y respetar los delimitadores internos `#0` y `~`, permitiendo importar áreas completas.
    *   Se ajustó la lectura de la cabecera `#AREA` para separar correctamente el rango de niveles, el creador, los VNUMs y la región, admitiendo variaciones de formato.
