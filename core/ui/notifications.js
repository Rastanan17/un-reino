// =======================================
// UN REINO EN MÍRRAFEN
// SISTEMA DE NOTIFICACIONES
// =======================================
// =======================================
// MOSTRAR NOTIFICACIÓN
// =======================================
function mostrarNotificacion(tipo, titulo, texto){
    const contenedor = document.getElementById("notificaciones");
    if(!contenedor){
        console.warn(
            "⚠️ No se encontró #notificaciones."
        );
        return;
    }
    const notificacion = document.createElement("div");
    notificacion.className = `notificacion notificacion-${tipo}`;
    notificacion.innerHTML = `
        <div class="notificacionTitulo">
            ${titulo}
        </div>
        <div class="notificacionTexto">
            ${texto}
        </div>
    `;
    contenedor.appendChild(notificacion);
    console.log(
        "🔔 Notificación creada:",
        tipo,
        titulo,
        texto
    );
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
// =======================================
// 🏆 MODAL — MISIÓN LISTA PARA RECLAMAR
// =======================================
function notificarMisionLista(zona, idMision){
    console.log(
        "🔔 NOTIFICAR MISIÓN:",
        zona,
        idMision
    );
    mostrarModalMisionTerminada(
        zona,
        idMision
    );
    console.log(
        "🏆 mostrarModalMisionTerminada ejecutada"
    );
    reproducirSFX("level_up.wav");
}
// =======================================
// 🏆 MOSTRAR MODAL DE MISIÓN TERMINADA
// =======================================
function mostrarModalMisionTerminada(zona, idMision){
 console.log(
        "🪟 CREANDO MODAL:",
        zona,
        idMision
    );
    // -----------------------------------
    // EVITAR DUPLICAR MODALES
    // -----------------------------------
    const modalExistente =
        document.getElementById("modalMisionTerminada");
    if(modalExistente){
        return;
    }
    // -----------------------------------
    // CREAR MODAL
    // -----------------------------------
    const modal =
        document.createElement("section");
    modal.id = "modalMisionTerminada";
    modal.className = "modal-mision-terminada";
    // -----------------------------------
    // CONTENEDOR
    // -----------------------------------
    modal.innerHTML = `
        <div class="modal-mision-panel">
            <button
                class="modal-mision-cerrar"
                id="btnCerrarModalMision"
                aria-label="Cerrar">
                ❌
            </button>
            <div class="modal-mision-titulo">
                🏆 ¡MISIÓN COMPLETADA!
            </div>
            <div
                id="misionVictoriaAvatar"
                class="mision-victoria-avatar">
            </div>
            <div class="modal-mision-texto">
                <p>
                    La misión ha terminado.
                </p>
                <p>
                    Volvé a
                    <strong>${zona}</strong>
                    para reclamar tu recompensa.
                </p>
            </div>
            <div class="modal-mision-acciones">
                <button
                    class="modal-mision-reclamar"
                    id="btnReclamarMision">
                    🏆 Reclamar misión
                </button>
            </div>
        </div>
    `;
    // -----------------------------------
    // AGREGAR AL DOM
    // -----------------------------------
    const reinoUI = document.getElementById("reinoUI");
    if(reinoUI){
        reinoUI.appendChild(modal);
    }else{
        document.body.appendChild(modal);
    }
    // -----------------------------------
    // BOTÓN CERRAR
    // -----------------------------------
    const botonCerrar =
        document.getElementById(
            "btnCerrarModalMision"
        );
    if(botonCerrar){
        botonCerrar.onclick = () => {
            cerrarModalMisionTerminada();
        };
    }
    // -----------------------------------
    // BOTÓN RECLAMAR
    // -----------------------------------
    const botonReclamar =
        document.getElementById(
            "btnReclamarMision"
        );
    if(botonReclamar){
        botonReclamar.onclick = () => {
            reclamarMisionTerminada(
                zona,
                idMision
            );
        };
    }
    // -----------------------------------
    // MOSTRAR
    // -----------------------------------
    requestAnimationFrame(() => {
        modal.classList.add(
            "modal-mision-visible"
        );
    });
    // -----------------------------------
    // ANIMACIÓN VICTORIA
    // -----------------------------------
    reproducirVictoriaMision();
}
// =======================================
// 🏆 ANIMACIÓN VICTORIA
// =======================================
let animacionVictoriaMisionTimer = null;
function reproducirVictoriaMision(){
    const avatar =
        document.getElementById(
            "misionVictoriaAvatar"
        );
    if(!avatar){
        return;
    }
    // -----------------------------------
    // DETENER ANIMACIÓN ANTERIOR
    // -----------------------------------
    if(animacionVictoriaMisionTimer){
        clearInterval(
            animacionVictoriaMisionTimer
        );
        animacionVictoriaMisionTimer = null;
    }
    // -----------------------------------
    // DATOS DE VICTORIA
    // -----------------------------------
    const animacion =
        ANIMACIONES_TUTORIAL.victoria;
    let indice = 0;
    // -----------------------------------
    // CONFIGURAR PRIMER FRAME
    // -----------------------------------
    configurarAvatarMision(
        avatar,
        animacion.fila,
        animacion.frames[indice]
    );
    // -----------------------------------
    // AVANZAR FRAMES EN BUCLE
    // -----------------------------------
    animacionVictoriaMisionTimer =
        setInterval(() => {
            indice++;
            // --------------------------------
            // VOLVER AL PRIMER FRAME
            // --------------------------------
            if(
                indice >=
                animacion.frames.length
            ){
                indice = 0;
            }
            configurarAvatarMision(
                avatar,
                animacion.fila,
                animacion.frames[indice]
            );
        }, animacion.velocidad);
}
// =======================================
// 🎭 CONFIGURAR AVATAR DEL MODAL
// =======================================
function configurarAvatarMision(
    avatar,
    fila,
    columna
){
    if(!avatar){
        return;
    }
    let columnas;
    if(fila === 3){
        columnas =
            COLUMNAS_FILA_3;
    }
    else if(fila === 2){
        columnas =
            COLUMNAS_FILA_2;
    }
    else{
        columnas =
            COLUMNAS_FILA_1;
    }
    const frameAncho =
        SPRITE_ANCHO / columnas;
    const frameAlto =
        SPRITE_ALTO / SPRITE_FILAS;
    // -----------------------------------
    // IMAGEN
    // -----------------------------------
    avatar.style.backgroundImage =
        `url("${obtenerRutaAvatarTutorial()}")`;
    avatar.style.backgroundRepeat =
        "no-repeat";
    avatar.style.backgroundSize =
        `${SPRITE_ANCHO}px ${SPRITE_ALTO}px`;
    // -----------------------------------
    // POSICIÓN
    // -----------------------------------
    const posicionX =
        (columna - 1) * frameAncho;
    const posicionY =
        (fila - 1) * frameAlto;
    avatar.style.backgroundPosition =
        `-${posicionX}px -${posicionY}px`;
    // -----------------------------------
    // TAMAÑO
    // -----------------------------------
    avatar.style.width =
        `${frameAncho}px`;
    avatar.style.height =
        `${frameAlto}px`;
}
// =======================================
// ❌ CERRAR MODAL DE MISIÓN
// =======================================
function cerrarModalMisionTerminada(){
    const modal =
        document.getElementById(
            "modalMisionTerminada"
        );
    if(!modal){
        return;
    }
    if(animacionVictoriaMisionTimer){
        clearInterval(
            animacionVictoriaMisionTimer
        );
        animacionVictoriaMisionTimer = null;
    }
    modal.classList.remove(
        "modal-mision-visible"
    );
    setTimeout(() => {
        modal.remove();
    }, 250);
}
// =======================================
// 🏆 RECLAMAR MISIÓN TERMINADA
// =======================================
function reclamarMisionTerminada(zona, idMision){
    console.log("🏆 Reclamar misión:", zona, idMision);
    // -----------------------------------
    // CERRAR MODAL
    // -----------------------------------
    cerrarModalMisionTerminada();
    // -----------------------------------
    // 🏰 CASTILLO
    // -----------------------------------
    if(zona === "Castillo"){
        irA("map", "castle", () => {
            console.log("🏰 Llegamos al Castillo para reclamar:", idMision);
            filtroZona = "Castillo";
            mostrarMisiones();
        });
        return;
   }
    // -----------------------------------
    // 🏡 ALDEA
    // -----------------------------------
    if(zona === "Aldea"){
        irA("map", "village", () => {
            console.log("🏡 Llegamos a la Aldea para reclamar:", idMision);
            filtroZona = "Aldea";
            mostrarMisiones();
        });
        return;
    }
    // -----------------------------------
    // 🌾 GRANJA
    // -----------------------------------
    if(zona === "Granja"){
        irA("map", "farm", () => {
            console.log("🌾 Llegamos a la Granja para reclamar:", idMision);
            filtroZona = "Granja";
            mostrarMisiones();
        });
        return;
    }
    // -----------------------------------
    // 🌲 BOSQUE
    // -----------------------------------
    if(zona === "Bosque"){
        irA("map", "forest", () => {
            console.log("🌲 Llegamos al Bosque para reclamar:", idMision);
            filtroZona = "Bosque";
            mostrarMisiones();
        });
        return;
    }
   // -----------------------------------
    // 🔭 OBSERVATORIO
    // -----------------------------------
    if(zona === "Observatorio"){
        irA("map", "observatory", () => {
            console.log("🔭 Llegamos al Observatorio para reclamar:", idMision);
            filtroZona = "Observatorio";
            mostrarMisiones();
        });
        return;
    }
    // -----------------------------------
    // ⚠️ ZONA NO CONFIGURADA
    // -----------------------------------
    console.warn("⚠️ No existe navegación para reclamar misión en:", zona);
}