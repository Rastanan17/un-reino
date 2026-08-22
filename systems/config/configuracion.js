// =======================================
// REINO DE MÍRRAFEN
// PANEL DE CONFIGURACIÓN
// =======================================

// =======================================
// MOSTRAR / OCULTAR CONFIGURACIÓN
// =======================================

function toggleConfiguracion(){

    const panel =
        document.getElementById("panelConfiguracion");

    if(panel){

        panel.remove();

        return;

    }

    mostrarConfiguracion();

}

// =======================================
// MOSTRAR CONFIGURACIÓN
// =======================================

function mostrarConfiguracion(){

    const visor =
        document.getElementById("visorPantalla");

    if(!visor){

        console.error(
            "❌ No se encontró #visorPantalla"
        );

        return;

    }

    const panel =
        document.createElement("div");

    panel.id =
        "panelConfiguracion";

    panel.innerHTML = `

        <div class="configuracion">

            <div class="configuracion-titulo">

                ⚙️ CONFIGURACIÓN

            </div>

            <button
                class="configuracion-opcion"
                onclick="alternarMusica()"
            >

                🎵

                <span>
                    Música
                </span>

                <strong id="estadoMusica">
                    ACTIVADA
                </strong>

            </button>

            <button
                class="configuracion-opcion"
                onclick="alternarSonidos()"
            >

                🔊

                <span>
                    Sonidos
                </span>

                <strong id="estadoSonidos">
                    ACTIVADOS
                </strong>

            </button>

            <button
                class="configuracion-opcion"
                onclick="cambiarPerfilDesdeConfiguracion()"
            >

                👤

                <span>
                    Cambiar perfil
                </span>

            </button>

            <button
                class="configuracion-cerrar"
                onclick="toggleConfiguracion()"
            >

                ✕

            </button>

        </div>

    `;

    visor.appendChild(panel);

    actualizarEstadoConfiguracion();

}
// =======================================
// CAMBIAR PERFIL DESDE CONFIGURACIÓN
// =======================================

function cambiarPerfilDesdeConfiguracion(){

    console.log(
        "👤 Cambiando perfil → Portal"
    );

    // ===================================
    // CERRAR CONFIGURACIÓN
    // ===================================

    const panel =
        document.getElementById("panelConfiguracion");

    if(panel){
        panel.remove();
    }

    // ===================================
    // OCULTAR HUD
    // ===================================

    const hud =
        document.getElementById("playerHUD");

    if(hud){
        hud.style.display = "none";
    }

    // ===================================
    // SONIDO
    // ===================================

    reproducirSFX(
        "open_place.wav"
    );

    // ===================================
    // IR AL PORTAL
    // ===================================

    irA(
        "map",
        "portal",
        mostrarPortal
    );

}
// =======================================
// MÚSICA ON / OFF
// =======================================

function alternarMusica(){

    const config =
        obtenerConfiguracionAudio();

    config.musica =
        !config.musica;

    guardarConfiguracionAudio(config);

    // ===================================
    // MÚSICA OFF
    // ===================================

    if(!config.musica){

        detenerMusica();

        console.log(
            "🔇 Música desactivada."
        );

    }

    // ===================================
    // MÚSICA ON
    // ===================================

    else{

        console.log(
            "🎵 Música activada."
        );

    }

    actualizarEstadoConfiguracion();

}
// =======================================
// SONIDOS ON / OFF
// =======================================

function alternarSonidos(){

    const config =
        obtenerConfiguracionAudio();

    config.sonidos =
        !config.sonidos;

    guardarConfiguracionAudio(config);

    console.log(

        config.sonidos

            ? "🔊 Sonidos activados."

            : "🔇 Sonidos desactivados."

    );

    actualizarEstadoConfiguracion();

}
// =======================================
// ACTUALIZAR ESTADOS DEL PANEL
// =======================================

function actualizarEstadoConfiguracion(){

    const config =
        obtenerConfiguracionAudio();

    const estadoMusica =
        document.getElementById("estadoMusica");

    const estadoSonidos =
        document.getElementById("estadoSonidos");

    if(estadoMusica){

        estadoMusica.textContent =
            config.musica
                ? "ACTIVADA"
                : "SILENCIADA";

    }

    if(estadoSonidos){

        estadoSonidos.textContent =
            config.sonidos
                ? "ACTIVADOS"
                : "SILENCIADOS";

    }

}
function musicaActivada(){

    const config =
        obtenerConfiguracionAudio();

    return config.musica;
}

function sonidosActivados(){

    const config =
        obtenerConfiguracionAudio();

    return config.sonidos;
}