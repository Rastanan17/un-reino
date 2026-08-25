// =======================================
// UN REINO EN MÍRRAFEN
// Archivo principal
// =======================================
let musicaMapa = null;
// ---------------------------------------
// Entrar al Reino
// ---------------------------------------
async function entrarAlReino(){
    // =======================================
    // DETENER MÚSICA DEL PORTAL
    // =======================================
    if(musicaPortal){
        musicaPortal.pause();
        musicaPortal.currentTime = 0;
    }
    document.getElementById("introScreen").style.display = "none";
    document.getElementById("reinoUI").style.display = "block";
    const mainMenu = document.getElementById("mainMenu");
    if(mainMenu){
        mainMenu.style.display = "flex";
    }
    document.getElementById("content").innerHTML = "";
    verificarNuevoDia();
    revisarCalendario();
    actualizarPerfil();
    mostrarHUDJugador();
    iniciarSistemaTutorial();
    revisarCompensacion();
    await iniciarSistemaMisiones();
    await cargarMapa();
    await cargarRecompensas();
    await cargarSistemaPergaminos();
    mostrarMapaReino();
}
// ---------------------------------------
// Entrar con un aventurero
// ---------------------------------------
async function entrarPerfil(id){
    localStorage.setItem("perfilActivo", id);
    irA("portal", "map", async () => {
        await entrarAlReino();
    });
}
// ---------------------------------------
// Inicio de la aplicación
// ---------------------------------------
window.addEventListener("DOMContentLoaded", () => {
    // Ocultar el Reino al iniciar
    document.getElementById("reinoUI").style.display = "none";
    // Primero mostrar logo
    iniciarLogo();
});
// =======================================
// MODO DESARROLLO
// =======================================
function iniciarModoDesarrollo(){
    console.log("🧪 Estado Modo Sapo:", MODO_DESARROLLO ? "ACTIVO 🐸" : "INACTIVO 🔒");
    const visor = document.getElementById("visorDesarrollo");
    const controles = document.getElementById("visorControles");
    if(!visor) return;
    // ===================================
    // JUEGO NORMAL
    // ===================================
    if(!MODO_DESARROLLO){
        console.log("🔒 Modo Sapo desactivado.");
        // El visor contiene el juego.
        // Por eso permanece visible.
        visor.style.display = "block";
        // Los controles de desarrollo
        // permanecen completamente ocultos.
        if(controles){
            controles.style.display = "none";
        }
        return;
    }
    // ===================================
    // MODO SAPO
    // ===================================
    console.log("🐸 Modo Sapo activado.");
    visor.style.display = "block";
    if(controles){
        controles.style.display = "flex";
    }
    // ===================================
    // DETECTAR DISPOSITIVO
    // ===================================
    const ancho = window.innerWidth;
    let modo;
    if(ancho <= 600){modo = "celular";}
    else if(ancho <= 900){modo = "tablet";}
    else{modo = "pc";}
    // ===================================
    // APLICAR VISTA
    // ===================================
    cambiarModoDesarrollo(modo);
    console.log("🧪 Vista de desarrollo:", modo);
}
// =======================================
// CAMBIAR VISTA DEL VISOR
// =======================================
function cambiarModoDesarrollo(modo){
    const pantalla = document.getElementById("visorPantalla");
    if(!pantalla) return;
    pantalla.classList.remove("modo-pc", "modo-tablet", "modo-celular");
    pantalla.classList.add(`modo-${modo}`);
    console.log("🧪 Vista aplicada:", modo);
}
// =======================================
// INICIALIZAR MODO DESARROLLO
// =======================================
window.addEventListener(
    "DOMContentLoaded", () => {
        iniciarModoDesarrollo();
    }
);