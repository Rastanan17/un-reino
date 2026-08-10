// =======================================
// UN REINO EN MÍRRAFEN - Introducción
// =======================================
const MODO_DESARROLLO = false;
// ---------------------------------------
// Cargar historia
// ---------------------------------------
async function cargarHistoria(){
    try{
        const respuesta = await fetch("core/app/data/history.json");
        const historia = await respuesta.json();
        document.getElementById("crawl").innerHTML = historia.paragraphs.join("<br><br>");
    }catch(error){
        console.error("Error cargando historia:",error);
    }
}
// ---------------------------------------
// Iniciar intro
// ---------------------------------------
function iniciarIntro(){
    document.getElementById("btnComenzar").style.display = "none";
    const musica = document.getElementById("introMusic");
    musica.volume = 0.3;
    musica.play();
    document.getElementById("crawl").classList.add("start-crawl");
    setTimeout(()=>{
        document.getElementById("btnSaltar").style.display="block";
    },2000);
}
// ---------------------------------------
// Inicio de la aplicación
// ---------------------------------------
document.addEventListener("DOMContentLoaded",async()=>{
    // ===================================
    // MODO DESARROLLO
    // ===================================
    if(MODO_DESARROLLO){
        document.getElementById("introScreen").style.display="none";
        if(obtenerPerfilActivo()){
            await entrarAlReino();
        }else{
            mostrarPortal();
        }
        return;
    }
    // ===================================
    // MODO NORMAL
    // ===================================
    await cargarHistoria();
    document.getElementById("btnComenzar").addEventListener("click",iniciarIntro);
    document.getElementById("crawl").addEventListener("animationend",()=>{
        document.getElementById("startButton").style.display="inline-block";
    });
    document.getElementById("btnSaltar").addEventListener("click",()=>{
        document.getElementById("introMusic").pause();
        mostrarPortal();
    });
    // IMPORTANTE:
    // La historia NO entra al Reino directamente.
    // Primero abre el Portal.
    document.getElementById("startButton").addEventListener("click",()=>{
        console.log("BOTON PORTAL PRESIONADO");
        console.log("LLAMANDO PORTAL");
        mostrarPortal();
    });
});