// =======================================
// NPCs DE MÍRRAFEN
// SISTEMA BASE DE PERSONAJES
// =======================================

let habitantesNPC = [];
let cargandoNPCs = null;

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
// POSICIONES DE LOS NPC
// =======================================

const NPC_POSICIONES = {

    guardian: {
        lugar: "Castillo",
        x: 50,
        y: 80
    },

    reina: {
        lugar: "Aldea",
        x: 50,
        y: 60
    },

    mercader: {
        lugar: "Mercado",
        x: 50,
        y: 60
    }

};

// =======================================
// CARGAR HABITANTES
// =======================================

async function cargarNPCs(){

    if(cargandoNPCs){
        return cargandoNPCs;
    }

    cargandoNPCs = fetch(
        "kingdom/npc/habitantes.json"
    )
    .then(respuesta => {

        if(!respuesta.ok){

            throw new Error(
                "No se pudo cargar habitantes.json"
            );

        }

        return respuesta.json();

    })
    .then(datos => {

        habitantesNPC = datos;

        console.log(
            "🧙 NPCs DEL REINO CARGADOS:",
            habitantesNPC
        );

        return habitantesNPC;

    })
    .catch(error => {

        console.error(
            "❌ Error cargando NPCs:",
            error
        );

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

    const npcs = habitantesNPC.filter(
        npc => npc.lugar === lugar
    );

    console.log(
        `🧙 NPCs en ${lugar}:`,
        npcs
    );

    npcs.forEach(npc => {

        crearNPC(npc);

    });

}

// =======================================
// CREAR NPC
// =======================================

function crearNPC(npc){

    const posicion =
        NPC_POSICIONES[npc.id];

    if(!posicion){

        console.warn(
            `⚠️ No hay posición definida para ${npc.id}`
        );

        return;

    }

    const contenedor =
        document.querySelector(".castillo");

    if(!contenedor){

        console.warn(
            "⚠️ No se encontró el contenedor de la localización"
        );

        return;

    }

    const npcElement =
        document.createElement("div");

    npcElement.className = "npc";

    npcElement.dataset.npcId =
        npc.id;

    npcElement.style.left =
        `${posicion.x}%`;

    npcElement.style.top =
        `${posicion.y}%`;

    npcElement.title =
        npc.nombre;

    // ===================================
    // SPRITE
    // ===================================

    const sprite =
        document.createElement("div");

    sprite.className =
        "npc-sprite";

    sprite.style.backgroundImage =
        `url("${npc.sprite}")`;

    // ===================================
    // NOMBRE
    // ===================================

    const nombre =
        document.createElement("div");

    nombre.className =
        "npc-nombre";

    nombre.textContent =
        npc.nombre;

    // ===================================
    // DESCRIPCIÓN
    // ===================================

    const descripcion =
        document.createElement("div");

    descripcion.className =
        "npc-descripcion";

    descripcion.textContent =
        npc.descripcion;

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

        interactuarNPC(npc.id);

    };

    contenedor.appendChild(
        npcElement
    );

    console.log(
        "🧙 NPC creado:",
        npc.nombre
    );

}

// =======================================
// INTERACTUAR CON NPC
// =======================================

function interactuarNPC(id){

    const npc =
        obtenerNPC(id);

    if(!npc){
        return;
    }

    console.log(
        "🧙 Interactuando con:",
        npc.nombre
    );

    // Por ahora utilizamos el sistema
    // de mensajes existente.

    mostrarMensaje(
        npc.nombre,
        npc.descripcion
    );

}

// =======================================
// ANIMACIÓN DE MOVIMIENTO
// =======================================

function npcCaminar(elemento){

    elemento.classList.add(
        "npc-caminando"
    );

}

// =======================================
// LIMPIAR NPCs
// =======================================

function limpiarNPCs(){

    document
        .querySelectorAll(".npc")
        .forEach(npc => npc.remove());

}