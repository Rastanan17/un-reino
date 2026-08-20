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
    // HISTORIAL
    // ===================================

    const historial =
        jugador.historial || [];

    // ===================================
    // ESCENARIO
    // ===================================

    content.innerHTML = `

        <section class="trono">

            <!-- ==========================
                 INFORMACIÓN DEL JUGADOR
            =========================== -->

            <div class="info-jugador-trono">

                <div>
                    👤 ${jugador.nombre}
                </div>

                <div>
                    ⭐ Nivel ${jugador.nivel}
                </div>

                <div>
                    👑 ${jugador.rango}
                </div>

            </div>

            <!-- ==========================
                 TRONO
            =========================== -->

            <div class="trono-real">

                <img
                    src="locations/throne/images/throne.png"
                    alt="Trono de Mírrafen"
                >

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
// GENERAR HISTORIAL
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
// SALIR DEL TRONO
// =======================================

function salirDelTrono(){

    console.log(
        "🚪 Saliendo del Trono → Mapa"
    );

    irA(
        "throne",
        "map",
        mostrarMapaReino
    );

}