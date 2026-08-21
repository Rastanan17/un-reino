// =======================================
// REINO DE MÍRRAFEN
// HUD DEL JUGADOR
// =======================================

// =======================================
// MOSTRAR HUD
// =======================================

function mostrarHUDJugador(){

    const visor = document.getElementById("visorPantalla");

    if(!visor){
        console.error("❌ No se encontró #visorPantalla");
        return;
    }

    // Evitar duplicarlo
    if(document.getElementById("playerHUD")){
        return;
    }
    const hud = document.getElementById("playerHUD");

    if(hud){
        hud.style.display = "none";
    }
    hud.id = "playerHUD";

    hud.innerHTML = `
        <div class="hudAvatar">
            <img
                id="hudPlayerAvatar"
                src=""
                alt="Avatar"
            >
        </div>

        <div class="hudLevel">
            ⚔️ <span id="hudPlayerLevel">1</span>
        </div>

        <div class="hudCoins">
            💰 <span id="hudPlayerCoins">0</span>
        </div>
    `;

    visor.prepend(hud);

    actualizarHUDJugador();
}

// =======================================
// ACTUALIZAR HUD
// =======================================

function actualizarHUDJugador(){

    const jugador = cargarJugador();

    if(!jugador){
        console.log("No hay perfil activo para el HUD");
        return;
    }

    const avatar =
        document.getElementById("hudPlayerAvatar");

    const nivel =
        document.getElementById("hudPlayerLevel");

    const oquos =
        document.getElementById("hudPlayerCoins");

    if(avatar){
        avatar.src = jugador.avatar;
    }

    if(nivel){
        nivel.textContent = jugador.nivel;
    }

    if(oquos){
        oquos.textContent = jugador.oquos;
    }
}