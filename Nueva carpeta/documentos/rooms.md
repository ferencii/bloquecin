### #ROOMS

# Guía de Creación de Habitaciones en Áreas MUD

## Introducción

Un área en un MUD (Multi-User Dungeon) es una colección de habitaciones interconectadas que forman un entorno coherente. Las habitaciones son los bloques fundamentales de construcción de cualquier área y definen los espacios donde los jugadores pueden moverse, interactuar y explorar.

Este documento explica cómo crear y configurar habitaciones para un área MUD, incluyendo su formato, propiedades y conexiones.

---

## Estructura de un Archivo de Área

Un archivo de área (`.are`) contiene múltiples secciones, siendo `#ROOMS` una de las más importantes. Esta sección define todas las habitaciones del área y sus características.

La sección comienza con `#ROOMS` y termina con `#0`.

---

#### Formato de una Habitación

Cada habitación sigue esta estructura:

```

#<vnum>
<nombre de la habitación>~
<descripción de la habitación>
~
0 <flags de habitaciones> <tipo de sector>
{D<numero de dirección>
<descripción extensa de lo que se ve al mirar en esa dirección>
~
<identificativo de la puerta>~
<estado de la puerta> <vnum de la llave> <habitación conectada>}
[E
<nombre>~
<descripción extra>.
~]
[M <beneficio/perdida> H <beneficio/perdida>]
[C <nombre del clan>~]
S

```
---

## Definiciones y Componentes

### 1. VNUM
- Identificador numérico único para cada habitación.
- Recomendación: Usar números consecutivos para habitaciones conectadas.
- Ejemplo: `#1001`

### 2. Nombre de la Habitación
- Título que aparece al entrar en la habitación.
- Límite recomendado: 60 caracteres.
- Debe terminar con el carácter `~`.
- Ejemplo: `Plaza Central de Ankh-Morpork~`

### 3. Descripción de la Habitación
- Texto que describe lo que el jugador ve al entrar.
- Recomendación: Entre 5-10 líneas para una buena descripción.
- Termina con el carácter `~` en una línea separada.
- Puede incluir puntuación y formato.
- Ejemplo:
```
Te encuentras en el centro bullicioso de Ankh-Morpork. Comerciantes
y ciudadanos se mueven apresuradamente en todas direcciones. El
pavimento está desgastado por el constante tránsito de personas.
~
```

### 4. Flags y Sector
- Formato: `0 <flags> <sector>`
- **Flags**: Letras que representan propiedades especiales (ver tabla más abajo).
- **Sector**: Número que define el tipo de terreno (ver tabla de sectores).
- Ejemplo: `0 AD 1` (Habitación oscura e interior en una ciudad)

### 5. Salidas (Direcciones)
Para cada salida, se define:

- `D<número>`: Dirección de la salida (0-9).
- Descripción de lo que se ve al mirar en esa dirección.
- `~` (en línea separada)
- Identificativo de la puerta (si existe) seguido de `~`.
- Estado de la puerta, VNUM de la llave, y habitación conectada.

Ejemplo de salida sin puerta:

```
D1
Un camino estrecho continúa hacia el este.
~
~
0 -1 1002

```
Ejemplo de salida con puerta:

```
D0
Ves una puerta de madera robusta.
~
puerta madera~
1 -1 1003

```

### 6. Extras (Opcional)
Permiten añadir descripciones adicionales a elementos mencionados en la descripción principal:

```
E
estatua~
Una estatua de bronce que representa al fundador de la ciudad.
~

```

### 7. Modificadores de Regeneración (Opcional)
- `M <valor>`: Modificador de regeneración de maná.
- `H <valor>`: Modificador de regeneración de salud.
- Valores como porcentaje: 100 = normal, 110 = +10%, 90 = -10%.
- Ejemplo: `M 110 H 90` (Regenera maná un 10% más rápido, salud un 10% más lento)

### 8. Clan (Opcional)
- `C <nombre del clan>~`: Asigna la habitación a un clan específico.
- Ejemplo: `C Concilio~`

### 9. Fin de Habitación
- `S`: Marca el final de la definición de una habitación.

---

## Direcciones de las Salidas

| **Número** | **Dirección**  | **Número** | **Dirección** |
|------------|----------------|------------|---------------|
| D0         | Norte          | D6         | Noreste       |
| D1         | Este           | D7         | Noroeste      |
| D2         | Sur            | D8         | Sureste       |
| D3         | Oeste          | D9         | Suroeste      |
| D4         | Arriba         |            |               |
| D5         | Abajo          |            |               |

---

## Estados de Puertas

| **Valor** | **Descripción** | **Comportamiento** |
|-----------|-----------------|-------------------|
| 0         | Sin puerta      | Paso libre, no requiere llave |
| 1         | Puerta normal   | Se puede abrir/cerrar y forzar |
| 2         | Puerta reforzada| No se puede forzar, requiere llave |
| 3         | Barrera mágica  | No permite el traspasar sin llave |
| 4         | Barrera impenetrable | No permite traspasar ni puede forzarse |

---

## Flags de Habitación

| **Flag**       | **Código** | **Efecto**                                | **Flag**         | **Código** | **Efecto**                           |
|----------------|------------|-------------------------------------------|------------------|------------|--------------------------------------|
| Dark           | A          | Habitación oscura, requiere luz           | No Recall        | N          | No permite usar el hechizo recall    |
| No Mobs        | C          | Mobs no entran solos                      | Imp Only         | O          | Solo implementadores                 |
| Indoors        | D          | Interior, protege del clima               | Gods Only        | P          | Solo dioses (inmortales)             |
| Private        | J          | Limita número de jugadores                | Heroes Only      | Q          | Solo héroes                          |
| Safe           | K          | No se permite PK ni combate               | Newbies Only     | R          | Solo novatos                         |
| Solitary       | L          | Solo un jugador a la vez                  | Law              | S          | Zona de ley, castigo por crímenes    |
| Pet Shop       | M          | Tienda de mascotas                        | Nowhere          | T          | No aparece en comandos de ubicación  |
| No PK          | E          | No permite Player Killing                 | No astral        | I          | No permite teletransporte            |
| No summon      | U          | No permite invocaciones                   | No quit          | X          | No permite desconectarse             |
| Anti magia     | Z          | Bloquea uso de magia                      |                  |            |                                      |

---

## Tipos de Sector

| **Tipo**      | **Número** | **Puntos de Movimiento** | **Notas**                                   |
|---------------|------------|--------------------------|---------------------------------------------|
| INSIDE        | 0          | 1                        | Interior de edificios                       |
| CITY          | 1          | 2                        | Calles y zonas urbanas                      |
| FIELD         | 2          | 2                        | Campos y praderas                           |
| FOREST        | 3          | 3                        | Bosques y zonas arboladas                   |
| HILLS         | 4          | 4                        | Colinas y terreno elevado                   |
| MOUNTAIN      | 5          | 6                        | Montañas y terreno escarpado                |
| WATER         | 6          | 4                        | Agua poco profunda, se puede nadar          |
| DEEP WATER    | 7          | -                        | Agua profunda, requiere bote                |
| AIR           | 9          | -                        | Aire, requiere vuelo                        |
| DESERT        | 10         | 9                        | Desierto, afecta sed y recuperación         |

---

## Ejemplo Visual de Conexiones

A continuación se muestra un ejemplo de tres habitaciones conectadas:

```
[1]
 |
 v
[3]<--->[2]
```

**Habitación 1 (con puerta al sur hacia 3):**

```
#1
Habitación 1~
Estás en la habitación 1. El suelo está cubierto de baldosas pulidas.
La luz entra por una ventana en la pared este.
~
0 AD 0          # Flags: Oscura e Interior, Sector: Interior
D2              # Salida hacia el Sur
Ves una puerta de madera hacia el sur.
~
puerta~         # Palabra clave para interactuar con la puerta
2 1 3           # Estado: Puerta reforzada, Llave: VNUM 1, Conecta con: Hab. 3
S
```

**Habitación 2 (con salida al este hacia 3):**

```
#2
Habitación 2~
Estás en la habitación 2. Una alfombra roja cubre el suelo y hay
estanterías llenas de libros en las paredes.
~
0 AD 0          # Flags: Oscura e Interior, Sector: Interior
D1              # Salida hacia el Este
Ves un pasillo que lleva a otra habitación.
~
~               # Sin puerta (identificativo vacío)
0 -1 3          # Estado: Sin puerta, Sin llave (-1), Conecta con: Hab. 3
S
```

**Habitación 3 (con salidas al norte hacia 1 y al oeste hacia 2):**

```
#3
Habitación 3~
Estás en la habitación 3. Es una sala amplia con una mesa grande
en el centro. Hay sillas dispuestas alrededor de la mesa.
~
0 AD 0          # Flags: Oscura e Interior, Sector: Interior
D0              # Salida hacia el Norte
Ves una puerta de madera hacia el norte.
~
puerta~         # Palabra clave para interactuar con la puerta
2 1 1           # Estado: Puerta reforzada, Llave: VNUM 1, Conecta con: Hab. 1
D3              # Salida hacia el Oeste
Ves un pasillo que lleva a otra habitación.
~
~               # Sin puerta (identificativo vacío)
0 -1 2          # Estado: Sin puerta, Sin llave (-1), Conecta con: Hab. 2
E               # Extra (descripción adicional)
mesa~           # Palabra clave
Una mesa grande de roble con marcas de uso. Parece muy antigua.
~
S

```

---

## Configuraciones Especiales

### Tiendas de Mascotas

1. **Configuración del Flag:**
   - Coloca el flag **Pet Shop** (`M`) en la habitación donde estará el vendedor.

2. **Habitación de Reseteo:**
   - La habitación siguiente por **VNUM** debe tener también el flag **Pet Shop**.
   - Ejemplo: Si la tienda está en el **VNUM 2345**, la habitación **2346** será la de reseteo.
   - Los mobs (mascotas) deben resetearse en esta habitación.

3. **Requisitos para la Habitación de Reseteo:**
   - No debe estar conectada con ninguna otra habitación.
   - Solo sirve para el reseteo de las mascotas vendidas.

### Habitaciones de Clan

Las habitaciones de clan son áreas exclusivas para miembros de un clan específico:

1. Añade el flag `C <nombre del clan>~` al final de la definición de la habitación.
2. Considera añadir también flags como `Private` (J) o `No Recall` (N) para mayor exclusividad.

---

## Buenas Prácticas

1. **Nombres de Habitaciones:**
   - Usa nombres descriptivos y concisos.
   - Mantén un estilo consistente en toda el área.
   - Incluye la ubicación relativa cuando sea útil (ej. "Camino al Norte de la Ciudad").

2. **Descripciones Efectivas:**
   - Incluye detalles sensoriales (vista, sonido, olor).
   - Menciona elementos con los que se pueda interactuar.
   - Indica sutilmente las posibles salidas.
   - Evita referencias a otros jugadores o tiempo específico.

3. **Conexiones Lógicas:**
   - Asegúrate de que las salidas sean bidireccionales (si sales al norte de A y llegas a B, debes poder salir al sur de B y llegar a A).
   - Mantén coherencia geográfica (no conectes una montaña directamente con un océano sin transición).

4. **VNUMs Organizados:**
   - Asigna VNUMs de manera lógica y secuencial.
   - Reserva rangos para diferentes zonas dentro del área.
   - Documenta tu esquema de numeración.

---

## Reseteos de Objetos y Mobs

Los reseteos (cómo y dónde aparecen objetos y monstruos) se definen en otra sección del archivo de área (`#RESETS`), pero están vinculados a las habitaciones por sus VNUMs.

Ejemplo básico de reseteo:

```
M 0 1001 1 1002    # Coloca 1 mob (VNUM 1001) en la habitación 1002
G 0 1005 1         # Da al mob anterior el objeto 1005
O 0 1006 1 1003    # Coloca el objeto 1006 en la habitación 1003
```