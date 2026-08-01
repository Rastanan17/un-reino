// =======================================
// REINO DE MÍRRAFEN
// Archivo principal
// =======================================
// Sistema de almacenamiento
// =======================================
const perfilBase = {
    id: "",
    nombre: "",
    edad: 0,
    foto: "default.png",
    nivel: 1,
    xp: 0,
    xpNecesaria: 100,
    oquos: 0,
    rango: "Explorador",
    avatar: "explorer.jpg",
    misionesCompletadas: [],
    logros: [],
    racha: 0,
    zonasRestauradas: [],
    ultimoReinicio: "",
    ultimoIngreso: "",
    mapa:[],
    pergaminos:[],
    compensacionPendiente:false
};

function crearPerfil(id,nombre,avatar){
    let perfiles = JSON.parse(
        localStorage.getItem("perfiles")
    ) || {};
    perfiles[id] = {
        ...perfilBase,
        id,
        nombre,
        avatar
    };
    localStorage.setItem(
        "perfiles",
        JSON.stringify(perfiles)
    );
}

// =======================================
// PERFIL ACTIVO
// =======================================
function obtenerPerfilActivo(){
    return localStorage.getItem("perfilActivo");
}

// ---------------------------------------
// Cargar jugador actual
// ---------------------------------------
function cargarJugador(){
    const id = obtenerPerfilActivo();
    if(!id){
        return null;
    }
    const perfiles = JSON.parse(
        localStorage.getItem("perfiles")
    ) || {};
    return perfiles[id] || null;
}

// ---------------------------------------
// Guardar jugador actual
// ---------------------------------------
function guardarJugador(datos){
    const id = obtenerPerfilActivo();
    if(!id) return;
    const perfiles = JSON.parse(
        localStorage.getItem("perfiles")
    ) || {};
    perfiles[id] = datos;
    localStorage.setItem(
        "perfiles",
        JSON.stringify(perfiles)
    );
}

// ---------------------------------------
// Obtener rango
// ---------------------------------------
function obtenerRango(nivel) {
    if (nivel >= 10) return "Guardián Legendario";
    if (nivel >= 9) return "Héroe del Reino";
    if (nivel >= 8) return "Protector Supremo";
    if (nivel >= 7) return "Caballero de Mírrafen";
    if (nivel >= 6) return "Sabio del Reino";
    if (nivel >= 5) return "Maestro Constructor";
    if (nivel >= 4) return "Guardián";
    if (nivel >= 3) return "Constructor";
    if (nivel >= 2) return "Explorador Mayor";
    return "Explorador";
}

// ---------------------------------------
// Dar recompensa
// ---------------------------------------
function sumarRecompensa(xp, oquos) {
    console.log("RECIBIDO -> XP:", xp, "Oquos:", oquos);
    const jugador = cargarJugador();
    if(!jugador) return;
    jugador.xp += xp;
    jugador.oquos += oquos;
    while (jugador.xp >= jugador.xpNecesaria) {
        jugador.xp -= jugador.xpNecesaria;
        jugador.nivel++;
        jugador.xpNecesaria += 50;
    }
    jugador.rango = obtenerRango(jugador.nivel);
    guardarJugador(jugador);
    actualizarPerfil();
}

// ---------------------------------------
// Restaurar una zona del Reino
// ---------------------------------------
function desbloquearZona(zona) {
    const jugador = cargarJugador();
    if (!jugador.zonasRestauradas.includes(zona)) {
        jugador.zonasRestauradas.push(zona);
        guardarJugador(jugador);
    }
}

// ---------------------------------------
// Reiniciar partida
// ---------------------------------------
function reiniciarJugador(){
    localStorage.removeItem("perfilActivo");
    location.reload();
}

// ---------------------------------------
// Obtener fecha de hoy
// ---------------------------------------
function obtenerFechaHoy() {
    return new Date().toISOString().split("T")[0];
}

// ---------------------------------------
// Verificar cambio de día
// ---------------------------------------
function verificarNuevoDia(){
    const jugador = cargarJugador();
    if(!jugador) return;
    const hoy = obtenerFechaHoy();
    if(jugador.ultimoReinicio !== hoy){
        reiniciarMisionesDiarias();
        jugador.ultimoReinicio = hoy;
        guardarJugador(jugador);
    }
}

// =======================================
// MAPA DEL REINO
// =======================================
function cargarMapaGuardado() {
    const jugador = cargarJugador();
    if(!jugador) return null;
    return jugador.mapa || null;
}

function guardarMapa(zonas) {
    const jugador = cargarJugador();
    if(!jugador) return;
    jugador.mapa = zonas;
    guardarJugador(jugador);
}