// =======================================
// BOSQUE DE MÍRAFEN
// =======================================

const FOREST_WIDTH = 1480;
const FOREST_HEIGHT = 1090;

// =======================================
// SONIDOS DEL BOSQUE
// =======================================

let musicaBosque = null;
let sonidoLobo = null;
let sonidoPajaros = null;

let intervaloLobo = null;
let intervaloPajaros = null;

// =======================================
// ZONAS INTERACTIVAS DEL BOSQUE
// Coordenadas basadas en 1480 × 1090
// =======================================

const zonasBosque = [

    // ===================================
    // 🚪 SALIDA → MAPA
    // ===================================

    {
        id: "salida",
        nombre: "Salida",
        x: 250,
        y: 500,
        width: 150,
        height: 150
    },

    // ===================================
    // 📜 MISIONES
    // ===================================

    {
        id: "misiones",
        nombre: "Misiones",
        x: 780,
        y: 420,
        width: 400,
        height: 100
    },

    // ===================================
    // 🐺 ZONA DE CUENTOS
    // ===================================

    {
        id: "cuentos",
        nombre: "Cuentos",
        x: 1200,
        y: 480,
        width: 180,
        height: 150
    },

    // ===================================
    // 🐦 ZONA DE LOS PÁJAROS
    // ===================================

    {
        id: "pajaro",
        nombre: "Pájaro",
        x: 700,
        y: 320,
        width: 180,
        height: 100
    }

];

// =======================================
// MOSTRAR BOSQUE
// =======================================

function mostrarBosque(){

    console.log("🌲 Entrando al Bosque");

    const momento =
        obtenerMomentoDelDia();

    console.log(
        "🕐 Momento del día:",
        momento
    );

    const content =
        document.getElementById("content");

    if(!content) return;

    content.innerHTML = `

        <div class="bosque">

            <!-- ==========================
                 FONDO
            =========================== -->

            <img
                id="forestBackground"
                class="forest-background"
                src="assets/images/backgrounds/forest/forest_${momento}.jpg"
                alt="Bosque de Mírrafen"
            >

            <!-- ==========================
                 ZONAS INTERACTIVAS
            =========================== -->

            ${zonasBosque.map(zona => `

                <div
                    class="zona-bosque ${zona.id}"
                    style="
                        left:${(zona.x / FOREST_WIDTH) * 100}%;
                        top:${(zona.y / FOREST_HEIGHT) * 100}%;
                        width:${(zona.width / FOREST_WIDTH) * 100}%;
                        height:${(zona.height / FOREST_HEIGHT) * 100}%;
                    "
                    onclick="interactuarZonaBosque('${zona.id}')"
                >

                    ${obtenerIconoZonaBosque(zona.id)}
                    ${zona.nombre}

                </div>

            `).join("")}

        </div>

    `;

    // ===================================
    // INICIAR SONIDOS
    // ===================================

    iniciarSonidoBosque();

}

// =======================================
// OBTENER ICONO DE ZONA
// =======================================

function obtenerIconoZonaBosque(id){

    if(id === "salida"){
        return "";
    }

    if(id === "misiones"){
        return "";
    }

    if(id === "cuentos"){
        return "";
    }

    if(id === "pajaro"){
        return "";
    }

    return "";

}

// =======================================
// INTERACTUAR CON ZONA DEL BOSQUE
// =======================================

function interactuarZonaBosque(id){

    console.log(
        "🌲 Zona del bosque:",
        id
    );

    // ===================================
    // 🚪 SALIDA → MAPA
    // ===================================

    if(id === "salida"){

        reproducirSFX(
            "exit.mp3"
        );

        detenerSonidoBosque();

        irA(
            "forest",
            "map",
            mostrarMapaReino
        );

        return;
    }

    // ===================================
    // 📜 MISIONES
    // ===================================

    if(id === "misiones"){

        reproducirSFX(
            "open_place.wav"
        );

        filtroZona =
            "Bosque";

        detenerSonidoBosque();

        mostrarMisiones();

        return;
    }

    // ===================================
    // 🐺 LOBO
    // ===================================

    if(id === "cuentos"){

        console.log(
            "📖 Entrando a los Cuentos"
        );

        if(sonidoLobo){

            reproducirSonidoExtra(
                sonidoLobo
            );

        }
        mostrarCuentos();

        return;
    }

    // ===================================
    // 🐦 PÁJAROS
    // ===================================

    if(id === "pajaro"){

        console.log(
            "🐦 Zona de los pájaros"
        );

        if(sonidoPajaros){

            reproducirSonidoExtra(
                sonidoPajaros
            );

        }

        return;
    }

}

// =======================================
// INICIAR SONIDOS DEL BOSQUE
// =======================================

function iniciarSonidoBosque(){

    console.log(
        "🌲 Iniciando sonidos del bosque"
    );

    // ===================================
    // LIMPIAR SONIDOS ANTERIORES
    // ===================================

    detenerSonidoBosque();

    // ===================================
    // 🌲 AMBIENTE
    // ===================================

    musicaBosque =
        new Audio(
            "assets/sounds/ambient_forest.mp3"
        );

    musicaBosque.loop = true;

    musicaBosque.volume = 0.35;

    musicaBosque.play().catch(error => {

        console.log(
            "🌲 El sonido del bosque necesita interacción:",
            error
        );

    });

    // ===================================
    // 🐺 LOBO
    // ===================================

    sonidoLobo =
        new Audio(
            "assets/sounds/wolf.mp3"
        );

    sonidoLobo.volume = 0.6;

    // ===================================
    // 🐦 PÁJAROS
    // ===================================

    sonidoPajaros =
        new Audio(
            "assets/sounds/birds.mp3"
        );

    sonidoPajaros.volume = 0.5;

    // ===================================
    // SONIDOS ALEATORIOS
    // ===================================

    iniciarSonidosAleatorios();

}

// =======================================
// REPRODUCIR SONIDO EXTRA
// MÁXIMO 5 SEGUNDOS
// =======================================

function reproducirSonidoExtra(sonido){

    if(!sonido) return;

    // ===================================
    // REINICIAR SONIDO
    // ===================================

    sonido.pause();

    sonido.currentTime = 0;

    // ===================================
    // REPRODUCIR
    // ===================================

    sonido.play().catch(() => {});

    // ===================================
    // MÁXIMO 5 SEGUNDOS
    // ===================================

    setTimeout(() => {

        if(!sonido) return;

        sonido.pause();

        sonido.currentTime = 0;

    }, 5000);

}

// =======================================
// SONIDOS ALEATORIOS
// =======================================

function iniciarSonidosAleatorios(){

    // ===================================
    // 🐺 LOBO
    // ===================================

    intervaloLobo =
        setInterval(() => {

            if(!sonidoLobo) return;

            if(Math.random() < 0.45){

                reproducirSonidoExtra(
                    sonidoLobo
                );

            }

        }, 25000);

    // ===================================
    // 🐦 PÁJAROS
    // ===================================

    intervaloPajaros =
        setInterval(() => {

            if(!sonidoPajaros) return;

            if(Math.random() < 0.65){

                reproducirSonidoExtra(
                    sonidoPajaros
                );

            }

        }, 12000);

}

// =======================================
// DETENER SONIDOS DEL BOSQUE
// =======================================

function detenerSonidoBosque(){

    // ===================================
    // DETENER INTERVALO DEL LOBO
    // ===================================

    if(intervaloLobo){

        clearInterval(
            intervaloLobo
        );

        intervaloLobo = null;

    }

    // ===================================
    // DETENER INTERVALO DE PÁJAROS
    // ===================================

    if(intervaloPajaros){

        clearInterval(
            intervaloPajaros
        );

        intervaloPajaros = null;

    }

    // ===================================
    // 🌲 AMBIENTE
    // ===================================

    if(musicaBosque){

        musicaBosque.pause();

        musicaBosque.currentTime = 0;

        musicaBosque = null;

    }

    // ===================================
    // 🐺 LOBO
    // ===================================

    if(sonidoLobo){

        sonidoLobo.pause();

        sonidoLobo.currentTime = 0;

        sonidoLobo = null;

    }

    // ===================================
    // 🐦 PÁJAROS
    // ===================================

    if(sonidoPajaros){

        sonidoPajaros.pause();

        sonidoPajaros.currentTime = 0;

        sonidoPajaros = null;

    }

}