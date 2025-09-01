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
