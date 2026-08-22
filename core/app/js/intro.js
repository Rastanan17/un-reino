// =======================================
// UN REINO EN MÍRRAFEN - Introducción
// =======================================
// ---------------------------------------
// Cargar historia
// ---------------------------------------

async function cargarHistoria(){

    try{

        const respuesta =
            await fetch("core/app/data/history.json");

        const historia =
            await respuesta.json();

        document.getElementById("crawl").innerHTML =
            historia.paragraphs.join("<br><br>");

    }catch(error){

        console.error(
            "Error cargando historia:",
            error
        );

    }
}

// ---------------------------------------
// Iniciar intro
// ---------------------------------------

function iniciarIntro(){

    // 🔊 Sonido del botón
    reproducirSFX("touch.mp3");

    document.getElementById("btnComenzar").style.display = "none";

    const musica =
        document.getElementById("introMusic");

    if(musica){

        musica.volume = 0.3;

        if(musicaActivada()){

            musica.currentTime = 0;

            musica.play().catch(error => {

                console.warn(
                    "No se pudo reproducir la música del intro:",
                    error
                );

            });

        }else{

            musica.pause();
            musica.currentTime = 0;

        }
    }

    document
        .getElementById("crawl")
        .classList
        .add("start-crawl");

    setTimeout(() => {

        document
            .getElementById("btnSaltar")
            .style.display = "block";

    }, 2000);
}

// ---------------------------------------
// Inicio de la aplicación
// ---------------------------------------

document.addEventListener(
    "DOMContentLoaded",
    async () => {
        // ===================================
        // MODO NORMAL
        // ===================================

        await cargarHistoria();

        document
            .getElementById("btnComenzar")
            .addEventListener(
                "click",
                iniciarIntro
            );

        document
            .getElementById("crawl")
            .addEventListener(
                "animationend",
                () => {

                    document
                        .getElementById("startButton")
                        .style.display = "inline-block";

                }
            );

        // ===================================
        // BOTÓN SALTAR
        // ===================================

        document
            .getElementById("btnSaltar")
            .addEventListener(
                "click",
                () => {

                    // 🔊
                    reproducirSFX("touch.mp3");

                    document
                        .getElementById("introMusic")
                        .pause();

                    mostrarPortal();

                }
            );

        // ===================================
        // BOTÓN ENTRAR AL PORTAL
        // ===================================

        document
            .getElementById("startButton")
            .addEventListener(
                "click",
                () => {

                    // 🔊
                    reproducirSFX("touch.mp3");

                    console.log(
                        "BOTON PORTAL PRESIONADO"
                    );

                    console.log(
                        "LLAMANDO PORTAL"
                    );

                    mostrarPortal();

                }
            );
    }
);