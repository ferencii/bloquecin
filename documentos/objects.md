
### #OBJECTS

# Guía de Creación de Objetos

## Índice
1. [Estructura Básica](#estructura-básica)
2. [Materiales](#materiales)
3. [Tipos de Objetos](#tipos-de-objetos)
4. [Flags de Objetos](#flags-de-objetos)
5. [Lugares de Vestir](#lugares-de-vestir)
6. [Valores Especiales (V0-V4)](#valores-especiales)
7. [Armas](#armas)
8. [Armaduras](#armaduras)
9. [Contenedores](#contenedores)
10. [Líquidos](#líquidos)
11. [Muebles](#muebles)
12. [Applies](#applies)
13. [Puntos de Poder](#puntos-de-poder)
14. [Affects Permanentes](#affects-permanentes)
15. [Hechizos Disponibles](#hechizos-disponibles)
16. [Ejemplos Completos](#ejemplos-completos)

---

## Estructura Básica

La estructura básica para definir un objeto es la siguiente:

```
#<vnum>
<nombres identificativos>~
<descripcion corta>~
<descripcion larga>~
<material>~
<tipo> <flags> <lugar de vestir>
<V0> <V1> <V2> <V3> <V4>
<nivel> <peso> <precio> P
{S <id del set>}
{A
<localizacion> <modificador>}
{F <afectado/immune/resistente/vulnerable> <localizacion> <modificador> <bits>}
{E
<nombre>~
<descripcion extra>.
~}
```

**Nota**: Las partes entre `{}` son opcionales.
          La `P` es una `G` si es un contenedor de bebida.

### Explicación de Campos:

1. **vnum**: Número único que identifica al objeto.
2. **nombres identificativos**: Palabras clave para referirse al objeto (separadas por espacios).
3. **descripcion corta**: Nombre que aparece en el inventario.
4. **descripcion larga**: Descripción que aparece cuando el objeto está en el suelo.
5. **material**: Material del que está hecho el objeto.
6. **tipo**: Categoría del objeto (arma, armadura, contenedor, etc.).
7. **flags**: Características especiales del objeto.
8. **lugar de vestir**: Dónde se equipa el objeto.
9. **V0-V4**: Valores específicos según el tipo de objeto.
10. **nivel**: Nivel mínimo para usar el objeto.
11. **peso**: Peso del objeto.
12. **precio**: Valor en monedas.
13. **S**: Identificador del set al que pertenece el objeto.
14. **A**: Modificadores de atributos (applies).
15. **F**: Affects permanentes, resistencias, inmunidades o vulnerabilidades.
16. **E**: Descripciones adicionales para partes específicas del objeto.

---

### Asociación con Sets

Para vincular un objeto a un set se usa la línea `S <id del set>` tras el
precio y antes de los bloques opcionales `A`, `F` o `E`. El identificador
debe existir en la sección `#SET`, donde cada set incluye una línea con su
nombre terminada en `~`.

Ejemplo completo:

```
#32500
anillo hielo rosa~
un anillo de hielo rosa~
Un anillo de hielo rosa llama tu atención.~
ice~
tesoro G AB
0 0 0 0 0
3 10 620 G
S 32500
A
13 4
E
anillo hielo rosa~
Que extraño... está hecho de hielo, pero no se derrite.~
~
```

Ejemplo de la definición del set asociado:

```
#SET

#32500
Set del Conspirador~
T 1

End
T 2
A 18 5
A 19 10
End
T 3
F A 0 0 V
A 13 50
End
T 4
F I 0 0 D
A 14 20
End
T 5
A 18 25
End

#32501
Set del Metepatas~
T 1
A 19 25
End
T 2
A 18 25

End
T 3
F A 0 0 V
A 13 50
End
T 4
F I 0 0 D
A 14 20
End
T 5
A 18 25
End
#0
```

---

## Materiales

Los materiales definen de qué está hecho un objeto y pueden afectar a sus propiedades.

| Material          | Material           | Material           | Material           | Material           |
|--------------------|--------------------|--------------------|--------------------|--------------------|
| plastic            | slime              | jelly              | wax                | rubber             |
| gold               | kid leather        | fur                | snakeskin          | gut                |
| food               | meat               | bread              | wood               | hardwood           |
| softwood           | bamboo             | ebony              | cork               | horn               |
| light laen         | sponge             | elastic silk       | satin              | lace               |
| lead               | wool               | linen              | canvas             | cloth              |
| velvet             | felt               | paper              | parchment          | vellum             |
| hemp               | copper             | electrum           | bronze             | brass              |
| wire               | tin                | pewter             | metal              | dark laen          |
| porcelain          | ivory              | marble             | stone              | quartz             |
| corundum           | bone               | shell              | coral              | energy             |
| fire               | air                | water              | acid               | coal               |
| sandstone          | clay               | ash                | earth              | diamond            |
| etherealness       | flint              | lodestone          | iron               | adamantite         |
| glass              | oil                | platinum           | silver             | balm               |
| cream              | steel              | mithril            | nothingness        | feathers           |
| granite            | enamel             | obsidian           | pottery            | crystal            |
| ice                | webbing            | cardboard          | hard/soft leather  | dragonscale        |
| blue dragonscale   | black dragonscale  | white dragonscale  | red dragonscale    | none               |

### Flags Especiales por Material

| **Flag**        | **Efecto**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | **Uso Recomendado**                                                                                                                                                                                |
|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Presión**      | Los objetos con este flag limitan el movimiento del personaje al entrar en una nueva habitación. Cada unidad de peso equivale a 1 segundo sin poder moverse. Resiste el intento de desvestirse y afecta incluso si el objeto ya no está equipado.| Solo para objetos de quest o eventos que desaparecen al hacer `QUIT`. No recomendado para equipo normal; si se usa, limitar el tiempo a 1-2 segundos.|
| **Escurridizo**  | Los objetos no pueden quedarse en el inventario. Se equipan automáticamente al recibirlos y caen al suelo al desvestirlos.                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ideal para objetos de quest o eventos. No usar para equipo normal sin un propósito bien definido.                                                                                                  |
| **Legendario**   | Dobla la experiencia ganada al matar mobs. Se acumula con otros objetos legendarios. Requiere los materiales `denso` (no se guarda en contenedores) y `delicado` (pierde calidad al entrar en inventarios). El flag se pierde si el personaje tiene más de 10 niveles por encima del objeto. Si la calidad del objeto llega a 0, pierde el flag legendario y se convierte en basura.                                                                                                                                                                                    | Solo para objetos de quest difíciles o largos. Limitado a 1 objeto legendario por área.|
| **Denso**        | Los objetos con este flag no pueden guardarse en contenedores.| Obligatorio para objetos `legendarios`.|
| **Antidenso**    | Los contenedores (mochilas...) con este flag pueden guardar objetos `DENSO`.| Solo se usará en los contenedores de clanes para que almacenen los `legendarios`.|
| **Delicado**     | Los objetos pierden calidad cada vez que entran en un inventario. Al llegar a calidad 0, el objeto se rompe, pierde el flag `legendario` y todas sus estadísticas, convirtiéndose en basura. La calidad inicial se configura en el campo `PRECIO` durante la creación del objeto.                                                                                                                                                                                                                                                                                                         | Se recomienda una calidad inicial de 10 para objetos legendarios.|

---

## Tipos de Objetos

El tipo de objeto determina su función básica y cómo interactúa con el mundo del juego.

| **Tipo**       | **Tipo**      | **Tipo**      | **Tipo**      | **Tipo**       |
|-----------------|--------------|---------------|---------------|----------------|
| light           | scroll       | wand          | staff         | weapon         |
| treasure        | proteccion   | potion        | clothing      | furniture      |
| trash           | container    | drink         | key           | food           |
| money           | boat         | npc_corpse    | pc_corpse     | fountain       |
| pill            | protect      | map           | portal        | warp_stone     |
| room_key        | gem          | jewelry       | jukebox       | disfraz        |
| emblema         |

---

## Flags de Objetos

Los flags determinan características especiales del objeto. Si no se necesita ningún flag, se puede dejar el campo en blanco (`0`).

| **Flag**       | **Descripción**                            | **Flag**       | **Descripción**                             |
|-----------------|--------------------------------------------|----------------|---------------------------------------------|
| (Glowing) A     | Brilla                                    | Anti-good J    | No usable por alineamientos buenos          |
| (Humming) B     | Emite un zumbido                          | Anti-evil K    | No usable por alineamientos malvados        |
| Dark (hidden) C | Oscuro, escondido                         | Anti-Neutral L | No usable por alineamientos neutrales       |
| Lock D          | Cerrado con llave                        | Nonmetal S     | No hecho de metal                           |
| Evil E          | Malvado                                  | Nolocate T     | No localizable                              |
| Invis F         | Invisible                                | Melt_Drop U    | Se deshace al caer                          |
| Magic G         | Mágico                                   | Had_timer V    | Tuvo un temporizador                        |
| Nodrop H        | No se puede dejar caer                   | Sell extract W | Se vende por su precio real (gemas, etc.)   |
| Bless I         | Bendito                                  | Burn proof Y   | Resistente al fuego                         |
| Alquiler R      | Puede ser alquilado                      | Noun_curse Z   | No se puede maldecir                        |
| Noremove M      | No se puede quitar                       | No desarmar X  | Va al inventario al ser desarmado           |
| Inventory N     | Inventario (para items de mobs)          | ardiendo aa    | Efecto de metal rojo, no se puede tocar     |
| Nopurge O       | No se puede purgar                       | No save ee      | El objeto no se guarda al hacer quit        |
| Rot_death P     | Se deshace tras la muerte del mob         |                |                                             |
| Vis_death Q     | Indetectable tras la muerte del mob       |                |                                             |

### Notas sobre Flags:
- **Inventory**: Los objetos que se dan a un mob vendedor deben llevar este flag para evitar que se agoten.
- **Rot_death**: El objeto se deshace poco después de la muerte del mob que lo llevaba.
- **Vis_death**: Hace que el objeto sea indetectable tras la muerte del mob que lo llevaba.
- **Melt_Drop**: Los objetos con este flag se deshacen al caer al suelo.
- **Sell extract**: Objetos que se compran y venden por su precio real, como gemas.
- **No desarmar**: Los objetos van al inventario en lugar de al suelo al ser desarmados.
- **Ardiendo**: Efecto de metal rojo; el objeto no se puede tocar.

---

## Lugares de Vestir

Determina dónde se equipa el objeto. Si el objeto no se puede coger, se deja el campo en blanco (`0`).

| **Flag** | **Descripción**         | **Flag** | **Descripción**         | **Flag** | **Descripción**         |
|----------|-------------------------|----------|-------------------------|----------|-------------------------|
| A        | Coger (todos)           | E        | Cabeza                  | I        | Brazos                  |
| B        | Dedos                   | F        | Piernas                 | J        | Escudo                  |
| C        | Cuello                  | G        | Pies                    | K        | Espalda|
| D        | Cuerpo                  | H        | Manos                   | L        | Cintura                 |
| M        | Muñeca                  | N        | Blandir                 | O        | Sujetado                |
| Q        | Flotando                | R        | Rodela                  | T        | EMBLEMA CLAN            |

---

## Valores Especiales

Los valores V0-V4 tienen diferentes significados según el tipo de objeto:

| **Tipo**                | **V0**         | **V1**          | **V2**        | **V3**         | **V4**       |
|-------------------------|----------------|------------------|---------------|----------------|--------------|
| **weapon**              | weap type      | num dice         | side dices    | dam type       | weap flags   |
| **proteccion**          | pierce         | bash             | slash         | exotic         | bulk         |
| **light**               | 0              | 0                | light dur     | 0              | 0            |
| **money**               | silver         | gold             | 0             | 0              | 0            |
| **drink containers**    | max capac      | cur capac        | liquid        | 0/A=pois       | 0            |
| **fountains**           | -1             | -1               | liquid        | 0              | 0            |
| **wand & staff**        | spel lv        | max charg        | cur charg     | spell          | 0            |
| **potion scroll pill**  | spel lv        | spell            | spell         | spell          | spell        |
| **containers**          | max wei        | flags            | 0             | objetos maximos| mult         |
| **food**                | hours full     | hour hung        | 0             | 0/A=pois       | 0            |
| **food_buff**           | duracion       | Cantidad	      | apply         | A/I/R/V        | flags/A=veneno |
| **portals**             | cargas         | exit flags       | gate flags    | rnum           | 0            |
| **furniture**           | gente          | total wei        | fur flags     | heal bon       | mana bon     |
| **emblema**             | id_clan *      | rango            |               |                |              |

* idclan: 2 = concilio 6= paladine 8 = petria

### Tipo de objeto `food_buff`

Este tipo de objeto otorga un beneficio temporal al ser consumido. Sus
valores especiales se interpretan así:

- **V0**: duración del efecto en _ticks_.
- **V1**: Cantidad.
- **V2**: Stat que se va a buffar fuer, hit, Dam según la tabla "Localizaciones de Applies".
- **V3**: `A` aplica un _affect_, `I` confiere inmunidades, `R` otorga resistencias y `V` genera vulnerabilidades.
- **V4**: Que Affect, inmunidad, ressitencia o vulneravilidad, según las tablas correspondientes.

Al consumir el objeto te da el beneficio temporal, si consumes otro objeto perderás el beneficio antiguo sustituyéndolo  por el nuevo, no se pueden acumular beneficios de food_buff

Ejemplo básico:

```text
#45000
manzana encantada~
una manzana encantada~
Esta manzana desprende un leve brillo.~
organic~
food_buff G A
3 2 1 A 0
10 1 50 G
```

En este caso se obtienen 3 ticks de `+2` a la fuerza (`APPLY_STR`).

---

## Armas

### Tipos de Armas

| **Weapon Type** | **Weapon Type** | **Weapon Type** | **Weapon Type** |
|------------------|-----------------|-----------------|-----------------|
| espada           | daga            | boleadoras      | maza            |
| hacha            | mayal           | latigo          | lanza           |

### Tipos de Daño

Cada tipo de daño afecta a una armadura diferente.
Los ataques mágicos además tienen una clasificación que se relaciona con las inmunidades/resistencias/vulnerabilidades.

Solo se ha de informar de UN tipo de daño. Se pondrá el tipo en inglés, el que sale en la primera columna.

| Tipo en Inglés | Descripción en Español      | Código de Daño  |
|----------------|-----------------------------|-----------------|
| slice          | tajo                        | DAM_SLASH       |
| stab           | pinchazo                    | DAM_PIERCE      |
| slash          | golpe de espada             | DAM_SLASH       |
| latigo         | latigazo                    | DAM_SLASH       |
| claw           | gancho                      | DAM_SLASH       |
| blast          | mazazo                      | DAM_BASH        |
| pound          | porrazo                     | DAM_BASH        |
| crush          | cabezazo                    | DAM_BASH        |
| grep           | estoque                     | DAM_SLASH       |
| bite           | mordisco                    | DAM_PIERCE      |
| pierce         | estoque                     | DAM_PIERCE      |
| suction        | succionamiento letal        | DAM_BASH        |
| beating        | azote                       | DAM_BASH        |
| digestion      | vomito acido                | DAM_ACID        |
| charge         | barrigazo                   | DAM_BASH        |
| slap           | bofetón                     | DAM_BASH        |
| punch          | punch                       | DAM_BASH        |
| wrath          | golpe furioso               | DAM_ENERGY      |
| magic          | mágico pase                 | DAM_ENERGY      |
| divine         | poder divino                | DAM_HOLY        |
| cleave         | golpe carnicero             | DAM_SLASH       |
| scratch        | zarcalmao ursido            | DAM_PIERCE      |
| peck           | picotazo                    | DAM_PIERCE      |
| peckb          | besito de hierro            | DAM_BASH        |
| chop           | tajo devastador             | DAM_SLASH       |
| sting          | ataque 'picadura de avispa' | DAM_PIERCE      |
| smash          | choque                      | DAM_BASH        |
| shbite         | relámpago luminoso          | DAM_LIGHTNING   |
| flbite         | chorro de fuego             | DAM_FIRE        |
| frbite         | golpe helador               | DAM_COLD        |
| acbite         | golpe ácido                 | DAM_ACID        |
| chomp          | chomp                       | DAM_PIERCE      |
| drain          | pase de succión vital       | DAM_NEGATIVE    |
| thrust         | empujón                     | DAM_PIERCE      |
| slime          | salivazo                    | DAM_ACID        |
| shock          | shock                       | DAM_LIGHTNING   |
| thwack         | Plaff!                      | DAM_BASH        |
| flame          | llamarazo                   | DAM_FIRE        |
| chill          | pinchazo frío               | DAM_COLD        |


### Flags de Armas

| **Flag** | **Descripción** |
|----------|-----------------|
| A        | flaming         |
| B        | frost           |
| C        | vampiric        |
| D        | sharp           |
| E        | vorpal          |
| F        | two-handed      |
| G        | shocking        |
| H        | poisoned        |
| I        | Sangriento      |
| J        | Hemorragia      |

### Máximos Damrolls para Armas (Hitroll similar)

| **Nivel**   | **Máximo Damroll/Hitroll** |
|-------------|---------------------|
| 100-111     | 25                 |
| 90-99       | 15                 |
| 80-89       | 11                 |
| 70-79       | 9                  |
| 60-69       | 7                  |
| 50-59       | 6                  |
| 40-49       | 4                  |
| 31-39       | 4                  |
| 21-30       | 3                  |
| 11-20       | 3                  |
| 1-10        | 2                  |

### Cálculo de Daño de Armas

#### Fórmula de Marca:
```
Marca = Nivel - (Damroll / 2) + (Factor Flags) + (Factor Tipo)
```

#### Factores de Modificación:

| **Atributo/Tipo/Flag** | **Factor Marca** |
|-------------------------|------------------|
| Exótico, Maza, Mayal, Látigo | +1               |
| Espada, Daga, Lanza, Hacha    | -1               |
| -2 Damroll                    | +1               |
| +2 Damroll                    | -1               |
| Flaming                       | -7               |
| Shocking                      | -5               |
| Sharp                         | -3               |
| Vampiric                      | -3               |
| Frost                         | -1               |
| Poisoned                      | -1               |
| Two-handed (2 manos)          | +7               |
| Vorpal                        | 0                |

#### Tabla de Marcas y Dados de Daño

| **Marca** | **Dados**                             | **Marca** | **Dados**                             |
|-----------|---------------------------------------|-----------|---------------------------------------|
| -8 a -3   | 1d4                                   | 32        | 2d18, 3d12                           |
| -2 a 0    | 1d5                                   | 33        | 3d12                                 |
| 1         | 1d6                                   | 34-35     | 2d19, 4d9, 5d7, 8d4, 10d3            |
| 2         | 1d7, 2d3                              | 36-37     | 2d20, 3d13, 6d6, 7d5                 |
| 3         | 1d8                                   | 38        | 2d21, 4d10, 11d3                     |
| 4         | 1d9, 2d4                              | 39        | 3d14, 5d8, 9d4                       |
| 5         | 1d10                                  | 40-41     | 2d22                                 |
| 6         | 1d11, 2d5, 3d3                        | 42        | 2d23, 3d15, 4d11, 6d7, 8d5, 12d3     |
| 7         | 1d12                                  | 43        | 7d6                                  |
| 8         | 1d13, 2d6                             | 44        | 2d24, 5d9, 10d4                      |
| 9         | 1d14, 3d4                             | 45        | 3d16                                 |
| 10-11     | 1d15, 2d7, 4d3                        | 46-47     | 2d25, 4d12, 13d3                     |
| 12-13     | 2d8, 3d5                              | 48        | 2d26, 3d17, 6d8, 9d5                 |
| 14        | 2d9, 4d4, 5d3                         | 49        | 5d10, 11d4                           |
| 15        | 3d6                                   | 50        | 2d27, 4d13, 7d7, 8d6, 14d3           |
| 16-17     | 2d10                                  | 51        | 3d18                                 |
| 18        | 2d11, 3d7, 4d5, 6d3                   | 52-53     | 2d28                                 |
| 19        | 5d4                                   | 54-55     | 2d29, 3d19, 4d14, 5d11, 6d9, 10d5, 12d4, 15d3 |
| 20        | 2d12                                  | 56        | 2d30                                 |
| 21        | 3d8                                   | 57        | 3d20, 7d8, 9d6                       |
| 22-23     | 2d13, 4d6, 7d3                        | 58        | 4d15, 8d7, 16d3                      |
| 24-25     | 2d14, 3d9, 5d5, 6d4                   | 59        | 5d12, 13d4                           |
| 26        | 2d15, 4d7, 8d3                        | 60-61     | 3d21, 6d10, 11d5                     |
| 27        | 3d10                                  | 62        | 4d16, 17d3                           |
| 28        | 2d16                                  | 63        | 3d22                                 |
| 29        | 5d6, 7d4                              | 64-65     | 5d13, 7d9, 10d6, 14d4                |
| 30-31     | 2d17, 3d11, 4d8, 6d5, 9d3             | 66-67     | 3d23, 4d17, 6d11, 8d8, 9d7, 12d5, 18d3 |
| 68-69     | 3d24, 5d14, 15d4                      | 70        | 4d18, 19d3                           |
| 71        | 7d10, 11d6                            | 72-73     | 3d25, 6d12, 13d5                     |
| 74        | 4d19, 5d15, 8d9, 10d7, 16d4, 20d3     | 75-76     | 3d26, 9d8                            |
| 77-78     | 3d27, 4d20, 6d13, 7d11, 12d6, 14d5, 21d3 | 79-80  | 5d16, 17d4                           |
| 81        | 3d28                                  | 82-83     | 4d21, 8d10, 11d7, 22d3               |
| 84        | 3d29, 5d17, 6d14, 9d9, 10d8, 15d5, 18d4 | 85      | 7d12, 13d6                           |
| 86        | 4d22, 23d3                            | 87-88     | 3d30                                 |
| 89        | 5d18, 19d4                            | 90-91     | 3d31, 4d23, 6d15, 8d11, 12d7, 16d5, 24d3 |
| 92        | 7d13, 14d6                            | 93        | 3d32, 9d10, 11d8                     |
| 94-95     | 4d24, 5d19, 10d9, 20d4, 25d3          | 96-97     | 3d33, 6d16, 17d5                     |
| 98        | 4d25, 8d12, 13d7, 26d3                | 99        | 3d34, 5d20, 7d14, 15d6, 21d4         |
| 100-102   | 3d35, 15d7, 21d5                      | 105       | 3d40, 4d30                           |
| 107       | 3d42                                  | 108       | 3d43                                 |
| 109       | 3d44                                  | 110       | 3d45                                 |
| 111       | 3d46                                  |           |                                       |

#### Ejemplo de Cálculo de Marca:

Arma: **Espada Nivel 30**, **+4 Damroll**, **Flaming**

1. **Nivel** = 30  
2. **Damroll** = 4  
3. **Flags** = Flaming (-7)  
4. **Tipo de Arma** = Espada (-1)  

**Cálculo:**
```
Marca = 30 - (4 / 2) + (-7) + (-1)
Marca = 30 - 2 - 7 - 1
Marca = 20
```

En este caso, la Marca sería **20**, y los dados de daño serían **2d12**.

---

## Armaduras

### Armaduras Máximas por Nivel:

| **Nivel del Objeto** | **Armadura Máxima** |
|-----------------------|---------------------|
| 1 - 9                | 2 - 3               |
| 10 - 14              | 4 - 5               |
| 15 - 19              | 6 - 7               |
| 20 - 24              | 8 - 9               |
| 25 - 29              | 9 - 10              |
| 30 - 34              | 10 - 11             |
| 35 - 39              | 11 - 12             |
| 40 - 44              | 12 - 13             |
| 45 - 49              | 13 - 14             |
| 50 - 54              | 14 - 15             |
| 55 - 59              | 15 - 16             |
| 60 - 64              | 16 - 17             |
| 65 - 69              | 18 - 19             |
| 70 - 74              | 19 - 20             |
| 75 - 79              | 21 - 22             |
| 80 - 84              | 23 - 24             |
| 85 - 89              | 25 - 26             |
| 90 - 94              | 27 - 28             |
| 95 - 99              | 29 - 30             |

### Bulk (Cobertura)

El campo **bulk** se refiere a la cantidad de superficie que cubre un objeto.

| **Objeto**                     | **Bulk** | **Objeto**                        | **Bulk** |
|--------------------------------|----------|-----------------------------------|----------|
| Ropa / Broquel                 | 0        | Escudo Cometa / Armadura de Placas | 3        |
| Cuero Duro / Escudo Pequeño    | 1        | Escudo Torre / Armadura Ligera de Placas | 4     |
| Escudo Mediano / Cota de Mallas o Escamas | 2 | Armadura Pesada de Placas         | 5        |

---

## Contenedores

### Flags de Contenedores

| **Flag**              | **Valor** | **Descripción**                                                         |
|------------------------|-----------|-------------------------------------------------------------------------|
| Cerrable              | 1         | El contenedor puede cerrarse.                                           |
| Pickproof             | 2         | El contenedor no puede ser forzado o abierto con ganzúas.               |
| Cerrado               | 4         | El contenedor está cerrado por defecto.                                 |
| Cerrado con llave     | 8         | El contenedor requiere una llave para abrirse.                          |
| Poner dentro          | 16        | Permite colocar objetos dentro del contenedor.                          |

### Multiplicador de Peso
- No se recomienda asignar un multiplicador de peso demasiado bajo.
- **Regla:** Los contenedores no deben reducir el peso de los objetos en más del **75%**.

---

## Líquidos

| **Nombre**           | **Proof** | **Hambre** | **Sed** | **Nombre**             | **Proof** | **Hambre** | **Sed** |
|-----------------------|-----------|------------|---------|------------------------|-----------|------------|---------|
| Vino Tinto           | 30        | 1          | 8       | Cava                  | 32        | 1          | 8       |
| Licor de Monjes      | 16        | 1          | 8       | Limonada              | 0         | 1          | 9       |
| Aguardiente          | 190       | 0          | 4       | Vinito de Midgaard    | 151       | 1          | 3       |
| Zumo de Sandía       | 0         | 2          | -8      | Absenta               | 200       | 1          | 4       |
| Agua de Mar          | 0         | 1          | -2      | Cerveza Negra         | 0         | 2          | 9       |
| Ron                  | 35        | 2          | 8       | Amontillado           | 35        | 2          | 8       |
| Vino Blanco          | 28        | 1          | 8       | Agua de Acequia       | 50        | 1          | 7       |
| Vino Rosado          | 26        | 1          | 8       | Chupitos de Borrachín | 90        | 1          | 5       |
| Licor Benedictino    | 40        | 1          | 8       | Brandy                | 80        | 1          | 5       |
| Zumo de Higos        | 0         | 1          | 9       | Zumo de Naranja       | 0         | 2          | 9       |
| Agua                 | 0         | 1          | 10      | Cordial               | 100       | 1          | 5       |
| Brandy               | 15        | 1          | 8       | Vinagre               | 151       | 1          | 4       |
| Cerveza              | 12        | 1          | 8       | Sherry                | 38        | 2          | 7       |
| Whisky               | 120       | 1          | 5       | Sorbete Medieval      | 50        | 2          | 6       |
| Leche                | 0         | 2          | 9       | Licor de Cactus       | 140       | 1          | 5       |
| Té                   | 0         | 1          | 8       | Vodka                 | 130       | 1          | 5       |
| Tila                 | 0         | 2          | 9       | Hidromiel             | 34        | 2          | 8       |

---

## Muebles

### Flags de Muebles

| **Flag** | **Descripción**          | **Flag** | **Descripción**        | **Flag** | **Descripción**        |
|----------|--------------------------|----------|------------------------|----------|------------------------|
| A        | Stand at (Pararse cerca) | G        | Rest at (Descansar cerca) | M        | Put at (Colocar cerca) |
| B        | Stand on (Pararse sobre) | H        | Rest on (Descansar sobre) | N        | Put on (Colocar sobre) |
| C        | Stand in (Pararse dentro) | I       | Rest in (Descansar dentro) | O        | Put in (Colocar dentro) |
| D        | Sit at (Sentarse cerca)  | J        | Sleep at (Dormir cerca)   | P        | Put inside (Colocar dentro completamente) |
| E        | Sit on (Sentarse sobre)  | K        | Sleep on (Dormir sobre)   |          |                        |
| F        | Sit in (Sentarse dentro) | L        | Sleep in (Dormir dentro)  |          |                        |

---

## Portales

### Gate Flags

| **Flag** | **Descripción**                                                                   |
|----------|-----------------------------------------------------------------------------------|
| A        | **Salida Normal**: El portal funciona como una salida estándar.                  |
| B        | **No Curse**: No puede ser utilizado por personas afectadas por la maldición (*curse*). |
| C        | **Go With**: El portal se mueve junto con la persona que lo utiliza.             |
| D        | **Gate Buggy**: Teletransporta a la persona algunas veces.                       |
| E        | **Random**: Siempre teletransporta a la persona a una ubicación aleatoria.       |




## Applies

Los "applies" son modificadores que afectan a las estadísticas del personaje cuando lleva equipado el objeto.

### Formato de Applies:
```
A
<localizacion> <modificador>
```

### Localizaciones de Applies:

| **Código** | **Atributo**         | **Código** | **Atributo**                  |
|------------|-----------------------|------------|--------------------------------|
| 0          | None                 | 13         | Hitpoints                     |
| 1          | Strength             | 14         | Movement                      |
| 2          | Dexterity            | 15         | Gold                          |
| 3          | Intelligence         | 16         | Experience                    |
| 4          | Wisdom               | 17         | AC (Armor Class)              |
| 5          | Constitution         | 18         | Hitroll                       |
| 6          | Sex                  | 19         | Damroll                       |
| 7          | Class                | 20         | Spell (includes rods, staves) |
| 8          | Level                | 21         | Saving Rod                    |
| 9          | Age                  | 22         | Saving Petrify                |
| 10         | Height               | 23         | Saving Breath                 |
| 11         | Weight               | 24         | Saving Spell                  |
| 12         | Mana                 | 25         | Spell Affect                  |
|            |                      | 26         | Spell power					 |
|            |                      | 27         | Heal power					 |

### Valores Recomendados para Applies:

| **Nivel**   | **Máximo Damroll/Hitroll** |
|-------------|---------------------|
| 100-111     | 25                 |
| 90-99       | 15                 |
| 80-89       | 11                 |
| 70-79       | 9                  |
| 60-69       | 7                  |
| 50-59       | 6                  |
| 40-49       | 4                  |
| 31-39       | 4                  |
| 21-30       | 3                  |
| 11-20       | 3                  |
| 1-10        | 2                  |

| **Nivel**     | **Máximo de Affects** | **Máximo HP/Mana** | **Máximo Str/Wis/Int/Con/Hitroll/Damroll** |
|---------------|-----------------------|--------------------|-------------------------------------------|
| 1 - 20        | 2                    | 10 - 20            | +1                                        |
| 21 - 40       | 3                    | 30 - 60            | +2                                        |
| 41 - 50       | 3                    | 70                 | +3                                        |
| 51 - 65       | 3                    | 90                 | +4                                        |
| 66 - 75       | 4                    | 100                | +5                                        |
| 76 - 85       | 4                    | 120                | +5                                        |
| 86+           | 5                    | 150                | +6                                        |


## Regla par conocer el poder del objeto:

Se le asigna una cantidad de puntos de poder al objeto según su nivel, y se calcula su poder según la siguiente tabla:

| **Nivel del Objeto** | **Puntos de Poder (PP)** |
|-----------------------|--------------------------|
| 1 - 5                | 1                        |
| 6 - 15               | 2                        |
| 16 - 25              | 3                        |
| 26 - 40              | 4                        |
| 41 - 55              | 5                        |
| 56 - 70              | 6                        |
| 71 - 91              | 7                        |
| 92 - 99              | 8                        |


 Equivalencia de 1 Punto de Poder:

| **Atributo**               | **Valor**  |
|----------------------------|------------|
| +1 Fuerza                 | 1 PP       |
| +1 Inteligencia           | 1 PP       |
| +1 Sabiduría              | 1 PP       |
| +1 Destreza               | 1 PP       |
| +1 Constitución           | 1 PP       |
| -2 Save vs. Spell         | 1 PP       |
| -2 Save vs. Breath        | 1 PP       |
| +1 Hitroll y +1 Damroll   | 1 PP       |
| +10 HP o +10 Mana         | 1 PP       |

---

## Affects Permanentes

Los affects permanentes son efectos mágicos que se aplican al personaje mientras lleva equipado el objeto.

#### Reglas Generales:
- **No se admiten objetos de nivel inferior a 60 con affects permanentes.**
- **No se permite bajo ningún caso el affect `Sanctuary` permanente.**

### Formato de Affects:
```
F <tipo> <localizacion> <modificador> <bits>
```

### Tipos de Affects:

| **Tipo** | **Descripción**                                                |
|----------|----------------------------------------------------------------|
| A        | Affected (Afectado): Aplica un efecto mágico al portador       |
| I        | Immune (Inmune): Otorga inmunidad a ciertos tipos de daño      |
| R        | Resist (Resistente): Otorga resistencia a ciertos tipos de daño|
| V        | Vulnerable (Vulnerable): Hace vulnerable a ciertos tipos de daño|

### Localizaciones de Affects:

| **Bit**      | **Descripción**         | **Bit**   | **Descripción**       |
|--------------|-------------------------|-----------|-----------------------|
| A            | Blind                   | N         | Prot_evil             |
| B            | Invisible               | O         | Prot_good             |
| C            | Detect_evil             | P         | Sneak                 |
| D            | Detect_invis            | Q         | Hide                  |
| E            | Detect_magic            | R         | Sleep                 |
| F            | Detect_hidden           | S         | Charm                 |
| G            | Detect_good             | T         | Flying                |
| H            | Sanctuary               | U         | Pass_door             |
| I            | Faerie_fire             | V         | Haste                 |
| J            | Infrared                | W         | Calm                  |
| K            | Curse                   | X         | Plague                |
| L            | Flaming (**No Implementado**) | Y         | Weaken                |
| M            | Poisoned                | Z         | Dark_vis              |
| aa           | Berserk (**No Implementado**) | bb        | Swim (**No Implementado**) |
| cc           | Regen                   | dd        | Slow                  |


### Bits para Inmunidades, Resistencias y Vulnerabilidades:

| **Bit** | **Tipo**            | **Bit** | **Tipo**       | **Bit** | **Tipo**       |
|---------|---------------------|---------|----------------|---------|----------------|
| A       | Summon              | I       | Cold           | Q       | Disease        |
| B       | Charm               | J       | Lightning      | R       | Drowning       |
| C       | Magic               | K       | Acid           | S       | Light          |
| D       | Weapons             | L       | Poison         | T       | Sound          |
| E       | Bash                | M       | Negative       | X       | Wood           |
| F       | Pierce              | N       | Holy           | Y       | Silver         |
| G       | Slash               | O       | Energy         | Z       | Iron           |
| H       | Fire                | P       | Mental         |         |                |

---

## Hechizos Disponibles

Los siguientes hechizos pueden ser utilizados en objetos mágicos como varitas, bastones, pergaminos, pociones y píldoras.
Tienen que usarse estos nombres no en inglés.

| **Spell**               | **Spell**               | **Spell**               | **Spell**               |
|--------------------------|--------------------------|--------------------------|--------------------------|
| abrasar                 | acelerar               | alineacion              | aliento acido           |
| aliento fogoso          | aliento gaseoso        | aliento helado          | aliento tormentoso      |
| antifuego               | bendecir               | bendita niebla          | buen aura               |
| calma                   | cancelacion            | causar critico          | causar leve             |
| causar serio            | chupar energia         | clarividencia           | compuerta               |
| control tiempo          | crear agua             | crear comida            | crear fuente            |
| crear rosa              | curar critico          | curar deslumbrar        | curar enfermo           |
| curar leve              | curar serio            | curar veneno            | demonfuego              |
| detectar bondad         | detectar magia         | detectar mal            | detectar oculto         |
| detectar veneno         | detectar invisibilidad | delirar                 | disco volador           |
| divina palabra          | dormir                 | eliminar maldecir       | encantar arma           |
| encantar equipo         | encantar gente         | escudo                  | fuerza colosal          |
| gatovision              | golpear acido          | golpe de agarre         | identificar             |
| invisibilidad           | lanzar rayo            | luz continua            | maldecir                |
| metal rojo              | meteorito              | misil magico            | nexus                   |
| operacion sexual        | palabras de regresar   | piel de piedra          | plaga                   |
| porrazo                 | portal                 | proteccion              | proteccion divina       |
| proteccion infernal     | rayo de sinceridad     | rayo letal              | rayo poderoso           |
| recargar                | refrescar              | relenti                 | reserved                |
| sanar                   | santuario              | spray                   | summon                  |
| teleportar              | terremoto              | todo curacion           | todo invisibilidad      |
| toque ardiente          | toque frio             | traspasar               | ventrilocuo             |
| veneno                  | volar                  |                         |                         |

---

## Consejos Finales para la Creación de Objetos

1. **Equilibrio**: Asegúrate de que los objetos sean apropiados para su nivel. Un objeto de nivel bajo no debería ser más poderoso que uno de nivel alto.

2. **Coherencia temática**: Los objetos deben tener sentido en el contexto del mundo. Una espada de hielo no debería dar resistencia al fuego sin una buena explicación.

3. **Descripciones detalladas**: Las buenas descripciones mejoran la inmersión de los jugadores. Incluye detalles sobre la apariencia, sensaciones y posible historia del objeto.

4. **Variedad**: Crea diferentes tipos de objetos para diferentes estilos de juego. No todos los jugadores quieren espadas mágicas.

5. **Unicidad**: Los objetos más poderosos deberían ser únicos y difíciles de obtener. Considera hacer que algunos objetos especiales sean "no-rent" para mantener su rareza.

6. **Puntos de poder**: Respeta los límites de puntos de poder para mantener el equilibrio del juego.

7. **Nombres claros**: Usa nombres descriptivos que permitan a los jugadores identificar fácilmente el objeto.

8. **Materiales apropiados**: Elige materiales que tengan sentido para el objeto. Una armadura pesada no debería estar hecha de tela.

9. **Precios razonables**: Establece precios que reflejen el valor y utilidad del objeto en el mundo del juego.

10. **Peso realista**: Asigna pesos que tengan sentido. Una espada grande debería pesar más que una daga.

---

## Sección Final del Archivo

Al finalizar la descripción completa de los objetos, se debe colocar un `#0` para indicar el final de la sección de objetos:

```
#OBJECTS
#3001
espada fuego llameante~
...definición del objeto...

#3002
coraza plateada dragón~
...definición del objeto...

#0
```
```