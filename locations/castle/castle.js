// =======================================
// CASTILLO DE MÍRRAFEN
// =======================================

// =======================================
// DIÁLOGOS DE LOS GUARDIAS
// =======================================

let dialogosGuardias = [];
let cargandoDialogosGuardias = null;

// =======================================
// CARGAR DIÁLOGOS
// =======================================

async function cargarDialogosGuardias(){

    if(cargandoDialogosGuardias){
        return cargandoDialogosGuardias;
    }

    cargandoDialogosGuardias = fetch(
        "locations/castle/data/castle.json"
    )
    .then(respuesta => {

        if(!respuesta.ok){
            throw new Error(
                "No se pudo cargar castle.json"
            );
        }

        return respuesta.json();

    })
    .then(datos => {

        dialogosGuardias = datos;

        console.log(
            "🛡️ DIÁLOGOS DE GUARDIAS CARGADOS:",
            dialogosGuardias
        );

        return dialogosGuardias;

    })
    .catch(error => {

        console.error(
            "❌ Error cargando diálogos de guardias:",
            error
        );

        return [];

    });

    return cargandoDialogosGuardias;
}

// =======================================
// ZONAS INTERACTIVAS DEL CASTILLO
// Coordenadas sobre 1599 × 1200
// =======================================

const CASTLE_WIDTH = 1599;
const CASTLE_HEIGHT = 1200;

const zonasCastillo = [

    // ===================================
    // 🚪 SALIDA
    // ===================================

    {
        id: "salida",
        nombre: "Salir",
        x: 600,
        y: 1000,
        width: 400,
        height: 200
    },

    // ===================================
    // 🛡️ ARMERÍA
    // ===================================

    {
        id: "armeria",
        nombre: "Armería",
        x: 250,
        y: 300,
        width: 250,
        height: 200
    },

    // ===================================
    // 📜 MISIONES
    // ===================================

    {
        id: "misiones",
        nombre: "Misiones",
        x: 1020,
        y: 300,
        width: 250,
        height: 200
    },

    // ===================================
    // 👑 TRONO
    // ===================================

    {
        id: "trono",
        nombre: "Trono",
        x: 650,
        y: 500,
        width: 300,
        height: 200
    },

    // ===================================
    // 🛡️ GUARDIA 1
    // ===================================

    {
        id: "guardia1",
        nombre: "Guardia",
        x: 300,
        y: 600,
        width: 180,
        height: 100
    },

    // ===================================
    // 🛡️ GUARDIA 2
    // ===================================

    {
        id: "guardia2",
        nombre: "Guardia",
        x: 250,
        y: 750,
        width: 180,
        height: 180
    },

    // ===================================
    // 🛡️ GUARDIA 3
    // ===================================

    {
        id: "guardia3",
        nombre: "Guardia",
        x: 1060,
        y: 600,
        width: 180,
        height: 100
    },

    // ===================================
    // 🛡️ GUARDIA 4
    // ===================================

    {
        id: "guardia4",
        nombre: "Guardia",
        x: 1150,
        y: 750,
        width: 180,
        height: 180
    }

];

// =======================================
// MOSTRAR CASTILLO
// =======================================

function mostrarCastillo(){

    const jugador = cargarJugador();

    if(!jugador){
        return;
    }

    const momento = obtenerMomentoDelDia();

    const content =
        document.getElementById("content");

    if(!content){
        return;
    }

    content.innerHTML = `

        <section class="castillo momento-${momento}">

            <img
                class="castle-background"
                src="assets/images/backgrounds/castle/castle_${momento}.jpg"
                alt="Castillo de Mírrafen"
            >

            ${zonasCastillo.map(zona => `

                <div
                    class="zona-castillo ${zona.id}"
                    style="
                        left:${(zona.x / CASTLE_WIDTH) * 100}%;
                        top:${(zona.y / CASTLE_HEIGHT) * 100}%;
                        width:${(zona.width / CASTLE_WIDTH) * 100}%;
                        height:${(zona.height / CASTLE_HEIGHT) * 100}%;
                    "
                    onclick="interactuarZonaCastillo('${zona.id}')"
                >

                    <span class="name">
                        ${zona.nombre}
                    </span>

                </div>

            `).join("")}

        </section>

    `;

    // ===================================
    // CARGAR DIÁLOGOS
    // ===================================

    if(dialogosGuardias.length === 0){
        cargarDialogosGuardias();
    }

    // ===================================
    // MÚSICA
    // ===================================

    reproducirMusica(
        "assets/sounds/ambient_castle.mp3",
        0.35
    );

}

// =======================================
// INTERACTUAR CON ZONA
// =======================================

function interactuarZonaCastillo(id){

    console.log(
        "🏰 Zona del castillo:",
        id
    );

    // ===================================
    // 🚪 SALIDA
    // ===================================

    if(id === "salida"){

        reproducirSFX("exit.mp3");

        irA(
            "castle",
            "map",
            mostrarMapaReino
        );

        return;
    }

    // =======================================
    // 🛡️ ARMERÍA — EDITAR PERFIL
    // =======================================

    if(id === "armeria"){

        reproducirSFX("open_place.wav");

        const perfilActivo =
            localStorage.getItem("perfilActivo");

        editarPerfil(perfilActivo);

        return;
    }

    // ===================================
    // 📜 MISIONES
    // ===================================

    if(id === "misiones"){

        reproducirSFX("open_place.wav");

        cargarMisionesCastillo();

        return;
    }

    // ===================================
    // 👑 TRONO
    // ===================================

    if(id === "trono"){

        reproducirSFX("open_place.wav");

        mostrarTrono();

        return;
    }

    // ===================================
    // 🛡️ GUARDIA 1
    // ===================================

    if(id === "guardia1"){

        reproducirSonidoCastillo(
            "assets/sounds/man_talk.mp3"
        );

        hablarGuardias1();

        return;
    }

    // ===================================
    // 🛡️ GUARDIA 2
    // ===================================

    if(id === "guardia2"){

        reproducirSonidoCastillo(
            "assets/sounds/man_talk.mp3"
        );

        hablarGuardias2();

        return;
    }

    // ===================================
    // 🛡️ GUARDIA 3
    // ===================================

    if(id === "guardia3"){

        reproducirSonidoCastillo(
            "assets/sounds/man_talk.mp3"
        );

        hablarGuardias3();

        return;
    }

    // ===================================
    // 🛡️ GUARDIA 4
    // ===================================

    if(id === "guardia4"){

        reproducirSonidoCastillo(
            "assets/sounds/man_talk.mp3"
        );

        hablarGuardias4();

        return;
    }

}

// =======================================
// REPRODUCIR SONIDO DEL CASTILLO
// =======================================

function reproducirSonidoCastillo(ruta){

    const audio = new Audio(ruta);

    audio.volume = 0.8;

    audio.play().catch(error => {

        console.warn(
            "No se pudo reproducir el sonido:",
            error
        );

    });

    setTimeout(() => {

        audio.pause();
        audio.currentTime = 0;

    }, 5000);

}

// =======================================
// HABLAR CON GUARDIAS
// =======================================

function hablarGuardias1(){

    mostrarDialogoGuardia("guardias1");

}

function hablarGuardias2(){

    mostrarDialogoGuardia("guardias2");

}

function hablarGuardias3(){

    mostrarDialogoGuardia("guardias3");

}

function hablarGuardias4(){

    mostrarDialogoGuardia("guardias4");

}

// =======================================
// MOSTRAR DIÁLOGO DE GUARDIA
// =======================================

async function mostrarDialogoGuardia(guardia){

    // ===================================
    // ASEGURAR CARGA
    // ===================================

    if(dialogosGuardias.length === 0){

        await cargarDialogosGuardias();

    }

    // ===================================
    // FILTRAR DIÁLOGOS
    // ===================================

    const disponibles =
        dialogosGuardias.filter(
            dialogo =>
                dialogo.guardia === guardia
        );

    // ===================================
    // SIN DIÁLOGOS
    // ===================================

    if(disponibles.length === 0){

        mostrarMensaje(
            "🛡️ Guardia del Castillo",
            "No tengo nada que decirte, ciudadano..."
        );

        return;
    }

    // ===================================
    // ELEGIR DIÁLOGO ALEATORIO
    // ===================================

    const dialogo =
        disponibles[
            Math.floor(
                Math.random() * disponibles.length
            )
        ];

    // ===================================
    // MOSTRAR
    // ===================================

    mostrarMensaje(
        "🛡️ Guardia del Castillo",
        dialogo.texto
    );

}

// =======================================
// PERFIL DEL JUGADOR — TRONO
// =======================================

function mostrarPerfilJugador(){

    const jugador = cargarJugador();

    if(!jugador){
        return;
    }

    // ===================================
    // AVATAR
    // ===================================

    const avatar =
        jugador.avatar ||
        jugador.foto ||
        "kingdom/portal/avatars/explorer.jpg";

    document.getElementById(
        "playerAvatar"
    ).src = avatar;

    // ===================================
    // NOMBRE
    // ===================================

    document.getElementById(
        "playerName"
    ).textContent =
        jugador.nombre || "Aventurero";

    // ===================================
    // NIVEL
    // ===================================

    document.getElementById(
        "playerLevel"
    ).textContent =
        jugador.nivel || 1;

    // ===================================
    // RANGO
    // ===================================

    document.getElementById(
        "playerRank"
    ).textContent =
        jugador.rango || "Aprendiz";

    // ===================================
    // OQUOS
    // ===================================

    document.getElementById(
        "playerCoins"
    ).textContent =
        jugador.oquos || 0;

    // ===================================
    // XP
    // ===================================

    const xpActual =
        jugador.xp || 0;

    const xpNecesaria =
        jugador.xpNecesaria || 100;

    document.getElementById(
        "playerXP"
    ).textContent =
        xpActual;

    document.getElementById(
        "playerNextXP"
    ).textContent =
        xpNecesaria;

    // ===================================
    // BARRA XP
    // ===================================

    const porcentajeXP =
        Math.min(
            (xpActual / xpNecesaria) * 100,
            100
        );

    document.getElementById(
        "xpFill"
    ).style.width =
        `${porcentajeXP}%`;

    // ===================================
    // MOSTRAR PANEL
    // ===================================

    document.getElementById(
        "panelJugador"
    ).style.display = "flex";

}

// =======================================
// CERRAR PERFIL
// =======================================

function cerrarPanelJugador(){

    document.getElementById(
        "panelJugador"
    ).style.display = "none";

}
