### #SPECIALS

# Guía de Especiales (Specials) en Áreas MUD

## Introducción

Los "specials" son comportamientos especiales que se asignan a mobs (criaturas) para darles habilidades únicas o patrones de comportamiento específicos. Estos comportamientos van más allá de las estadísticas básicas y permiten crear NPCs más interesantes y desafiantes.

Esta sección explica cómo asignar comportamientos especiales a los mobs de tu área.

---

## Estructura de Especiales

La sección de especiales comienza con `#SPECIALS` en el archivo de área y termina con `S` en una línea separada. Cada línea entre estos delimitadores asigna un comportamiento especial a un mob específico.

---

## Formato de un Especial

Cada asignación de especial sigue este formato:

```
M <vnum mob> <especial> * <comentario>
```

### Ejemplo:

```
M 3001 spec_breath_fire * Dragón que lanza aliento de fuego
```

---

## Componentes de un Especial

### 1. VNUM del Mob
- Identificador numérico del mob al que se asignará el comportamiento especial.
- Este mob debe estar definido en la sección `#MOBILES` y reseteado en alguna habitación.
- Ejemplo: `3001`

### 2. Tipo de Especial
- Nombre del comportamiento especial que se asignará.
- Debe ser uno de los especiales predefinidos en el sistema.
- Ejemplo: `spec_breath_fire`

### 3. Comentario (Opcional)
- Comienza con un asterisco (`*`) y puede contener cualquier texto.
- Útil para documentar el propósito del especial.
- Ejemplo: `* Dragón que lanza aliento de fuego`

---

## Tipos de Especiales Disponibles

### Especiales de Aliento (Dragones)

| **Especial** | **Descripción** | **Efecto en Combate** |
|--------------|-----------------|------------------------|
| `spec_breath_acid` | Aliento ácido | Lanza el hechizo "aliento acido" contra un oponente |
| `spec_breath_fire` | Aliento de fuego | Lanza el hechizo "aliento fogoso" contra un oponente |
| `spec_breath_frost` | Aliento gélido | Lanza el hechizo "aliento helado" contra un oponente |
| `spec_breath_gas` | Aliento gaseoso | Lanza el hechizo "aliento gaseoso" que afecta a toda la sala |
| `spec_breath_lightning` | Aliento eléctrico | Lanza el hechizo "aliento tormentoso" contra un oponente |
| `spec_breath_any` | Aliento aleatorio | Selecciona aleatoriamente uno de los alientos anteriores |

### Especiales de Lanzamiento de Hechizos

| **Especial** | **Descripción** | **Hechizos Típicos** |
|--------------|-----------------|----------------------|
| `spec_cast_adepto` | Sanador para novatos | Lanza hechizos beneficiosos a jugadores de nivel 20 o menor: proteccion, bendecir, curar deslumbrar, curar leve, curar veneno, refrescar, curar enfermo |
| `spec_cast_clerigo` | Clérigo ofensivo | Lanza hechizos ofensivos de clérigo: deslumbrar, causar serio, terremoto, causar critico, disipar maldad, maldecir, operacion sexual, abrasar, porrazo, plaga, disipar magia |
| `spec_cast_mago` | Mago ofensivo | Lanza hechizos ofensivos de mago: deslumbrar, toque frio, debilitar, teleportar, spray, operacion sexual, chupar energia, meteorito, plaga, golpe acido |
| `spec_cast_undead` | No-muerto ofensivo | Lanza hechizos típicos de no-muertos: maldecir, debilitar, golpe frio, deslumbrar, veneno, chupar energia, porrazo, teleportar, plaga |
| `spec_veneno` | Envenenador | Lanza el hechizo "veneno" contra oponentes |
| `spec_cast_judge` | Juez explosivo | Lanza el hechizo "altamente explosivo" contra oponentes |
| `spec_cast_runk` | Hechizos de Runk | Hechizos específicos del mob Runk |
| `spec_cast_oteren` | Hechizos de Oteren | Hechizos específicos del mob Oteren |

### Especiales de Comportamiento

| **Especial** | **Descripción** | **Comportamiento** |
|--------------|-----------------|-------------------|
| `spec_nasty` | Ladrón agresivo | Ataca a jugadores de nivel superior, roba monedas durante el combate y huye frecuentemente |
| `spec_executioner` | Verdugo | Ataca automáticamente a jugadores con flags PLR_KILLER o PLR_THIEF, gritando para alertar a otros |
| `spec_fido` | Carroñero | Devora cadáveres en la habitación, liberando su contenido |
| `spec_guard` | Guardia | Ataca a jugadores con flags PLR_KILLER o PLR_THIEF, o a personajes malvados que estén atacando a otros |
| `spec_janitor` | Conserje | Recoge objetos basura, contenedores de bebida o items de bajo valor del suelo |
| `spec_ladron` | Ladrón | Roba dinero a jugadores (requiere flag ACT_THIEF) |
| `spec_teleporter` | Teletransportador | Se teletransporta a sí mismo cada cierto tiempo |
| `spec_guardia_bueno` | Guardia bueno | Protege a personajes de alineamiento bueno o neutral |
| `spec_guardia_malo` | Guardia malo | Protege a personajes de alineamiento malo o neutral |
| `spec_guardia_clan` | Guardia de clan | Protege áreas específicas de clan `NO USAR` |
| `spec_mordisco` | Mordedor | Utiliza la habilidad "bite" (morder) en combate |

### Especiales de Facciones

| **Especial** | **Descripción** | **Comportamiento** |
|--------------|-----------------|-------------------|
| `spec_patrolman` | Patrullero | Detiene peleas entre mobs, especialmente entre ogros y trolls |
| `spec_ogre_member` | Miembro ogro | Ataca automáticamente a mobs del grupo de trolls |
| `spec_troll_member` | Miembro troll | Ataca automáticamente a mobs del grupo de ogros |

### Especiales de Entrenamiento

| **Especial** | **Descripción** | **Comportamiento** |
|--------------|-----------------|-------------------|
| `spec_entrenador_samurai` | Entrenador samurai | Enseña habilidades específicas de samurai |
| `spec_samu_experto_1` | Experto samurai 1 | Enseña técnicas avanzadas de samurai (nivel 1) |
| `spec_samu_experto_2` | Experto samurai 2 | Enseña técnicas avanzadas de samurai (nivel 2) |

---

## Ejemplos de Uso

### Ejemplo 1: Dragón con Aliento de Fuego

```
#MOBILES
#3001
dragón rojo~
un dragón rojo~
Un enorme dragón rojo te observa con ojos hambrientos.
~
...definición del mob...

#RESETS
M 0 3001 1 3050 1    # Coloca al dragón en la habitación 3050

#SPECIALS
M 3001 spec_breath_fire * Dragón con aliento de fuego
S
```

### Ejemplo 2: Mago Hostil

```
#MOBILES
#3002
mago oscuro~
un mago oscuro~
Un mago vestido con túnicas negras murmura encantamientos aquí.
~
...definición del mob...

#RESETS
M 0 3002 1 3060 1    # Coloca al mago en la habitación 3060

#SPECIALS
M 3002 spec_cast_mago * Mago que lanza hechizos ofensivos
S
```

### Ejemplo 3: Guardia de la Ciudad

```
#MOBILES
#3003
guardia ciudad~
un guardia de la ciudad~
Un guardia de la ciudad vigila atentamente a los transeúntes.
~
...definición del mob...

#RESETS
M 0 3003 4 3070 2    # Coloca hasta 4 guardias, máximo 2 en la habitación 3070

#SPECIALS
M 3003 spec_guard * Guardia que protege a ciudadanos
S
```


---

## Buenas Prácticas

1. **Coherencia temática**:
   - Asigna especiales que tengan sentido con la descripción y rol del mob
   - Un dragón debería tener un aliento, un mago debería lanzar hechizos, etc.

2. **Balance de dificultad**:
   - Los especiales pueden hacer que un mob sea mucho más difícil
   - Considera el nivel de los jugadores que visitarán el área

3. **Distribución estratégica**:
   - No todos los mobs necesitan especiales
   - Úsalos para mobs importantes o jefes de zona

4. **Comentarios descriptivos**:
   - Usa el campo de comentario para documentar claramente el propósito del especial

5. **Prueba tus especiales**:
   - Algunos especiales pueden ser muy poderosos en combinación con ciertas estadísticas
   - Asegúrate de probar el comportamiento en el juego

---

## Consideraciones Especiales

### Mobs con Múltiples Especiales

Un mob solo puede tener un especial asignado. Si necesitas que un mob tenga múltiples comportamientos, deberás elegir el más importante o solicitar al implementador que cree un especial personalizado.

### Especiales Específicos de Zona

Algunos especiales como `spec_alcalde` están diseñados para mobs específicos en zonas concretas. Úsalos solo si estás recreando o extendiendo esas zonas.

### Especiales y Flags de Mob

Algunos especiales requieren flags específicos en la definición del mob para funcionar correctamente:
- `spec_ladron` requiere el flag ACT_THIEF

---

## Sección Final del Archivo

La sección de especiales debe terminar con una línea que contenga solo una `S`:
