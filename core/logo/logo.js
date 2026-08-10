// =======================================
// ARCA PIXELES STUDIO
// =======================================
function iniciarLogo(){
    const video = document.getElementById("logoVideo");
    const cristal = document.getElementById("cristal");
    const introLogo = document.getElementById("introLogo");
    cristal.addEventListener("click", ()=>{
        // Ocultar la pantalla del cristal
        introLogo.style.display = "none";
        // Mostrar el video
        video.style.display = "block";
        // Reproducir
        video.play();
    });
    video.addEventListener("ended", ()=>{
        continuarHistoria();
    });
}
// ---------------------------------------
// Ir a la historia
// ---------------------------------------
function continuarHistoria(){
    document.getElementById("logoScreen").style.display = "none";
    document.getElementById("introScreen").style.display = "block";
    cargarHistoria();
}