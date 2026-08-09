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

    const mainMenu =
        document.getElementById("mainMenu");

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

    localStorage.setItem("perfilActivo",id);

    await entrarAlReino();

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

