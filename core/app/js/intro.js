// =======================================
// UN REINO EN MÍRRAFEN - Introducción
// =======================================
// =======================================
// ESTADO DE LA INTRO
// =======================================

let introParaNuevoAventurero = false;
function iniciarHistoriaNuevoAventurero(){
    console.log("⚔️ Iniciando historia del nuevo aventurero");
    introParaNuevoAventurero = true;
    const intro = document.getElementById("introScreen");
    const reino = document.getElementById("reinoUI");
    const content = document.getElementById("content");
    const crawl = document.getElementById("crawl");
    const btnComenzar = document.getElementById("btnComenzar");
    const btnSaltar = document.getElementById("btnSaltar");
    const startButton = document.getElementById("startButton");
    const musica = document.getElementById("introMusic");
    // ===================================
    // OCULTAR COMPLETAMENTE EL REINO
    // ===================================
    if(reino){
        reino.style.display = "none";
    }
    if(content){
        content.innerHTML = "";
    }
    // ===================================
    // MOSTRAR HISTORIA
    // ===================================
    if(intro){
        intro.style.display = "block";
    }
    // ===================================
    // CONTROLES
    // ===================================
    if(btnComenzar){
        btnComenzar.style.display = "none";
    }
    if(btnSaltar){
        btnSaltar.style.display = "none";
    }
    if(startButton){
        startButton.style.display = "none";
    }
    // ===================================
    // REINICIAR ANIMACIÓN
    // ===================================
    if(crawl){
        crawl.classList.remove("start-crawl");
        void crawl.offsetWidth;
    }
    // ===================================
    // MÚSICA
    // ===================================
    if(musica){
        musica.currentTime = 0;
        musica.volume = 0.3;
        if(musicaActivada()){
            musica.play().catch(error => {
                console.warn("No se pudo reproducir la música del intro:", error);
            });
        }else{
            musica.pause();
        }
    }
    // ===================================
    // INICIAR HISTORIA
    // ===================================
    if(crawl){
        crawl.classList.add("start-crawl");
    }
    // ===================================
    // MOSTRAR SALTAR
    // ===================================
    setTimeout(() => {
        if(btnSaltar){
            btnSaltar.style.display = "block";
        }
    }, 2000);
}
// ---------------------------------------
// Cargar historia
// ---------------------------------------
async function cargarHistoria(){
    try{
        const respuesta = await fetch("core/app/data/history.json");
        const historia = await respuesta.json();
        document.getElementById("crawl").innerHTML = historia.paragraphs.join("<br><br>");
    }catch(error){
        console.error("Error cargando historia:", error);
    }
}
// ---------------------------------------
// Iniciar intro
// ---------------------------------------
function iniciarIntro(){
    // 🔊 Sonido del botón
    reproducirSFX("touch.mp3");
    document.getElementById("btnComenzar").style.display = "none";
    const musica = document.getElementById("introMusic");
    if(musica){
        musica.volume = 0.3;
        if(musicaActivada()){
            musica.currentTime = 0;
            musica.play().catch(error => {
                console.warn("No se pudo reproducir la música del intro:", error);
            });
        }else{
            musica.pause();
            musica.currentTime = 0;
        }
    }
    document.getElementById("crawl").classList.add("start-crawl");
    setTimeout(() => {
        document.getElementById("btnSaltar").style.display = "block";
    }, 2000);
}
// ---------------------------------------
// Inicio de la aplicación
// ---------------------------------------
document.addEventListener("DOMContentLoaded", async () => {
    // ===================================
    // MODO NORMAL
    // ===================================
    await cargarHistoria();
    document.getElementById("btnComenzar").addEventListener("click", iniciarIntro);
    document.getElementById("crawl").addEventListener("animationend", () => {
        if(introParaNuevoAventurero){
            console.log("⚔️ Historia completada → entrando al reino");
            document.getElementById("introMusic").pause();
            introParaNuevoAventurero = false;
            irA("portal", "map", async () => {
                await entrarAlReino();
            }); 
            return;
        }
        document.getElementById("startButton").style.display = "inline-block";
    });
    // ===================================
    // BOTÓN SALTAR
    // ===================================
    document.getElementById("btnSaltar").addEventListener("click", async () => {
        reproducirSFX("touch.mp3");
        document.getElementById("introMusic").pause();
        if(introParaNuevoAventurero){
            console.log("⏭ Historia omitida → entrando al reino");
            introParaNuevoAventurero = false;
            irA("portal", "map", async () => {
                await entrarAlReino();
            });
            return;
        }
        mostrarPortal();
    });
    // ===================================
    // BOTÓN ENTRAR AL PORTAL
    // ===================================
    document.getElementById("startButton").addEventListener("click", () => {
        reproducirSFX("touch.mp3");
        console.log("BOTON PORTAL PRESIONADO");
        console.log("LLAMANDO PORTAL");
        mostrarPortal();
    });
});