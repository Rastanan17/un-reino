// =======================================
// TRONO DE MÍRRAFEN
// =======================================

// =======================================
// MOSTRAR TRONO
// =======================================

function mostrarTrono(){

    const jugador = cargarJugador();

    if(!jugador){

        console.warn(
            "⚠️ No se encontró el jugador activo."
        );

        return;
    }

    const content =
        document.getElementById("content");

    if(!content){

        console.error(
            "❌ No se encontró #content."
        );

        return;
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
    // HISTORIAL
    // ===================================

    const historial =
        jugador.historial || [];

    // ===================================
    // CONTENIDO DEL TRONO
    // ===================================

    content.innerHTML = `

        <section class="trono">

            <!-- ==========================
                 PERFIL DEL AVENTURERO
            =========================== -->

            <div class="perfil-trono">

                <div class="avatar-trono">

                    <img
                        src="${jugador.avatar}"
                        alt="Avatar de ${jugador.nombre}"
                    >

                </div>

                <div class="datos-trono">

                    <h1>
                        ${jugador.nombre}
                    </h1>

                    <div class="dato-trono">

                        ⚔️ Nivel
                        <strong>
                            ${jugador.nivel}
                        </strong>

                    </div>

                    <div class="dato-trono">

                        👑 ${jugador.rango}

                    </div>

                    <div class="dato-trono">

                        💰 ${jugador.oquos} Oquos

                    </div>

                    <div class="xp-trono">

                        <div class="xp-titulo">

                            ⭐ Experiencia

                        </div>

                        <div class="xp-bar-trono">

                            <div
                                class="xp-fill-trono"
                                style="
                                    width:${
                                        Math.min(
                                            (
                                                jugador.xp /
                                                jugador.xpNecesaria
                                            ) * 100,
                                            100
                                        )
                                    }%;
                                "
                            ></div>

                        </div>

                        <div class="xp-text-trono">

                            ${jugador.xp}
                            /
                            ${jugador.xpNecesaria}
                            XP

                        </div>

                    </div>

                </div>

            </div>

            <!-- ==========================
                 ESTADÍSTICAS
            =========================== -->

            <div class="estadisticas-trono">

                <div class="estadistica">

                    🗺️

                    <span>
                        Zonas restauradas
                    </span>

                    <strong>
                        ${jugador.zonasRestauradas || 0}${jugador.zonasRestauradas
                            ? jugador.zonasRestauradas.length
                            : 0
                        }
                    </strong>

                </div>

                <div class="estadistica">

                    🎯

                    <span>
                        Misiones completadas
                    </span>

                    <strong>
                        ${
                            jugador.misionesCompletadas
                                ? jugador.misionesCompletadas.length
                                : 0
                        }
                    </strong>

                </div>

                <div class="estadistica">

                    🔥

                    <span>
                        Racha
                    </span>

                    <strong>
                        ${jugador.racha || 0}
                    </strong>

                </div>

                <div class="estadistica">

                    🏆

                    <span>
                        Logros
                    </span>

                    <strong>
                        ${
                            jugador.logros
                                ? jugador.logros.length
                                : 0
                        }
                    </strong>

                </div>

            </div>

            <!-- ==========================
                 HISTORIAL
            =========================== -->

            <div
                id="historialTrono"
                class="historial-trono"
            >

                <div class="titulo-historial">

                    📜 HISTORIA DE TU REINO

                </div>

                <div class="lista-historial">

                    ${generarHistorialTrono(historial)}

                </div>

            </div>

            <!-- ==========================
                 SALIR
            =========================== -->

            <div
                class="trono-salida"
                onclick="salirDelTrono()"
            >

                <img
                    src="assets/images/items/exit.png"
                    alt="Salir"
                >

            </div>

        </section>

    `;

    console.log(
        "👑 Trono mostrado."
    );

}

// =======================================
// GENERAR HISTORIAL DEL TRONO
// =======================================

function generarHistorialTrono(historial){

    if(!historial.length){

        return `

            <div class="historial-vacio">

                📜

                <p>

                    Aún no hay acontecimientos
                    registrados.

                </p>

                <small>

                    El Reino espera tus hazañas...

                </small>

            </div>

        `;

    }

    // ===================================
    // MÁS RECIENTES PRIMERO
    // ===================================

    const acontecimientos =
        [...historial].reverse();

    return acontecimientos

        .map(acontecimiento => {

            let icono = "📜";

            if(acontecimiento.tipo === "nivel"){

                icono = "⭐";

            }

            if(acontecimiento.tipo === "rango"){

                icono = "👑";

            }

            if(acontecimiento.tipo === "zona"){

                icono = "🏰";

            }

            return `

                <div class="acontecimiento">

                    <div class="acontecimiento-fecha">

                        ${icono}

                        📅 ${acontecimiento.fecha}

                    </div>

                    <div class="acontecimiento-texto">

                        ${acontecimiento.texto}

                    </div>

                </div>

            `;

        })

        .join("");

}

// =======================================
// SALIR DEL TRONO → CASTILLO
// =======================================

function salirDelTrono(){

    console.log(
        "🚪 Saliendo del Trono → Castillo"
    );

    // ===================================
    // MOSTRAR HUD NUEVAMENTE
    // ===================================

    const hud =
        document.getElementById("playerHUD");

    if(hud){

        hud.style.display = "flex";

    }

    // ===================================
    // VOLVER AL CASTILLO
    // ===================================

    mostrarCastillo();

}