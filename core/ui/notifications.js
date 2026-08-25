// =======================================
// UN REINO EN MÍRRAFEN
// SISTEMA DE NOTIFICACIONES
// =======================================

// =======================================
// MOSTRAR NOTIFICACIÓN
// =======================================

function mostrarNotificacion(tipo, titulo, texto){

    const contenedor =
        document.getElementById("notificaciones");

    if(!contenedor){
        console.warn(
            "⚠️ No se encontró #notificaciones."
        );
        return;
    }

    const notificacion =
        document.createElement("div");

    notificacion.className =
        `notificacion notificacion-${tipo}`;

    notificacion.innerHTML = `
        <div class="notificacionTitulo">
            ${titulo}
        </div>

        <div class="notificacionTexto">
            ${texto}
        </div>
    `;

    contenedor.appendChild(notificacion);

    // -----------------------------------
    // MOSTRAR
    // -----------------------------------

    requestAnimationFrame(() => {

        notificacion.classList.add(
            "notificacionVisible"
        );

    });

    // -----------------------------------
    // OCULTAR
    // -----------------------------------

    setTimeout(() => {

        notificacion.classList.remove(
            "notificacionVisible"
        );

        setTimeout(() => {

            notificacion.remove();

        }, 500);

    }, 3000);
}

// =======================================
// NOTIFICACIONES PREDEFINIDAS
// =======================================

function notificarXP(cantidad){

    mostrarNotificacion(
        "xp",
        "⭐ ¡XP obtenida!",
        `+${cantidad} XP`
    );

}

function notificarOquos(cantidad){

    mostrarNotificacion(
        "oquos",
        "💰 ¡Oquos obtenidos!",
        `+${cantidad} Oquos`
    );

}

function notificarNivel(nivel){

    mostrarNotificacion(
        "nivel",
        "✨ ¡SUBISTE DE NIVEL!",
        `Ahora sos nivel ${nivel}`
    );

    // -----------------------------------
    // VICTORIA DEL AVATAR
    // -----------------------------------

    if(typeof reproducirAnimacionTutorial === "function"){

        reproducirAnimacionTutorial(
            "victoria"
        );

    }

}

function notificarZona(nombre){

    mostrarNotificacion(
        "zona",
        "🗺️ ¡Nueva zona desbloqueada!",
        nombre
    );

}

function notificarLogro(nombre){

    mostrarNotificacion(
        "logro",
        "🏆 ¡Nuevo logro!",
        nombre
    );

}