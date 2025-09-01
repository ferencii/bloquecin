### #MOBILES

# Guía de Creación de Mobiles (MOBs)

## Formato Básico


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
- ****Flag `BOSS` el mob es un boss y tiene estas propiedaes:
		No le afectan los golpes mortales.
		No le afecta la prisión de los magos.
		Pueden usar el spell cancelacion desde mobprog.
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
