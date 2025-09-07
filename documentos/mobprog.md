

## Contenido

1. Sintaxis del MOB/OBJ/ROOMprogram
2. Vinculación de MOB/OBJ/ROOMprogram
3. Tipos de Disparadores
4. Variables
5. Sintaxis de Control de Flujo
6. Operadores
7. If_checks en el flujo de control
8. Nuevos Comandos de Interés
9. Ejemplos




### 1. Sintaxis del MOB/OBJ/ROOMprogram



- Para usar MOB/OBJ/ROOMprogram, se debe agregar una sección `#MOBPROGS` `#OBJPROGS` y `#ROOMPROGS` al archivo del área.

#### Sección de Sintaxis:
```plaintext
#MOBPROGS / #OBJPROGS / #ROOMPROGS
#{Vnum}
{program_command_1} NL
{program_command_2} NL
{program_command_3} NL
     .   .   .
{program_command_N} NL
"~" NL
     .   .   .
#0
```

- `Vnum` es el número virtual que identifica el programa.
- `PROGRAM_COMMAND` puede ser cualquier comando válido del MUD o un comando de flujo de control.

#### Ejemplo:
```plaintext
#MOBPROGS
#3001
decir ¡Oye, no merodees!
poke $n
~
#0
```

---

```plaintext
#OBJPROGS
#3001
obj echo púas salen de $i, perforando tus manos!
obj damage $n 50 50
~
#0
```

---

```plaintext
#ROOMPROGS
#3001
room echo Un destello de luz brillante parpadea y te encuentras en un lugar diferente.
room transfer $n 3054
room force $n mirar
~
#0
```


### 2. Vinculación de MOBprograms

Una vez escritos los MOB/OBJ/ROOMprogram, se deben vincular a los `NPCs` `Objetos` o `Rooms` correspondientes.
En la sección `#MOBPROGS` `#OBJPROGS` `#ROOMPROGS`, para cada `NPCs` `Objetos` o `Rooms` al que se le quiera asignar un MOB/OBJ/ROOMprogram, se debe agregar lo siguiente al final de la definición del `NPCs` `Objetos` o `Rooms`:

```plaintext
Para MOBs: "M" {Palabra Clave} {Vnum} {Argumento}~ NL  

Para OBJETOS: "O" {Palabra Clave} {Vnum} {Argumento}~ NL  

Para HABITACIONES: "R" {Palabra Clave} {Vnum} {Argumento}~ NL
```

- `Palabra Clave`: Describe el tipo de disparador (por ejemplo, 'act').
- `VNUM`: El número virtual del MOBprogram.
- `Argumento`: Argumento que desencadena el evento.

#### Ejemplo:
```plaintext
M act 3001 se sienta~
```

En el ejemplo, se define un disparador de tipo `ACT`. Cuando el NPC ve a alguien sentarse, ejecutará el programa `#3001`.

### 3. Tipos de Disparadores


| Usado por       			| Disparador | Argumento                  | Descripción|
|---------------------------|------------|----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `MOB` `OBJ` `ROOM`  		| `ACT`      | `Texto`                    | Se activa cuando un mensaje especificado está contenido en `act()`. No se activa con "decir", "gritar", "emote".                                                                                                                                      |
| `MOB` `OBJ` `ROOM`  		| `SPEECH`   | `Texto`                    | Activado cuando un jugador dice una frase en la misma habitación del NPC, funciona también con el tell.                                                                                                                                      		  |
| `MOB` `OBJ` `ROOM`  		| `RANDOM`   | `Porcentaje de activación` | Activado de manera aleatoria, **OBJ** si el objeto está en el inventario o vestido toma como objetivo de `$n` a ese pj.                                                                                                                               |
| `MOB`				 		| `RANDOMALL`| `Porcentaje de activación` | Activado de manera aleatoria sin importar el estado del mob.                                                                                                                               															  |
| `MOB` ~~`OBJ`~~ ~~`ROOM`~~| `GREET`    | `Porcentaje de activación` | Activado cuando alguien entra a la habitación del NPC, solo si el NPC no está ocupado,los objetos y habitaciones siempre activarán este disparador, independientemente del estado de visibilidad del jugador. **OBJ Y ROOM** se comprotan igual en **GREET** que **GRALL**.|
| `MOB` `OBJ` `ROOM`  		| `GRALL`    | `Porcentaje de activación` | Activado cuando alguien entra a la habitación del NPC, se activa aunque el personaje esté invisible o el NPC esté ocupado, **OBJ Y ROOM** se comprotan igual en **GREET** que **GRALL**.															  |
| `MOB`           	  		| `ENTRY`    | `Porcentaje de activación` | Se activa cuando el NPC entra en una habitación.                                                                                                                                                                                                      |
| `MOB` ~~`OBJ`~~ ~~`ROOM`~~| `EXIT`     | `Salida\ALL`               | Activado cuando un personaje intenta salir de una sala a través de una salida indicada. El NPC debe poder ver al personaje; los objetos y habitaciones siempre activarán este disparador, independientemente del estado de visibilidad del jugador. Las salidas son: `D0→Norte` `D1→Este`  `D2→Sur`  `D3→Oeste`  `D4→Arriba`  `D5→Abajo`  `D6→NorEste`  `D7→NorOeste`  `D8→SurEste`  `D9→SurOeste`, **OBJ Y ROOM** se comprota igual en **EXIT** que en **EXALL**. |
| `MOB` `OBJ` `ROOM`  		| `EXALL`    | `Salida\ALL`               | Similar a `EXIT`, pero puede activarse si el NPC no ve a la persona que intenta salir o si está ocupado, Las salidas son: `D0→Norte` `D1→Este`  `D2→Sur`  `D3→Oeste`  `D4→Arriba`  `D5→Abajo`  `D6→NorEste`  `D7→NorOeste`  `D8→SurEste`  `D9→SurOeste`, **OBJ Y ROOM** se comprota igual en **EXIT** que en **EXALL**.|
| `MOB` `OBJ` `ROOM` 		| `GIVE`     | `Nombre\All\VNUM`          | Se activa cuando un jugador entrega un objeto al NPC. **OBJ**: Se activa cada vez que el objeto se le da a otra persona. En este caso, se ignora el argumento. **ROOM**: Se activa cada vez que el objeto (según el argumento) se le da a alguien en la habitación. |
| `OBJ` `ROOM`        		| `GET`      | `Nombre\All\VNUM`          | **OBJ**: Se activa cada vez que el objeto es recogido; en este caso, se ignora el argumento. **ROOM**: Se activa cada vez que el objeto (según el argumento) es recogido en la habitación. 															  |
| `OBJ` `ROOM`        		| `DROP`     | `Nombre\VNUM`              | **OBJ**: Se activa cada vez que el objeto es dejado, y en este caso se ignora el argumento. **ROOM**: Se activa cada vez que el objeto (según el argumento) es dejado en la habitación. 															  |
| `MOB`               		| `BRIBE`    | `Número`                   | Activado cuando se da una cantidad de dinero al NPC igual o superior al argumento. Convertido a monedas de plata (1 oro = 100 plata). 																												  |
| `MOB`               		| `KILL`     | `Porcentaje de activación` | Activado cuando un jugador ataca al NPC, ocurre solo al comienzo del combate. 																																										  |
| `MOB` `OBJ` `ROOM`  		| `FIGHT`    | `Porcentaje de activación` | **MOB**: Activado durante cada pulso del combate con el NPC; solo realiza el primer disparador exitoso. **OBJ**: Se activa cuando el objeto se usa, está en el inventario o en el suelo y hay un combate, apunta al oponente si lo llevas vestido o inventario. **ROOM**: Se activa cuando hay una pelea en la habitación. Apunta a la primera persona que esté peleando. |
| `MOB`               		| `HPCNT`    | `Porcentaje de activación` | Activado cuando los puntos de vida del NPC están por debajo de cierto porcentaje. Se deben listar en orden ascendente para evitar conflictos de activación. 																						  |
| `MOB` `OBJ`          		| `DEATH`    | `Porcentaje de activación` | Activado cuando el NPC muere, **OBJ** se activa cuando el que lleva o viste el objeto mata a algo (NPC/PC). 																																		  |
| `MOB` `OBJ` `ROOM`  		| `DELAY`    | `Porcentaje de activación` | Activado cuando expira el retraso de un NPC establecido con el comando `MOB DELAY`. 																																								  |
| `OBJ`               		| `SIT`      | `Porcentaje de activación` | Este disparador se activa cuando el objeto es utilizado para sentarse, descansar, dormir o pararse encima, dentro o en él. 																															  |
| `MOB` `OBJ` `ROOM`  		| `REGEX`    | `(\w+)` `(.+)` `(.*)`	  | Permite guardar en variables lo que digan los jugadores por el canal Decir y tell. 																																									  |
| `ROOM`  					| `COMLOOK`  | `Porcentaje de activación` | Se activa cuando un personaje pone `LOOK\MIRAR` o entra a una ROOM de cualquier manera, y no muestra el NOMBRE NI DESCRIPCIÓN de la ROOM, 																											  |
| `MOB` `OBJ` `ROOM`  		| `COMMAND`  | `comando` `Porcentaje de activación` | Se activa cuando un personaje hace el comando esperado en el trigger **EJEMPLO** `M COMMAND 15235 abrir 100~` esto ejecutaria el trigger si un PJ hace el comando abrir independientemente de qué quiera abrir                              |
| `OBJ`				  		| `USAR`  	 | `Argumento 1` `Argumento 2`| Se activa cuando un personaje utiliza el comando `usar` en un objeto que tenga este disparador: `obj usar 23500~` <-- obj usar vnum_objprog~ |

> **IMPORTANTE**: Los `MOBprograms` no serán efectivos cuando el `mobile` esté bajo encantamiento (`charmed`). Esto es para proteger a los `mobiles` con habilidades especiales, ya que, bajo encantamiento, deberían actuar como si no tuvieran voluntad propia.

### 4. Variables

Para dar vida a los programas, se utilizan variables para representar diferentes entidades en el entorno del MUD. Estas variables son similares a las que se usan en "socials" dentro del MUD y se representan mediante un signo `$`.

| Usado por 		  | Variable | Descripción                                                                                                             | Uso en if_checks|
|---------------------|----------|-------------------------------------------------------------------------------------------------------------------------|-----------------|
| `MOB` `OBJ` `ROOM`  | `$i`     | El primer nombre del móvil en sí.                                                                                       | ✔️              |
| `MOB` `OBJ` `ROOM`  | `$I`     | La descripción breve del móvil en sí **ROOM** el vnum.                                                                  | ❌              |
| `MOB` `OBJ` `ROOM`  | `$n`     | El nombre de quien causó que el disparador se activara.                                                                 | ✔️              |
| `MOB`		  		  | `$d`     | El nombre de quien causó que el disparador se activara PERO si el mob no ve al jugador saldrá como someone. uso pensado para If isvisible $d| ✔️              |
| `MOB` `OBJ` `ROOM`  | `$N`     | El nombre y título de quien causó que el disparador se activara.                                                        | ❌              |
| `MOB`      		  | `$t`     | El nombre de un objetivo secundario (por ejemplo, A sonríe a B).                                                        | ✔️              |
| `MOB`				  | `$T`     | La descripción breve o el nombre y título del objetivo (NPC vs PC).                                                     | ❌              |
| `MOB` `OBJ` `ROOM`  | `$r`     | El nombre de un jugador o mob aleatorio (PC) en la sala con el móvil.                                                   | ✔️              |
| `MOB` `OBJ` `ROOM`  | `$R`     | La descripción breve o el nombre y título del jugador o mob aleatorio.                                                  | ❌              |
| `MOB` `OBJ` `ROOM`  | `$w`     | El nombre de un jugador aleatorio (NUNCA un mob) en la sala con el móvil.                                               | ✔️              |
| `MOB` `OBJ` `ROOM`  | `$q`     | El nombre del objetivo del programa  `MOB` `OBJ` `ROOM` (ver `MOB` `OBJ` `ROOM` `REMEMBER`).                            | ✔️              |
| `MOB` `OBJ` `ROOM`  | `$Q`     | La descripción breve del objetivo del programa  `MOB` `OBJ` `ROOM`.													   | ❌              |
| `OBJ`  			  | `$j`     | Para trigger `DEATH` y trigger `FIGHT` repressenta al enemigo de la pelea o al enemigo que muere                        | ❌              |

> ### Pronombres basados en el género de variables

| Usado por 		  | Variable | Género relativo a | Pronombre                                                                                         | Uso en if_checks|
|---------------------|----------|-------------------|---------------------------------------------------------------------------------------------------|-----------------|
| `MOB`				  | `$j`     | `$i`              | él/ella/eso según el sexo de `$i`.                                                                | ❌              |
| `MOB` `OBJ` `ROOM`  | `$e`     | `$n`              | él/ella/eso según el sexo de `$n`.                                                                | ❌              |
| `MOB`     		  | `$E`     | `$t`              | él/ella/eso según el sexo de `$t`.                                                                | ❌              |
| `MOB` `OBJ` `ROOM`  | `$J`     | `$r`              | él/ella/eso según el sexo de `$r`.                                                                | ❌              |
| `MOB`				  | `$k`     | `$i`              | lo/la según el sexo de `$i`.                                                                      | ❌              |
| `MOB` `OBJ` `ROOM`  | `$m`     | `$n`              | lo/la según el sexo de `$n`.                                                                      | ❌              |
| `MOB`      		  | `$M`     | `$t`              | lo/la según el sexo de `$t`.                                                                      | ❌              |
| `MOB` `OBJ` `ROOM`  | `$K`     | `$r`              | lo/la según el sexo de `$r`.                                                                      | ❌              |
| `MOB`				  | `$l`     | `$i`              | su (de él, de ella, de eso) según el sexo de `$i`.                                                | ❌              |
| `MOB` `OBJ` `ROOM`  | `$s`     | `$n`              | su (de él, de ella, de eso) según el sexo de `$n`.                                                | ❌              |
| `MOB`      		  | `$S`     | `$t`              | su (de él, de ella, de eso) según el sexo de `$t`.                                                | ❌              |
| `MOB` `OBJ` `ROOM`  | `$L`     | `$r`              | su (de él, de ella, de eso) según el sexo de `$r`.                                                | ❌              |

> ### Objetos primarios y secundarios

| Usado por 		 | Variable | Objeto Relacionado          | Descripción                                                                                   | Uso en if_checks |
|--------------------|----------|-----------------------------|-----------------------------------------------------------------------------------------------|------------------|
| `MOB` `OBJ` `ROOM` | `$o`     | Objeto primario             | El primer nombre del objeto primario (por ejemplo, A suelta B).                               | ✔️               |
| `MOB` `OBJ` `ROOM` | `$O`     | Objeto primario             | La descripción breve del objeto primario.                                                     | ❌               |
| `MOB`     		 | `$p`     | Objeto secundario           | El primer nombre del objeto secundario (por ejemplo, A coloca B en C).                        | ✔️               |
| `MOB`       		 | `$P`     | Objeto secundario           | La descripción breve del objeto secundario.                                                   | ❌               |

> ### Usado por Regex: mob regexcopy, mob regexdelete, if contiene, if compare

| Usado por 		 | Variable 	  | comparado y usado con         | Descripción                                                                                   | Uso en if_checks |
|--------------------|----------------|-------------------------------|-----------------------------------------------------------------------------------------------|------------------|
| `MOB` `OBJ` `ROOM` | `$a` `$b` `$c` | `$a` `$b` `$c` `$A` `$B` `$C` | Variables cogidas con el trigger REGEX en orden de parseo.                               	  | ✔️               |
| `MOB` `OBJ` `ROOM` | `$A` `$B` `$C` | `$a` `$b` `$c` `$A` `$B` `$C` | Variables copiadas con `Mob Regexcopy`                                						  | ✔️               |

> ### Usado por Regex: mob regexcopy, mob regexdelete, if contiene, if compare

| Usado por 		 | Variable 	  | comparado y usado con         | Descripción                                                                                   | Uso en if_checks |
|--------------------|----------------|-------------------------------|-----------------------------------------------------------------------------------------------|------------------|
| `OBJ` 			 | `$u` `$v` 	  | `$a` `$b` `$c` `$A` `$B` `$C` | Variables cogidas con el comando `usar`, este comando puede contener 2 agumentos: `usar` `argumento 1` `argumento 2`, `$u` extrae su valor del  `argumento 1`, `$v` extrae su valor del  `argumento 2` 	  | ✔️               |


### 5. Sintaxis de Control de Flujo `if` y Bloques Aleatórios `randomblock`


> #### ***IF***
Un comando de flujo de control permite condicionar la ejecución de comandos en base a chequeos.

#### Ejemplo de Sintaxis de `if`:
```plaintext
"if" " " {if_check_1} {argument} [ {operator} {value} ] NL
[ "or" " " {if_check_2} {argument} [ {operator} {value} ] NL ]
[ "or" " " {if_check_N} {argument} [ {operator} {value} ] NL ]
                        .           .           .
[ "and" " " {if_check_N} {argument} [ {operator} {value} ] NL ]
[ "and" " " {if_check_N} {argument} [ {operator} {value} ] NL ]
			.	    .		.

	[ {program_command_1} NL ]
	[ {program_command_2} NL ]
	      .   .   .
	[ "break" NL ]
	      .   .   .
	[ {program_command_N} NL ]

[ "else" NL ]

	[ {program_command_1} NL ]
	[ {program_command_2} NL ]
	      .   .   .
	[ "break" NL ]
	      .   .   .
	[ {program_command_N} NL ]

"endif" NL
```
#### Componentes de la Sintaxis de `if`

| Elemento        | Descripción                                                                                                          |
|-----------------|----------------------------------------------------------------------------------------------------------------------|
| `if`            | Inicia una condición que determinará qué comandos se ejecutarán.                                                    |
| `{if_check}`    | Tipo de chequeo que se realizará (por ejemplo, `isgood`, `level`, etc.).                                           |
| `{argument}`    | Punto de referencia desde el cual proviene el chequeo (por ejemplo, `$n`, `$i`).                                     |
| `{operator}`    | Operador de comparación (`==`, `!=`, `>`, `<`, `>=`, `<=`).                                                        |
| `{value}`       | Valor con el cual se comparará el argumento.                                                                       |
| `or` / `and`    | Permiten combinar múltiples condiciones. `or` ejecuta el bloque si **cualquiera** de las condiciones es verdadera, mientras que `and` requiere que **todas** las condiciones sean verdaderas. |
| `else`          | Define un bloque de comandos que se ejecutarán si ninguna de las condiciones anteriores se cumple.                    |
| `endif`         | Finaliza la estructura condicional.                                                                                  |
| `break`		  | Sale de todo el programa MOB independientemente del nivel de anidación.									            |

##### Explicaciones


Un `IF_CHECK` es una cadena que describe en qué contexto comparar las cosas.
El `ARGUMENTO` es el punto de referencia desde el cual proviene el LHS de una expresión.
El `OPERADOR` indica cómo se van a comparar el `Lado izquierdo` y el `Lado Derecho`.
El `VALOR` es el `Lado Derecho` de la expresión que el operador comparará.

El comando `BREAK` sale de todo el programa MOB independientemente del nivel de anidación.


> #### ***RANDOMBLOCK***
Un comando de control de flujo en el cual se alatoriza la selección de uno de los bloques dentro del flujo, los bloques pueden contener múltiples líneas
y estarán separado cada blóque por `---`

#### Ejemplo de Sintaxis de `randomblock`:
```plaintext

"randomblock" NL

	[ {program_command_1} NL ]
[{---} NL]
	[ {program_command_2} NL ]
	[ {program_command_3} NL ]
	[ {program_command_4} NL ]
[{---} NL]

"randomblockend" NL
```
#### Componentes de la Sintaxis de `if`

| Elemento        | Descripción                                                              				|
|-----------------|-----------------------------------------------------------------------------------------|
| `randomblock`	  | Inicia un control de flujo que determinará que bloque se selecciona de manera aleatória.|
| `---`   		  | Separación para identificar y separar cada bloque.						 				|
| `randomblockend`| Finaliza la estructura de control de fujo.                                      		|


##### Ejemplo de `RANDOMBLOCKP`

```

randomblock
decir Hola $n, hace mucho que no te veía.
---
decir $n, me alegro mucho de verte, recibe mi bendición
mob cast bendecir $n
---
decir $n, ¿todavía sigues con tus aventuras?
---
bostezar
decir Hoy estoy muy cansado $n
mob cast renovar $i
mob cast renovar $n
randomblockend

```

###### NOTA ADICIONAL IMPORTANTE

***No se permite hacer Randomblock encadenados!!!***



### 6. Operadores

Estos operadores se pueden usar en la sintaxis de `if` para comparar valores.

| Usado por 		 | Operador | Significado       | Descripción                                                                     |
|--------------------|----------|-------------------|---------------------------------------------------------------------------------|
| `MOB` `OBJ` `ROOM` | `==`     | Igual a           | Comprueba si dos valores o variables son iguales.                               |
| `MOB` `OBJ` `ROOM` | `!=`     | Diferente de      | Comprueba si dos valores o variables son distintos.                             |
| `MOB` `OBJ` `ROOM` | `>`      | Mayor que         | Comprueba si el valor de la izquierda es mayor que el de la derecha.            |
| `MOB` `OBJ` `ROOM` | `<`      | Menor que         | Comprueba si el valor de la izquierda es menor que el de la derecha.            |
| `MOB` `OBJ` `ROOM` | `>=`     | Mayor o igual que | Comprueba si el valor de la izquierda es mayor o igual al valor de la derecha.  |
| `MOB` `OBJ` `ROOM` | `<=`     | Menor o igual que | Comprueba si el valor de la izquierda es menor o igual al valor de la derecha.  |


### 7. If_checks en el Flujo de Control

Los `if_checks` permiten verificar condiciones sobre el entorno.


> ### Tipo 1: Palabra clave y valor

| Usado por           | Palabra Clave | Valor             | Descripción                                               |
|---------------------|---------------|-------------------|-----------------------------------------------------------|
|  `MOB` `OBJ` `ROOM` | `rand`        | `número`          | Si el porcentaje aleatorio es menor o igual a `número`.   |
|  `MOB` `OBJ` `ROOM` | `mobhere`     | `vnum` o `name`   | ¿Hay un NPC con este `vnum` o `name` en la habitación?    |
|  `MOB` `OBJ` `ROOM` | `objhere`     | `vnum` o `name`   | ¿Hay un objeto con este `vnum` o `name` en la habitación? |
|  `MOB` `OBJ` `ROOM` | `mobexists`   | `vnum` o `name`   | ¿Existe el NPC 'name' en algún lugar del mundo?           |
|  `MOB` `OBJ` `ROOM` | `objexists`   | `vnum` o `name`   | ¿Existe el objeto 'name' en algún lugar del mundo?        |
|  `MOB` `OBJ` `ROOM` | `pjhere`     | `name` o `$*`    | ¿Hay un jugador con ese nombre en la habitación?          |
+
> ### Tipo 2: Palabra clave, comparación y valor

| Usado por           | Palabra Clave | Comparador | Valor      | Descripción                                                                                      |
|---------------------|---------------|------------|------------|--------------------------------------------------------------------------------------------------|
|  `MOB` `OBJ` `ROOM` | `people`      | `==`       | `número`   | Es el número de personas (players y NPC) en la habitación igual a `número`                       |
|  `MOB` `OBJ` `ROOM` | `players`     | `==`       | `número`   | Es el número de PCs en la habitación igual a `número`                                            |
|  `MOB` `OBJ` `ROOM` | `aplayers`    | `==`       | `número`   | Es el número de PCs en el área igual a `número`												   |
|  `MOB` `OBJ` `ROOM` | `mobs`        | `==`       | `número`   | Es el número de NPCs en la habitación igual a `número`                                           |
|  `MOB`              | `clones`      | `==`       | `número`   | Es el número de NPCs con el mismo `vnum` del activador del programa igual a `número`, el npc del disparador no cuenta **solo funciona en MOBPROG**|
|  `MOB`              | `order`       | `==`       | `número`   | Es el orden de varios NPCs similares del activador del disparador igual a `número`, el npc del disparador no cuenta  **solo funciona en MOBPROG**|
|  `MOB` `OBJ` `ROOM` | `hour`        | `==`       | `número`   | ¿Es la hora (en tiempo de juego) igual a `número`?                                               |


> ### Tipo 3: Palabra clave y actor

| Usado por           | Palabra Clave | Actor   | Descripción                                                                               |
|---------------------|---------------|---------|-------------------------------------------------------------------------------------------|
|  `MOB` `OBJ` `ROOM` | `isnpc`       | `$*`    | ¿Es `$*` un NPC?                                                                          |
|  `MOB` `OBJ` `ROOM` | `ispc`        | `$*`    | ¿Es `$*` un PC?                                                                           |
|  `MOB` `OBJ` `ROOM` | `isgood`      | `$*`    | ¿Tiene `$*` una alineación buena?                                                         |
|  `MOB` `OBJ` `ROOM` | `isneutral`   | `$*`    | ¿Tiene `$*` una alineación neutral?                                                       |
|  `MOB` `OBJ` `ROOM` | `isevil`      | `$*`    | ¿Tiene `$*` una alineación malvada?                                                       |
|  `MOB` `OBJ` `ROOM` | `isimmort`    | `$*`    | ¿Es `$*` un inmortal (nivel de `$*` > `LEVEL_HERO`)?                                      |
|  `MOB` `OBJ` `ROOM` | `ischarm`     | `$*`    | ¿Está `$*` afectado por encantamiento?                                                    |
|  `MOB` `OBJ` `ROOM` | `isfollow`    | `$*`    | ¿Es `$*` un seguidor con su maestro en la habitación?                                     |
|  `MOB` `OBJ` `ROOM` | `isactive`    | `$*`    | ¿Está `$*` en una posición > `POS_SLEEPING`?                                              |
|  `MOB` `OBJ` `ROOM` | `isdelay`     | `$*`    | ¿Tiene `$*` un MOBprogram pendiente con retraso?                                          |
|  `MOB`			  | `isvisible`   | `$*`    | ¿Es `$*` visible para el NPC que activó el programa?                                      |
|  `MOB` `OBJ` `ROOM` | `hastarget`   | `$*`    | ¿Tiene `$*` un objetivo MOBprogram en la habitación?                                      |
|  `MOB` `OBJ` `ROOM` | `istarget`    | `$*`    | ¿Es `$*` el objetivo del NPC que activó el programa?                                      |

> ### Tipo 4: Palabra clave, actor y valor

| Usado por       	  | Palabra Clave | Actor | Valor       | Descripción                                                                   |
|---------------------|---------------|-------|-------------|-------------------------------------------------------------------------------|
|  `MOB` `OBJ` `ROOM` | `status`      | `$*`  | `número`    | El estado/fase del mob, usar con `$i`.                   						|
|  `MOB` `OBJ` `ROOM` | `affected`    | `$*`  | `affect`    | ¿Está `$*` afectado por `affect`?                                             |
|  `MOB` `OBJ` `ROOM` | `act`         | `$*`  | `act`       | ¿Está establecido el bit `act` en `$*`?                                       |
|  `MOB` `OBJ` `ROOM` | `off`         | `$*`  | `off`       | ¿Está establecido el bit `off` en `$*`?                                       |
|  `MOB` `OBJ` `ROOM` | `imm`         | `$*`  | `imm`       | ¿Está establecido el bit `imm` en `$*`?                                       |
|  `MOB` `OBJ` `ROOM` | `carries`     | `$*`  | `name`      | ¿Lleva `$*` el objeto `name`?                                                 |
|  `MOB` `OBJ` `ROOM` | `wears`       | `$*`  | `name`      | ¿Está `$*` usando el objeto `name`?                                           |
|  `MOB` `OBJ` `ROOM` | `has`         | `$*`  | `type`      | ¿Tiene `$*` un objeto de tipo `type`?                                         |
|  `MOB` `OBJ` `ROOM` | `uses`        | `$*`  | `type`      | ¿Está `$*` usando un objeto de tipo `type`?                                   |
|  `MOB` `OBJ` `ROOM` | `name`        | `$*`  | `name`      | ¿Es el nombre de `$*` igual a `name`?                                         |
|  `MOB` `OBJ` `ROOM` | `pos`         | `$*`  | `position`  | ¿Es la posición de `$*` `position` (ej. durmiendo)?                           |
|  `MOB` `OBJ` `ROOM` | `clan`        | `$*`  | `name`      | ¿Pertenece `$*` al clan `name`?                                               |
|  `MOB` `OBJ` `ROOM` | `race`        | `$*`  | `name`      | ¿Es `$*` de la raza `name`?                                                   |
|  `MOB` `OBJ` `ROOM` | `class`       | `$*`  | `name`      | ¿Es `$*` de la clase `name`?                                                  |
|  `MOB` `OBJ` `ROOM` | `objtype`     | `$*`  | `type`      | ¿Es el `item_type` de `$*` igual a `type`?                                    |

> ### Tipo 5: Palabra clave, actor, comparación y valor

| Usado por         | Palabra Clave 					| Actor | Comparador | Valor   | Descripción                                                                                        |
|-------------------|-----------------------------------|-------|------------|---------|----------------------------------------------------------------------------------------------------|
| `MOB` `OBJ` `ROOM`| `vnum`        					| `$*`  | `==`       | `número`| ¿Es el número virtual (`vnum`) de `$*` igual a `número`?                                           |
| `MOB` `OBJ` `ROOM`| `hpcnt`							| `$*`/`nombre`/`vnum`  | `==`       | `número`| ¿Es el porcentaje de puntos de vida (`hpcnt`) del actor indicado igual a `número`? |
| `MOB` `OBJ` `ROOM`| `room`        					| `$*`  | `==`       | `número`| ¿Es el `vnum` de la sala en la que está `$*` igual a `número`?                                     |
| `MOB` `OBJ` `ROOM`| `sex`         					| `$*`  | `==`       | `número`| ¿Es el sexo de `$*` igual a `número`?                                                              |
| `MOB` `OBJ` `ROOM`| `level`       					| `$*`  | `==`       | `número`| ¿Es el nivel de `$*` igual a `número`?                                                             |
| `MOB` `OBJ` `ROOM`| `align`       					| `$*`  | `==`       | `número`| ¿Es la alineación de `$*` igual a `número`?                                                        |
| `MOB` `OBJ` `ROOM`| `money`       					| `$*`  | `==`       | `número`| ¿Tiene `$*` dinero (en plata) igual a `número`?, es la suma del oro y la plata						|
| `MOB` `OBJ` `ROOM`| `moneyg`      					| `$*`  | `==`       | `número`| ¿Tiene `$*` dinero (en solo oro) igual a `número`?													|
| `MOB` `OBJ` `ROOM`| `moneys`      					| `$*`  | `==`       | `número`| ¿Tiene `$*` dinero (en solo plata) igual a `número`?												|
| `MOB` `OBJ` `ROOM`| `objval#`    						| `$*`  | `==`       | `número`| ¿Es `$*->value[#]` igual a `número` (para `#` entre 0-4)?                                          |
| `MOB` `OBJ` `ROOM`| `grpsize`    						| `$*`  | `==`       | `número`| ¿Es el grupo de $n igual a `número`? evalua las personas dentro de un grupo menos el lider, es decir si el grupo es de 5 esto será gprsize $n == 4, ya que hay 4 personas + el lider.                     |
| `MOB` `OBJ` `ROOM`| `FUE`, `DES`, `INT`, `SAB`, `CON` | `$*` 	| `==` 		 | `número`| Compara el valor de un stat (ej. fuerza, destreza) de `$*` con `número` o con el valor de otra víctima,son stats del personaje sin la modificación de equipo o spells.|

> ### Tipo 6: Palabra clave, actor, valor, comparación, valor

| Usado por         | Palabra Clave | Actor | Valor      | Comparador | Valor        | Descripción|
|-------------------|---------------|-------|------------|------------|--------------|-----------------------------------------------------------------------------------------------------------------------|
| `MOB` `OBJ` `ROOM`| `tiene`       | `$*`  |  `número`  | `==`       | `nombre\VNUM`| cuenta cuantos objetos de mismo tipo tiene la victima en el inventario `if tiene $n 4 == bola` `if tiene $n 45 == 100`|

> ### Tipo 7: Palabra clave, Variable, valor, Variable

| Usado por          | Palabra Clave | Variable | Valor | Variable | Descripción																			   		   																									   |
|--------------------|---------------|----------|-------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `MOB` `OBJ` `ROOM` | `compare`     | `$*`  	| `==`  |  `$*`    | Compara si el contenido de `$a`/`$b`/`$c`/`$A`/`$B`/`$C` es igual al contenido de `$a`/`$b`/`$c`/`$A`/`$B`/`$C`. Solo se cumple si son iguales. `if compare $a $A`, también se pueden usar las variables del comando usar `$u` y `$v`   								   |
| `MOB` `OBJ` `ROOM` | `contiene`	 | `$*`  	| `==`  |  `$*`    | Verifica si el contenido de `$a`/`$b`/`$c`/`$A`/`$B`/`$C` contiene el valor de `$a`/`$b`/`$c`/`$A`/`$B`/`$C`. Se cumple si `$a`/`$b`/`$c`/`$A`/`$B`/`$C` está dentro de `$a`/`$b`/`$c`/`$A`/`$B`/`$C` `if contiene $A "evento"`, también se pueden usar las variables del comando usar `$u` y `$v`.|

> ### Tipo 8: Palabra clave, Variable, valor, Variable

| Usado por          | Palabra Clave | Variable | Nombre Quest    | Fase   | Descripción											    |
|--------------------|---------------|----------|-----------------|--------|------------------------------------------------------------|
| `MOB` `OBJ` `ROOM` | `pquestactiva`| `$*`  	| `Nombre Quest`  | 	   | Comprueba si `$n` tiene activo el quest con ese nombre 	|
| `MOB` `OBJ` `ROOM` | `pquestfase`	 | `$*`  	| `Nombre Quest`  | `Fase` | Comprueba si `$n` tiene esa fase en el quest con ese nombre|
| `MOB` `OBJ` `ROOM` | `pquestfin`	 | `$*`  	| `Nombre Quest`  | 	   | Comprueba si `$n` ha finalizado el quest con ese nombre	|



**Nota:** En esta versión de MOBprograms, no se permiten paréntesis `(` y `)` alrededor de las variables. Los parámetros deben estar separados por espacios (por ejemplo, `if level $n < 10`).

### 8. Nuevos Comandos de Interés

Los siguientes comandos y disparadores están disponibles para ser utilizados con MOBprograms:

#### Comandos de Diagnóstico (Solo para inmortales)


| Usado por 	| Comando  | Sintaxis      								    					| Descripción                                                                                          																			|
|---------------|----------|--------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `IMPs` `MOB`	| `MPSTAT` | `MPSTAT [mobile]`  												| Muestra los triggers y los vnums de MOBprograms definidos para el `mobile`.                          																			|
| `IMPs` `MOB`	| `MPDUMP` | `MPDUMP [vnum]`    												| Muestra el código del MOBprogram del `vnum` especificado.                          																							|
| `IMPs` `OBJ`	| `OPSTAT` | `OPSTAT [object]`  												| Muestra los triggers y los vnums de OBJprograms definidos para el `objeto`.                          																			|
| `IMPs` `OBJ`	| `OPDUMP` | `OPDUMP [vnum]`    												| Muestra el código del OBJprogram del `vnum` especificado.                          																							|
| `IMPs` `ROOM`	| `RPSTAT` | `RPSTAT [vnum]`    												| Muestra los triggers y los vnums de ROOMprograms definidos para el `vnum` de la `room`. Si no se especifica `vnum`, muestra la información de la `room` actual. 				|
| `IMPs` `ROOM`	| `RPDUMP` | `RPDUMP [vnum]`    												| Muestra el código del ROOMprogram del `vnum` especificado.                          																							|
| `IMPs`		| `pquest` | `lista` `[nombre_personaje]`    									| Muestra todas las quests que están activas y las que han sido completadas para el personaje especificado. Si no se indica un `nombre_personaje`, se asume el personaje actual.|
| `IMPs`		| `pquest` | `activa` `<nombre_personaje>` `poner` `<nombre_quest>`  			| Agrega una quest específica a la lista de quests actuales (`PQuestActual`) del personaje indicado.																			|
| `IMPs`		| `pquest` | `activa` `<nombre_personaje>` `quitar` `<nombre_quest>` 			| Elimina una quest específica de la lista de quests actuales (`PQuestActual`) del personaje indicado.                          												|
| `IMPs`		| `pquest` | `fase` `<nombre_personaje>` `cambiar` `<nombre_quest>` `<fase>` 	| Cambia la fase actual de una quest específica en la lista de fases de quests (`PQuestFase`) del personaje indicado. 															|
| `IMPs`		| `pquest` | `fin` `<nombre_personaje>` `poner` `<nombre_quest>`    		  	| Marca una quest como finalizada (`PQuestFin`) para el personaje indicado, eliminándola de `PQuestActual` y `PQuestFase`. 														|
| `IMPs`		| `pquest` | `fin` `<nombre_personaje>` `quitar` `<nombre_quest>`   		  	| Elimina una quest de la lista de quests finalizadas (`PQuestFin`) del personaje indicado.        																				|



> ### Comandos de MOB

| Usado por 		| Comando       | Sintaxis           					 						 | Descripción                                                                                          																																							|
|-------------------|---------------|----------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|`MOB` `OBJ` `ROOM`	| `STATUS`		| `Número_status`						 						 | Cambia el estatus del MOB en un script, permitiendo alterar fases del comportamiento del MOB.																																									|
|`MOB` `OBJ` `ROOM`	| `ASOUND`		| `[string]`							 						 | Emite el texto en habitaciones adyacentes **OBJ** solo funciona si el objeto está en el suelo. 																																									|
|`MOB` `OBJ` `ROOM`	| `ZECHO`		| `[string]`							 						 | Emite el texto a todos los jugadores en la misma área.																																																			|
|`MOB` `OBJ` `ROOM`	| `GECHO`		| `[string]`							 						 | Emite el texto a todos los jugadores del juego.																																																					|
|`MOB` `OBJ` `ROOM`	| `ECHO`		| `[string]`							 						 | Muestra el texto a todos en la sala.																																																								|
|`MOB` `OBJ` `ROOM`	| `ECHOAT`		| `[victim] [string]`					 						 | Muestra el texto solo a la víctima especificada.																																																					|
|`MOB` `OBJ` `ROOM`	| `ECHOAROUND`	| `[victim] [string]`					 						 | Muestra el texto a todos excepto a la víctima.																																																					|
|`MOB` `OBJ` `ROOM`	| `MLOAD`		| `[vnum]`								 						 | Crea un MOB en la misma sala que el MOB que ejecuta el comando.																																																	|
|`MOB` `ROOM`		| `OLOAD`		| `[vnum] [nivel] [room/wear] [tiempo]`	 						 | Carga un objeto en el inventario del MOB, **ROOM** **OBJ** lo crea en el suelo de la sala. `Nivel`crea el objeto con ese nivel, `room`crea el objeto en el suelo de la room, `wear` crea el objeto vestido (solo MOB), `tiempo` pone duración al objeto al terninar desaparece.|
|`OBJ`				| `OLOAD`		| `obj oload [vnum] [nivel] [R/W/personaje] [timer]`	 		 |Estos son los ejemplos para usar Oload con ojetos: `obj oload [vnum] [nivel] [personaje]` - Carga el objeto en el inventario del personaje, `obj oload [vnum] [nivel] W [personaje]` - Carga el objeto y lo equipa al personaje, `obj oload [vnum] [nivel] R` - Carga el objeto en la habitación (comportamiento original), `obj oload [vnum] [nivel] [R/W/personaje] [timer]` - Con temporizador opcional  |
|`MOB`				| `KILL`		| `[victim]`							 						 | Permite al MOB atacar a un jugador.																																																								|
|`MOB`				| `FLEE`		|           							 						 | Hace que el MOB huya de la habitación, no huye del combate, sirve por ejemplo si ven a alguien que le da pavor... para huir del combate usar simplemente `HUIR`  																								|
|`MOB` `OBJ` `ROOM`	| `REMOVE`		| `[victim] [vnum|'all']`				 						 | Elimina un objeto específico o todo el inventario de la víctima, también los objetos vestidos.																																									|
|`MOB` `OBJ` `ROOM`	| `REMOVEN`		| `[victim] [vnum] [cantidad]`			 						 | Elimina una catidad específica de un objeto específico víctima, también los objetos vestidos.																																									|
|`MOB` `ROOM`		| `JUNK`		| `[object/vnum|'all']`						 					 | Destruye el objeto en el inventario del MOB si pones `all` destruirá todos los objetos, **ROOM** destruye el objeto del suelo o `all` los objetos del suelo.																										|
|`MOB` `OBJ` `ROOM`	| `PURGE`		| `[argument]`							 						 | Elimina el argumento de la sala. Sin argumento, limpia NPCs y objetos de la sala.																																												|
|`MOB`				| `AT`			| `[location] [command]`				 						 | Realiza el comando en la ubicación designada.																																																					|
|`MOB`				| `GOTO`		| `[location]`							 						 | Mueve el MOB a la ubicación especificada, sin mensajes de entrada o salida.																																														|
|`MOB` `OBJ` `ROOM`	| `TRANSFER`	| `[victim|'all'] [location]`			 						 | Transfiere a la víctima o a todos los personajes en la sala.																																																		|
|`MOB` `OBJ` `ROOM`	| `GTRANSFER`	| `[victim] [location]`					 						 | Transfiere a la víctima y a los miembros de su grupo.																																																			|
|`MOB` `OBJ` `ROOM`	| `OTRANSFER`	| `[objeto] [location]`					 						 | Transfiere al objeto.																																																											|
|`MOB` `OBJ` `ROOM`	| `FORCE`		| `[victim|'all'] [command]`			 						 | Obliga a la víctima a realizar el comando especificado.																																																			|
|`MOB` `OBJ` `ROOM`	| `GFORCE`		| `[victim] [command]`					 						 | Igual que `FORCE` pero afecta a todo el grupo de la víctima.																																																		|
|`MOB` `OBJ` `ROOM`	| `VFORCE`		| `[vnum] [command]`					 						 | Obliga a todos los NPCs con el `vnum` dado a ejecutar el comando.																																																|
|`MOB`				| `DOAS`		| `[victim] [command]`					 						 | El MOB realiza el comando en nombre de la víctima, que no se da cuenta (como el force pero la víctima no sabe que ha ejecutado el comando) 																														|
|`MOB` `OBJ` `ROOM`	| `CAST`		| `[spell] [victim]`					 						 | Permite al MOB lanzar hechizos sin consumo de maná, **OJB** **MOB** los spells curativos bien los de daño no tan bien, depende de lo que se quiera puede no funcionar, hay que testear bien el propósito.														|
|`MOB` `OBJ` `ROOM`	| `DAMAGE`		| `[victim|'all'] [min] [max] {lethal} {y}`	 				     | Daño incondicional a la víctima o a todos en la sala, con `lethal` el daño puede ser mortal, **OBJ** con el argumento `all` no hace daño a quien lo lleve en el inventario o vista, si el último argumento es `y` entonces el mensaje de muerte no saldra como `Suicidio` al poner el último argumento como `y` el daño en mobprog y objprog (si alguien lleva el objeto) iniciará pelea con la vicitma (se puede evitar poniendo el comando `paz`en la siguiente línea |
|`MOB` `OBJ` `ROOM`	| `HEAL`		| `[victim|'all'] [min] [max]`			 						 | Cura `HP` a la víctima **ALL** cura `HP` a todos en la sala menos al mob que tiene el prog o al portador del objeto, si no se pone argumento `min` o  `max` curará el 100% del `HP`.																				|
|`MOB` `OBJ` `ROOM`	| `MANA`		| `[victim|'all'] [min] [max]`			 						 | Cura `MANA` a la víctima **ALL** cura `MANA` a todos en la sala menos al mob que tiene el prog o al portador del objeto, si no se pone argumento `min` o  `max` curará el 100% del `MANA`.																		|
|`MOB` `OBJ` `ROOM`	| `MOVE`		| `[victim|'all'] [min] [max]`			 						 | Cura `MOVIMIENTO` a la víctima **ALL** cura `MOVIMIENTO` a todos en la sala menos al mob que tiene el prog o al portador del objeto, si no se pone argumento `min` o  `max` curará el 100% del `MOVIMIENTO`.														|
|`MOB` `OBJ` `ROOM`	| `DELAY`		| `[Número]`							 						 | Activa un temporizador que ejecuta el trigger de delay del MOB cuando expira.																																													|
|`MOB` `OBJ` `ROOM`	| `CANCEL`		|         								 						 | Resetea el temporizador de delay del MOB.																																																						|
|`MOB` `OBJ` `ROOM`	| `REMEMBER`	| `[victim]`							 						 | El MOB recuerda a la víctima como `$q` para referencia futura.																																																	|
|`MOB` `OBJ` `ROOM`	| `FORGET`		|         								 						 | Borra el recuerdo de la víctima referenciada como `$q`.																																																			|
|`MOB` `OBJ` `ROOM`	| `CALL`		| `[vnum] {victim} {target1} {target2}`	 						 | Llama a un subprograma MOB dentro de otro MOBprogram.																																																			|
|`MOB` `OBJ` `ROOM`	| `PAZ`			| 										 						 | Para todos los combates que haya en la habitación.																																																				|
|`MOB` `OBJ` `ROOM`	| `removeaffec`	| `[victim] [affec]`					 						 | Quitará el spell o efecto al objetivo por ejemplo `mob removeaffec $i raices` o `mob removeaffec $i enraizado`																																															|
|`MOB` `OBJ` `ROOM`	| `addaffec`	| `[victim] [affec] [duracion] [M|S|R]`					 		 | Pone el spell o efecto al objetivo con la duracción añadida `M: minutos` `S: segundos` `R: rondas de combate`, el efecto no se puede curar ni cancelar ni eliminar, por ejemplo `mob addaffec $i raices 10 S` o `mob addaffec $i enraizado 10 S`, los posibles affec se declaran en la tabla específica **TABLA addaffec**.|
|`MOB` `OBJ` `ROOM`	| `SLEEP`		| `[segundos]`							 						 | Realiza una pausa de x segundos en el mobprog. **NO HAY QUE PONER `MOB` `OBJ` `ROOM` PARA USARLO**																																								|
|`MOB` `OBJ` `ROOM`	| `regexcopy`	| `[Variable] [Variable]`				 						 | Copia el valor de `$a` `$b` `$c` a `$A` `$B` `$C` 																																																				|
|`MOB` `OBJ` `ROOM`	| `regexdelete`	| `[Variable]`					 		 						 | Borra el valor de la variable `$A` `$B` `$C`																																																						|
|`MOB` `OBJ` `ROOM`	| `freeze	`	| `[victim/all]` `[segundos]`				 					 | Freezea al objetivo durante los segundos puestos, impidiendo que haga cualquier comando, las acciones autómaticas si se realizan, si pones `all` lo aplicarás a todos los jugadores de la sala|
|`MOB`				| `mpimresvul`	| `[poner/quitar]` `[victim]` `[inm/res/vul]` `[nombre del aff]` | Pone/quita en un mob una Inmunidad/Resistencia/Vunerabilidad:`summon` `charm` `magic` `weapon` `golpe` `pierce` `slash` `fire` `cold` `lightning` `acid` `veneno` `negative` `holy` `energy` `mental` `disease` `drowning` `light` `sound` `wood` `silver` `iron`|
|`MOB` `OBJ` `ROOM`	| `pquestinicio`| `[victim] [Nombre Quest]`	`{quitar}`	 						 | Inicia el quest en `$n`.																																																											|
|`MOB` `OBJ` `ROOM`	| `pquestfase`	| `[victim] [Nombre Quest] [Numero Fase]`						 | Cambia el número de fase del quest de `$n`. 																																																						|
|`MOB` `OBJ` `ROOM`	| `pquestfin`	| `[victim] [Nombre Quest]`	`{quitar}`	 						 | Termina el quest en `$n`																																																											|
|`MOB` `OBJ` `ROOM`	| `prac`		| `[victim] [Número]`					 						 | Da la cantidad de practicas asignadas																																																							|
|`MOB` `OBJ` `ROOM`	| `entre`		| `[victim] [Número]`					 						 | Da la cantidad de entrenamientos asignados																																																						|
|`MOB` `OBJ` `ROOM`	| `gainhp`		| `[victim] [Número]`					 						 | Da la cantidad de `HP` permanente.																																																								|
|`MOB` `OBJ` `ROOM`	| `gainmana`	| `[victim] [Número]`					 						 | Da la cantidad de `MANA` permanente.																																																								|
|`MOB` `OBJ` `ROOM`	| `gainmov`		| `[victim] [Número]`					 						 | Da la cantidad de `MOVIMIENTO` permanente.																																																						|
|`MOB` `OBJ` `ROOM`	| `gainxp`		| `[victim] [Número]`					 						 | Da la cantidad de `EXPERIENCIA`.																																																									|					
|`MOB` `OBJ` `ROOM`	| `gaintemphp`	| `[victim] [Número]`					 						 | Da la cantidad de `HP` provisional durante un TICK como si fuera un escudo de HP.																																												|
|`MOB` `OBJ` `ROOM`	| `gaintempmana`| `[victim] [Número]`					 						 | Da la cantidad de `MANA` provisional durante un TICK.																																																			|
|`MOB` `OBJ` `ROOM`	| `gaintempmov`	| `[victim] [Número]`					 						 | Da la cantidad de `MOVIMIENTO` provisional durante un TICK.																																									

|`MOB` 	| `log`	| `[tipo] [texto]`					 						 | Logea el texto indicado. indicando vnum mob. tipo opcional (info/aviso/error/quest/bug)									|

**TABLA addaffec**

|          Hechizo          |         Efecto          |   |          Hechizo         |         Efecto         |
|---------------------------|-------------------------|---|--------------------------|------------------------|
| deslumbrar                | deslumbrado             |   | ataduras                 | atado                  |
| invisibilidad             | invisible               |   | escudo de hielo          | escudo_hielo           |
| detectar mal              | detectando maldad       |   | congelar                 | congelado              |
| detectar invisibilidad    | detectando invisibilidad|   | piel de dragon           | piel_dragon            |
| detectar magia            | detectando magia        |   | noilusion                | noilusion              |
| detectar oculto           | detectando oculto       |   | aturdir                  | aturdido               |
| detectar bondad           | detectando bondad       |   | calmar impetu            | sosiego                |
| santuario                 | santuario_              |   | hipnosis                 | hipnotizado            |
| buen aura                 | buen_aura               |   | intimidar                | intimidado             |
| gatovision                | infravision             |   | duda                     | dudoso                 |
| maldecir                  | maldito                 |   | ritual                   | ritual                 |
| escudo de fe              | escudado por la fe      |   | kuiken                   | kuiken                 |
| veneno                    | envenenado              |   | mute                     | Silenciado             |
| proteccion infernal       | protegido del mal       |   | temper                   | temper                 |
| proteccion divina         | protegido del bien      |   | tsubame1                 | tsubame1               |
| disimular                 | disimulando             |   | tsubame2                 | tsubame2               |
| ocultar                   | ocultado                |   | tsubame3                 | tsubame3               |
| dormir                    | dormido                 |   | espejo                   | espejo_spell           |
| encantar gente            | encantado               |   | sofocar ira              | sofocado               |
| volar                     | volando                 |   | torpeza                  | torpe                  |
| traspasar                 | inmanterial             |   | aura                     | aura                   |
| acelerar                  | acelerado               |   | revertir                 | revertido              |
| calma                     | calmado                 |   | adrenalina               | adrenalina             |
| plaga                     | enfermo                 |   | invocacion               | invocacion             |
| debilitar                 | debilitado              |   | honor                    | honor                  |
| histeria                  | furioso                 |   | antiagresion             | anti_agresion          |
| raices                    | enraizado               |   | vision verdadera         | vision_verdadera       |
| regeneracion              | regenerando             |   | cortar labios            | labios cortados        |
| relenti                   | relentizado             |   | astucia gnoma            | astucia_gnoma          |
| Golpetazo                 | Hinchado                |   |                          |                        |
| ilusion eterea            | ilusion eterea          |   |                          |                        |


### 9. Ejemplos

#### Ejemplo de un Temple Guardian:
```plaintext
#1001
if isgood $n
   say ¡Salve!
   emote saluda a $n.
   if carries $n holy
      mob transfer $n 2301
   else
      say Si deseas entrar al templo, consigue un símbolo sagrado.
   endif
else
   curse $n
   say ¡Vete de aquí, escoria!
endif
~
```
En este ejemplo, un guardián del templo permite o impide el acceso según la alineación del jugador.

---
---
---
---

#### Ejemplo de Uso de `DELAY` y `REMEMBER`:
```plaintext
#1002
if isevil $n
   say ¡Infiel! Aléjate o enfrentarás la ira de Mota.
   mob remember $n
   mob delay 10
   break
endif
~
#1003
if hastarget $i
   growl
   mob echo $I grita y ataca a $Q.
   mob kill $q
else
   mob forget
endif
~
```
En este ejemplo, un NPC advierte a un jugador malvado y, luego de una demora, lo ataca si sigue presente.

Aquí tienes el texto íntegro en formato Markdown para que sea más legible:

---
---
---
---

#### Ejemplo de Uso de `MOB Status`

El **MOB Status** permite añadir estados o fases a los `mobprog`, haciendo que los NPC puedan cambiar su comportamiento de manera dinámica. A continuación se explican los detalles de su funcionamiento y ejemplos de su uso.

#### Sintaxis
```plaintext
Syntax: MOB status Numero
Syntax: MOB status + Numero
Syntax: MOB status - Numero
```

Este comando se utiliza para modificar el estado del NPC en un `mobprog`. Puede establecer un valor concreto o sumar/restar al estado actual. Se emplea siempre dentro del script del `mobprog` y no dispone de disparador en el `mob`. Su uso es el siguiente:

- Un `mob` siempre comienza en **estado 0** y vuelve a este estado tras un `reboot` o al hacer `spamw`.

```plaintext
IF status $i == Numero_status
```

Se usa `$i` para referirse al propio `mob`, aunque también se puede usar otra víctima para ajustar el estado de otros `mobs` y así coordinar entre ellos. Si la condición `if status` se cumple, se ejecuta la parte de script que está dentro del `if`.

#### Ejemplo de uso
```plaintext
mob status 0
mob status 34
mob status 8
mob status + 2
mob status -1
```

Este mismo formato se aplica a `OBJ status` y `ROOM status` dentro de sus respectivos programas.

Este comando se emplea dentro del propio script del `mobprog` y cambia el estado del `mob` que ejecuta este `mobprog`. **No puede cambiar el estado de otro `mob` diferente**.

#### Ejemplo completo:

```plaintext
M grall 1234 100~
--> MAL HECHO <--
#1234

if status $i == 0
    mob echo $i mira a $n
    if wears $n == 1222  (un arma que era propiedad del hermano de ese mob)
        mob echo $i se enfurece, en su rostro se refleja la ira propia de los guerreros de Timinur.
        decir $n ¿POR QUÉ LLEVAS EL ARMA DE MI HERMANO?
        decir EL HUBIERA PREFERIDO PERDER LA VIDA ANTES QUE ENTREGARSELA A ALGUIEN
        mob echo {x
        mob echo En este instante $i es consciente de lo que ha sucedido y se apresura a atacar a $n
        mob kill $n
        
        mob status == 1
        
    else
        decir buenos días $n
    endif
endif

if status $i == 1
    mob echo $i no tiene ya razón para vivir, la ira de los guerreros de Timinur le invade.
    mob echo $i te ataca sin piedad.
    mob kill $n
endif
~
```

---

#### Importante

En este caso, cuando el `mob` cambia a **estado 1** dentro del `if status == 0`, se cumple el `if status == 1` ya que está después en el código. Para evitar este problema, se debe poner un `BREAK` después de `mob status == 1` o hacer los `if` en orden descendente de `status`.

---

#### Ejemplo correcto

```plaintext
--> BIEN HECHO <--
#1234

if status $i == 1
    mob echo $i no tiene ya razón para vivir, la ira de los guerreros de Timinur le invade.
    mob echo $i te ataca sin piedad.
    mob kill $n
endif

if status $i == 0
    mob echo $i mira a $n
    if wears $n == 1222  (un arma que era propiedad del hermano de ese mob)
        mob echo $i se enfurece, en su rostro se refleja la ira propia de los guerreros de Timinur.
        decir $n ¿POR QUÉ LLEVAS EL ARMA DE MI HERMANO?
        decir EL HUBIERA PREFERIDO PERDER LA VIDA ANTES QUE ENTREGARSELA A ALGUIEN
        mob echo {x
        mob echo En este instante $i es consciente de lo que ha sucedido y se apresura a atacar a $n
        mob kill $n
        
        mob status == 1
        
    else
        decir buenos días $n
    endif
endif
~
```

---

### Explicación del Ejemplo

En este ejemplo, con un solo disparador y un solo script, hemos cambiado el estado/fase del `mob`, haciendo que pase de ser un `mob` pasivo a uno agresivo. Solo volverá a ser pasivo si muere y vuelve a hacer `spawn` o si hay un `reboot`.

**Escenario**: En el rol inventado para este ejemplo, el `mob` saluda amablemente a todo el mundo que pasa a su lado. Sin embargo, si ve a alguien con el arma de su hermano, entiende que su hermano ha muerto. Esto desata una ira incontrolable, haciendo que ataque al portador del arma. Si sobrevive a la pelea, atacará a cualquier otro que pase a su lado. 

---
---
---
---

#### Explicación y ejemplos de Uso de `REGEX`

El **REGEX** es un disparador que puede parsear todo lo que aparezca por `decir` o `tell` se usa para parsear (\w+) que cogerá la primera palabra que coincida o (.*) que cogerá la cadena completa de texto hasta la siguiente palabra o coparador.
Las palabras o cadenas de texto parseadas se guardan en las variables `$a` `$b` `$c` en este orden, siendo `$a` la primera coincidencia...
Estas variables son volátiles y se perderán para los siguientes triggers, pero se pueden guardar en las variables `$A` `$B` `$C` usando `Mob regexcopy` y borrar con `Mob regexdelete` las variables `$A` `$B` `$C` perduran hasta que son sustituidas o borradas :
`Mob regexcopy $a $B` esto copiará $a dentro de $B
`Mob regexdelete $A` esto borraría la variable $A
Estas variables se pueden dentro de if con `compare`y `contiene`:
`If compare $a == $A` esto compara si lo que contiene `$a` es lo mismo que contiene `$A` y solo se cumplirá si son iguales.
`If contiene $B == $c` esto compara si lo que contiene `$B` tiene dentro el valor de `$c` y es decir, secumplirá si lo que tiene `$c` está dentro de todo lo que tiene `$B`: `$c "hola"` `$b "hola buenos saludos hey"`.

#### Sintaxis
```plaintext
Trigger: M regex vnum (texto opcional) (\w+) (\w+) (\w+)~
Trigger: M regex vnum (texto opcional) (.*)~
```


#### Expresiones Regulares Comunes:

| Expresión Regular | Descripción                                          |
|-------------------|------------------------------------------------------|
| `(\w+)`           | Captura la primera palabra que coincide.             |
| `(.*)`            | Captura toda la cadena de texto hasta el siguiente espacio o comparador. |

#### Variables de Coincidencia:

Las partes del texto que coinciden con las expresiones regulares se almacenan en las siguientes variables:

| Variable | Descripción                      |
|----------|----------------------------------|
| `$a`     | Primera coincidencia             |
| `$b`     | Segunda coincidencia             |
| `$c`     | Tercera coincidencia             |

> **Nota:** Estas variables son **volátiles** y se pierden con cada nuevo disparador.

#### Variables Permanentes:

Para conservar los valores de las coincidencias entre diferentes disparadores, se pueden copiar a variables permanentes `$A`, `$B`, `$C` utilizando los comandos `mob regexcopy` y `mob regexdelete`.

| Comando                      | Descripción                                |
|------------------------------|--------------------------------------------|
| `mob regexcopy $a $A`        | Copia el valor de `$a` a `$A`              |
| `mob regexcopy $b $B`        | Copia el valor de `$b` a `$B`              |
| `mob regexcopy $c $C`        | Copia el valor de `$c` a `$C`              |
| `mob regexdelete $A`         | Borra el valor de la variable `$A`         |
| `mob regexdelete $B`         | Borra el valor de la variable `$B`         |
| `mob regexdelete $C`         | Borra el valor de la variable `$C`         |

#### Uso en Condicionales (`if`):

Las variables permanentes `$A`, `$B`, `$C`, y del comando usar `$u` y `$v` pueden utilizarse en condiciones `if` mediante los operadores `compare` (comparar) y `contiene` (contener).

| Condición                  | Descripción                                                                                   |
|----------------------------|-----------------------------------------------------------------------------------------------|
| `if compare $a == $A`      | Compara si el contenido de `$a` es igual al contenido de `$A`. Solo se cumple si son iguales. |
| `if contiene $B == $c`     | Verifica si el contenido de `$B` contiene el valor de `$c`. Se cumple si `$c` está dentro de `$B`. |

#### Ejemplos:

1. **Comparar Igualdad:**
   ```plaintext
   if compare $a == $A
       say Las coincidencias son iguales.
   endif
   ```

2. **Comparar Contención:**
   ```plaintext
   if contiene $B == $c
       say La variable $c está contenida en $B.
   endif
   ```
   - **Ejemplo Práctico:**
     - `$c`: "hola"
     - `$B`: "hola buenos saludos hey"
     - La condición se cumple porque "hola" está dentro de "hola buenos saludos hey".

#### Resumen de Comandos REGEX:

| Comando            | Función                                          |
|--------------------|--------------------------------------------------|
| `mob regexcopy`    | Copia el valor de una variable volátil a una permanente. |
| `mob regexdelete`  | Borra el valor de una variable permanente.       |


---
---
---
---

### Explicación y ejemplos de Uso de PQuest

El sistema **PQuest** permite gestionar las quests de los personajes en el MUD. A continuación se describen los comandos principales, las condiciones `if` relacionadas y el comando inmortal `pquest` para la administración de quests.

---

#### Comandos de PQuest

| Comando         | Sintaxis                                         | Descripción                                                                                                   |
|-----------------|--------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| `questinicio`   | `questinicio [victim] [Nombre Quest]`            | Inicia una quest para el personaje especificado (`victim`).                                                   |
| `questfase`     | `questfase [victim] [Nombre Quest] [Numero Fase]`| Cambia la fase actual de una quest para el personaje especificado (`victim`) a la fase proporcionada.         |
| `questfin`      | `questfin [victim] [Nombre Quest]`               | Finaliza una quest, marcándola como completada para el personaje indicado (`victim`).                         |

##### Ejemplos:

1. **Iniciar una Quest:**
   ```plaintext
   MOB/OBJ/ROOM questinicio Juan "Recoger Hierbas"
   ```
   Inicia la quest "Recoger Hierbas" para el personaje Juan.

2. **Cambiar la Fase de una Quest:**
   ```plaintext
   MOB/OBJ/ROOM questfase Maria "Salvar al Pueblo" 2
   ```
   Cambia la fase de la quest "Salvar al Pueblo" a la fase 2 para el personaje Maria.

3. **Finalizar una Quest:**
   ```plaintext
   MOB/OBJ/ROOM questfin Carlos "Derrotar al Dragón"
   ```
   Marca la quest "Derrotar al Dragón" como finalizada para el personaje Carlos.

---

#### Condicionales `if` para PQuest

Los condicionales `if` permiten evaluar el estado de las quests de los personajes, habilitando la ejecución de comandos o scripts basados en su progreso.

| Comando         | Sintaxis                                         | Descripción                                                                                                   |
|-----------------|--------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| `pquestactiva`  | `if pquestactiva [victim] [Nombre Quest]`        | Verifica si la quest especificada está activa para el personaje indicado (`victim`).                         |
| `pquestfase`    | `if pquestfase [victim] [Nombre Quest] [fase]`   | Verifica si la quest especificada está en una fase concreta para el personaje indicado (`victim`).           |
| `pquestfin`     | `if pquestfin [victim] [Nombre Quest]`           | Verifica si la quest especificada ha sido finalizada por el personaje indicado (`victim`).                   |

##### Ejemplos:

1. **Verificar si una Quest está Activa:**
   ```plaintext
   if pquestactiva $n "Recoger Hierbas"
       say $n, tienes la quest activa: Recoger Hierbas.
   endif
   ```

2. **Verificar la Fase de una Quest:**
   ```plaintext
   if pquestfase $n "Salvar al Pueblo" 2
       say $n, estás en la fase 2 de la quest Salvar al Pueblo.
   endif
   ```

3. **Verificar si una Quest ha Finalizado:**
   ```plaintext
   if pquestfin $n "Derrotar al Dragón"
       say $n, ya has completado la quest Derrotar al Dragón.
   endif
   ```

---

#### Comando Inmortal `pquest`

El comando `pquest` es una herramienta para inmortales que permite gestionar las quests de los personajes.

| Comando         | Sintaxis                                                    | Descripción                                                                                                   |
|-----------------|-------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| `pquest lista`  | `pquest lista [nombre_personaje]`                           | Lista todas las quests activas y finalizadas del personaje especificado. Si no se indica un nombre, se usa el personaje actual. |
| `pquest activa` | `pquest activa <nombre_personaje> poner <nombre_quest>`     | Añade una quest a la lista de quests actuales (`PQuestActual`) del personaje indicado.                       |
| `pquest activa` | `pquest activa <nombre_personaje> quitar <nombre_quest>`    | Elimina una quest de la lista de quests actuales (`PQuestActual`) del personaje indicado.                    |
| `pquest fase`   | `pquest fase <nombre_personaje> <nombre_quest> <fase>`	 	| Cambia la fase actual de una quest para el personaje indicado (`PQuestFase`).                                |
| `pquest fin`    | `pquest fin <nombre_personaje> poner <nombre_quest>`        | Marca una quest como finalizada (`PQuestFin`) para el personaje indicado, eliminándola de `PQuestActual` y `PQuestFase`. |
| `pquest fin`    | `pquest fin <nombre_personaje> quitar <nombre_quest>        | Elimina una quest de la lista de quests finalizadas (`PQuestFin`) del personaje indicado.                     |

##### Ejemplos:

1. **Listar todas las Quests de un Personaje:**
   ```plaintext
   pquest lista Juan
   ```
   Muestra todas las quests activas y finalizadas de Juan.

2. **Añadir una Quest a las Quests Actuales de un Personaje:**
   ```plaintext
   pquest activa Maria poner "Salvar al Pueblo"
   ```
   Añade la quest "Salvar al Pueblo" a la lista de quests actuales de Maria.

3. **Quitar una Quest de las Quests Actuales de un Personaje:**
   ```plaintext
   pquest activa Carlos quitar "Recoger Hierbas"
   ```
   Elimina la quest "Recoger Hierbas" de la lista de quests actuales de Carlos.

4. **Cambiar la Fase de una Quest:**
   ```plaintext
   pquest fase Ana cambiar "Derrotar al Dragón" 3
   ```
   Cambia la fase de la quest "Derrotar al Dragón" a la fase 3 para Ana.

5. **Finalizar una Quest para un Personaje:**
   ```plaintext
   pquest fin Luis poner "Salvar al Reino"
   ```
   Marca la quest "Salvar al Reino" como finalizada para Luis.

6. **Quitar una Quest de las Quests Finalizadas de un Personaje:**
   ```plaintext
   pquest fin Elena quitar "Explorar la Cueva"
   ```
   Elimina la quest "Explorar la Cueva" de la lista de quests finalizadas de Elena.

---

##### Comando `usar`

El comando `usar` se puede utirilzar con cualquier objeto del juego, el objeto puede estar indistintamente en el inventario, vestido o en el suelo, si el objeto no dispone de un objprog con el trigger `USAR` no pasará nada y devolverá el mensaje: No parece que puedas hacer nada con `nombre del objeto`
Si por el contrario el objeto tiene un objprog con el trigger `USAR` se ejecutará el script del objprog.
el comando `usar` puede utilizarse de la siguiente manera:

usar `nombre objeto` `opcional_argumento_1` `opcional_argumento_2`

si se usa el `argumeto 1` o el `argumento 2` este se pasará al objprog a traves de las variables `$u` y `$v`, `argumeto 1` --> `$u`, `argumeto 2` --> `$v`

#### MP_LOG `mob log`
-----
Sintaxis: mob log [tipo] <mensaje>
  
Registra un mensaje en el log del servidor desde un mobprog. Útil para depuración 
y seguimiento de eventos.

El tipo es opcional y puede ser:
- info    : Información general (valor por defecto)  
- aviso   : Advertencias o alertas
- error   : Errores graves
- quest   : Eventos relacionados con quests
- bug     : Bugs o comportamientos inesperados

El mensaje puede incluir variables de mobprog que serán expandidas.

Ejemplos:
  mplog El jugador $n ha entrado a la sala
  mplog quest $n ha completado la fase 1 de misión X  
  mplog error Error procesando quest para $n
  mplog aviso Intento inválido de acción por $n
  mplog bug Variables inesperadas: $a

El mensaje se registrará en el log con el formato:
[MOB Vnum][tipo] mensaje

Donde:
- Vnum es el vnum del mob que ejecuta el comando
- tipo es el tipo de mensaje especificado (o "info" por defecto)
- mensaje es el texto con las variables expandidas
---