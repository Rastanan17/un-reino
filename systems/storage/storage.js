// =======================================
// REINO DE MÍRRAFEN
// Archivo principal
// =======================================
// Sistema de almacenamiento
// =======================================
// =======================================
// REINO DE MÍRRAFEN
// SISTEMA DE ALMACENAMIENTO
// =======================================

const perfilBase = {
    id: "",
    nombre: "",
    // Edad individual — se conserva por compatibilidad
    edad: 0,
    // Rango de edad que determina el contenido
    rangoEdad: "6-8",
    // Avatar
    foto: "kingdom/portal/avatars/explorer.jpg",
    avatar: "kingdom/portal/avatars/explorer.jpg",
    // Progreso
    nivel: 1,
    xp: 0,
    xpNecesaria: 100,
    oquos: 0,
    // Rango dentro del Reino
    rango: "Aprendiz",
    // Progreso de juego
    misionesCompletadas: [],
    logros: [],
    // Historial del Reino
    historial:[],
    racha: 0,
    zonasRestauradas: [],
    ultimoReinicio: "",
    ultimoIngreso: "",
    mapa: [],
    pergaminos: [],
    // Compensación
    compensacionPendiente: false
};
// =======================================
// CREAR PERFIL
// =======================================
function crearPerfil(id, nombre, avatar, rangoEdad = "6-8") {
    let perfiles = JSON.parse(localStorage.getItem("perfiles")) || {};
    perfiles[id] = {
        ...perfilBase,
        id,
        nombre,
        avatar,
        foto: avatar,
        rangoEdad
    };
    localStorage.setItem("perfiles", JSON.stringify(perfiles));
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
    const perfiles = JSON.parse(localStorage.getItem("perfiles")) || {};
    return perfiles[id] || null;
}
// ---------------------------------------
// Guardar jugador actual
// ---------------------------------------
function guardarJugador(datos){
    const id = obtenerPerfilActivo();
    if(!id) return;
    const perfiles = JSON.parse(localStorage.getItem("perfiles")) || {};
    perfiles[id] = datos;
    localStorage.setItem("perfiles", JSON.stringify(perfiles));
}
// =======================================
// 👑 REGISTRAR ACONTECIMIENTO
// =======================================

function registrarAcontecimiento(tipo, texto){

    const jugador = cargarJugador();

    if(!jugador) return;

    if(!jugador.historial){
        jugador.historial = [];
    }

    const acontecimiento = {

        id: Date.now(),

        fecha: obtenerFechaHoy(),

        tipo: tipo,

        texto: texto

    };

    jugador.historial.push(acontecimiento);

    guardarJugador(jugador);

    console.log(
        "👑 ACONTECIMIENTO REGISTRADO:",
        acontecimiento
    );
}
// ---------------------------------------
// Obtener rango
// ---------------------------------------
function obtenerRango(nivel){
    if(nivel>=50) return "Guardián Legendario";
    if(nivel>=40) return "Héroe del Reino";
    if(nivel>=35) return "Protector Supremo";
    if(nivel>=30) return "Caballero de Mírrafen";
    if(nivel>=25) return "Sabio del Reino";
    if(nivel>=20) return "Maestro";
    if(nivel>=15) return "Guardián";
    if(nivel>=10) return "Constructor";
    if(nivel>=5) return "Explorador";
    return "Aprendiz";
}
// ---------------------------------------
// Dar recompensa
// ---------------------------------------
function sumarRecompensa(xp, oquos){

    console.log(
        "RECIBIDO -> XP:",
        xp,
        "Oquos:",
        oquos
    );

    const jugador = cargarJugador();

    if(!jugador) return;

    // ===================================
    // GUARDAR ESTADO ANTERIOR
    // ===================================

    const nivelAnterior =
        jugador.nivel;

    const rangoAnterior =
        jugador.rango;

    // ===================================
    // RECOMPENSAS
    // ===================================

    jugador.xp += xp;
    jugador.oquos += oquos;

    // ===================================
    // SUBIR DE NIVEL
    // ===================================

    while(
        jugador.xp >= jugador.xpNecesaria
    ){

        jugador.xp -= jugador.xpNecesaria;

        jugador.nivel++;

        jugador.xpNecesaria += 50;
    }

    // ===================================
    // ACTUALIZAR RANGO
    // ===================================

    jugador.rango =
        obtenerRango(jugador.nivel);

    // ===================================
    // GUARDAR JUGADOR
    // ===================================

    guardarJugador(jugador);

    actualizarPerfil();
    actualizarHUDJugador();

    // ===================================
    // 👑 REGISTRAR NUEVO RANGO
    // ===================================

    if(
        jugador.rango !== rangoAnterior
    ){

        registrarAcontecimiento(
            "rango",
            `Has obtenido el rango "${jugador.rango}".`
        );

        console.log(
            "👑 NUEVO RANGO:",
            jugador.rango
        );
    }

    // ===================================
    // 👑 REGISTRAR SUBIDA DE NIVEL
    // ===================================

    if(
        jugador.nivel > nivelAnterior
    ){

        registrarAcontecimiento(
            "nivel",
            `Alcanzaste el nivel ${jugador.nivel}.`
        );

        console.log(
            "👑 NUEVO ACONTECIMIENTO:",
            `Nivel ${jugador.nivel}`
        );
    }

}
// =======================================
// RESTAURAR UNA ZONA DEL REINO
// =======================================
function desbloquearZona(zona){

    const jugador = cargarJugador();

    if(!jugador) return;

    if(jugador.zonasRestauradas.includes(zona)){
        return;
    }

    jugador.zonasRestauradas.push(zona);

    guardarJugador(jugador);

    registrarAcontecimiento(
        "zona",
        `La zona ${zona} fue restaurada.`
    );
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
// =======================================
// REINICIO DE MISIONES DIARIAS
// =======================================

function reiniciarMisionesDiarias(){

    // Todas las misiones de todas las zonas
    // se guardan actualmente en esta única clave.
    localStorage.removeItem("estadoMisiones");

    console.log(
        "🌅 Misiones diarias reiniciadas"
    );
}
// ---------------------------------------
// Verificar cambio de día
// ---------------------------------------
function verificarNuevoDia(){

    const jugador = cargarJugador();

    if(!jugador) return;

    const hoy = obtenerFechaHoy();

    console.log("📅 Último reinicio:", jugador.ultimoReinicio);
    console.log("📅 Hoy:", hoy);
    console.log(
        "📦 Estado misiones:",
        localStorage.getItem("estadoMisiones")
    );

    if(jugador.ultimoReinicio !== hoy){

        console.log("🌅 RESET DE MISIONES EJECUTADO");

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