// =======================================
// UN REINO EN MÍRRAFEN
// Archivo principal
// =======================================

// ---------------------------------------
// Entrar al Reino
// ---------------------------------------
async function entrarAlReino(){
    document.getElementById("introScreen").style.display = "none";
    document.getElementById("reinoUI").style.display = "block";
    document.querySelector(".profile").style.display = "flex";
    document.getElementById("mainMenu").style.display = "flex";
    document.getElementById("content").innerHTML = "";
    verificarNuevoDia();
    revisarCalendario();
    actualizarPerfil();
    revisarCompensacion();
    await cargarMisiones();
    await cargarMapa();
    await cargarRecompensas();
    await cargarSistemaPergaminos();
    mostrarMisionesPagina();
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
// ---------------------------------------
// Inicio de la aplicación
// ---------------------------------------
window.addEventListener("DOMContentLoaded",()=>{
    // Ocultar el Reino al iniciar
    document.getElementById("reinoUI").style.display = "none";
    // Primero mostrar logo
    iniciarLogo();
});