// =======================================
// REINO DE MÍRRAFEN
// SISTEMA DE COMPENSACIÓN
// =======================================

function revisarCompensacion(){
    const jugador = cargarJugador();

    if(!jugador){
        return;
    }

    if(jugador.compensacionPendiente){
        mostrarPergaminoCompensacion(
            "Los ladrones de Mírrafen",
            `
            Durante tu ausencia,
            unos malvados ladrones intentaron
            saquear el Reino.

            Nuestros cazadores fueron tras ellos
            y lograron recuperar parte de tus tesoros.

            El Reino te entrega esta compensación
            por las pérdidas sufridas.
            `,
            {xp:100,oquos:500}
        );
    }
}

function mostrarPergaminoCompensacion(titulo, texto, recompensa){
    const modal = document.createElement("div");

    modal.className = "modalPergamino";

    modal.innerHTML = `
        <div class="pergamino">
            <div class="pergaminoTexto">
                <h2>📜 Mensaje del Reino</h2>
                <h3>${titulo}</h3>
                <p>${texto}</p>
                <p>
                    🎁 Recompensa:
                    <br>⭐ +${recompensa.xp} XP
                    <br>💰 +${recompensa.oquos} Oquos
                </p>
            </div>

            <div class="pergaminoBotones">
                <button id="aceptarCompensacion">📜 Reclamar</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("aceptarCompensacion").addEventListener("click", () => {
        const jugador = cargarJugador();

        jugador.xp += recompensa.xp;
        jugador.oquos += recompensa.oquos;
        jugador.compensacionPendiente = false;

        guardarJugador(jugador);
        actualizarPerfil();

        modal.remove();
    });
}