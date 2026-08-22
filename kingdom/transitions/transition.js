// =======================================
// SISTEMA DE TRANSICIONES DEL REINO
// Un Reino en Mírrafen
// =======================================

let transicionActiva = false;

// =======================================
// VIDEOS DE TRANSICIÓN
// =======================================

const videosTransicion = {

    "map-castle": "assets/videos/map-castle.mp4",
    "castle-map": "assets/videos/castle-map.mp4",

    "map-market": "assets/videos/map-market.mp4",
    "market-map": "assets/videos/market-map.mp4",

    "map-village": "assets/videos/map-village.mp4",
    "village-map": "assets/videos/village-map.mp4",

    "map-farm": "assets/videos/map-farm.mp4",
    "farm-map": "assets/videos/farm-map.mp4",

    "map-caves": "assets/videos/map-caves.mp4",
    "caves-map": "assets/videos/caves-map.mp4",

    "map-forest": "assets/videos/map-forest.mp4",
    "forest-map": "assets/videos/forest-map.mp4",

    "map-observatory": "assets/videos/map-observatory.mp4",
    "observatory-map": "assets/videos/observatory-map.mp4",

    "map-sanctuary": "assets/videos/map-sanctuary.mp4",
    "sanctuary-map": "assets/videos/sanctuary-map.mp4",

    "map-library": "assets/videos/map-library.mp4",
    "library-map": "assets/videos/library-map.mp4",

    "map-port": "assets/videos/map-port.mp4",
    "port-map": "assets/videos/port-map.mp4",

    "map-snow": "assets/videos/map-snow.mp4",
    "snow-map": "assets/videos/snow-map.mp4",

    "map-bar": "assets/videos/map-bar.mp4",
    "bar-map": "assets/videos/bar-map.mp4",

    "map-academy": "assets/videos/map-academy.mp4",
    "academy-map": "assets/videos/academy-map.mp4",

    "map-musseum": "assets/videos/map-musseum.mp4",
    "musseum-map": "assets/videos/musseum-map.mp4",

    "map-pets": "assets/videos/map-pets.mp4",
    "pets-map": "assets/videos/pets-map.mp4",

    "map-frost": "assets/videos/map-frost.mp4",
    "frost-map": "assets/videos/frost-map.mp4",

    "portal-map": "assets/videos/portal-map.mp4",
    "map-portal": "assets/videos/portal-map.mp4"

};

// =======================================
// OBTENER VIDEO DE TRANSICIÓN
// =======================================

function obtenerVideoTransicion(origen, destino) {

    const clave =
        `${origen}-${destino}`;

    return videosTransicion[clave] || null;
}

// =======================================
// EJECUTAR TRANSICIÓN
// =======================================

function ejecutarTransicion(origen, destino, accionDestino) {

    // Evitar dos transiciones al mismo tiempo
    if (transicionActiva) {
        return;
    }

    transicionActiva = true;
    // ===================================
    // DETENER MÚSICA DEL LUGAR DE ORIGEN
    // ===================================

    detenerMusica();

    // ===================================
    // BUSCAR VIDEO
    // ===================================

    const videoSrc =
        obtenerVideoTransicion(origen, destino);

    // ===================================
    // SI NO EXISTE VIDEO
    // ===================================

    if (!videoSrc) {

        console.warn(
            `No existe video de transición: ${origen}-${destino}`
        );

        transicionActiva = false;

        if (typeof accionDestino === "function") {
            accionDestino();
        }

        return;
    }

    // ===================================
    // CREAR PANTALLA
    // ===================================

    let pantalla =
        document.getElementById("transitionScreen");

    if (!pantalla) {

        pantalla =
            document.createElement("div");

        pantalla.id =
            "transitionScreen";

        pantalla.innerHTML = `

            <video
                id="transitionVideo"
                playsinline
                preload="auto">
            </video>

        `;

        document.body.appendChild(pantalla);

    }

    // ===================================
    // OBTENER VIDEO
    // ===================================

    const video =
        document.getElementById("transitionVideo");

    if (!video) {

        console.error(
            "No se pudo crear el video de transición."
        );

        transicionActiva = false;

        if (typeof accionDestino === "function") {
            accionDestino();
        }

        return;
    }

    // ===================================
    // CONFIGURAR VIDEO
    // ===================================

    video.pause();

    video.currentTime = 0;

    video.src = videoSrc;

    // ===================================
    // SONIDO DEL VIDEO SEGÚN CONFIGURACIÓN
    // ===================================

    video.muted = !musicaActivada();
    video.volume = 1;
    video.loop = false;

    // ===================================
    // MOSTRAR PANTALLA
    // ===================================

    pantalla.classList.add("active");

    // ===================================
    // CUANDO TERMINA EL VIDEO
    // ===================================

    const finalizar = () => {

        video.removeEventListener(
            "ended",
            finalizar
        );

        video.removeEventListener(
            "error",
            manejarError
        );

        // Ocultar transición
        pantalla.classList.remove("active");

        // Limpiar video
        video.pause();

        video.removeAttribute("src");

        video.load();

        transicionActiva = false;

        // Ejecutar destino
        if (typeof accionDestino === "function") {

            accionDestino();

        }

    };

    // ===================================
    // ERROR DEL VIDEO
    // ===================================

    const manejarError = () => {

        console.warn(
            `No se pudo reproducir el video: ${videoSrc}`
        );

        finalizar();

    };

    video.addEventListener(
        "ended",
        finalizar
    );

    video.addEventListener(
        "error",
        manejarError
    );

    // ===================================
    // REPRODUCIR
    // ===================================

    video.play().catch(error => {

        console.warn(
            "El navegador bloqueó el video:",
            error
        );

        finalizar();

    });

}

// =======================================
// IR DE UN LUGAR A OTRO
// =======================================

function irA(origen, destino, accionDestino) {

    ejecutarTransicion(
        origen,
        destino,
        accionDestino
    );

}