// =======================================
// SISTEMA DE MÚSICA DEL REINO
// Un Reino en Mírrafen
// =======================================

let musicaActual = null;

// =======================================
// ESTADO DE MÚSICA
// =======================================

function musicaActivada(){

    return localStorage.getItem("musicaActivada") !== "false";

}

// =======================================
// ACTIVAR / DESACTIVAR MÚSICA
// =======================================

function toggleMusica(){

    const estadoActual = musicaActivada();

    if(estadoActual){

        // ===============================
        // SILENCIAR
        // ===============================

        localStorage.setItem(
            "musicaActivada",
            "false"
        );

        detenerMusica();

        console.log(
            "🔇 Música silenciada."
        );

    }else{

        // ===============================
        // ACTIVAR
        // ===============================

        localStorage.setItem(
            "musicaActivada",
            "true"
        );

        console.log(
            "🎵 Música activada."
        );

    }

    actualizarBotonMusica();
}

// =======================================
// ACTUALIZAR BOTÓN
// =======================================

function actualizarBotonMusica(){

    const boton =
        document.getElementById("botonMusica");

    if(!boton){
        return;
    }

    if(musicaActivada()){

        boton.textContent = "🔊 Música";

    }else{

        boton.textContent = "🔇 Música";

    }

}

// =======================================
// REPRODUCIR MÚSICA
// =======================================

function reproducirMusica(ruta, volumen = 0.5){

    // ===================================
    // MÚSICA SILENCIADA
    // ===================================

    if(!musicaActivada()){

        console.log(
            "🔇 Música silenciada. No se reproduce:",
            ruta
        );

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

    musicaActual.load();

    musicaActual = null;

}

// =======================================
// SILENCIAR TODO
// =======================================

function silenciarTodaLaMusica(){

    // ===================================
    // GUARDAR ESTADO
    // ===================================

    localStorage.setItem(
        "musicaActivada",
        "false"
    );

    // ===================================
    // DETENER MÚSICA CONTROLADA
    // ===================================

    detenerMusica();

    // ===================================
    // DETENER CUALQUIER AUDIO
    // QUE HAYA SIDO CREADO POR OTRO
    // SISTEMA DEL JUEGO
    // ===================================

    document.querySelectorAll("audio").forEach(audio => {

        audio.pause();

        audio.currentTime = 0;

    });

    console.log(
        "🔇 Toda la música del Reino fue silenciada."
    );

    actualizarBotonMusica();
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