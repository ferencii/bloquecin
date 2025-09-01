
### **spec_troll_member**
| Aspecto            | Detalle                                                                                   |
|--------------------|-------------------------------------------------------------------------------------------|
| **Descripción**    | Troll que ataca a Ogros en la misma habitación si no está combatiendo.                     |
| **Condiciones**    | - No estar dormido.<br>- No estar afectado por calma o encantamiento.<br>- No estar ya combatiendo.|
| **Acción**         | - Selecciona un Ogro como objetivo.<br>- Lanza mensajes de provocación.<br>- Ataca con golpes básicos.|
| **Funcionalidad**  | Representa la rivalidad Troll-Ogro en el mundo.                                            |

---

### **spec_ogre_member**
| Aspecto            | Detalle                                                                                   |
|--------------------|-------------------------------------------------------------------------------------------|
| **Descripción**    | Ogro que ataca a Trolls en la misma habitación si no está combatiendo.                     |
| **Condiciones**    | - Igual que spec_troll_member.                                                             |
| **Acción**         | - Selecciona un Troll como objetivo.<br>- Lanza mensajes de provocación.<br>- Ataca con golpes básicos.|
| **Funcionalidad**  | Refleja el conflicto entre Trolls y Ogros.                                                 |

---

### **spec_patrolman**
| Aspecto            | Detalle                                                                                   |
|--------------------|-------------------------------------------------------------------------------------------|
| **Descripción**    | Patrullero que interrumpe peleas en su habitación y llama la atención con un silbato.      |
| **Condiciones**    | - Debe haber una pelea en la habitación.<br>- No estar dormido o afectado por calma/encantamiento.|
| **Acción**         | - Sopla un silbato si tiene uno equipado.<br>- Llama la atención en la zona.<br>- Ataca al luchador más fuerte.|
| **Funcionalidad**  | Actúa como un mediador para mantener el orden.                                             |

---

### **spec_nasty**
| Aspecto            | Detalle                                                                                   |
|--------------------|-------------------------------------------------------------------------------------------|
| **Descripción**    | NPC que ataca a jugadores más fuertes, roba su oro y huye del combate.                     |
| **Condiciones**    | - Debe haber un jugador de nivel más alto en la habitación.<br>- No estar ya combatiendo.  |
| **Acción**         | - Ataca al jugador.<br>- Roba el 10% del oro del objetivo.<br>- Intenta huir.              |
| **Funcionalidad**  | Representa un NPC agresivo y oportunista.                                                  |

---

### **spec_breath_any**
| Aspecto            | Detalle                                                                                   |
|--------------------|-------------------------------------------------------------------------------------------|
| **Descripción**    | Dragón que usa un aliento elemental aleatorio durante el combate.                         |
| **Condiciones**    | - Debe estar en combate.                                                                  |
| **Acción**         | - Lanza uno de los siguientes alientos: fuego, hielo, ácido, gas o rayo.                  |
| **Funcionalidad**  | Simula la diversidad de ataques elementales de un dragón.                                 |

---

### **spec_cast_adepto**
| Aspecto            | Detalle                                                                                   |
|--------------------|-------------------------------------------------------------------------------------------|
| **Descripción**    | NPC que lanza hechizos beneficiosos a jugadores de nivel 20 o menor en la misma habitación.|
| **Condiciones**    | - Jugador debe estar visible y cumplir con el límite de nivel.                            |
| **Acción**         | - Lanza uno de los siguientes hechizos:<br>• Protección.<br>• Bendecir.<br>• Curar leve.<br>• Refrescar.<br>• Curar veneno.|
| **Funcionalidad**  | Ayuda a jugadores novatos con efectos positivos.                                          |

---

### **spec_cast_clerigo**
| Aspecto            | Detalle                                                                                   |
|--------------------|-------------------------------------------------------------------------------------------|
| **Descripción**    | Clérigo que lanza hechizos ofensivos a sus enemigos durante el combate.                   |
| **Condiciones**    | - Debe estar en combate.                                                                  |
| **Acción**         | - Lanza uno de los siguientes hechizos:<br>• Deslumbrar.<br>• Causar daño serio.<br>• Terremoto.<br>• Maldecir.|
| **Funcionalidad**  | Representa a un NPC Clérigo hostil en batalla.                                            |

---

### **spec_cast_mago**
| Aspecto            | Detalle                                                                                   |
|--------------------|-------------------------------------------------------------------------------------------|
| **Descripción**    | Mago que lanza hechizos ofensivos durante el combate.                                     |
| **Condiciones**    | - Igual que spec_cast_clerigo.                                                            |
| **Acción**         | - Lanza uno de los siguientes hechizos:<br>• Meteorito.<br>• Chupar energía.<br>• Golpe ácido.<br>• Teleportar.|
| **Funcionalidad**  | Actúa como un mago enemigo en el juego.                                                   |

---

### **spec_fido**
| Aspecto            | Detalle                                                                                   |
|--------------------|-------------------------------------------------------------------------------------------|
| **Descripción**    | NPC que devora cadáveres de NPCs en su habitación.                                        |
| **Condiciones**    | - Debe haber un cadáver de NPC en la habitación.                                          |
| **Acción**         | - Consume el cadáver.<br>- Deja caer objetos contenidos en el cadáver.                    |
| **Funcionalidad**  | Limpia la habitación de restos, simulando un carroñero.                                   |

---

### **spec_guard**
| Aspecto            | Detalle                                                                                       |
|--------------------|-----------------------------------------------------------------------------------------------|
| **Descripción**    | Guardia que ataca automáticamente a jugadores marcados como asesinos o ladrones, o defiende inocentes.|
| **Condiciones**    | - Debe estar despierto.<br>- No estar ya en combate.                                           |
| **Acción**         | - Si encuentra un asesino o ladrón, lo ataca tras anunciarlo.<br>- Si ve un inocente en peligro, lo defiende atacando al más malvado.|
| **Funcionalidad**  | Representa un guardia que protege la justicia y el orden.                                     |

---

### **spec_janitor**
| Aspecto            | Detalle                                                                                       |
|--------------------|-----------------------------------------------------------------------------------------------|
| **Descripción**    | NPC que limpia habitaciones recogiendo objetos basura o de poco valor.                        |
| **Condiciones**    | - Debe estar despierto.<br>- Solo recoge objetos de tipo basura, contenedores de bebida, o con costo bajo.|
| **Acción**         | - Recoge los objetos y los guarda en su inventario.                                           |
| **Funcionalidad**  | Limpia áreas para mantenerlas ordenadas.                                                      |

---

### **spec_alcalde**
| Aspecto            | Detalle                                                                                       |
|--------------------|-----------------------------------------------------------------------------------------------|
| **Descripción**    | NPC que sigue una rutina diaria predefinida con interacciones sociales.                       |
| **Condiciones**    | - Realiza acciones según la hora del día.<br>- Sigue un camino predefinido por el mundo.       |
| **Acción**         | - Abre o cierra puertas.<br>- Habla con mensajes específicos.<br>- Se mueve siguiendo rutas establecidas.|
| **Funcionalidad**  | Agrega ambientación y vida al mundo como un personaje activo y visible.                       |

---

### **spec_veneno**
| Aspecto            | Detalle                                                                                       |
|--------------------|-----------------------------------------------------------------------------------------------|
| **Descripción**    | NPC que muerde a sus enemigos durante el combate y aplica el efecto de veneno.                |
| **Condiciones**    | - Debe estar en combate.<br>- Tiene una probabilidad de éxito basada en su nivel.             |
| **Acción**         | - Muerde al enemigo y lanza el hechizo de veneno.                                             |
| **Funcionalidad**  | Representa un NPC con habilidades tóxicas que afectan al oponente con veneno.                 |

---

### **spec_ladron**
| Aspecto            | Detalle                                                                                       |
|--------------------|-----------------------------------------------------------------------------------------------|
| **Descripción**    | NPC ladrón que roba oro y plata de jugadores desprevenidos.                                   |
| **Condiciones**    | - Debe estar en posición de pie.<br>- No roba a inmortales ni NPCs.<br>- Solo roba si no es detectado.|
| **Acción**         | - Roba un porcentaje del oro y la plata del jugador.<br>- Si es descubierto, se detiene.      |
| **Funcionalidad**  | Representa un ladrón oportunista que busca objetivos fáciles.                                 |

---

### **spec_cast_runk**
| Aspecto            | Detalle                                                                                       |
|--------------------|-----------------------------------------------------------------------------------------------|
| **Descripción**    | NPC que lanza poderosos hechizos oscuros durante el combate.                                  |
| **Condiciones**    | - Debe estar en combate.<br>- Los hechizos dependen de su nivel (mínimo nivel 7).             |
| **Acción**         | - Lanza hechizos como Rayo Negro, Bola Negra, Sombras Asesinas, o Tentáculos del Averno.      |
| **Funcionalidad**  | Representa un hechicero oscuro con habilidades mágicas avanzadas.                            |

---

### **spec_cast_oteren**
| Aspecto            | Detalle                                                                                       |
|--------------------|-----------------------------------------------------------------------------------------------|
| **Descripción**    | NPC especializado en artes marciales, utiliza diferentes tipos de patadas según su nivel.     |
| **Condiciones**    | - Debe estar en combate.<br>- Los ataques dependen de su nivel (mínimo nivel 1).              |
| **Acción**         | - Ejecuta ataques como Patada Frontal, Lateral, Giratoria, Doble o Aérea según su nivel.      |
| **Funcionalidad**  | Representa un maestro en artes marciales con habilidades físicas impresionantes.              |

---

### **spec_guardia_malo**
| Aspecto            | Detalle                                                                                       |
|--------------------|-----------------------------------------------------------------------------------------------|
| **Descripción**    | Guardia corrupto que favorece a ladrones y asesinos, pero ataca a jugadores buenos.           |
| **Condiciones**    | - Ataca automáticamente por la noche.<br>- No ataca a ladrones ni asesinos, pero interactúa con ellos.|
| **Acción**         | - Saluda a los criminales.<br>- Ataca a los jugadores con alineación buena.                   |
| **Funcionalidad**  | Representa un guardia hostil y moralmente ambiguo.                                            |

---

### **spec_guardia_bueno**
| Aspecto            | Detalle                                                                                       |
|--------------------|-----------------------------------------------------------------------------------------------|
| **Descripción**    | Guardia heroico que protege a los inocentes y ataca a los criminales automáticamente.         |
| **Condiciones**    | - Actúa de noche y ataca a personajes malvados si los detecta.<br>- Siempre ataca asesinos y ladrones visibles.|
| **Acción**         | - Da el alto por la noche.<br>- Ataca a los criminales y jugadores con alineación malvada.    |
| **Funcionalidad**  | Representa un guardia defensor de la justicia y el orden.                                     |

---

### **spec_teleporter**
| Aspecto            | Detalle                                                                                       |
|--------------------|-----------------------------------------------------------------------------------------------|
| **Descripción**    | NPC que se teletransporta aleatoriamente cada cierto tiempo.                                  |
| **Condiciones**    | - No debe estar en combate.<br>- Se teletransporta cada 3 ticks de tiempo.                    |
| **Acción**         | - Cambia de sala al azar en el área.<br>- Interactúa mínimamente con el entorno.              |
| **Funcionalidad**  | Agrega dinamismo a las áreas al moverse entre habitaciones.                                   |

---

### **spec_barco**
| Aspecto            | Detalle                                                                                       |
|--------------------|-----------------------------------------------------------------------------------------------|
| **Descripción**    | NPC con rutas predefinidas que simula ser un barco viajando entre áreas.                      |
| **Condiciones**    | - Sigue rutas basadas en la hora del día.<br>- Se detiene en puertos específicos.             |
| **Acción**         | - Cambia de sala siguiendo una ruta.<br>- Notifica a los jugadores sobre su posición.         |
| **Funcionalidad**  | Representa un medio de transporte marítimo en el juego.                                       |

---

### **spec_esfinge**
| Aspecto            | Detalle                                                                                       |
|--------------------|-----------------------------------------------------------------------------------------------|
| **Descripción**    | NPC que interactúa con jugadores dependiendo de su clan y decide si los deja pasar a una ciudad.|
| **Condiciones**    | - Interactúa solo con jugadores visibles y pertenecientes a un clan.                          |
| **Acción**         | - Realiza acciones aleatorias como mover jugadores al interior de la ciudad.<br>- Lanza mensajes o efectos.|
| **Funcionalidad**  | Representa un guardián místico con poderes especiales.                                        |

---

### **spec_guardia_clan**
| Aspecto            | Detalle                                                                                       |
|--------------------|-----------------------------------------------------------------------------------------------|
| **Descripción**    | NPC que protege un clan y ataca a intrusos o notifica a los miembros si hay una invasión.     |
| **Condiciones**    | - Verifica si el jugador pertenece al clan.<br>- Comprueba la existencia de un estandarte de clan.|
| **Acción**         | - Ataca a los intrusos.<br>- Notifica a los miembros del clan si son invadidos.               |
| **Funcionalidad**  | Representa un guardián dedicado a proteger los intereses del clan.                            |

---

### **spec_entrenador_especial**
| Aspecto            | Detalle                                                                                           |
|--------------------|---------------------------------------------------------------------------------------------------|
| **Descripción**    | Entrenador que inicia una cadena de misiones basada en el nivel, clase y experiencia previa del jugador. |
| **Condiciones**    | - Solo interactúa con personajes visibles.<br>- La misión se desarrolla según el progreso de `expquest`. |
| **Acción**         | - Proporciona información, da oro o instrucciones según el estado de la misión.<br>- Enseña habilidades únicas según la raza del jugador. |
| **Funcionalidad**  | Introduce nuevas habilidades por raza y fomenta exploración a través de cadenas de quests complejas. |

---

### **spec_quest_especial_1 y spec_quest_especial_2**
| Aspecto            | Detalle                                                                                           |
|--------------------|---------------------------------------------------------------------------------------------------|
| **Descripción**    | NPCs que forman parte de un quest narrativo con recompensas en objetos y oro.                     |
| **Condiciones**    | - Depende del progreso de `expquest` del jugador.<br>- La misión se completa mediante múltiples interacciones. |
| **Acción**         | - Proporcionan oro para completar el quest.<br>- Orientan al jugador hacia su próximo objetivo.   |
| **Funcionalidad**  | Actúan como guías en quests de múltiples etapas y recompensan al jugador con objetos clave.       |

---

### **spec_secretario**
| Aspecto            | Detalle                                                                                           |
|--------------------|---------------------------------------------------------------------------------------------------|
| **Descripción**    | NPC que controla el acceso al señor de un reino basándose en el ranking de PK del jugador.         |
| **Condiciones**    | - Evalúa a los jugadores según su ranking PK (`zonas_pkranking`).<br>- Responde de manera diferente según el mes del juego. |
| **Acción**         | - Ofrece acceso inmediato a jugadores de alto rango o los hace esperar.<br>- Puede invocar a la guardia en casos extremos. |
| **Funcionalidad**  | Regula el acceso a áreas clave del juego según el nivel de prestigio o notoriedad del jugador.    |

---

### **spec_mordisco**
| Aspecto            | Detalle                                                                                           |
|--------------------|---------------------------------------------------------------------------------------------------|
| **Descripción**    | NPC extremadamente agresivo que ataca a cualquier jugador no inmortal en su habitación.           |
| **Condiciones**    | - Siempre está despierto.<br>- Ataca automáticamente si el nivel del jugador es inferior a 112.    |
| **Acción**         | - Realiza ataques de mordisco y asesinato (`do_bite`, `do_murder`).                               |
| **Funcionalidad**  | Introduce un desafío para jugadores en áreas peligrosas, simulando depredadores agresivos.        |

---

### **spec_entrenador_samurai**
| Aspecto            | Detalle                                                                                           |
|--------------------|---------------------------------------------------------------------------------------------------|
| **Descripción**    | Entrenador especializado en samuráis que ofrece misiones y enseña habilidades avanzadas.          |
| **Condiciones**    | - Solo interactúa con la clase "Samurai".<br>- Evalúa la alineación para determinar las misiones asignadas. |
| **Acción**         | - Proporciona lore sobre técnicas de combate samurái.<br>- Recompensa con habilidades como "Yagyu Shinkage" y "Nikkaku Rato". |
| **Funcionalidad**  | Amplía la narrativa y habilidades exclusivas de la clase Samurai mediante un sistema de misiones. |

---

### **spec_samu_experto_1 y spec_samu_experto_2**
| Aspecto            | Detalle                                                                                           |
|--------------------|---------------------------------------------------------------------------------------------------|
| **Descripción**    | NPCs que asignan misiones relacionadas con la obtención de objetos clave y enfrentamientos con enemigos poderosos. |
| **Condiciones**    | - Interacción limitada a samuráis con un progreso específico en `expquest`.<br>- Generan enemigos únicos para cada misión. |
| **Acción**         | - Invocan enemigos guardianes con objetos clave.<br>- Actualizan el progreso del quest al completar tareas. |
| **Funcionalidad**  | Introducen combates desafiantes y recompensas significativas para los jugadores avanzados.        |

---
