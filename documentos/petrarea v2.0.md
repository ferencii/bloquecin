

# Guía para la creación de áreas en MUD
**ESTE DOCUMENTO HAY QUE VERLO CON UN LECTOR DE MD O NO SE VERÁ CORRECTAMENTE**

Las áreas deben estar contenidas en un solo archivo, organizado de la siguiente manera:

## Organización de las áreas

**#AREA**  
  `<encabezado del área>`

**#MOBILES**  
  `<los móviles>`  
  `#0` *(Fin de la sección de móviles)*

**#OBJECTS**  
  `<los objetos>`  
  `#0` *(Fin de la sección de objetos)*

**#ROOMS**  
  `<las habitaciones>`  
  `#0` *(Fin de la sección de habitaciones)*

**#RESETS**  
  `<los resets>`  
  `S` *(Fin de la sección de resets)*

**#SET**  
  `<los set>`  
  `#0` *(Fin de la sección de set)*


**#SHOPS**  
  `<las tiendas>`  
  `0` *(Fin de la sección de tiendas)*

**#SPECIALS**  
  `<procedimientos especiales>`  
  `S` *(Fin de la sección de especiales)*

**#MOBPROGS**  
  `<los mobprogs>`  
  `#0` *(Fin de la sección de mobprogs)*

**#OBJPROGS**  
  `<los objprogs>`  
  `#0` *(Fin de la sección de objprogs)*

**#ROOMPROGS**  
  `<los roomprogs>`  
  `#0` *(Fin de la sección de roomprogs)*

**#$** *(Fin del archivo de área)*

---

**#AREA**  
  `nombre.are~`  
  `Nombre del Área~`  
  `{Nivel mínimo Nivel Máximo} Creador Nombre del Área~`  
  `XY000 XY099`  
  `región~`

### Definiciones:

1. **Nombre.are**: Es el nombre del fichero del área. Ej: `locura.are`
2. **Nombre del área**: Locura
3. **Nivel mínimo/máximo y nombre del área**: Es el nivel mínimo y máximo recomendado para los jugadores. También lleva el nombre del área. Esta línea es la que sale en el comando área.
4. **Vnum inicial, Vnum final**: Son los números virtuales asignados a las rooms del área, si no se han asignado números pondréis esto: `XY001 XY002`, así luego se sustituyen por los números adecuados.
5. **región**: Es la región a la que pertenece el área.

---


**#MOBILES**

```
#<vnum>
<nombres identificativos>~
 
<descripcion corta>~
<descripccion larga>.
~
<descripcion al mirar>.
~
<raza>~
<act> <afect> <alineamiento> <grupo>
<nivel> <+ hitroll> <dados hp>  <dados mana> <danyo> <tipo de danyo>
<armadura penetrar> <armadura golpes> <armadura cortes> <armadura magia>
<ofensivo> <inmunidad> <resistencias> <vulnerabilidades>
<posicion principal> <posicion despues de luchar> <sexo> <tesoro>
<forma> <partes> <tamanyo> <material>
```

### Definiciones:

1. **Vnum**: Este número define el mob y lo identifica.
2. **Nombres identificativos**: Son las palabras que identifican a un mob, los nombres por los que respondería al mirarlo, atacarlo...
3. **Descripción corta**: La descripción corta es la que se utiliza para las acciones del mob, es decir si un mob nos está pegando veríamos "el porrazo de `<descripcion corta>` GOLPEA a Fray."
4. **Descripción larga**: La descripción larga es la que vemos al entrar en la habitación.
5. **Descripción al mirar**: Es la descripción que se ve si se mira al mob.
6. **Raza**: Pues eso, la raza del mob. Se ha de tener en cuenta que cada raza tiene sus características: inmunidades, vulnerabilidades, etc.
7. **Act**: Cómo actúa un mob.
8. **Afect**: Spells por los que está afectado el mob.
9. **Alineamiento**: Número de -1000 a 1000. Procurad que el align sea realista, es decir, ni todos los buenos son 1000 ni todos los malos son -1000. En los mobs con niveles bajos no tiene demasiado sentido poner align extremos.
10. **Grupo**: El grupo es un número tal que: los dos/tres primeros números son los identificativos de vuestra zona (si vuestra zona va del 1200 al 1300 será 12.., si vuestra zona va del 12000 al 12100 los números serán 121..) y los últimos cualquieras: 01, 02, 03, ... de manera que si Midgaard tuviese grupos (Midgaard va del 3000 al 3300) los grupos serían 3001, 3002... Si no se quieren agrupar a los mobiles se llena el campo del grupo con un 0. Los mobs agrupados se ayudan entre ellos.
11. **Nivel**: El nivel del mob. A partir de este número vienen determinadas las demás características. Tales como los hit points, etc.
12. **+ Hitroll**: Es un número que se suma directamente al hitroll que se da a un mob por su nivel.
13. **Dados hp/dados mana/daño**: Consultar las tablas para colocar los números adecuados. Los números han de ser de la forma XdX+X donde las tres X son números, no necesariamente iguales.
14. **Tipo de daño**: Es el mensaje de daño que recibes del mob, cada tipo de daño afecta a una armadura diferente.
15. **Armaduras**: Armaduras de protección del mob, van en función de su nivel, atención con la armadura contra magia que se ha de calcular con la fórmula.
16. **Ofensivo**: Las acciones ofensivas que puede realizar el mob (atención: algunos mobs por raza ya tienen algunos of., no olvidarlos).
17. **Inmunidades/Resistencias/Vulnerabilidades**: Las Imm/Res/Vul de los mobs, recordad que estos campos van sujetos a la raza que tenéis.
18. **Posiciones**: Las posiciones aceptadas son: stand, rest, sleep.
19. **Sexo**: El sexo del mob, los sexos son: male, female y either, este último carga al mob con un sexo aleatorio cada vez.
20. **Tesoro**: Las monedas que lleva encima el mob.
21. **Forma/partes**: También vienen definidas por la raza.
22. **Tamaño**: Tamaño del mob.
23. **Material**: El material del mob.

### Secciones:


6. **Raza**

   | Raza            | Act | Aff | Of  | Imm     | Res | Vul | Forma  | Partes           |
   |-----------------|-----|-----|-----|---------|-----|-----|--------|------------------|
   | vampiro         | -   | TZ  | FH  | -       | -   | S   | AGV    | ACDEFHJKP        |
   | elefantino      | -   | -   | DEO | -       | EI  | -   | AGV    | ABCDEFHJKUV      |
   | felino          | -   | Z   | FH  | -       | -   | -   | AGV    | ACDEFHJKQUV      |
   | ciempies        | -   | Z   | -   | -       | FI  | E   | ABGO   | ACK              |
   | perro           | -   | -   | H   | -       | -   | -   | AGV    | ACDEFHJKUV       |
   | zombie          | -   | -   | -   | ILMNPQR | ES  | GHJKO | EJMc  | ABCGHK           |
   | dragon          | -   | JT  | -   | -       | EH  | FI   | AHZ    | ACDEFGHIJKPQUVX  |
   | enano           | -   | J   | -   | -       | LQ  | R    | AHMV   | ABCDEFGHIJK      |
   | elfo            | -   | J   | -   | -       | B   | Z    | AHMV   | ABCDEFGHIJK      |
   | fido            | -   | -   | FR  | -       | -   | C    | ABMV   | ACDEFHJKQV       |
   | zorro           | -   | Z   | FH  | -       | -   | -    | AGV    | ACDEFHJKQV       |
   | gigante         | -   | -   | -   | -       | HI  | JP   | AHMV   | ABCDEFGHIJK      |
   | goblin          | -   | J   | -   | -       | Q   | C    | AHMV   | ABCDEFGHIJK      |
   | hobbit          | -   | -   | -   | -       | C   | -    | AHMV   | ABCDEFGHIJK      |
   | hobgoblin       | -   | J   | -   | -       | LQ  | -    | AHMV   | ABCDEFGHIJKY     |
   | humano          | -   | -   | -   | -       | -   | -    | AHMV   | ABCDEFGHIJK      |
   | kobold          | -   | J   | -   | -       | L   | C    | ABHMV  | ABCDEFGHIJKQ     |
   | lagarto         | -   | -   | -   | -       | L   | I    | AGXc   | ACDEFHQV         |
   | modron          | -   | J   | QR  | BMNPQ   | HIK | -    | H      | ABCGHJK          |
   | orco            | -   | J   | -   | -       | Q   | S    | AHMV   | ABCDEFGHIJK      |
   | cerdo           | -   | -   | -   | -       | -   | -    | AGV    | ACDEFHJK         |
   | conejo          | -   | -   | FH  | -       | -   | -    | AGV    | ACDEFHJK         |
   | monstruo escuela| U   | -   | -   | -       | -   | C    | ABC    | AMVABCDEFHJKQU   |
   | serpiente       | -   | -   | -   | -       | L   | I    | AGXYc  | ADEFKLQVX        |
   | pajarito        | -   | T   | FH  | -       | -   | -    | AGW    | ACDEFHKP         |
   | troll           | -   | FJc | D   | -       | BE  | HK   | ABHMV  | ABCDEFGHIJKUV    |
   | gallina acuatica| -   | Tb  | -   | -       | R   | -    | AGW    | ACDEFHKP         |
   | lobo            | -   | Z   | FH  | -       | -   | -    | AGV    | ACDEFJQV         |
   | wyvern          | -   | DFT | CFH | L       | -   | S    | ABGZ   | ACDEFHJKQVX      |
   | ave             | -   | -   | -   | -       | -   | -    | -      | -                |
   | rata            | -   | -   | -   | -       | -   | -    | -      | -                |
   | mamifero        | -   | -   | -   | -       | -   | -    | -      | -                |
   | ciervo          | -   | -   | -   | -       | -   | -    | -      | -                |
   | arpia           | -   | -   | -   | -       | -   | -    | -      | -                |
   | ent             | -   | -   | -   | -       | -   | -    | -      | -                |
   | gargola         | -   | -   | -   | -       | -   | -    | -      | -                |

 
7. **Act**


| Flag | Descripción                         | Flag | Descripción                         |
|------|-------------------------------------|------|-------------------------------------|
| 0    | Si se deja el campo en blanco.      | M    | Herrero                             |
| A    | NPC (siempre debe estar presente)   | N    | No-Quest (no es objetivo de quest)  |
| B    | Centinela (no se mueve)             | O    | no-muerto (drains)                  |
| C    | coge lo del suelo                   | P    | Tesorero clanes                     |
| F    | agresivo                            | Q    | clérigo                             |
| G    | no sale del área                    | R    | mago                                |
| H    | huye cuando está herido             | S    | ladrón                              |
| I    | mascota                             | T    | guerrero                            |
| J    | entrena                             | U    | noaliniamiento                      |
| K    | practicas                           | V    | nopurge (no se le puede purgar)     |
| W    | no sale al exterior                 | Y    | no sale al interior                 |
| a    | sanador                             | b    | hace gain                           |
| c    | update (se resetea con gente en zona)| d    | cambia dinero                       |
| f    | Boss (es un boss)    				   | g    | Muerte especial (sin mensaje)	      |
| h    | No puedes perfeccionarte (no permite mejorar skills)   |      |  									         |

Notas:
- *El flag `nopurge` solo se ha de poner a mobs que sean tenderos. Ningún mob que no sea fijo (tenderos, sanador, etc.) no ha de tenerlo.*
- **El flag `update` es para que se reseteen aunque haya alguien en la zona.**
- ***Flag `No quest` evita que sea objetivo del probador.***
- ****Flag `BOSS` el mob es un boss y tiene estas propiedaes: No le afectan los golpes mortales, no le afecta la prisión de los magos.
- *****Flag `No puedes perfeccionarte` si luchas contra un NPC con este flag no podrás perfeccionar skills o spells
- ******Flag 'Muerte especial' el NPC al morir no genera mensaje de `ESTA MUERTO !!`



8. **Afect**

| Flag | Efecto          | Flag | Efecto          | Flag | Efecto          |
|------|-----------------|------|-----------------|------|-----------------|
| 0    | Campo en blanco | I    | faerie fire     | R    | sleep           |
| A    | blind           | J    | infravision     | S    | charm           |
| B    | invisible       | K    | curse           | T    | flying          |
| C    | detect evil     | M    | veneno          | U    | pass door       |
| D    | detect invis    | N    | protect evil    | V    | haste           |
| E    | detect magic    | O    | protect good    | W    | calm            |
| F    | detect hide     | P    | sneaking        | X    | plague          |
| G    | detect good     | Q    | hiding          | Y    | weaken          |
| H    | sanctuary       | Z    | dark vision     | L    | Escudo de fe    |
|      |                 | aa   | berserk         | cc   | regeneration    |
|      |                 | bb   | raices          | dd   | slow            |
|      |                 | ee   | Hinchado        |      |                 |

Notas:
- *Los spells 'sanctuary' y 'detect invis' muchas veces están sobreutilizados. Se puede utilizar pero sin abusar. También se pueden substituir con otros semejantes dependiendo del mob del que estemos hablando. Ej: un demonio, con alineamiento negativo, puede estar afectado por protection good...*


12. **Hitroll**

| Nivel | Nivel Mínimo | Nivel Máximo |
|-------|--------------|--------------|
| 1     | 20           | 0 - 5        |
| 21    | 40           | 7 - 20       |
| 41    | 60           | 25 - 45      |
| 61    | 80           | 50 - 75      |
| 81    | 100          | 80 - 100     |
| 101   | 120          | 115 - 150    |


13.1. **Dados hp y daño**

| **Lv** | Hit Points  | AC  | Damage   | **Lv** | Hit Points  | AC  | Damage   | **Lv** | Hit Points  | AC  | Damage   |
|--------|-------------|-----|----------|--------|-------------|-----|----------|--------|-------------|-----|----------|
| **1**   | 2d6+10      | 9   | 1d4+0    | **41**  | 25d10+2000  | -14 | 4d8+14   | **81**  | 115d10+12000| -51 | 10d14+22 |
| **2**   | 2d7+21      | 8   | 1d5+0    | **42**  | 25d10+2250  | -14 | 3d12+14  | **82**  | 115d10+12125| -52 | 10d14+23 |
| **3**   | 2d6+35      | 7   | 1d6+0    | **43**  | 25d10+2500  | -15 | 3d12+15  | **83**  | 115d10+12250| -53 | 10d14+24 |
| **4**   | 2d7+46      | 6   | 1d5+1    | **44**  | 25d10+2750  | -15 | 8d4+15   | **84**  | 115d10+12375| -54 | 10d14+25 |
| **5**   | 2d6+60      | 5   | 1d6+1    | **45**  | 25d10+3000  | -15 | 8d4+16   | **85**  | 115d10+12500| -55 | 10d14+26 |
| **6**   | 2d7+71      | 4   | 1d7+1    | **46**  | 25d10+3250  | -16 | 8d6+16   | **86**  | 115d10+12625| -56 | 10d14+27 |
| **7**   | 2d6+85      | 4   | 1d8+1    | **47**  | 25d10+3500  | -17 | 6d6+17   | **87**  | 115d10+12750| -57 | 10d14+28 |
| **8**   | 2d7+96      | 3   | 1d7+2    | **48**  | 25d10+3750  | -18 | 6d6+18   | **88**  | 115d10+12875| -58 | 10d14+29 |
| **9**   | 2d6+110     | 2   | 1d8+2    | **49**  | 50d10+4000  | -19 | 4d10+18  | **89**  | 115d10+13000| -59 | 10d14+30 |
| **10**  | 2d7+121     | 1   | 2d4+2    | **50**  | 50d10+4500  | -20 | 5d8+19   | **90**  | 115d12+13000| -60 | 10d14+31 |
| **11**  | 2d8+134     | 1   | 1d10+2   | **51**  | 50d10+5000  | -21 | 5d8+20   | **91**  | 115d12+13125| -61 | 12d13+20 |
| **12**  | 2d10+150    | 0   | 1d10+3   | **52**  | 50d10+5500  | -22 | 5d7+20   | **92**  | 115d12+13250| -61 | 12d13+21 |
| **13**  | 2d10+170    | -1  | 2d5+3    | **53**  | 50d10+6000  | -23 | 6d7+21   | **93**  | 115d12+13375| -62 | 12d13+22 |
| **14**  | 2d10+190    | -1  | 1d12+3   | **54**  | 50d10+6500  | -24 | 7d6+22   | **94**  | 115d12+13500| -62 | 12d13+23 |
| **15**  | 3d9+208     | -2  | 2d6+3    | **55**  | 50d10+7000  | -25 | 10d4+23  | **95**  | 115d12+13625| -63 | 12d13+24 |
| **16**  | 3d9+233     | -2  | 2d6+4    | **56**  | 50d10+7500  | -26 | 10d4+24  | **96**  | 115d12+13750| -63 | 12d13+25 |
| **17**  | 3d9+258     | -3  | 3d4+4    | **57**  | 50d10+8000  | -27 | 6d8+24   | **97**  | 115d12+13875| -64 | 12d13+26 |
| **18**  | 3d9+283     | -3  | 2d7+4    | **58**  | 50d10+8500  | -28 | 5d10+25  | **98**  | 115d12+14000| -64 | 12d13+27 |
| **19**  | 3d9+308     | -4  | 2d7+5    | **59**  | 50d10+9000  | -29 | 8d6+26   | **99**  | 115d15+14000| -65 | 12d13+28 |
| **20**  | 3d9+333     | -4  | 2d8+5    | **60**  | 50d10+9500  | -30 | 8d6+28   | **100** | 115d15+14125| -65 | 12d13+29 |
| **21**  | 4d10+360    | -5  | 4d4+5    | **61**  | 100d10+9500 | -31 | 9d7+22   | **101** | 115d15+14250| -66 | 12d13+30 |
| **22**  | 5d10+400    | -5  | 4d4+6    | **62**  | 100d10+9750 | -32 | 9d7+24   | **102** | 115d15+14375| -66 | 12d13+31 |
| **23**  | 5d10+450    | -6  | 3d6+6    | **63**  | 100d10+10000| -33 | 9d7+26   | **103** | 115d15+14500| -67 | 15d12+22 |
| **24**  | 5d10+500    | -6  | 2d10+6   | **64**  | 100d10+10125| -34 | 9d7+28   | **104** | 115d15+14625| -67 | 15d12+23 |
| **25**  | 5d10+550    | -7  | 2d10+7   | **65**  | 100d10+10250| -35 | 7d10+27  | **105** | 115d15+14750| -68 | 15d12+24 |
| **26**  | 5d10+600    | -7  | 3d7+7    | **66**  | 100d10+10375| -36 | 7d10+29  | **106** | 115d15+15000| -68 | 15d12+25 |
| **27**  | 5d10+650    | -8  | 5d4+7    | **67**  | 100d10+10500| -37 | 7d10+31  | **107** | 115d15+15250| -69 | 15d12+26 |
| **28**  | 6d12+703    | -8  | 2d12+8   | **68**  | 100d10+10625| -38 | 7d10+33  | **108** | 115d15+15500| -69 | 15d12+27 |
| **29**  | 6d12+778    | -9  | 2d12+8   | **69**  | 100d10+10750| -39 | 7d10+35  | **109** | 115d15+15750| -70 | 15d12+28 |
| **30**  | 6d12+853    | -9  | 4d6+8    | **70**  | 100d10+10875| -40 | 8d13+19  | **110** | 115d15+16000| -70 | 15d12+29 |
| **31**  | 6d12+928    | -10 | 4d6+9    | **71**  | 100d10+11000| -41 | 8d13+21  | **111** | 115d20+16000| -71 | 15d12+30 |
| **32**  | 10d10+1000  | -10 | 6d4+9    | **72**  | 110d10+11000| -42 | 8d13+23  | **112** | 115d20+16125| -71 | 15d12+31 |
| **33**  | 10d10+1100  | -11 | 6d4+10   | **73**  | 110d10+11125| -43 | 8d13+25  | **113** | 115d20+16250| -72 | 15d12+32 |
| **34**  | 10d10+1200  | -11 | 4d7+10   | **74**  | 110d10+11250| -44 | 8d13+27  | **114** | 115d20+16375| -72 | 20d10+25 |
| **35**  | 10d10+1300  | -11 | 4d7+11   | **75**  | 110d10+11375| -45 | 8d13+29  | **115** | 115d20+16500| -73 | 20d10+27 |
| **36**  | 10d10+1400  | -12 | 3d10+11  | **76**  | 110d10+11500| -46 | 8d13+31  | **116** | 115d20+16625| -73 | 20d10+29 |
| **37**  | 10d10+1500  | -12 | 3d10+12  | **77**  | 110d10+11625| -47 | 8d13+33  | **117** | 115d20+16750| -74 | 20d10+31 |
| **38**  | 10d10+1600  | -13 | 5d6+12   | **78**  | 110d10+11750| -48 | 8d13+35  | **118** | 115d20+16875| -74 | 20d10+33 |
| **39**  | 15d10+1700  | -13 | 5d6+13   | **79**  | 110d10+11875| -49 | 8d13+37  | **119** | 115d20+17000| -75 | 20d10+35 |
| **40**  | 15d10+1850  | -13 | 4d8+13   | **80**  | 110d10+12000| -50 | 10d14+20 | **120** | 120d24+17000| -75 | 20d10+37 |


- **Importancia de los Márgenes**
   - Es importante no salirse demasiado de los márgenes, una pequeña variación tiene consecuencias enormes.

- **Cálculo de Armadura Contra Magia**
   - La armadura contra magia se calcula con la siguiente fórmula:
     ```
     ((ac - 10) / n) + 10
     ```
     Donde `n` es 3 para los clérigos, 2 para magos y 4 para los demás mobiles (tienen el act de ladrón, clérigo, etc.).

- **Ajustes Específicos por Clase**
   - Para los **ladrones**, se pone hp, ac y daño un nivel por debajo (para un ladrón de nivel 15 se ponen el daño, ac y hp de nivel 14).
   - Para los **magos**, se pone hp y ac un nivel por debajo, y daño tres niveles por debajo.
   - Para los **clérigos**, se pone daño dos niveles por debajo.
   - Para los **guerreros**, se pone hp un nivel por encima.


13.2. **Mana**

Para calcular los dados de mana de un mob, sigue la regla siguiente:

- **Fórmula Básica**: 

`1d10 + 100 * Nivel`

Por ejemplo, un mob de nivel 45 tendría: `1d10 + 4500`.

- **Ajuste para Mobs Mágicos**:

Si se trata de un mob dirigido a la magia (act_mage, o act_cleric o que vayan a tener algún especial como los dragones o los adeptos), se les puede poner algo más de magia:

`1d10 + 4750`


20. **Tesoro**

Para colocar el número de monedas a los mobs se puede calcular aproximadamente 100 * nivel. Tener en cuenta que:

- Mobs no inteligentes, como perros y gatos, no deben llevar tantas monedas.
- Es preferible poner menos monedas si es posible, para mantener un balance adecuado.

**Fórmula de Tesoro**:

`100 * Nivel`


### h) Tipos de Daño

El tipo de daño para un mob especifica el tipo de daño que hace, es decir, el mensaje que nos aparecerá cuando ese mob nos pegue sin arma (si lleva arma, el mensaje de daño que veremos será el del arma). Cada tipo de daño afecta a una armadura diferente. Los ataques mágicos además tienen una clasificación que se relaciona con las inmunidades/resistencias/vulnerabilidades.

**Ejemplos**:
- Digestión es tipo de daño 'acid' -> existe una imm/vul/res al tipo de daño acid.
- Un jabalí al que le ponemos tipo de daño 'charge' y va desarmado, entonces veremos el mensaje: "El charge del jabalí te desmonta."
- Guardia que hace 'punch' y va armado con una espada que hace 'slash'. Cuando vaya armado veremos que el mensaje será "El slash del guardia te *** MUTILA ***", si lo desarmamos, veremos "el punch del guardia te mauls".

Solo se ha de informar de UN tipo de daño para un mob determinado. Se pondrá el tipo en inglés, el que sale en la primera columna.

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


### i) Ofensivo

| Flag | Descripción     | Flag | Descripción   | Flag | Descripción    |
|------|-----------------|------|---------------|------|----------------|
| A    | area attack     | H    | fast   		| O    | crush*         |
| B    | backstab        | I    | kick   		| P    | assist all     |
| C    | bash            | J    | kick dirt   	| Q    | assist align   |
| D    | berserk         | K    | parry   		| R    | assist race    |
| E    | disarm          | L    | rescue*   	| S    | assist players |
| F    | dodge           | M    | tail*   		| T    | assist guard   |
| G    | fade*           | N    | trip   		| U    | assist vnum    |
| V    | Fase            | W    | Contrataque  	| Y    | No Scan*       |
| Z    | Dummy**         | a    | No_parry**   	|      |    			|

**Notas**:
- *Fade, rescue, tail, crush*: habilidades especiales que solo algunos mobs pueden tener.
- **Dummy**: si tiene este off, el mob no dará golpes, solo los recibirá, pero puede parar, bloquear, esquivar, fase.
- **No_parry**: si tiene este off, el mob no podrá parar, bloquear, esquivar, fase... pero sí dará golpes.
- **No Scan**: no aparece a hacer scan/otear para mobprog invisibles, no se les puede atacar. El mob es totalmente invisible y no se verá aunque tenga nombre o descripciones.

### j) Inmunidades, resistencias, vulnerabilidades

| Flag    | Descripción         | Flag    | Descripción    | Flag    | Descripción    |
|---------|---------------------|---------|----------------|---------|----------------|
| A       | Summon              | I       | Cold           | Q       | Disease        |
| B       | Charm               | J       | Lightning      | R       | Drowning       |
| C       | Magic               | K       | Acid           | S       | Light          |
| D       | Weapons             | L       | Poison         | T       | Sound          |
| E       | Bash                | M       | Negative       | X       | Wood           |
| F       | Pierce              | N       | Holy           | Y       | Silver         |
| G       | Slash               | O       | Energy         | Z       | Iron           |
| H       | Fire                | P       | Mental         |         |                |


**Nota**:
- Si se deja el campo en blanco (`0`), no es necesario poner algún flag.

### k) Tamaño

El tamaño de los mobiles tiene efectos en el juego, por lo que debe escogerse con cuidado.

| Tamaño   | Descripción                                      |
|----------|--------------------------------------------------|
| **tiny** | Pequeños pájaros y móviles más pequeños.         |
| **small**| Pájaros medianos (patos y similares) hasta hobbits y kenders. |
| **medium**| Elfos, Enanos y Humanos.                        |
| **large** | Ogros, Gnolls y otros humanoides grandes.       |
| **huge**  | Gigantes, Dragones pequeños y Wyverns.          |
| **gigante**| Criaturas gigantescas: Dragones, Titanes y los gigantes más grandes. |


### l) Tablas de Partes y Forma

**Nota**: El MUD asigna por defecto las partes y la forma del mob según la raza, junto con las inmunidades, resistencias, vulnerabilidades y capacidades ofensivas. Aunque no está completamente implementado lo referido a las partes y formas del cuerpo, se incluye esta información debido a su demanda por parte de los jugadores.

#### l.1) Cuerpo, forma: (primer campo `<forma>`)

Si se deja el campo en blanco (`0`), no es necesario poner ningún flag.

| Flag | Descripción                                                                 |
|------|-----------------------------------------------------------------------------|
| A    | comestible: el cuerpo se puede comer.                                       |
| B    | envenenado: el cuerpo está envenenado al comerse (también debe ser comestible). |
| C    | mágico: el cuerpo produce efectos mágicos al comerse.                      |
| D    | desaparece: el cuerpo desaparece cuando muere el mob.                      |
| E    | otros: el cuerpo no es de carne (se complementa con el material).          |

| Flag | Forma                                | Flag | Forma                                | Flag | Forma                               |
|------|--------------------------------------|------|--------------------------------------|------|-------------------------------------|
| G    | animal: el mob es un animal.         | M    | biped: el mob es bípedo (como los humanos). | S    | blob: el mob es un blob (puede ser una nube si se usa con mist). |
| H    | sentient: el mob tiene capacidad para razonar. | N    | centaur: el mob es un centauro.     | V    | mammal: el mob es un mamífero.      |
| I    | undead: el mob es un no-muerto.      | O    | insect: el mob es un insecto.        | W    | bird: el mob es un pájaro.          |
| J    | construct: el mob está construido mágicamente (golems, etc). | P    | spider: el mob es un arácnido.      | X    | reptile: el mob es un reptil (debe ser cold-blooded). |
| K    | mist: el mob es una mezcla de materiales. | Q    | crustacean: el mob es un crustáceo. | Y    | snake: el mob es una serpiente (debe ser un reptil). |
| L    | intangible: el mob es inmaterial (fantasmas). | R    | worm: el mob es un gusano.          | Z    | dragon: el mob es un dragón.        |
| aa   | amphibian: el mob es un anfibio (debe poder nadar). | bb   | fish: el mob es un pez (debe poder nadar). | cc   | cold blood: el mob es cold-blooded, no se puede detectar con infravisión. |


#### l.2) Partes (segundo campo `<partes>`)

Si se deja el campo en blanco (`0`), no es necesario poner ningún flag.

| Flag | Descripción                         | Flag | Descripción                      | Flag | Descripción                      |
|------|-------------------------------------|------|----------------------------------|------|----------------------------------|
| A    | cabeza: el mob tiene cabeza.        | H    | pies: el mob tiene pies.         | Q    | colas: el mob tiene cola.       |
| B    | brazos: el mob tiene brazos.        | I    | dedos: el mob tiene dedos.       | U    | garras: el mob tiene garras.    |
| C    | piernas: el mob tiene piernas.      | J    | orejas: el mob tiene orejas.     | V    | fangs: el mob tiene colmillos (perros, lobos, etc.). |
| D    | corazón: el mob tiene corazón.      | K    | ojos: el mob tiene ojos.         | W    | cuerno: el mob tiene cuerno(s). |
| E    | sesos: el mob tiene sesos.          | L    | lengua: el mob tiene lengua.     | X    | escamas: el mob está cubierto de escamas. |
| F    | tripas: el mob tiene intestinos.    | M    | párpados: el mob tiene párpados. | Y    | colmillos: el mob tiene colmillos (elefantes, etc.). |
| G    | manos: el mob tiene manos.          | N    | tentáculos: el mob tiene tentáculos. | O  | aletas: el mob tiene aletas.    |
| P    | alas: el mob tiene alas.            |      |                                  |      |                                  |

**Nota Final**:
- Al finalizar la sección de **#MOBILES** se debe colocar un `#0`.

---


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
| **portals**             | cargas         | exit flags       | gate flags    | rnum           | 0            |
| **furniture**           | gente          | total wei        | fur flags     | heal bon       | mana bon     |
| **emblema**             | id_clan *      | rango            |               |                |              |

* idclan: 2 = concilio 6= paladine 8 = petria

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


---

### #ROOMS

# Guía de Creación de Habitaciones en Áreas MUD

## Introducción

Un área en un MUD (Multi-User Dungeon) es una colección de habitaciones interconectadas que forman un entorno coherente. Las habitaciones son los bloques fundamentales de construcción de cualquier área y definen los espacios donde los jugadores pueden moverse, interactuar y explorar.

Este documento explica cómo crear y configurar habitaciones para un área MUD, incluyendo su formato, propiedades y conexiones.

---

## Estructura de un Archivo de Área

Un archivo de área (`.are`) contiene múltiples secciones, siendo `#ROOMS` una de las más importantes. Esta sección define todas las habitaciones del área y sus características.

La sección comienza con `#ROOMS` y termina con `#0` seguido de `#$`.

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
---
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

---

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


### #SET

# Guía de Creación de Sets de Equipo

---

## Estructura Básica

La sección `#SET` define un conjunto de piezas de equipo que comparten un mismo identificador.
Cada set se compone de uno o varios *tiers* que otorgan efectos especiales al equipar un número
determinado de objetos. El formato general es el siguiente:

```
#SET
#<id>
<nombre del set>~
T <piezas>
A <loc> <mod>
F <tipo> <loc> <mod> <bits>
End
#0
```

Explicación de los campos:

- `<id>`: identificador numérico (vnum) único.
- `<nombre del set>`: nombre que se mostrará al jugador, debe finalizar con `~`.
- `T`: inicia un tier e indica cuántas piezas hay que equipar.
- `A`: aplica un modificador de atributo (Se forman igual que en los objs).
- `F`: añade inmunidades, resistencias u otros flags (Se forman igual que en los objs).
- `End`: cierra la definición del set.

---

## Tiers de Bonificación

Un set puede tener varios tiers. Cada bloque `T` agrupa los efectos que se
activarán al alcanzar el número de piezas indicado. Dentro de un mismo tier
pueden aparecer múltiples líneas `A` y `F`. Los tiers se evalúan de forma
independiente y su orden no importa.

---

## Asociación con Objetos

Para que un objeto forme parte de un set debe incluir la línea `S <id>` en su
definición dentro de la sección `#OBJECTS`. El identificador debe existir en la
lista de sets de la misma área. Si no se encuentra un set con ese id, la
asociación se ignora durante la carga.

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

## Visualización en Juego

Los efectos activos de un set aparecen en los comandos `score` y `affects`.
Al identificar o analizar un objeto se muestra el nombre del set seguido de sus
bonificaciones, por ejemplo:

```
Set: Set de ejemplo

Bonificación (2 piezas):
  Fuerza +5
Bonificación (3 piezas):
  Inmunidad a fuego
```


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



****************************** "proto.are" ************************************


# proto.are

## Estructura del Archivo

### 1. Área
```
#AREA
<cabecera de área>
```

---

### 2. Móviles
```
#MOBILES
<los móviles>
#0
```

---

### 3. Objetos
```
#OBJECTS
<los objetos>
#0
```

---

### 4. Habitaciones y Salidas
```
#ROOMS
<las habitaciones y las salidas>
#0
```

---

### 5. Resets
```
#RESETS
<la sección de resets>
S
```

---

### 6. Tiendas
```
#SHOPS
<tiendas>
0
```

---

### 7. Actuaciones Especiales
```
#SPECIALS
<actuaciones especiales>
S
```

### #SET

Permite definir bonificaciones por conjuntos de objetos. Se escribe tras
`#SPECIALS` y finaliza con `#0`.

```
#SET
#<id>
NombreSet~
T <piezas>
A <loc> <mod>
F <tipo> <loc> <mod> <bits>
End
#0
```

El identificador puede coincidir con cualquier vnum positivo disponible.
Los objetos se vinculan al set con la línea `S <id>` en su definición.

---

### 8. Programas de Móviles (MobProgs)
```
#MOBPROGS
<los mobprogs>
#0
```

---

### 9. Programas de Objetos (ObjProgs)
```
#OBJPROGS
<los objprogs>
#0
```

---

### 10. Programas de Habitaciones (RoomProgs)
```
#ROOMPROGS
<los roomprogs>
#0
```

---

### 11. Fin del Archivo
```
#$
<para acabar el documento>
```



