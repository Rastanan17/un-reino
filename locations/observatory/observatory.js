// =======================================
// OBSERVATORIO DE MÍRRAFEN
// =======================================

// =======================================
// SONIDOS DEL OBSERVATORIO
// =======================================

let musicaObservatorio = null;

// =======================================
// MOSTRAR OBSERVATORIO
// =======================================

function mostrarObservatorio(){

    console.log("🔭 Entrando al Observatorio");

    const content =
        document.getElementById("content");

    if(!content) return;

    content.innerHTML = `

        <div class="observatorio">

            <!-- ==========================
                 🌌 FONDO
            =========================== -->

            <img
                id="observatoryBackground"
                class="observatory-background"
                src="assets/images/backgrounds/observatory/observatory_day.jpg"
                alt="Observatorio de Mírrafen"
            >

            <!-- ==========================
                 🌌 VENTANA — MISIONES
            =========================== -->

            <div
                class="zona-observatorio misiones"
                onclick="abrirMisionesObservatorio()"
            >
                ✨ Misiones
            </div>

            <!-- ==========================
                 🗺️ MAPA ESTELAR — PLANETAS
            =========================== -->

            <div
                class="zona-observatorio planetas"
                onclick="verPlanetas()"
            >
                🪐 Planetas
            </div>

            <!-- ==========================
                 🔭 TELESCOPIO — CONSTELACIONES
            =========================== -->

            <div
                class="zona-observatorio constelaciones"
                onclick="verConstelaciones()"
            >
                ⭐ Constelaciones
            </div>

            <!-- ==========================
                 🏮 LÁMPARA — SALIDA
            =========================== -->

            <div
                class="zona-observatorio salida"
                onclick="salirDelObservatorio()"
            >
                ← Salir
            </div>

        </div>

    `;

    iniciarSonidoObservatorio();

}

// =======================================
// ✨ ABRIR MISIONES
// =======================================

function abrirMisionesObservatorio(){

    reproducirSFX(
        "open_place.wav"
    );

    filtroZona =
        "Observatorio";

    detenerSonidoObservatorio();

    mostrarMisiones();

}

// =======================================
// 🪐 VER PLANETAS
// =======================================

function verPlanetas(){

    console.log(
        "🪐 Abriendo mapa estelar"
    );

    reproducirSFX(
        "open_place.wav"
    );

    // -----------------------------------
    // TEMPORAL
    // -----------------------------------
    // Más adelante acá abriremos
    // el sistema de planetas.

    mostrarMensaje(
        "🪐 Mapa estelar",
        "Muy pronto podrás explorar los planetas de Mírrafen."
    );

}

// =======================================
// ⭐ VER CONSTELACIONES
// =======================================

function verConstelaciones(){

    console.log(
        "⭐ Observando constelaciones"
    );

    reproducirSFX(
        "open_place.wav"
    );

    // -----------------------------------
    // TEMPORAL
    // -----------------------------------
    // Más adelante acá abriremos
    // el sistema de constelaciones.

    mostrarMensaje(
        "🔭 Telescopio",
        "Muy pronto podrás observar las constelaciones de Mírrafen."
    );

}

// =======================================
// 🚪 SALIR DEL OBSERVATORIO
// =======================================

function salirDelObservatorio(){

    reproducirSFX(
        "exit.mp3"
    );

    detenerSonidoObservatorio();

    irA(
        "observatory",
        "map",
        mostrarMapaReino
    );

}

// =======================================
// 🔊 INICIAR SONIDO
// =======================================

function iniciarSonidoObservatorio(){

    console.log(
        "🔭 Iniciando sonidos del Observatorio"
    );

    detenerSonidoObservatorio();

    // -----------------------------------
    // AMBIENTE
    // -----------------------------------

    musicaObservatorio =
        new Audio(
            "assets/sounds/ambient_observatory.mp3"
        );

    musicaObservatorio.loop = true;

    musicaObservatorio.volume = 0.35;

    musicaObservatorio
        .play()
        .catch(error => {

            console.log(
                "🔭 El sonido del Observatorio necesita interacción:",
                error
            );

        });

}

// =======================================
// 🔇 DETENER SONIDO
// =======================================

function detenerSonidoObservatorio(){

    if(musicaObservatorio){

        musicaObservatorio.pause();

        musicaObservatorio.currentTime = 0;

        musicaObservatorio = null;

    }

}