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
window.addEventListener("DOMContentLoaded",()=>{
    // Ocultar el Reino al iniciar
    document.getElementById("reinoUI").style.display = "none";
    // Primero mostrar logo
    iniciarLogo();
});
// =======================================
// VISOR DE DESARROLLO
// =======================================
function cambiarModoDesarrollo(modo){
    const pantalla = document.getElementById("visorPantalla");
    if(!pantalla){
        console.warn("No se encontró #visorPantalla.");
        return;
    }
    // ===================================
    // LIMPIAR MODOS ANTERIORES
    // ===================================
    pantalla.classList.remove(
        "modo-pc",
        "modo-tablet",
        "modo-celular"
    );
    // ===================================
    // APLICAR NUEVO MODO
    // ===================================
    pantalla.classList.add(`modo-${modo}`);
    console.log("🧪 MODO DE DESARROLLO:", modo);
}
// =======================================
// INICIAR VISOR
// =======================================
window.addEventListener("DOMContentLoaded", () => {

    const ancho = window.innerWidth;

    let modo;

    if(ancho <= 600){
        modo = "celular";
    }
    else if(ancho <= 900){
        modo = "tablet";
    }
    else{
        modo = "pc";
    }

    cambiarModoDesarrollo(modo);

    console.log("📱 Dispositivo detectado:", modo);
});