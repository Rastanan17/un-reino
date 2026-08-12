// =======================================
// ARCA PIXELES STUDIO
// =======================================

function iniciarLogo(){

    const video = document.getElementById("logoVideo");
    const cristal = document.getElementById("cristal");
    const introLogo = document.getElementById("introLogo");

    cristal.addEventListener("click", () => {

    // Evitar otro click durante la ruptura
    cristal.style.pointerEvents = "none";

    // 🔊 Sonido del cristal — máximo 2 segundos
    const cristalSonido = new Audio(
        "assets/sounds/cristal.mp3"
    );

    cristalSonido.volume = 1;

    cristalSonido.play();

    setTimeout(() => {
        cristalSonido.pause();
        cristalSonido.currentTime = 0;
    }, 2000);

    // Activar ruptura
    cristal.classList.add("rompiendo");

    // Esperar a que termine la animación
    setTimeout(() => {

        introLogo.style.display = "none";

        video.style.display = "block";

        video.play();

    }, 700);
});

    video.addEventListener("ended", () => {
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