// =======================================
// SISTEMA DE MÚSICA DEL REINO
// Un Reino en Mírrafen
// =======================================

let musicaActual = null;


// =======================================
// REPRODUCIR MÚSICA
// =======================================

function reproducirMusica(ruta, volumen = 0.5) {

    // Si ya está sonando exactamente esta música,
    // no hacemos nada.
    if (
        musicaActual &&
        musicaActual.src.includes(ruta) &&
        !musicaActual.paused
    ) {
        return;
    }


    // Detener cualquier música anterior
    detenerMusica();


    // Crear nueva música
    musicaActual = new Audio(ruta);

    musicaActual.loop = true;

    musicaActual.volume = volumen;


    // Intentar reproducir
    musicaActual.play().catch(error => {

        console.log(
            "La música necesita interacción del usuario:",
            error
        );

    });

}


// =======================================
// DETENER MÚSICA
// =======================================

function detenerMusica() {

    if (!musicaActual) {
        return;
    }


    musicaActual.pause();

    musicaActual.currentTime = 0;

    musicaActual.src = "";

    musicaActual = null;

}