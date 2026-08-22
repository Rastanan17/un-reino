// =======================================
// SISTEMA DE MÚSICA DEL REINO
// Un Reino en Mírrafen
// =======================================

let musicaActual = null;

// =======================================
// REPRODUCIR MÚSICA
// =======================================

function reproducirMusica(ruta, volumen = 0.5){

    // ===================================
    // MÚSICA SILENCIADA
    // ===================================

    if(!musicaActivada()){

        console.log(
            "🎵 Música silenciada."
        );

        // Si había música sonando,
        // la detenemos inmediatamente.
        detenerMusica();

        return;
    }

    // ===================================
    // SI YA ESTÁ SONANDO ESTA MÚSICA
    // ===================================

    if(
        musicaActual &&
        musicaActual.src.includes(ruta) &&
        !musicaActual.paused
    ){

        return;
    }

    // ===================================
    // DETENER MÚSICA ANTERIOR
    // ===================================

    detenerMusica();

    // ===================================
    // CREAR NUEVA MÚSICA
    // ===================================

    musicaActual = new Audio(ruta);

    musicaActual.loop = true;

    musicaActual.volume = volumen;

    // ===================================
    // REPRODUCIR
    // ===================================

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

function detenerMusica(){

    if(!musicaActual){

        return;
    }

    musicaActual.pause();

    musicaActual.currentTime = 0;

    musicaActual.src = "";

    musicaActual = null;

}

// =======================================
// REPRODUCIR SFX
// =======================================

function reproducirSFX(nombre, volumen = 1){

    // ===================================
    // SONIDOS SILENCIADOS
    // ===================================

    if(!sonidosActivados()){

        console.log(
            "🔇 Sonidos silenciados."
        );

        return;
    }

    // ===================================
    // CREAR SONIDO
    // ===================================

    const sonido = new Audio(
        `assets/sounds/${nombre}`
    );

    sonido.volume = volumen;

    // ===================================
    // REPRODUCIR
    // ===================================

    sonido.play().catch(error => {

        console.warn(
            "No se pudo reproducir SFX:",
            nombre,
            error
        );

    });

}