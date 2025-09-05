**Prompt para IA de Generación de Código (HTML/JavaScript/CSS)**

**Objetivo:** Crear una aplicación web en HTML, CSS y JavaScript para asistir en la creación y edición de archivos de área (`.are`) para el MUD "Petria", basado en el sistema "Rom24". La aplicación debe permitir al usuario introducir datos para Mobs, Objetos, Habitaciones, Resets, Tiendas, Especiales, Sets y Mob/Obj/Room Progs, y luego generar un archivo `.are` con el formato exacto especificado en la documentación proporcionada.
Cada sección o parte importante estará en su porpio archivo separado, esto evita que se cree un solo archivo enorme he incontrolable, así como al tener todo en archivos diferentes se podrá buscar y modificar lo que sea necesario más fácilmente.
---

### **1. Estructura General del Archivo de Área (`.are`)**

La aplicación debe generar un archivo de texto con la siguiente estructura de secciones, en este orden preciso:

*   `#AREA`
*   `#MOBILES`
*   `#0`
*   `#OBJECTS`
*   `#0`
*   `#ROOMS`
*   `#0`
*   `#RESETS`
*   `S`
*   `#SET`
*   `#0`
*   `#SHOPS`
*   `0`
*   `#SPECIALS`
*   `S`
*   `#MOBPROGS`
*   `#0`
*   `#OBJPROGS`
*   `#0`
*   `#ROOMPROGS`
*   `#0`
*   `#$`

Cada sección debe tener su propio formulario o interfaz de entrada en la aplicación.

---

### **2. Detalles de Cada Sección y Sus Componentes**

A continuación, se detallan los campos, formatos, flags y reglas para cada sección.

#### **2.1. Sección `#AREA`**

*   **Campos de entrada**:
    *   `nombre.are`: Nombre del archivo de área (ej. `aligator.are`).
    *   `Nombre del Área`: Nombre legible del área (ej. `Aligator~`).
    *   `Nivel Mínimo / Nivel Máximo`: Rango de niveles recomendado (ej. `{ 50 70}`).
    *   `Creador`: Nombre del creador (ej. `Ferenci Ciudadela Aligator~`).
    *   `Vnum Inicial / Vnum Final`: Rango de VNUMs para las habitaciones (ej. `12100 12299`).
    *   `Región`: Región a la que pertenece el área (ej. `Region de Ramiug~`).

#### **2.2. Sección `#MOBILES`**

La aplicación debe permitir añadir múltiples mobs. Cada mob tendrá los siguientes campos:

*   **Vnum**: Número identificador único (ej. `12100`).
*   **Nombres identificativos**: Palabras clave separadas por espacios (ej. `recepcionista~`).
*   **Descripción corta**: Nombre en acciones (ej. `un recepcionista~`).
*   **Descripción larga**: Vista al entrar en la habitación (ej. `El recepcionista esta aquí mirandote a la cara fijamente para ponerte nervioso.~`).
*   **Descripción al mirar**: Vista al examinar el mob (ej. `Un hombre bastante joven...`).
*   **Raza**: (ej. `humano~`).
*   **Act Flags**: Múltiples flags, si se deja en blanco es `0`.
    *   `A` (NPC, siempre presente), `B` (Centinela), `C` (coge lo del suelo), `F` (agresivo), `G` (no sale del área), `H` (huye), `I` (mascota), `J` (entrena), `K` (practicas), `M` (Herrero), `N` (No-Quest), `O` (no-muerto), `P` (Tesorero clanes), `Q` (clérigo), `R` (mago), `S` (ladrón), `T` (guerrero), `U` (noaliniamiento), `V` (nopurge), `W` (no sale al exterior), `Y` (no sale al interior), `a` (sanador), `b` (hace gain), `c` (update), `d` (cambia dinero), `f` (Boss), `g` (Muerte especial), `h` (No puedes perfeccionarte).
*   **Afect Flags**: Múltiples flags, si se deja en blanco es `0`.
    *   `A` (blind), `B` (invisible), `C` (detect evil), `D` (detect invis), `E` (detect magic), `F` (detect hide), `G` (detect good), `H` (sanctuary), `I` (faerie fire), `J` (infravision), `K` (curse), `L` (Escudo de fe), `M` (veneno), `N` (protect evil), `O` (protect good), `P` (sneaking), `Q` (hiding), `R` (sleep), `S` (charm), `T` (flying), `U` (pass door), `V` (haste), `W` (calm), `X` (plague), `Y` (weaken), `Z` (dark vision), `aa` (berserk), `bb` (raices), `cc` (regeneration), `dd` (slow), `ee` (Hinchado).
*   **Alineamiento**: Número entre `-1000` y `1000` (ej. `0`).
*   **Grupo**: Número de la zona o `0` (ej. `0`).
*   **Nivel**: Nivel del mob (ej. `120`).
*   **+ Hitroll**: Número a sumar al hitroll base (ej. `151`).
*   **Dados HP / Dados Mana / Daño**: Formato `XdY+Z`.
    *   `Dados HP`: (ej. `120d24+17000`).
    *   `Dados Mana`: (ej. `120d10+100`).
    *   `Daño`: (ej. `20d10+37`).
*   **Tipo de daño**: Palabra en inglés de la tabla (ej. `none`, `bite`, `thwack`).
*   **Armaduras**: Valores `AC Pierce / AC Bash / AC Slash / AC Exótico / AC Mágico` (ej. `-75 -75 -75 -11 0`).
*   **Ofensivo Flags**: Múltiples flags.
    *   `A` (area attack), `B` (backstab), `C` (bash), `D` (berserk), `E` (disarm), `F` (dodge), `G` (fade), `H` (fast), `I` (kick), `J` (kick dirt), `K` (parry), `L` (rescue), `M` (tail), `N` (trip), `O` (crush), `P` (assist all), `Q` (assist align), `R` (assist race), `S` (assist players), `T` (assist guard), `U` (assist vnum), `V` (Fase), `W` (Contrataque), `Y` (No Scan), `Z` (Dummy), `a` (No_parry).
*   **Inmunidades/Resistencias/Vulnerabilidades Flags**: Tres campos para Imm, Res, Vul. Múltiples flags, `0` si vacío.
    *   `A` (Summon), `B` (Charm), `C` (Magic), `D` (Weapons), `E` (Bash), `F` (Pierce), `G` (Slash), `H` (Fire), `I` (Cold), `J` (Lightning), `K` (Acid), `L` (Poison), `M` (Negative), `N` (Holy), `O` (Energy), `P` (Mental), `Q` (Disease), `R` (Drowning), `S` (Light), `T` (Sound), `X` (Wood), `Y` (Silver), `Z` (Iron).
*   **Posiciones**: `stand`, `rest`, `sleep` (ej. `stand stand`).
*   **Sexo**: `male`, `female`, `either` (ej. `male`).
*   **Tesoro**: Cantidad de monedas (ej. `12000`).
*   **Forma/Partes**: Dos campos para Forma y Partes. Múltiples flags, `0` si vacío.
    *   `Forma`: `A` (comestible), `B` (envenenado), `C` (mágico), `D` (desaparece), `E` (otros), `G` (animal), `H` (sentient), `I` (undead), `J` (construct), `K` (mist), `L` (intangible), `M` (biped), `N` (centaur), `O` (insect), `P` (spider), `Q` (crustacean), `R` (worm), `S` (blob), `V` (mammal), `W` (bird), `X` (reptile), `Y` (snake), `Z` (dragon), `aa` (amphibian), `bb` (fish), `cc` (cold blood).
    *   `Partes`: `A` (cabeza), `B` (brazos), `C` (piernas), `D` (corazón), `E` (sesos), `F` (tripas), `G` (manos), `H` (pies), `I` (dedos), `J` (orejas), `K` (ojos), `L` (lengua), `M` (párpados), `N` (tentáculos), `O` (aletas), `P` (alas), `Q` (colas), `U` (garras), `V` (fangs), `W` (cuerno), `X` (escamas), `Y` (colmillos).
*   **Tamaño**: `tiny`, `small`, `medium`, `large`, `huge`, `gigante` (ej. `medium`).
*   **Material**: (ej. `desconocido`).

#### **2.3. Sección `#OBJECTS`**

La aplicación debe permitir añadir múltiples objetos. Cada objeto tendrá los siguientes campos:

*   **Vnum**: Número identificador único (ej. `12100`).
*   **Nombres identificativos**: Palabras clave separadas por espacios (ej. `llave habitacion habitación hp hotel~`).
*   **Descripción corta**: Nombre en el inventario (ej. `Una llave con el anagrama del Hotel Renedo~`).
*   **Descripción larga**: Vista al estar en el suelo (ej. `Una llave con el anagrama del Hotel Renedo y una pequeña inscripción.~`).
*   **Material**: De la lista de materiales disponibles (ej. `platinum`).
    *   La UI debe soportar flags especiales por material como `Presión`, `Escurridizo`, `Legendario`, `Denso`, `Antidenso`, `Delicado`.
*   **Tipo**: De la lista de tipos de objetos (ej. `room_key`).
*   **Flags**: Múltiples flags, `0` si vacío (ej. `0`).
    *   `A` (Glowing), `B` (Humming), `C` (Dark), `D` (Lock), `E` (Evil), `F` (Invis), `G` (Magic), `H` (Nodrop), `I` (Bless), `J` (Anti-good), `K` (Anti-evil), `L` (Anti-Neutral), `M` (Noremove), `N` (Inventory), `O` (Nopurge), `P` (Rot_death), `Q` (Vis_death), `R` (Alquiler), `S` (Nonmetal), `T` (Nolocate), `U` (Melt_Drop), `V` (Had_timer), `W` (Sell extract), `X` (No desarmar), `Y` (Burn proof), `Z` (Noun_curse), `aa` (ardiendo), `ee` (No save).
*   **Lugar de vestir**: De la lista de lugares de vestir, `0` si no se puede coger (ej. `A` para coger todos).
    *   `A` (Coger todos), `B` (Dedos), `C` (Cuello), `D` (Cuerpo), `E` (Cabeza), `F` (Piernas), `G` (Pies), `H` (Manos), `I` (Brazos), `J` (Escudo), `K` (Espalda), `L` (Cintura), `M` (Muñeca), `N` (Blandir), `O` (Sujetado), `Q` (Flotando), `R` (Rodela), `T` (EMBLEMA CLAN).
*   **V0-V4 (Valores especiales)**: Cinco valores numéricos que varían según el `Tipo` de objeto.
    *   **weapon**: `weap type` (tipo de arma, ej. `espada`), `num dice`, `side dices`, `dam type` (tipo de daño, ej. `shbite`), `weap flags` (flags del arma, ej. `G`).
    *   **proteccion**: `pierce`, `bash`, `slash`, `exotic`, `bulk`.
    *   **light**: `0`, `0`, `light dur`, `0`, `0`.
    *   **money**: `silver`, `gold`, `0`, `0`, `0`.
    *   **drink containers**: `max capac`, `cur capac`, `liquid` (nombre del líquido), `0/A=pois`, `0`.
    *   **fountains**: `-1`, `-1`, `liquid` (nombre del líquido), `0`, `0`.
    *   **wand & staff**: `spel lv`, `max charg`, `cur charg`, `spell` (nombre del hechizo), `0`.
    *   **potion scroll pill**: `spel lv`, `spell` (nombre del hechizo), `spell`, `spell`, `spell`.
    *   **containers**: `max wei`, `flags` (cerrable, pickproof, cerrado, con llave, poner dentro), `0`, `objetos maximos`, `mult` (multiplicador de peso).
    *   **food**: `hours full`, `hour hung`, `0`, `0/A=pois`, `0`.
    *   **food_buff**: `duracion` (ticks), `Cantidad`, `apply` (código de atributo), `A/I/R/V`, `flags/A=veneno`.
    *   **portals**: `cargas`, `exit flags`, `gate flags` (ej. `A` para salida normal), `rnum` (room Vnum de destino), `0`.
    *   **furniture**: `gente`, `total wei`, `fur flags` (flags de mueble, ej. `AG` para `Rest at` y `Stand at`), `heal bon`, `mana bon`.
    *   **emblema**: `id_clan`, `rango`, `0`, `0`, `0`.
*   **Nivel**: Nivel mínimo para usar el objeto (ej. `1`).
*   **Peso**: Peso del objeto (ej. `0`).
*   **Precio**: Valor en monedas (ej. `15000`).
*   **S (Set ID)** (Opcional): Identificador del set al que pertenece (ej. `P` o `G` si es un contenedor de bebida, o `S <id_set>`).
*   **A (Applies)** (Opcional): Modificadores de atributos (ej. `A 5 -1`).
    *   Formato: `A <código_atributo> <valor>`.
    *   Localizaciones de Applies: `0` (None), `1` (Strength), `2` (Dexterity), `3` (Intelligence), `4` (Wisdom), `5` (Constitution), `6` (Sex), `7` (Class), `8` (Level), `9` (Age), `10` (Height), `11` (Weight), `12` (Mana), `13` (Hitpoints), `14` (Movement), `15` (Gold), `16` (Experience), `17` (AC), `18` (Hitroll), `19` (Damroll), `20` (Spell), `21` (Saving Rod), `22` (Saving Petrify), `23` (Saving Breath), `24` (Saving Spell), `25` (Spell Affect), `26` (Spell power), `27` (Heal power).
*   **F (Affects permanentes)** (Opcional): Inmunidades, resistencias o vulnerabilidades (ej. `F A 0 0 PV`).
    *   Formato: `F <tipo_affect> <bits_affect>`.
    *   Tipos: `A` (Affected), `I` (Immune), `R` (Resist), `V` (Vulnerable).
    *   Localizaciones para `A` (Affected): `A` (Blind), `B` (Invisible), `C` (Detect_evil), `D` (Detect_invis), `E` (Detect_magic), `F` (Detect_hidden), `G` (Detect_good), `H` (Sanctuary), `I` (Faerie_fire), `J` (Infrared), `K` (Curse), `L` (Flaming - No Implementado), `M` (Poisoned), `N` (Prot_evil), `O` (Prot_good), `P` (Sneak), `Q` (Hide), `R` (Sleep), `S` (Charm), `T` (Flying), `U` (Pass_door), `V` (Haste), `W` (Calm), `X` (Plague), `Y` (Weaken), `Z` (Dark_vis), `a` (Berserk - No Implementado), `b` (Swim - No Implementado), `c` (Regen), `d` (Slow).
    *   Bits para `I`, `R` y `V`: `A` (Summon), `B` (Charm), `C` (Magic), `D` (Weapons), `E` (Bash), `F` (Pierce), `G` (Slash), `H` (Fire), `I` (Cold), `J` (Lightning), `K` (Acid), `L` (Poison), `M` (Negative), `N` (Holy), `O` (Energy), `P` (Mental), `Q` (Disease), `R` (Drowning), `S` (Light), `T` (Sound), `X` (Wood), `Y` (Silver), `Z` (Iron).
*   **E (Descripciones adicionales)** (Opcional): (ej. `E inscripcion inscripción~ Esta llave abre...`).

#### **2.4. Sección `#ROOMS`**

La aplicación debe permitir añadir múltiples habitaciones. Cada habitación tendrá los siguientes campos:

*   **Vnum**: Número identificador único (ej. `12100`).
*   **Nombre de la Habitación**: Título (ej. `La Puerta sur de la ciudadela~`).
*   **Descripción de la Habitación**: Texto descriptivo (ej. `Te encuentras en la puerta sur...`).
*   **Flags de Habitación**: Múltiples flags, `0` si vacío (ej. `0`).
    *   `A` (Dark), `C` (No Mobs), `D` (Indoors), `E` (No PK), `I` (No astral), `J` (Private), `K` (Safe), `L` (Solitary), `M` (Pet Shop), `N` (No Recall), `O` (Imp Only), `P` (Gods Only), `Q` (Heroes Only), `R` (Newbies Only), `S` (Law), `T` (Nowhere), `U` (No summon), `X` (No quit), `Z` (Anti magia).
*   **Tipo de Sector**: Numérico (ej. `1` para `CITY`).
    *   `0` (INSIDE), `1` (CITY), `2` (FIELD), `3` (FOREST), `4` (HILLS), `5` (MOUNTAIN), `6` (WATER), `7` (DEEP WATER), `9` (AIR), `10` (DESERT).
*   **Salidas (D0-D9)**: Permite añadir múltiples salidas.
    *   `Dirección` (D0-D9).
    *   `Descripción al mirar`.
    *   `Identificativo de la puerta` (ej. `puerta madera~`, si no hay puerta vacío `~`).
    *   `Estado de la puerta`: `0` (Sin puerta), `1` (Puerta normal), `2` (Puerta reforzada), `3` (Barrera mágica), `4` (Barrera impenetrable).
    *   `VNUM de la llave` (ej. `-1` si no hay llave).
    *   `Habitación conectada` (VNUM de la habitación de destino).
*   **Extras (E)** (Opcional): Descripciones adicionales (ej. `E piedra~ Notas que pasa un aire cálido...`).
*   **Modificadores de Regeneración (M H)** (Opcional): `M <valor>` para maná, `H <valor>` para salud (ej. `M 100 H 1900`).
*   **Clan (C)** (Opcional): Nombre del clan si es una habitación de clan (ej. `C Concilio~`).
*   Finaliza con `S`.

#### **2.5. Sección `#RESETS`**

La aplicación debe permitir añadir múltiples comandos de reseteo. Cada comando tendrá el siguiente formato y sus reglas:

*   **M (Carga Mobs)**: `M 0 <vnum mob> <límite total> <vnum habitación> <límite local>` (ej. `M 0 12118 10 12100 10`).
*   **O (Carga Objetos en Habitaciones)**: `O 0 <vnum objeto> <límite> <vnum habitación>` (ej. `O 0 12103 0 12113`).
*   **P (Carga Objetos dentro de Otros)**: `P 1 <vnum objeto contenido> <límite> <vnum contenedor> <límite local>` (ej. `P 1 12155 1 12225 1`). **Debe ir después de un `O` que cargue el contenedor.**.
*   **G (Da un Objeto al Inventario de un Mob)**: `G 1 <vnum objeto> <límite>` (ej. `G 1 12100 1`). **Debe ir después de un `M` que cargue el mob.**.
*   **E (Da un Objeto Equipado a un Mob)**: `E 1 <vnum objeto> <límite> <lugar de vestir>` (ej. `E 1 12177 1 16`). **Debe ir después de un `M` que cargue el mob.**.
    *   Lugares de Vestir (códigos numéricos): `0` (Luz), `1` (Dedo izq.), `2` (Dedo der.), `3` (Cuello 1), `4` (Cuello 2), `5` (Torso), `6` (Cabeza), `7` (Piernas), `8` (Pies), `9` (Manos), `10` (Brazos), `11` (Escudo), `12` (Espalda), `13` (Cintura), `14` (Muñeca izq.), `15` (Muñeca der.), `16` (Blandido), `17` (Sujeto), `18` (Flotando), `19` (Arma secundaria), `20` (Rodela), `21` (Piernas traseras), `22` (Pies traseros), `23` (Emblema de clan).
*   **D (Define el Estado de Puertas)**: `D 0 <vnum habitación> <dirección> <estado>` (ej. `D 0 12102 5 1`).
    *   Direcciones: `0` (Norte), `1` (Este), `2` (Sur), `3` (Oeste), `4` (Arriba), `5` (Abajo), `6` (Noreste), `7` (Noroeste), `8` (Sureste), `9` (Suroeste).
    *   Estado: `0` (Abierta), `1` (Cerrada), `2` (Con llave).
*   **R (Define un Maze en una Habitación)**: `R 0 <vnum habitación> <clase de maze>` (ej. `R 0 12129 4`).
*   Clase de Maze: `4` (salidas cardinales), `6` (incluye arriba/abajo), `10` (incluye arriba/abajo y diagonales).
*   Finaliza con `S`.

#### **2.6. Sección `#SET`**

La aplicación debe permitir definir múltiples sets de equipo. Cada set tendrá:

*   **Id**: Identificador numérico único.
*   **Nombre del Set**: Finaliza con `~` (ej. `NombreSet~`).
*   **Tiers**: Permite añadir múltiples tiers.
    *   `T <piezas>`: Número de piezas para activar el tier (ej. `T 2`).
    *   `A <loc> <mod>`: Modificador de atributo (mismo formato que en Objetos `Applies`).
    *   `F <tipo> <loc> <mod> <bits>`: Affects, inmunidades, etc. (mismo formato que en Objetos `Affects permanentes`).
*   Finaliza cada set con `End`.

#### **2.7. Sección `#SHOPS`**

La aplicación debe permitir definir múltiples tiendas. Cada tienda tendrá:

*   **Vnum del Vendedor**: VNUM del mob vendedor (ej. `12100`).
*   **Tipos de Objetos (V0-V4)**: Hasta 5 códigos numéricos de tipos de objetos que compra (ej. `10 23 5 0 0`).
    *   `1` (Light), `2` (Scroll), `3` (Wand), `4` (Staff), `5` (Weapon), `8` (Treasure), `9` (Armor), `10` (Potion), `12` (Furniture), `13` (Trash), `15` (Container), `17` (Drink container), `18` (Key), `19` (Food), `22` (Boat), `26` (Pill), `28` (Map), `29` (Portal), `30` (Warpstone), `32` (Gem), `33` (Jewelry).
*   **Porcentaje de Compra**: (ej. `100`).
*   **Porcentaje de Venta**: (ej. `0`).
*   **Horario de Operación**: `Hora de apertura` y `Hora de cierre` (ej. `0 23`).
*   **Comentario** (Opcional): Empieza con `*` (ej. `* Tendero: el recepcionista`).
*   **Identificación en encabezado**: El comentario se muestra en el título de la tarjeta para reconocer la tienda al contraerla.
*   Finaliza con `0` para la sección completa.
*   Todos los campos numéricos se seleccionan desde listas desplegables definidas en `js/config.js`.

#### **2.8. Sección `#SPECIALS`**

La aplicación debe permitir definir múltiples especiales. Cada especial tendrá:

*   **Vnum del Mob**: VNUM del mob al que se asigna el especial (ej. `12110`).
*   **Tipo de Especial**: Nombre del especial (ej. `spec_ladron`).
    *   Se elige desde un menú desplegable alimentado por `js/config.js`, donde cada opción muestra un *tooltip* con su descripción.
    *   Lista de especiales: `spec_troll_member`, `spec_ogre_member`, `spec_patrolman`, `spec_nasty`, `spec_breath_any` (y específicos por elemento como `_acid`, `_fire`, etc.), `spec_cast_adepto`, `spec_cast_clerigo`, `spec_cast_mago`, `spec_fido`, `spec_guard`, `spec_janitor`, `spec_alcalde`, `spec_veneno`, `spec_ladron`, `spec_cast_runk`, `spec_cast_oteren`, `spec_guardia_malo`, `spec_guardia_bueno`, `spec_teleporter`, `spec_barco`, `spec_esfinge`, `spec_guardia_clan`, `spec_entrenador_especial`, `spec_quest_especial_1`, `spec_quest_especial_2`, `spec_secretario`, `spec_mordisco`, `spec_entrenador_samurai`, `spec_samu_experto_1`, `spec_samu_experto_2`.
*   **Comentario** (Opcional): Empieza con `*` (ej. `* Los lagartos`).
*   **Visibilidad en la Tarjeta**: Al contraer la tarjeta se muestra el comentario (sin el `*`) seguido del nombre del especial para identificarlo rápidamente.
*   **Regla**: Un mob solo puede tener un especial asignado.
*   Finaliza con `S` para la sección completa.

#### **2.9. Secciones `#MOBPROGS`, `#OBJPROGS`, `#ROOMPROGS`**

La aplicación debe permitir definir múltiples programas. Cada programa tendrá:

*   **Vnum**: Número identificador único (ej. `12100`).
*   **Bloque de código**: Un editor de texto para el código del programa.
    *   **Sintaxis de Control de Flujo**: `if {if_check} {argument} {operator} {value} [or/and ...] else endif`.
    *   **Comandos MUD y de control de flujo**: `mob echo`, `mob oload`, `mob junk`, `mob force`, `mob damage`, `mob kill`, `mob remove`, `break`, `sleep` (¡sin `mob`!).
    *   **Variables**: `$i, $I, $n, $d, $N, $t, $T, $r, $R, $w, $q, $Q, $j, $e, $E, $J, $k, $m, $M, $K, $l, $s, $S, $L, $o, $O, $p, $P, $a, $b, $c, $A, $B, $C, $u, $v`.
    *   **If_checks**: `rand`, `mobhere`, `objhere`, `mobexists`, `objexists`, `pjhere`, `people`, `players`, `aplayers`, `mobs`, `clones`, `order`, `hour`, `isnpc`, `ispc`, `isgood`, `isneutral`, `isevil`, `isimmort`, `ischarm`, `isfollow`, `isactive`, `isdelay`, `isvisible`, `hastarget`, `istarget`, `status`, `affected`, `act`, `off`, `imm`, `carries`, `wears`, `has`, `uses`, `name`, `pos`, `clan`, `race`, `class`, `objtype`, `vnum`, `hpcnt`, `room`, `sex`, `level`, `align`, `money`, `moneyg`, `moneys`, `objval#`, `grpsize`, `FUE, DES, INT, SAB, CON`, `tiene`, `compare`, `contiene`, `pquestactiva`, `pquestfase`, `pquestfin`.
    *   **Bloques Aleatorios**: `randomblock`, `---`, `randomblockend`.
*   Finaliza con `#0` para cada sección de progs.

#### **2.10. Vinculación de Programas (Triggers)**

Los programas (`#MOBPROGS`, `#OBJPROGS`, `#ROOMPROGS`) se deben vincular a sus respectivos Mobs, Objetos o Rooms.

*   En la definición del Mob, Objeto o Room, la aplicación debe permitir añadir triggers con:
    *   `Palabra Clave`: Tipo de disparador (ej. `act`, `speech`, `random`, `greet`, `grall`, `entry`, `exit`, `exall`, `give`, `get`, `drop`, `bribe`, `kill`, `fight`, `hpcnt`, `death`, `delay`, `sit`, `regex`, `comlook`, `command`, `usar`).
    *   `VNUM`: Número virtual del programa (`#MOBPROGS`, `#OBJPROGS`, `#ROOMPROGS`) a ejecutar.
    *   `Argumento`: Texto o porcentaje que desencadena el evento.

---

### **3. Funcionalidad de la Aplicación (HTML/CSS/JavaScript)**

#### **3.1. Mejora de Navegación y Edición (Colapsar/Expandir Secciones)**

Para facilitar la navegación y edición de múltiples elementos (mobs, objetos, habitaciones, etc.) que pueden tener muchas características, se implementará una funcionalidad de colapsar/expandir para cada tarjeta individual.

*   **Objetivo**: Permitir al usuario ocultar los detalles de las tarjetas en las que no está trabajando activamente, haciendo la lista de elementos más compacta y reduciendo la necesidad de desplazamiento vertical excesivo.
*   **Implementación**: 
    *   Cada tarjeta de elemento (Mob, Objeto, Habitación, Prog, Set, Tienda, Especial) incluirá un encabezado o un botón de alternancia.
    *   Al hacer clic en este encabezado/botón, se mostrarán u ocultarán los campos de detalle de la tarjeta.
    *   Las nuevas tarjetas creadas se mostrarán expandidas por defecto para facilitar la entrada de datos.
    *   Las tarjetas existentes (si se implementa la carga de archivos) se mostrarán colapsadas por defecto para una vista general más limpia.

*   **Interfaz de Usuario (UI)**:
    *   Navegación clara entre las secciones (`#AREA`, `#MOBILES`, `#OBJECTS`, etc.).
    *   Formularios dinámicos para cada tipo de entidad (Mob, Objeto, Habitación, etc.).
    *   Campos de entrada que reflejen los tipos de datos (texto, número, listas de selección para flags/tipos/materiales).
    *   Mecanismos para añadir/eliminar múltiples entradas (ej. múltiples mobs, múltiples salidas por habitación, múltiples applies por objeto).
    *   Un área de texto editable para el código de los Mob/Obj/Room Progs.
*   **Validación**:
    *   Validación básica de tipos de datos (números, texto).
    *   Sugerencias de flags y tipos usando listas desplegables.
    *   Posible validación de rangos numéricos (ej. `Alineamiento` entre -1000 y 1000).
    *   Validación de dependencias (ej. `P` después de `O`, `G`/`E` después de `M`).
*   **Generación del Archivo `.are`**:
    *   Un botón para "Generar Archivo .are".
    *   El JavaScript debe compilar toda la información introducida en el formato de texto exacto descrito, respetando los saltos de línea y el orden.
    *   El archivo generado debe poder descargarse por el usuario.
*   **Carga/Edición (Funcionalidad Avanzada/Opcional)**:
    *   Un botón para "Cargar Archivo .are" que parsearía un archivo existente y rellenaría los formularios para su edición.

---

### **4. Resumen de Funcionalidades Implementadas**

La aplicación actual proporciona las siguientes características para facilitar la creación y edición de archivos `.are`:

*   **Navegación por Secciones**: Permite al usuario cambiar entre las diferentes secciones del archivo `.are` (AREA, MOBILES, OBJECTS, ROOMS, RESETS, SET, SHOPS, SPECIALS, MOBPROGS, OBJPROGS, ROOMPROGS) a través de botones de navegación claros.
*   **Gestión Dinámica de Elementos**:
    *   **Adición de Elementos**: Botones dedicados para añadir nuevas entradas en secciones como MOBILES, OBJECTS, ROOMS, SHOPS, SPECIALS, MOBPROGS, OBJPROGS, y ROOMPROGS.
    *   **Eliminación de Elementos**: Cada elemento añadido dinámicamente incluye un botón para su eliminación.
    *   **Auto-sugerencia de VNUMs**: Al añadir un nuevo elemento, su campo VNUM se auto-rellena con el siguiente VNUM disponible, comenzando por el `Vnum Inicial` definido en la sección #AREA si no hay elementos previos.
*   **Validación de VNUMs**:
    *   **Rango de Área**: Se valida que el rango de VNUMs definido en la sección #AREA sea numérico y coherente (`Vnum Inicial` <= `Vnum Final`).
    *   **Mensajes de Alerta al Añadir**: Si se intenta añadir un elemento (Mob, Objeto, Habitación, Prog, Tienda, Especial) cuando el rango de VNUMs en la sección #AREA es inválido, se muestra un mensaje de alerta claro indicando la necesidad de corregir el rango.
*   **Interfaz de Usuario Detallada por Sección**:
    *   Cada sección presenta formularios específicos con campos de entrada para todas las propiedades relevantes de Mobs, Objetos, Habitaciones, Resets, Sets, Tiendas, Especiales y Progs, según la estructura del archivo `.are`.
    *   Se incluyen campos para flags, tipos, materiales, y valores especiales, con opciones de selección donde aplica.
*   **Selección Guiada en Resets**: La sección de reseteos permite escoger mobs, objetos y habitaciones existentes mediante menús desplegables que se actualizan de forma automática para evitar errores de VNUM.
*   **Botones de Reseteo Etiquetados**: Los comandos M, O, P, G, E, D y R muestran su significado y ofrecen ayuda emergente para aclarar su uso.
*   **Listas Predefinidas en Resets**: Dirección, estado de puerta, lugar de vestir y clase de maze se seleccionan desde desplegables alimentados por `js/config.js`.
*   **Generación de Archivo .are**: Un botón "Generar Archivo .are" compila toda la información introducida en el formato de texto exacto requerido por el MUD "Petria" y permite la descarga del archivo resultante.
*   **Mejora de Navegación y Edición (Colapsar/Expandir Secciones)**: Se ha implementado la funcionalidad de colapsar/expandir para cada tarjeta individual de elemento (Mob, Objeto, Habitación, Prog, Set, Tienda, Especial). Esto permite ocultar los detalles de las tarjetas no activas, mejorando la visibilidad y reduciendo el desplazamiento vertical. Las nuevas tarjetas se muestran expandidas por defecto.

---

### **5. Referencia de Ejemplo**

Adjunta el archivo `aligator.are` como un ejemplo concreto de cómo debe lucir el archivo de salida. La IA puede analizar este archivo para entender las convenciones de formato, espaciado y estructura de un archivo `.are` real.

---

**Nota Adicional para la IA:** El foco principal es la **generación precisa del formato del archivo `.are`**. La lógica interna de los `MOBPROGS` es compleja y su validación completa no es el objetivo inicial, sino permitir su entrada como texto. Las tablas y flags deben estar presentes para que el usuario pueda seleccionarlos o introducirlos, y la salida generada debe ser conforme a estas definiciones.


### Cambios recientes

- Se eliminó la integración con Blockly para los mobprogs, objprogs y roomprogs, volviendo al editor de texto tradicional.
- Se corrigió la carga de archivos `.are` ajustando el parser para detectar solo las secciones principales y respetar los delimitadores internos como `#0` y `~`.
- Se mejoró el análisis de la sección `#AREA` para extraer correctamente el rango de niveles, el creador, los VNUMs y la región aun con formatos variables.
- Se corrigió la importación de la sección `#MOBILES` para reconocer descripciones multilínea, dados y flags en una sola línea.
- Se rellenaron los desplegables de raza y tipo de daño al importar mobs desde archivos `.are`.

