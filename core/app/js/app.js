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

    console.log("🧪 iniciarModoDesarrollo");

    const visor =
        document.getElementById("visorDesarrollo");

    const controles =
        document.getElementById("visorControles");

    if(!visor) return;

    // ===================================
    // MODO NORMAL
    // ===================================

    if(!MODO_DESARROLLO){

        console.log("🧪 Desarrollo DESACTIVADO");

        // El visor sigue existiendo porque
        // contiene el juego.

        visor.style.display = "block";

        // Ocultar solamente los controles
        // de desarrollo.

        if(controles){

            controles.style.display = "none";

        }

        return;
    }

    // ===================================
    // MODO DESARROLLO
    // ===================================

    console.log("🧪 Desarrollo ACTIVADO");

    visor.style.display = "block";

    if(controles){

        controles.style.display = "flex";

    }

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

    console.log(
        "🧪 MODO DESARROLLO:",
        modo
    );
}

// =======================================
// CAMBIAR VISTA DEL VISOR
// =======================================

function cambiarModoDesarrollo(modo){

    const pantalla =
        document.getElementById("visorPantalla");

    if(!pantalla) return;

    pantalla.classList.remove(
        "modo-pc",
        "modo-tablet",
        "modo-celular"
    );

    pantalla.classList.add(
        `modo-${modo}`
    );

    console.log(
        "🧪 MODO DE DESARROLLO:",
        modo
    );

}

// =======================================
// INICIAR MODO DESARROLLO
// =======================================

window.addEventListener(
    "DOMContentLoaded",
    () => {

        iniciarModoDesarrollo();

    }
);