// =======================================
// MAPA DEL REINO
// =======================================
let zonas = [];
async function cargarMapa(){
    const respuesta = await fetch("kingdom/map/map.json");
    zonas = await respuesta.json();
    guardarMapa(zonas);
}
// =======================================
// 🔒 COMPROBAR DESBLOQUEO DE ZONA
// =======================================

function zonaDesbloqueada(zona, jugador){

    // 🐸 Modo Sapo:
    // todas las zonas están disponibles
    // para pruebas de desarrollo.

    if(MODO_DESARROLLO){

        return true;

    }

    // 👤 Juego normal:
    // se respeta el nivel requerido.

    return jugador.nivel >= zona.nivel;

}
// =======================================
// MOSTRAR MAPA DEL REINO
// =======================================

function mostrarMapaReino() {

    const jugador = cargarJugador();

    if (!jugador) {

        console.warn(
            "No hay un jugador activo."
        );

        return;
    }
    const momento = obtenerMomentoDelDia();

    const content = document.getElementById("content");

    if (!content) {
        console.error("No se encontró #content.");
        return;
    }

    reproducirMusica(
        "assets/sounds/ambient_map.mp3",
        0.35
    );
    // =======================================
    // CONTENIDO
    // =======================================

    content.innerHTML = `

        <h2>
            🗺️ Reino de ${jugador.nombre}
        </h2>

        <div id="kingdomLayout">

            <div id="kingdomMap">

                <img
                    id="mapImage"
                    src="kingdom/map/images/map_${momento}.jpg"
                    alt="Mapa del Reino">

            </div>

            <aside id="zoneList"></aside>

        </div>

    `;

    // =======================================
    // COMPROBAR ZONAS
    // =======================================

    if (!zonas || zonas.length === 0) {

        mostrarMensaje(
            "Mapa",
            "No se pudo cargar el mapa del Reino."
        );

        return;
    }

    // =======================================
    // ELEMENTOS DEL MAPA
    // =======================================

    const mapa = document.getElementById("kingdomMap");
    const lista = document.getElementById("zoneList");

    if (!mapa || !lista) {

        console.error(
            "No se pudieron encontrar los elementos del mapa."
        );

        return;
    }

    // =======================================
    // ICONOS DE LAS ZONAS
    // =======================================

    const iconos = {

        Castillo: "🏰",
        Aldea: "🏡",
        Mercado: "🛒",
        Granja: "🌾",
        Cavernas: "🌀",
        Bosque: "🌲",
        Santuario: "⛪",
        Observatorio: "🔭",
        Biblioteca: "📚",
        Puerto: "⚓",
        Nieve: "⛄",
        Bar: "🍺",
        Academia: "🎓",
        Museo: "🏛️",
        Mascotas: "🐾",
        Hielo: "❄️"

    };

    // =======================================
    // CREAR ZONAS
    // =======================================

    zonas.forEach(zona => {

        const desbloqueada =
    zonaDesbloqueada(zona, jugador);
        // ===================================
        // LISTA LATERAL
        // ===================================

        const item = document.createElement("div");

        item.className = "zoneItem";

        item.textContent = desbloqueada
            ? `${iconos[zona.nombre] || "📍"} ${zona.nombre}`
            : `🔒 Nivel ${zona.nivel}`;

        item.onclick = () => {

            if (!desbloqueada) {
                mostrarMensaje(
                    "Zona bloqueada",
                    `Necesitás alcanzar el nivel ${zona.nivel} para desbloquear esta zona.`
                );
                return;
            }
            reproducirSFX("open_place.wav");

            abrirZona(zona);

        };

        lista.appendChild(item);

        // ===================================
        // SPRITE DE LA ZONA
        // ===================================

        const sprite = desbloqueada

            ? "kingdom/map/images/" + zona.sprite

            : "kingdom/map/images/unknown.jpg";

        // ===================================
        // CONTENEDOR DE LA ZONA
        // ===================================

        const div = document.createElement("div");

        div.className = "zone";

        if (!desbloqueada) {
            div.classList.add("bloqueada");
        }

        // Posición en porcentaje
        div.style.left = zona.x + "%";
        div.style.top = zona.y + "%";

        // ===================================
        // CONTENIDO DE LA ZONA
        // ===================================

        div.innerHTML = `

            <div class="zoneSprite">

                <img
                    src="${sprite}"
                    alt="${desbloqueada ? zona.nombre : "Zona bloqueada"}">

            </div>

            <div class="zoneName">

                ${desbloqueada ? zona.nombre : "???"}

            </div>

            <div class="zoneLevel">

                ${desbloqueada
                    ? ""
                    : "🔒 Nivel " + zona.nivel}

            </div>

        `;

        // ===================================
        // CLICK EN LA ZONA DEL MAPA
        // ===================================

        div.onclick = () => {
            
            reproducirSFX("open_place.wav");
            if (!desbloqueada) {

                reproducirSFX("non.mp3");
                mostrarMensaje(
                    "Zona bloqueada",
                    `Necesitás alcanzar el nivel ${zona.nivel} para desbloquear esta zona.`
                );

                return;
            }

            abrirZona(zona);

        };

        mapa.appendChild(div);

    });

}
function detenerMusicaMapa() {

    if (musicaMapa) {

        musicaMapa.pause();
        musicaMapa.currentTime = 0;

    }

}
// =======================================
function restaurarZona(nombreZona, cantidad = 10){
    const zona = zonas.find(z => z.nombre === nombreZona);
    if(!zona) return;
    zona.progreso += cantidad;
    if(zona.progreso > zona.objetivo){
        zona.progreso = zona.objetivo;
    }
    guardarMapa(zonas);
}
// =======================================
// ABRIR ZONA
// =======================================
function abrirZona(zona){

    console.log("ZONA ABIERTA:", zona);

    const jugador = cargarJugador();

    if(!zona) return;

    console.log("🧪 MODO DESARROLLO:", MODO_DESARROLLO);
    console.log("🧪 NIVEL JUGADOR:", jugador?.nivel);
    console.log("🧪 NIVEL ZONA:", zona?.nivel);

    // ===================================
    // BLOQUEO POR NIVEL
    // ===================================

    if(!zonaDesbloqueada(zona, jugador)){

        mostrarMensaje(

            "🧭 Región desconocida",

            `Necesitas llegar al Nivel ${zona.nivel}`

        );

        return;
    }

    // ===================================
    // 🏰 CASTILLO
    // ===================================

    if(zona.nombre === "Castillo"){

        irA(
            "map",
            "castle",
            mostrarCastillo
        );

        return;
    }

    // ===================================
    // 🏡 ALDEA
    // ===================================

    if(zona.nombre === "Aldea"){

        irA(
            "map",
            "village",
            mostrarAldea
        );

        return;
    }

    // ===================================
    // 🌾 GRANJA
    // ===================================

    if(zona.nombre === "Granja"){

        irA(
            "map",
            "farm",
            mostrarGranja
        );

        return;
    }

    // ===================================
    // 🌲 BOSQUE
    // ===================================

    if(zona.nombre === "Bosque"){

        irA(
            "map",
            "forest",
            mostrarBosque
        );

        return;
    }

    // ===================================
    // 🔭 OBSERVATORIO
    // ===================================

    if(zona.nombre === "Observatorio"){

        irA(
            "map",
            "observatory",
            mostrarObservatorio
        );

        return;
    }
/*
    // ===================================
    // 🏛️ ACADEMIA
    // ===================================

    if(zona.nombre === "Academia"){

        irA(
            "map",
            "academy",
            mostrarAcademia
        );

        return;
    }

    // ===================================
    // 🐾 REFUGIO DE MASCOTAS
    // ===================================

    if(zona.nombre === "Mascotas"){

        irA(
            "map",
            "pets",
            mostrarMascotas
        );

        return;
    }

    // ===================================
    // ⛪ SANTUARIO
    // ===================================

    if(zona.nombre === "Santuario"){

        irA(
            "map",
            "sanctuary",
            mostrarSantuario
        );

        return;
    }

    // ===================================
    // 🌨️ NIEVES
    // ===================================

    if(zona.nombre === "Nieve"){

        irA(
            "map",
            "snow",
            mostrarNieve
        );

        return;
    }

    // ===================================
    // ⚓ PUERTO
    // ===================================

    if(zona.nombre === "Puerto"){

        irA(
            "map",
            "port",
            mostrarPuerto
        );

        return;
    }
*/
    // ===================================
    // 📜 ZONAS CON MISIONES
    // ===================================

    if(zona.tipo === "misiones"){

        filtroZona = zona.nombre;

        mostrarMisiones();

        return;
    }

    // ===================================
    // 🛒 MERCADO
    // ===================================

    if(zona.tipo === "mercado"){

        console.log("Entrando al mercado");

        irA(
            "map",
            "market",
            mostrarMercado
        );

        return;
    }
/*
    // ===================================
    // 🏛️ MUSEO
    // ===================================

    if(zona.nombre === "Museo"){

        irA(
            "map",
            "museum",
            mostrarMuseo
        );

        return;
    }
*/
    // ===================================
    // 🏆 LOGROS
    // ===================================

    if(zona.tipo === "logros"){

        mostrarLogros();

        return;
    }

    // ===================================
    // 🌀 CAVERNAS
    // ===================================

    if(zona.nombre === "Cavernas"){

        irA(
            "map",
            "caves",
            mostrarCavernas
        );

        return;
    }
/*
    // ===================================
    // ❄️ FROST
    // ===================================

    if(zona.nombre === "Frost"){

        irA(
            "map",
            "frost",
            mostrarFrost
        );

        return;
    }
*/
    // ===================================
    // 🎮 MINIJUEGOS
    // ===================================

    if(zona.tipo === "minijuegos"){

        mostrarMinijuegos();

        return;
    }

    // ===================================
    // ZONA EN CONSTRUCCIÓN
    // ===================================

    mostrarMensaje(

        "Zona",

        "Esta zona todavía está en construcción."

    );

}
// =======================================
function obtenerEstadoZona(zona){
    if(zona.progreso < 40){
        return "ruins";
    }
    if(zona.progreso < 80){
        return "construction";
    }
    return "restored";
}
// =======================================
// Guardar mapa
// =======================================
function guardarEstadoMapa(){
    guardarMapa(zonas);
}