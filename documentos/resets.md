### #RESETS

# Guía de Reseteos en Áreas MUD

## Introducción

Los reseteos (resets) definen cómo y dónde aparecen los mobs (criaturas), objetos y el estado inicial de las puertas en un área MUD. Cada vez que el área se "resetea" (generalmente después de un reinicio del servidor o cuando ha pasado cierto tiempo sin jugadores), estos comandos se ejecutan para restaurar el área a su estado predeterminado.

Esta sección es fundamental para dar vida a un área, poblándola con personajes, tesoros y desafíos para los jugadores.

---

## Estructura de Reseteos

La sección de reseteos comienza con `#RESETS` en el archivo de área y termina con `S` en una línea separada. Los reseteos se ejecutan en el orden en que aparecen en el archivo, lo que es importante tener en cuenta al diseñarlos.

---

## Comandos de Reset

| **Código** | **Descripción** | **Formato** | **Ejemplo** |
|------------|-----------------|-------------|-------------|
| `M` | Carga mobs en habitaciones | `M 0 <vnum mob> <límite total> <vnum habitación> <límite local>` | `M 0 3001 5 3020 2` |
| `O` | Carga objetos en habitaciones | `O 0 <vnum objeto> <límite> <vnum habitación>` | `O 0 3050 1 3025` |
| `P` | Carga objetos dentro de otros | `P 1 <vnum objeto contenido> <límite> <vnum contenedor> <límite local>` | `P 1 3051 1 3050 1` |
| `G` | Da un objeto al inventario de un mob | `G 1 <vnum objeto> <límite>` | `G 1 3052 1` |
| `E` | Da un objeto equipado a un mob | `E 1 <vnum objeto> <límite> <lugar de vestir>` | `E 1 3053 1 16` |
| `D` | Define el estado de puertas | `D 0 <vnum habitación> <dirección> <estado>` | `D 0 3020 1 2` |
| `R` | Define un maze en una habitación | `R 0 <vnum habitación> <clase de maze>` | `R 0 3030 4` |
| `S` | Marca el final de la lista de resets | `S` | `S` |

### Notas importantes:

1. **Orden de ejecución**: Los reseteos se ejecutan secuencialmente de arriba a abajo.
2. **Dependencias**: Los comandos `G` y `E` afectan al último mob cargado con `M`.
3. **Límites**: El "límite total" controla cuántos de ese mob/objeto pueden existir en todo el mundo.
4. **Límite local**: Para mobs, controla cuántos pueden estar en una misma habitación.

---

## Detalles de los Comandos

### 1. Carga de Mobs (M)

```
M 0 <vnum mob> <límite total> <vnum habitación> <límite local mob>
```
- **vnum mob**: Número identificador del mob a cargar.
- **límite total**: Máximo de este mob que puede existir en todo el mundo.
- **vnum habitación**: Habitación donde aparecerá el mob.
- **límite local**: Máximo de este mob que puede existir en esa habitación específica.

**Ejemplo:**
```
M 0 3001 5 3020 2  # Carga hasta 5 guardias (vnum 3001) en total, máximo 2 en la habitación 3020
```

### 2. Carga de Objetos en Habitaciones (O)

```
O 0 <vnum objeto> <número> <vnum habitación>
```

- **vnum objeto**: Número identificador del objeto a cargar.
- **límite**: Máximo de este objeto que puede existir en todo el mundo.
- **vnum habitación**: Habitación donde aparecerá el objeto.

**Ejemplo:**
```
O 0 3050 1 3025  # Carga un objeto (vnum 3050) en la habitación 3025
```

### 3. Carga de Objetos dentro de Otros (P)
Tiene que ir después de un `O` para que funcione.
Es decir siempre tiene que haber un reset de OBJETO 'O' antes de un `P`, o el objeto no aparecerá y dará error.

```
P 1 <vnum objeto contenido> <límite> <vnum contenedor> <límite local>
```

- **vnum objeto contenido**: Objeto que se colocará dentro de otro.
- **límite**: Máximo de este objeto que puede existir en todo el mundo.
- **vnum contenedor**: Objeto que contendrá al otro (debe ser un contenedor).
- **límite local**: Máximo de este objeto que puede existir en ese contenedor específico.

**Ejemplo:**

```
P 1 3051 1 3050 1  # Coloca una moneda (vnum 3051) dentro de la fuente (vnum 3050)
```

### 4. Dar Objetos al Inventario de un Mob (G)
Tiene que ir después de un `M` para que funcione.
Es decir siempre tiene que haber un reset de MOB 'M' antes de un `G`, o el objeto no aparecerá y dará error.

```
G 1 <vnum objeto> <límite total>
```


- **vnum objeto**: Objeto que se dará al mob.
- **límite**: Máximo de este objeto que puede existir en todo el mundo.

**Ejemplo:**

```
M 0 3001 5 3020 2  # Carga un guardia
G 1 3052 1         # Le da una llave al guardia
```


### 5. Equipar Objetos a un Mob (E)
Tiene que ir después de un `M` para que funcione.
Es decir siempre tiene que haber un reset de MOB `M` antes de un `E`, o el objeto no aparecerá y dará error.

```
E 1 <vnum objeto> <límite total> <lugar de vestir>
```

- **vnum objeto**: Objeto que se equipará al mob.
- **límite**: Máximo de este objeto que puede existir en todo el mundo.
- **lugar de vestir**: Posición donde se equipará (ver tabla de lugares).

**Ejemplo:**

M 0 3001 5 3020 2  # Carga un guardia
E 1 3053 1 16      # Le equipa una espada (vnum 3053) en la mano (posición 16)


### 6. Definir Estado de Puertas (D)

```
D 0 <vnum habitación> <dirección> <estado de puerta>
```

- **vnum habitación**: Habitación donde está la puerta.
- **dirección**: Dirección de la salida (0=norte, 1=este, 2=sur, 3=oeste, 4=arriba, 5=abajo).
- **estado**: Estado inicial de la puerta (0=abierta, 1=cerrada, 2=cerrada con llave).

**Ejemplo:**

```
D 0 3020 1 2  # La puerta al este de la habitación 3020 está cerrada con llave
```

### 7. Definir Maze en una Habitación (R)

```
R 0 <vnum habitación> <clase de maze>
```

- **vnum habitación**: Habitación donde se aplicará el maze.
- **clase de maze**: Tipo de laberinto (4=cardinales, 6=incluye arriba/abajo).

**Ejemplo:**

```
R 0 3030 4  # Crea un laberinto de salidas cardinales en la habitación 3030
```
### 8. Marcar Fin de la Lista de Resets (S)

Para finalizar la lista de resets, se utiliza el comando `S`.

---

## Tablas de Referencia

### a) Estado de Puertas

| **Estado** | **Código** | **Descripción** |
|------------|------------|-----------------|
| Abierta | 0 | La puerta está abierta y permite el paso |
| Cerrada | 1 | La puerta está cerrada pero puede abrirse sin llave |
| Con llave | 2 | La puerta está cerrada con llave y requiere la llave correcta |

### b) Lugares de Vestir

| **Lugar** | **Código** | **Lugar** | **Código** |
|-----------|------------|-----------|------------|
| No vestir | -1 | Brazos | 10 |
| Luz | 0 | Escudo | 11 |
| Dedo izquierdo | 1 | En la Espalda | 12 |
| Dedo derecho | 2 | Cintura | 13 |
| Cuello (1) | 3 | Muñeca izquierda | 14 |
| Cuello (2) | 4 | Muñeca derecha | 15 |
| En el torso | 5 | Blandido (arma principal) | 16 |
| Cabeza | 6 | Sujeto | 17 |
| Piernas | 7 | Flotando | 18 |
| Pies | 8 | Arma secundaria | 19 |
| Manos | 9 | Rodela | 20 |
| Piernas traseras (centauro) | 21 | Pies traseros (centauro) | 22 |
| Emblema de clan | 23 | | |

### c) Clase de Maze

| **Clase** | **Descripción** |
|-----------|-----------------|
| 4 | Intercambia aleatoriamente las salidas cardinales (Norte, Sur, Este, Oeste) |
| 6 | Incluye también salidas arriba y abajo (Up, Down) |
| 10 | Incluye también salidas arriba y abajo, noroeste, suroeste, noreste, sureste |

---

## Ejemplos Completos

### Ejemplo 1: Guardia con Equipamiento

```
M 0 3001 5 3020 1   # Carga un guardia en la entrada de la ciudad
G 1 3052 1          # Le da una llave para guardar
E 1 3053 1 16       # Le equipa una espada
E 1 3054 1 5        # Le equipa una armadura
E 1 3055 1 11       # Le equipa un escudo
```

### Ejemplo 2: Habitación con Tesoro Escondido

```
O 0 3060 1 3030 1       # Carga un cofre en una habitación secreta
                        # Coloca tesoros dentro del cofre
P 1 3061 1 3060 1       # Una espada mágica
P 1 3062 5 3060 5       # Hasta 5 monedas de oro
```

---

## Buenas Prácticas

1. **Organización**: Agrupa los reseteos por zonas o funcionalidad para facilitar su mantenimiento.
2. **Comentarios**: Añade comentarios para explicar qué hace cada grupo de reseteos.
3. **Límites razonables**: Evita saturar el mundo con demasiados mobs u objetos.
4. **Prueba tus reseteos**: Verifica que todo funcione como esperas después de un reset completo.
5. **Secuencia lógica**:
    - Recuerda que los comandos G y E afectan al último mob cargado con M.
    - Recuera que los comandos P afectan al último objeto cargado con O.

---

## Reseteos Especiales

### Tiendas de Mascotas

Para configurar una tienda de mascotas, necesitas:

1. Habitación principal con el flag `M` (Pet Shop).
2. Habitación de reseteo (siguiente VNUM) también con flag `M`.
3. Reseteos para colocar las mascotas en la habitación de reseteo.

**Ejemplo:**
```
M 0 3040 1 3040 1   #Carga el vendedor de mascotas en la tienda -  Habitación principal (3040) con flag M

# Carga las mascotas en la habitación de reseteo (3041)
M 0 3011 1 3041 1  # Perros
M 0 3012 1 3041 1  # Gatos
M 0 3013 1 3041 1  # Dragones bebé
```
