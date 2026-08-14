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

    // 🎵 Música del mapa
    reproducirMusica(
        "assets/sounds/ambient_map.mp3",
        0.35
    );
    // =======================================
    // CONTENIDO
    // =======================================

    const content = document.getElementById("content");

    if (!content) {
        console.error("No se encontró #content.");
        return;
    }

    content.innerHTML = `

        <button
            class="btnPerfil"
            onclick="irA('map', 'portal', mostrarPortal)">
            🔄 Cambiar perfil
        </button>

        <h2>
            🗺️ Reino de ${jugador.nombre}
        </h2>

        <div id="kingdomLayout">

            <div id="kingdomMap">

                <img
                    id="mapImage"
                    src="kingdom/map/images/map.png"
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
        Bosque: "🌲",
        Granja: "🌾",
        Santuario: "⛪",
        Observatorio: "🔭",
        Mercado: "🛒"

    };

    // =======================================
    // CREAR ZONAS
    // =======================================

    zonas.forEach(zona => {

        const desbloqueada =
            jugador.nivel >= zona.nivel;

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

            if (!desbloqueada) {

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

    // ===================================
    // BLOQUEO POR NIVEL
    // ===================================

    if(jugador.nivel < zona.nivel){

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

    // ===================================
    // 🏆 LOGROS
    // ===================================

    if(zona.tipo === "logros"){

        mostrarLogros();

        return;
    }

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