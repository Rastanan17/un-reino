const MAX_NIVEL = 100;

const XP_BASE = 100;

const OQUOS_INICIALES = 50;

const TIEMPO_VIDEO = 5000;

// =======================================
// 🐸 MODO DESARROLLO
// =======================================
//
// El Modo Sapo se activa únicamente
// cuando el juego se ejecuta localmente.
//
// 127.0.0.1 / localhost → 🐸 ACTIVO
// GitHub / producción   → 🔒 DESACTIVADO
//
// No se guarda en localStorage.
// No necesita cambiarse manualmente.
// =======================================

const ENTORNO_DESARROLLO =
    location.hostname === "127.0.0.1" ||
    location.hostname === "localhost";

const MODO_DESARROLLO =
    ENTORNO_DESARROLLO;

    // =======================================
// 🔊 CONFIGURACIÓN DE AUDIO
// =======================================

const CONFIG_AUDIO_KEY = "configuracionAudio";


// =======================================
// CONFIGURACIÓN POR DEFECTO
// =======================================

const CONFIG_AUDIO_DEFAULT = {

    musica: true,
    sonidos: true

};


// =======================================
// OBTENER CONFIGURACIÓN DE AUDIO
// =======================================

function obtenerConfiguracionAudio(){

    const guardado =
        localStorage.getItem(CONFIG_AUDIO_KEY);

    if(!guardado){

        return {
            ...CONFIG_AUDIO_DEFAULT
        };

    }

    try{

        return {
            ...CONFIG_AUDIO_DEFAULT,
            ...JSON.parse(guardado)
        };

    }
    catch(error){

        console.warn(
            "⚠️ No se pudo leer la configuración de audio.",
            error
        );

        return {
            ...CONFIG_AUDIO_DEFAULT
        };

    }

}


// =======================================
// GUARDAR CONFIGURACIÓN DE AUDIO
// =======================================

function guardarConfiguracionAudio(config){

    localStorage.setItem(
        CONFIG_AUDIO_KEY,
        JSON.stringify(config)
    );

}


// =======================================
// ¿MÚSICA ACTIVADA?
// =======================================

function musicaActivada(){

    return obtenerConfiguracionAudio().musica;

}


// =======================================
// ¿SONIDOS ACTIVADOS?
// =======================================

function sonidosActivados(){

    return obtenerConfiguracionAudio().sonidos;

}