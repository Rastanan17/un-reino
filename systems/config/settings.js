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