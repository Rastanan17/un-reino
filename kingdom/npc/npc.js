// =======================================
// NPCs DE MÍRRAFEN
// SISTEMA BASE DE PERSONAJES
// =======================================
let habitantesNPC = [];
let cargandoNPCs = null;
// =======================================
// DIÁLOGOS DE NPC
// =======================================
let datosNPC = {};
let cargandoDatosNPC = {};
// =======================================
// CONFIGURACIÓN DEL SPRITESHEET
// =======================================
const NPC_SPRITE_ANCHO = 667;
const NPC_SPRITE_ALTO = 374;
const NPC_COLUMNAS = 7;
const NPC_FILAS = 3;
// Cada celda del spritesheet
const NPC_FRAME_ANCHO = NPC_SPRITE_ANCHO / NPC_COLUMNAS;
const NPC_FRAME_ALTO = NPC_SPRITE_ALTO / NPC_FILAS;
// =======================================
// ANIMACIÓN Y MOVIMIENTO DE NPC
// =======================================
// Fila 1 del spritesheet:
// 0 = adelante
// 1 = adelante
// 2 = derecha
// 3 = derecha
// 4 = izquierda
// 5 = izquierda
// 6 = atrás
const NPC_WALK_FRAMES_DERECHA = [2, 3];
const NPC_WALK_FRAMES_IZQUIERDA = [4, 5];
// Cuando el jugador hace click:
// mirar de frente
const NPC_DIALOGO_FRAMES = [0, 1];
// =======================================
// CONFIGURACIÓN DEL MOVIMIENTO
// =======================================
const NPC_VELOCIDAD = 0.5;
const NPC_INTERVALO_FRAME = 180;
// Límites de patrulla
const NPC_LIMITE_IZQUIERDA = 25;
const NPC_LIMITE_DERECHA = 75;
// =======================================
// POSICIONES DE LOS NPC
// =======================================
const NPC_POSICIONES = {
    guardian: {
        lugar: "Castillo",
        x: 50,
        y: 85
    },
    reina: {
        lugar: "Aldea",
        x: 50,
        y: 80
    },
    mercader: {
        lugar: "Mercado",
        x: 50,
        y: 60
    },
    susurrador: {
        lugar: "Granja",
        x: 50,
        y: 80
    },
    forjadora: {
        lugar: "Cavernas",
        x: 50,
        y: 80
    },
    narrador: {
        lugar: "Bosque",
        x: 50,
        y: 80
    },
    astral: {
        lugar: "Observatorio",
        x: 50,
        y: 80
    },
    sacerdotisa: {
        lugar: "Santuario",
        x: 50,
        y: 80
    }/*,
    bibliotecaria: {
        lugar: "Biblioteca",
        x: 50,
        y: 80
    },
    bardo: {
        lugar: "Puerto",
        x: 50,
        y: 80
    },
    explorador: {
        lugar: "Nieve",
        x: 50,
        y: 80
    },
    tabernero: {
        lugar: "Bar",
        x: 50,
        y: 80
    },
    artista: {
        lugar: "Academia",
        x: 50,
        y: 80
    },
    sabio: {
        lugar: "Museo",
        x: 50,
        y: 80
    },
    cocinero: {
        lugar: "Mascotas",
        x: 50,
        y: 80
    },
    comandante: {
        lugar: "Hielo",
        x: 50,
        y: 80
    }*/ 
};
const NPC_ANIMACIONES = {
    walk: [0, 1, 2, 3, 4, 5, 6],
    accion: [7, 8, 9, 10],
    unico: [11, 12, 13],
    idle: [14, 15, 16, 17],
    victoria: [18, 19, 20]
};
// =======================================
// CARGAR HABITANTES
// =======================================
async function cargarNPCs(){
    if(cargandoNPCs){
        return cargandoNPCs;
    }
    cargandoNPCs = fetch("kingdom/npc/habitantes.json").then(respuesta => {
        if(!respuesta.ok){
            throw new Error("No se pudo cargar habitantes.json");
        }
        return respuesta.json();
    }).then(datos => {
        habitantesNPC = datos;
        console.log("🧙 NPCs DEL REINO CARGADOS:", habitantesNPC);
        return habitantesNPC;
    }).catch(error => {
        console.error("❌ Error cargando NPCs:", error);
        return [];
    });
    return cargandoNPCs;
}
// =======================================
// OBTENER NPC POR ID
// =======================================
function obtenerNPC(id){
    return habitantesNPC.find(
        npc => npc.id === id
    );
}
// =======================================
// MOSTRAR NPCs EN UNA LOCALIZACIÓN
// =======================================
async function mostrarNPCsEnLugar(lugar){
    if(habitantesNPC.length === 0){
        await cargarNPCs();
    }
    const npcs = habitantesNPC.filter(npc => npc.lugar === lugar);
    console.log(`🧙 NPCs en ${lugar}:`, npcs);
    npcs.forEach(npc => {
        crearNPC(npc);
    });
}
function obtenerContenedorNPCLugar(lugar){
    const contenedores = {
        "Castillo": ".castillo",
        "Aldea": ".aldea",
        "Mercado": ".mercado",
        "Granja": ".granja",
        "Cavernas": ".cavernas",
        "Bosque": ".bosque",
        "Observatorio": ".observatorio",
        "Santuario": ".santuario"/*,
        "Biblioteca": ".biblioteca",
        "Puerto": ".puerto",
        "Nieve": ".nieve",
        "Bar": ".bar",
        "Academia": ".academia",
        "Museo": ".museo",
        "Mascotas": ".mascotas",
        "Hielo": ".hielo"*/
    };
    const selector = contenedores[lugar];
    if(!selector){
        console.warn(`⚠️ No hay contenedor definido para ${lugar}`);
        return null;
    }
    return document.querySelector(selector);
}
// =======================================
// CREAR NPC
// =======================================
function crearNPC(npc){
    const posicion = NPC_POSICIONES[npc.id];
    if(!posicion){
        console.warn(`⚠️ No hay posición definida para ${npc.id}`);
        return;
    }
    // ===================================
    // OBTENER CONTENEDOR SEGÚN LOCALIZACIÓN
    // ===================================
    const contenedor = obtenerContenedorNPCLugar(npc.lugar);
    if(!contenedor){
        console.warn(`⚠️ No se encontró el contenedor para ${npc.nombre}`);
        return;
    }
    // ===================================
    // CONTENEDOR DEL NPC
    // ===================================
    const npcElement = document.createElement("div");
    npcElement.className = "npc";
    npcElement.dataset.npcId = npc.id;
    npcElement.style.left = `${posicion.x}%`;
    npcElement.style.top = `${posicion.y}%`;
    npcElement.title = npc.nombre;
    // ===================================
    // SPRITE
    // ===================================
    const sprite = document.createElement("div");
    sprite.className = "npc-sprite";
    sprite.style.backgroundImage = `url("${npc.sprite}")`;
    // ===================================
    // NOMBRE
    // ===================================
    const nombre = document.createElement("div");
    nombre.className = "npc-nombre";
    nombre.textContent = npc.nombre;
    // ===================================
    // DESCRIPCIÓN
    // ===================================
    const descripcion = document.createElement("div");
    descripcion.className = "npc-descripcion";
    descripcion.textContent = npc.descripcion;
    // ===================================
    // ARMAR NPC
    // ===================================
    npcElement.appendChild(sprite);
    npcElement.appendChild(nombre);
    npcElement.appendChild(descripcion);
    // ===================================
    // INTERACCIÓN
    // ===================================
    npcElement.onclick = function(event){
        event.stopPropagation();
        // ==============================
        // DETENER NPC
        // ==============================
        if(npcElement._npcDetener){
            npcElement._npcDetener();
        }
        // ==============================
        // MIRAR AL JUGADOR
        // FRAMES 0 Y 1
        // ==============================
        mostrarFrameNPC(
            npcElement,
            NPC_DIALOGO_FRAMES[0]
        );
        setTimeout(() => {
            mostrarFrameNPC(npcElement, NPC_DIALOGO_FRAMES[1]);
        }, 300);
        // ==============================
        // MOSTRAR DIÁLOGO
        // ==============================
        interactuarNPC(npc.id);
        // ==============================
        // EJECUTAR ACCIÓN ALEATORIA
        // ==============================
        setTimeout(() => {
            ejecutarAnimacionNPC(npcElement);
        }, 2500);
    };
    // ===================================
    // AGREGAR NPC AL LUGAR CORRESPONDIENTE
    // ===================================
    contenedor.appendChild(npcElement);
    // ===================================
    // INICIAR MOVIMIENTO
    // ===================================
    iniciarMovimientoNPC(npcElement);
    console.log("🧙 NPC creado:", npc.nombre, "→", npc.lugar);
}
// =======================================
// INTERACTUAR CON NPC
// =======================================
async function interactuarNPC(id){
    const npc = obtenerNPC(id);
    if(!npc){
        return;
    }
    console.log("🧙 Interactuando con:", npc.nombre);
    // ===================================
    // CARGAR DATOS DEL NPC
    // ===================================
    const datos = await cargarDatosNPC(id);
    // ===================================
    // SI NO HAY DATOS
    // ===================================
    if(!datos){
        mostrarMensaje(npc.nombre, npc.descripcion);
        return;
    }
    // ===================================
    // SELECCIONAR CONTENIDO
    // ===================================
    const contenido = seleccionarDialogoNPC(datos);
    if(!contenido){
        mostrarMensaje(npc.nombre, npc.descripcion);
        return;
    }
    // ===================================
    // MOSTRAR
    // ===================================
    mostrarMensaje(npc.nombre, contenido);
}
// =======================================
// SELECCIONAR DIÁLOGO NPC
// SISTEMA DE PROBABILIDADES
// =======================================
// =======================================
// SELECCIONAR DIÁLOGO NPC
// SISTEMA GENÉRICO PARA TODOS LOS NPC
// =======================================
function seleccionarDialogoNPC(datos){
    const secciones = [];
    // ===================================
    // AGREGAR SECCIÓN CON PESO
    // ===================================
    function agregarSeccion(lista, peso){
        if(!Array.isArray(lista) || lista.length === 0){
            return;
        }
        for(let i = 0; i < peso; i++){
            secciones.push(lista);
        }
    }
    // ===================================
    // CONTENIDO GENERAL
    // ===================================
    agregarSeccion(datos.saludos, 4);
    agregarSeccion(datos.rumores, 3);
    agregarSeccion(datos.historia_personal, 1);
    // ===================================
    // DIÁLOGOS ESPECÍFICOS
    // ===================================
    agregarSeccion(datos.dialogos_guardia, 4);
    agregarSeccion(datos.consejos_del_centinela, 3);
    agregarSeccion(datos.dialogos_reina, 4);
    agregarSeccion(datos.consejos_de_la_realeza, 3);
    // ===================================
    // DESAFÍOS
    // ===================================
    agregarSeccion(datos.desafios_reales, 2);
    agregarSeccion(datos.desafios_combate, 1);
    agregarSeccion(datos.desafios_modales, 2);
    // ===================================
    // MISIONES DEL REINO
    // ===================================
    agregarSeccion(datos.misiones_reino, 2);
    // ===================================
    // EVENTOS ESPECIALES
    // ===================================
    agregarSeccion(datos.eventos_especiales, 1);
    // ===================================
    // DIÁLOGOS SEGÚN NIVEL
    // ===================================
    let perfilActivo = null;
    const perfilGuardado = localStorage.getItem("perfilActivo");
    if(perfilGuardado){
        try{perfilActivo = JSON.parse(perfilGuardado);
        }catch(error){ perfilActivo = {
                nombre: perfilGuardado
            };
        }
    }
    // ===================================
    // OBTENER NIVEL DEL JUGADOR
    // ===================================
    if(perfilActivo){
        const nivel = Number(perfilActivo.nivel) || 1;
        const dialogosNivel = datos.dialogos_por_nivel?.[nivel];
        if(Array.isArray(dialogosNivel) && dialogosNivel.length > 0){
            agregarSeccion(dialogosNivel, 2);
        }
    }
    // ===================================
    // SI NO HAY CONTENIDO
    // ===================================
    if(secciones.length === 0){
        return null;
    }
    // ===================================
    // ELEGIR SECCIÓN
    // ===================================
    const seccion = secciones[ Math.floor(Math.random() * secciones.length) ];
    if(!Array.isArray(seccion) || seccion.length === 0){
        return null;
    }
    // ===================================
    // ELEGIR ELEMENTO
    // ===================================
    const elegido = seccion[ Math.floor(Math.random() * seccion.length) ];
    // ===================================
    // TEXTO DIRECTO
    // ===================================
    if(typeof elegido === "string"){
        return elegido;
    }
    // ===================================
    // OBJETOS
    // ===================================
    return ( elegido.texto || elegido.mensaje || elegido.descripcion || elegido.titulo || null );
}
// =======================================
// CARGAR DATOS ESPECÍFICOS DEL NPC
// =======================================
async function cargarDatosNPC(id){
    if(cargandoDatosNPC[id]){
        return cargandoDatosNPC[id];
    }
    cargandoDatosNPC[id] = fetch(`kingdom/npc/data/${id}.json`).then(respuesta => {
        if(!respuesta.ok){
            throw new Error(`No se pudo cargar ${id}.json`);
        }
        return respuesta.json();
    }).then(datos => {
        datosNPC[id] = datos;
        console.log(`📜 Datos de NPC cargados: ${id}`, datos);
        return datos;
    }).catch(error => {
        console.error(`❌ Error cargando datos de ${id}:`, error);
        return null;
    });
    return cargandoDatosNPC[id];
}
// =======================================
// ANIMACIÓN Y MOVIMIENTO DE NPC
// =======================================
function iniciarMovimientoNPC(elemento){
    if(!elemento){
        return;
    }
    let posicionX = parseFloat(elemento.style.left);
    // 1 = derecha
    // -1 = izquierda
    let direccion = 1;
    let frameActual = 0;
    let detenido = false;
    // ===================================
    // ANIMACIÓN
    // ===================================
    function animar(){
        if(detenido){
            return;
        }
        // ==============================
        // MOVIMIENTO
        // ==============================
        posicionX += NPC_VELOCIDAD * direccion;
        elemento.style.left = `${posicionX}%`;
        // ==============================
        // LÍMITE DERECHO
        // ==============================
        if(posicionX >= NPC_LIMITE_DERECHA){
            posicionX = NPC_LIMITE_DERECHA;
            direccion = -1;
            frameActual = 0;
        }
        // ==============================
        // LÍMITE IZQUIERDO
        // ==============================
        if(posicionX <= NPC_LIMITE_IZQUIERDA){
            posicionX = NPC_LIMITE_IZQUIERDA;
            direccion = 1;
            frameActual = 0;
        }
        // ==============================
        // FRAMES DE CAMINATA
        // ==============================
        let frames;
        if(direccion === 1){
            // Caminando hacia la derecha
            frames = NPC_WALK_FRAMES_DERECHA;
        }else{
            // Caminando hacia la izquierda
            frames = NPC_WALK_FRAMES_IZQUIERDA;
        }
        const frame = frames[frameActual];
        mostrarFrameNPC(elemento, frame);
        frameActual = (frameActual + 1) % frames.length;
        setTimeout(animar, NPC_INTERVALO_FRAME);
    }
    // ===================================
    // DETENER NPC
    // ===================================
    elemento._npcDetener = function(){
        detenido = true;
    };
    // ===================================
    // CONTINUAR NPC
    // ===================================
    elemento._npcContinuar = function(){
        if(!detenido){
            return;
        }
        detenido = false;
        animar();
    };
    // ===================================
    // INICIAR
    // ===================================
    animar();
}
// =======================================
// EJECUTAR ANIMACIÓN DE ACCIÓN
// =======================================
function ejecutarAnimacionNPC(elemento){
    if(!elemento){
        return;
    }
    const tipos = [
        "accion",
        "unico",
        "idle",
        "victoria"
    ];
    // Elegir acción aleatoria
    const tipo = tipos[ Math.floor(Math.random() * tipos.length) ];
    const frames = NPC_ANIMACIONES[tipo];
    if(!frames || frames.length === 0){
        return;
    }
    console.log(`🎭 Animación NPC: ${tipo}`, frames);
    let indice = 0;
    function reproducirFrame(){
        if(indice >= frames.length){
            // ==========================
            // TERMINÓ LA ANIMACIÓN
            // ==========================
            console.log(`🎭 Animación terminada: ${tipo}`);
            if(elemento._npcContinuar){
                elemento._npcContinuar();
            }
            return;
        }
        mostrarFrameNPC(elemento, frames[indice]);
        indice++;
        setTimeout(reproducirFrame, NPC_INTERVALO_FRAME);
    }
    reproducirFrame();
}
// =======================================
// MOSTRAR FRAME DEL SPRITESHEET
// =======================================
function mostrarFrameNPC(elemento, frame){
    const sprite = elemento.querySelector(".npc-sprite");
    if(!sprite){
        return;
    }
    // ===================================
    // CALCULAR FILA Y COLUMNA
    // ===================================
    const columna = frame % NPC_COLUMNAS;
    const fila = Math.floor(frame / NPC_COLUMNAS);
    // ===================================
    // POSICIÓN DEL SPRITESHEET
    // ===================================
    sprite.style.backgroundPosition = `${columna * 16.6667}% ${fila * 50}%`;
}
// =======================================
// LIMPIAR NPCs
// =======================================
function limpiarNPCs(){
    document.querySelectorAll(".npc").forEach(npc => npc.remove());
}