### #SHOPS

# Guía de Creación de Tiendas en Áreas MUD

## Introducción

Las tiendas son elementos esenciales en cualquier área MUD, ya que permiten a los jugadores comprar y vender objetos. Cada tienda está asociada a un mob específico (el vendedor) y define qué tipos de objetos maneja, los precios de compra/venta y sus horarios de operación.

Esta sección explica cómo configurar tiendas funcionales en tu área para crear una economía dinámica.

---

## Estructura de Tiendas

La sección de tiendas comienza con `#SHOPS` en el archivo de área y termina con `0` en una línea separada. Cada línea entre estos delimitadores define una tienda individual.

---

## Formato de una Tienda

Cada tienda se define con una sola línea que sigue este formato:

```
<vnum vendedor> <V0> <V1> <V2> <V3> <V4> <prove comprar> <prove vender> <abrir> <cerrar> * comentario
```

### Ejemplo:

```
3456 1 2 9 0 0 80 110 0 23 * Vendedor de pociones en Ankh-Morpork
```

---

## Componentes de una Tienda

### 1. VNUM del Vendedor
- Identificador numérico del mob que actuará como vendedor.
- Este mob debe estar definido en la sección `#MOBILES` y reseteado en alguna habitación.
- Ejemplo: `3456`

### 2. Tipos de Objetos (V0~V4)
- Cinco valores que definen los tipos de objetos que el vendedor comprará.
- Se pueden especificar hasta 5 tipos diferentes.
- Si no se necesitan los 5 espacios, se completan con `0`.
- Ejemplo: `1 2 9 0 0` (compra luces, pergaminos y armaduras)

### 3. Porcentaje de Compra
- Porcentaje del precio base al que el vendedor COMPRA objetos a los jugadores.
- Valores menores a 100 significan que paga menos del valor real.
- Ejemplo: `80` (paga el 80% del valor)

### 4. Porcentaje de Venta
- Porcentaje del precio base al que el vendedor VENDE objetos a los jugadores.
- Valores mayores a 100 significan que cobra más del valor real.
- Ejemplo: `110` (cobra el 110% del valor)

### 5. Horario de Operación
- Dos números que indican la hora de apertura y cierre (formato 24 horas).
- Ejemplo: `0 23` (abierto desde las 0:00 hasta las 23:00, es decir, 24 horas)
- Ejemplo: `8 20` (abierto desde las 8:00 hasta las 20:00)

### 6. Comentario (Opcional)
- Comienza con un asterisco (`*`) y puede contener cualquier texto.
- Útil para documentar el propósito o ubicación de la tienda.
- Ejemplo: `* Vendedor de pociones en Ankh-Morpork`

---

## Tipos de Objetos que Puede Comprar un Vendedor

| **Código** | **Tipo de Objeto** | **Descripción** | **Código** | **Tipo de Objeto** | **Descripción** |
|------------|--------------------|--------------------|------------|--------------------|--------------------|
| 1          | Light              | Fuentes de luz     | 12         | Furniture          | Muebles             |
| 2          | Scroll             | Pergaminos mágicos | 13         | Trash              | Basura/Miscelánea   |
| 3          | Wand               | Varitas mágicas    | 15         | Container          | Contenedores        |
| 4          | Staff              | Bastones mágicos   | 17         | Drink container    | Bebidas             |
| 5          | Weapon             | Armas              | 18         | Key                | Llaves              |
| 8          | Treasure           | Tesoros/Monedas    | 19         | Food               | Comida              |
| 9          | Armor              | Armaduras          | 22         | Boat               | Botes/Embarcaciones |
| 10         | Potion             | Pociones           | 26         | Pill               | Píldoras            |
| 28         | Map                | Mapas              | 30         | Warpstone          | Piedras de teletransporte |
| 29         | Portal             | Portales           | 32         | Gem                | Gemas               |
| 33         | Jewelry            | Joyas              |            |                    |                     |

---

## Ejemplos de Tiendas

### Ejemplo 1: Armería

```
3001 5 9 0 0 0 75 125 8 18 * Herrero de la Ciudad
```

- **Vendedor**: Mob 3001 (un herrero)
- **Compra**: Armas (5) y armaduras (9)
- **Precios**: Compra al 75% del valor, vende al 125%
- **Horario**: De 8:00 a 18:00
- **Nota**: Típica armería de ciudad

### Ejemplo 2: Tienda de Magia

```
3002 2 3 4 10 26 90 150 0 23 * Mago Vendedor de Pociones
```

- **Vendedor**: Mob 3002 (un mago)
- **Compra**: Pergaminos (2), varitas (3), bastones (4), pociones (10) y píldoras (26)
- **Precios**: Compra al 90% del valor, vende al 150%
- **Horario**: Abierto 24 horas (0-23)
- **Nota**: Tienda de artículos mágicos

### Ejemplo 3: Joyería
```
3003 8 32 33 0 0 60 200 10 16 * Joyero Exclusivo
```

- **Vendedor**: Mob 3003 (un joyero)
- **Compra**: Tesoros (8), gemas (32) y joyas (33)
- **Precios**: Compra al 60% del valor, vende al 200%
- **Horario**: De 10:00 a 16:00 (horario reducido)
- **Nota**: Joyería de lujo con precios elevados

---

## Configuración Completa

Para que una tienda funcione correctamente, necesitas:

1. **Definir el mob vendedor** en la sección `#MOBILES`
2. **Resetear el mob** en una habitación usando la sección `#RESETS`
4. **Resetear los objetos** que el vendedor vende usando la sección `#RESETS`
    -   Los objetos deben estar definidos en la sección `#OBJECTS`
    -   Los objetos deben de estar reseteados en el inventario del mob vendedor en la sección `#RESETS`
5. **Definir la tienda** en la sección `#SHOPS`


### Ejemplo Completo:

```
#MOBILES
#3001
herrero Durnan~
Durnan el Herrero~
Durnan el Herrero está aquí, martillando sobre su yunque.
~
...definición del mob...

#0

#OBJECTS
#3101
espada acero~
una espada de acero~
Una espada de acero bien forjada descansa aquí.~
~
...definición del objeto...

#3102
escudo madera~
un escudo de madera~
Un escudo redondo de madera resistente está apoyado contra la pared.~
~
...definición del objeto...

#3103
daga pequeña~
una daga pequeña~
Una daga pequeña con empuñadura de cuero yace en el suelo.~
~
...definición del objeto...

#0

#RESETS
M 0 3001 1 3050 1   # Coloca a Durnan en la habitación 3050
G 1 3101 1          # Le da espada de acero para vender
G 1 3102 1          # Le da escudo de madera para vender
G 1 3103 1          # Le da daga pequeñas para vender
S

#SHOPS
3001 5 9 0 0 0 75 125 8 18 * Herrero Durnan
0
```

En este ejemplo completo:

1. **Definimos el mob vendedor** (Durnan el Herrero)
2. **Definimos los objetos que vende**:
   - Una espada de acero
   - Un escudo de madera
   - Una daga pequeña
3. **Reseteamos el mob** en la habitación 3050
4. **Reseteamos los objetos** en el inventario del vendedor usando comandos `G`
5. **Definimos la tienda** indicando que compra armas (5) y armaduras (9)
6. **Configuramos los precios** para que compre al 75% y venda al 125% del valor base
7. **Establecemos el horario** de 8:00 a 18:00 (horario comercial estándar)
Los jugadores podrán comprar estos objetos del herrero a un 125% de su valor base y venderle armas y armaduras al 75% de su valor.

---

## Buenas Prácticas

1. **Precios razonables**: 
   - Compra: 60-90% (dependiendo de la exclusividad)
   - Venta: 110-200% (dependiendo de la exclusividad)

2. **Horarios realistas**:
   - Tiendas normales: 8-20 o similar
   - Tabernas: horarios extendidos
   - Tiendas mágicas o especiales: pueden estar abiertas 24h

3. **Especialización**:
   - Es mejor tener varias tiendas especializadas que una sola que compre de todo
   - Cada vendedor debería tener una personalidad acorde a su negocio

4. **Ubicación estratégica**:
   - Coloca las tiendas en lugares lógicos y accesibles
   - Considera agruparlas en zonas comerciales

5. **Comentarios descriptivos**:
   - Usa el campo de comentario para documentar claramente el propósito de cada tienda

---


## Sección Final del Archivo

La sección de tiendas debe terminar con una línea que contenga solo un `0`:
```
#SHOPS
3001 5 9 0 0 0 75 125 8 18 * Herrero de la Ciudad
3002 2 3 4 10 26 90 150 0 23 * Mago Vendedor de Pociones
0
```