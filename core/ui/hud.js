// =======================================
// REINO DE MÍRRAFEN
// HUD DEL JUGADOR
// =======================================

// =======================================
// MOSTRAR HUD
// =======================================

function mostrarHUDJugador(){

    const visor =
        document.getElementById("visorPantalla");

    if(!visor){

        console.error(
            "❌ No se encontró #visorPantalla"
        );

        return;
    }

    // ===================================
    // EVITAR DUPLICAR EL HUD
    // ===================================

    let hud =
        document.getElementById("playerHUD");

    if(!hud){

        visor.insertAdjacentHTML(
            "afterbegin",

            `
                <div id="playerHUD">

                    <div class="hudAvatar">

                        <img
                            id="hudPlayerAvatar"
                            src=""
                            alt="Avatar"
                        >

                    </div>

                    <div class="hudLevel">

                        ⚔️

                        <span id="hudPlayerLevel">
                            1
                        </span>

                    </div>

                    <div class="hudCoins">

                        💰

                        <span id="hudPlayerCoins">
                            0
                        </span>

                    </div>

                </div>
            `
        );

    }

    // ===================================
    // ASEGURAR QUE ESTÉ VISIBLE
    // ===================================

    hud =
        document.getElementById("playerHUD");

    if(hud){

        hud.style.display = "flex";

    }

    actualizarHUDJugador();

}

// =======================================
// ACTUALIZAR HUD
// =======================================

function actualizarHUDJugador(){

    const jugador = cargarJugador();

    if(!jugador){

        console.log(
            "No hay perfil activo para el HUD"
        );

        return;

    }

    const avatar =
        document.getElementById("hudPlayerAvatar");

    const nivel =
        document.getElementById("hudPlayerLevel");

    const oquos =
        document.getElementById("hudPlayerCoins");

    // ===================================
    // AVATAR
    // ===================================

    if(avatar){

        avatar.src = jugador.avatar;

    }

    // ===================================
    // NIVEL
    // ===================================

    if(nivel){

        nivel.textContent =
            jugador.nivel;

    }

    // ===================================
    // OQUOS
    // ===================================

    if(oquos){

        oquos.textContent =
            jugador.oquos;

    }

}