// =======================================
// CASTILLO DE MÍRRAFEN
// =======================================
// =======================================
// DIÁLOGOS DE LOS GUARDIAS
// =======================================
let origenArmeria = "castillo";
let dialogosGuardias = [];
let cargandoDialogosGuardias = null;
async function cargarDialogosGuardias(){
    if(cargandoDialogosGuardias){
        return cargandoDialogosGuardias;
    }
    cargandoDialogosGuardias = fetch("locations/castle/data/castle.json")
    .then(respuesta => {
        if(!respuesta.ok){
            throw new Error("No se pudo cargar castle.json");
        }
        return respuesta.json();
    })
    .then(datos => {
        dialogosGuardias = datos;
        console.log("DIÁLOGOS DE GUARDIAS CARGADOS:", dialogosGuardias);
        return dialogosGuardias;
    })
    .catch(error => {
        console.error("Error cargando diálogos de guardias:", error);
        return [];
    });
    return cargandoDialogosGuardias;
}
// =======================================
// CASTILLO
// =======================================
function mostrarCastillo(){
    const jugador = cargarJugador();
    
    if (!jugador) {
        return;
    }
    const momento =
        obtenerMomentoDelDia();

    console.log(
        "🕐 Momento del día:",
        momento
    );
    reproducirMusica("assets/sounds/ambient_castle.mp3",
        0.35
    );
    const content = document.getElementById("content");
    content.innerHTML = `
        <section class="castillo momento-${momento}">
            <!-- ===========================
                 GUARDIAS
            ============================ -->
            <div class="guardias1" onclick="reproducirSonidoCastillo('assets/sounds/man_talk.mp3'); hablarGuardias1()">
                <h2 class="name">Guardias</h2>
                <img src="locations/castle/images/guards_1.png" alt="Guardias">
            </div>
            <div class="guardias2" onclick="reproducirSonidoCastillo('assets/sounds/man_talk.mp3'); hablarGuardias2()">
                <h2 class="name">Guardias</h2>
                <img src="locations/castle/images/guards_2.png" alt="Guardias">
            </div>
            <!-- ===========================
                 OBJETOS
            ============================ -->
            <div class="objeto trono" onclick="reproducirSFX('open_place.wav'); mostrarPerfilJugador()">
                <img src="locations/castle/images/throne.png" alt="Trono">
                <h2 class="name">Trono</h2>
            </div>
            <div class="objeto tablon" onclick="reproducirSFX('open_place.wav'); cargarMisionesCastillo()">
                <h2 class="name">Misiones</h2>
                <img src="locations/castle/images/missions.png" alt="Tablón">
            </div>
            <div class="objeto armeria" onclick="reproducirSFX('open_place.wav'); entrarArmeriaDesdeCastillo()">
                <h2 class="name">Armería</h2>
                <img src="locations/castle/images/armery.png" alt="Armería">
            </div>
            <div class="objeto salir" onclick="reproducirSFX('exit.mp3'); irA('castle', 'map', mostrarMapaReino)">
                <h2 class="name">Salir</h2>
                <img src="locations/castle/images/exit.png" alt="Salir">
            </div>
            <!-- ===========================
                 LUCES
            ============================ -->
            <div class="objeto light1" onclick="reproducirSonidoCastillo('assets/sounds/touch.mp3')">
                <img src="locations/castle/images/light_1.png" alt="Luz">
            </div>
            <div class="objeto light2" onclick="reproducirSonidoCastillo('assets/sounds/touch.mp3')">
                <img src="locations/castle/images/light_2.png" alt="Luz">
            </div>
            <div class="objeto light3" onclick="reproducirSonidoCastillo('assets/sounds/touch.mp3')">
                <img src="locations/castle/images/light_3.png" alt="Luz">
            </div>
            <div class="objeto light4" onclick="reproducirSonidoCastillo('assets/sounds/touch.mp3')">
                <img src="locations/castle/images/light_4.png" alt="Luz">
            </div>
        </section>
    `;
    // Cargar diálogos si todavía no están cargados
    if(dialogosGuardias.length === 0){
        cargarDialogosGuardias();
    }
}
// =======================================
// REPRODUCIR SONIDO DEL CASTILLO
// =======================================
function reproducirSonidoCastillo(ruta){
    const audio = new Audio(ruta);
    audio.volume = 0.8;
    audio.play().catch(error => {
        console.warn("No se pudo reproducir el sonido:", error);
    });
    // Máximo 5 segundos
    setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
    }, 5000);
}
function entrarArmeriaDesdeCastillo(){

    origenArmeria = "castillo";

    mostrarArmeria();
}
// =======================================
// HABLAR CON GUARDIAS 1
// =======================================
function hablarGuardias1(){
    mostrarDialogoGuardia("guardias1");
}
// =======================================
// HABLAR CON GUARDIAS 2
// =======================================
function hablarGuardias2(){
    mostrarDialogoGuardia("guardias2");
}
// =======================================
// MOSTRAR DIÁLOGO DE GUARDIA
// =======================================
async function mostrarDialogoGuardia(guardia){
    // Si todavía no cargamos los diálogos,
    // esperamos a que termine la carga.
    if(dialogosGuardias.length === 0){
        await cargarDialogosGuardias();
    }
    const disponibles = dialogosGuardias.filter(
        dialogo => dialogo.guardia === guardia
    );
    // Si no encontramos diálogos
    if(disponibles.length === 0){
        mostrarMensaje("🛡️ Guardia del Castillo",
            "No tengo nada que decirte, ciudadano..."
        );
        return;
    }
    // Elegir uno al azar
    const dialogo = disponibles[
        Math.floor(Math.random() * disponibles.length)
    ];
    mostrarMensaje("🛡️ Guardia del Castillo",dialogo.texto);
}
// =======================================
// PERFIL DEL JUGADOR — TRONO
// =======================================
function mostrarPerfilJugador(){

    const jugador = cargarJugador();

    if(!jugador){
        return;
    }

    // ===================================
    // ACTUALIZAR AVATAR
    // ===================================

    const avatar =
        jugador.avatar ||
        jugador.foto ||
        "kingdom/portal/avatars/explorer.jpg";

    document.getElementById("playerAvatar").src = avatar;

    // ===================================
    // ACTUALIZAR NOMBRE
    // ===================================

    document.getElementById("playerName").textContent =
        jugador.nombre || "Aventurero";

    // ===================================
    // ACTUALIZAR NIVEL
    // ===================================

    document.getElementById("playerLevel").textContent =
        jugador.nivel || 1;

    // ===================================
    // ACTUALIZAR RANGO
    // ===================================

    document.getElementById("playerRank").textContent =
        jugador.rango || "Aprendiz";

    // ===================================
    // ACTUALIZAR OQUOS
    // ===================================

    document.getElementById("playerCoins").textContent =
        jugador.oquos || 0;

    // ===================================
    // ACTUALIZAR XP
    // ===================================

    const xpActual = jugador.xp || 0;
    const xpNecesaria = jugador.xpNecesaria || 100;

    document.getElementById("playerXP").textContent =
        xpActual;

    document.getElementById("playerNextXP").textContent =
        xpNecesaria;

    // ===================================
    // BARRA DE XP
    // ===================================

    const porcentajeXP =
        Math.min((xpActual / xpNecesaria) * 100, 100);

    document.getElementById("xpFill").style.width =
        `${porcentajeXP}%`;

    // ===================================
    // MOSTRAR TRONO
    // ===================================

    document.getElementById("panelJugador").style.display = "flex";
}
function cerrarPanelJugador(){
    document.getElementById("panelJugador").style.display = "none";
}
// =======================================
// ARMERÍA
// =======================================
function mostrarArmeria(){

    const jugador = cargarJugador();

    if(!jugador){
        return;
    }

    // ===================================
    // DATOS ACTUALES
    // ===================================

    const nombreActual = jugador.nombre || "";
    const rangoActual = jugador.rangoEdad || "6-8";

    let avatarActual =
        jugador.avatar ||
        jugador.foto ||
        "kingdom/portal/avatars/explorer.jpg";

    // ===================================
    // MOSTRAR ARMERÍA
    // ===================================

    const content = document.getElementById("content");

    content.innerHTML = `

        <section class="portal">

            <h1>🛡️ Armería de Mírrafen</h1>

            <p>
                Aquí puedes preparar a tu aventurero.
            </p>

            <!-- ==========================
                 NOMBRE
            =========================== -->

            <h3>✏️ Nombre</h3>

            <input
                id="editarNombreArmeria"
                value="${nombreActual}"
                placeholder="Nombre del aventurero"
            >

            <br><br>

            <!-- ==========================
                 RANGO DE EDAD
            =========================== -->

            <h3>🎂 Rango de edad</h3>

            <select id="editarRangoEdadArmeria">

                <option
                    value="6-8"
                    ${rangoActual === "6-8" ? "selected" : ""}
                >
                    6 a 8 años
                </option>

                <option
                    value="9-11"
                    ${rangoActual === "9-11" ? "selected" : ""}
                >
                    9 a 11 años
                </option>

                <option
                    value="12-14"
                    ${rangoActual === "12-14" ? "selected" : ""}
                >
                    12 a 14 años
                </option>

                <option
                    value="15-17"
                    ${rangoActual === "15-17" ? "selected" : ""}
                >
                    15 a 17 años
                </option>

            </select>

            <br><br>

            <!-- ==========================
                 AVATAR
            =========================== -->

            <h3>🧙 Elige tu personaje</h3>

            <div class="selectorAvatares">

                <div
                    class="avatarCard ${avatarActual.includes("explorer") ? "seleccionado" : ""}"
                    onclick="seleccionarAvatar('kingdom/portal/avatars/explorer.jpg', this)"
                >
                    <img src="kingdom/portal/avatars/explorer.jpg">
                    <span>Explorador</span>
                </div>

                <div
                    class="avatarCard ${avatarActual.includes("alien") ? "seleccionado" : ""}"
                    onclick="seleccionarAvatar('kingdom/portal/avatars/alien.jpg', this)"
                >
                    <img src="kingdom/portal/avatars/alien.jpg">
                    <span>Alien</span>
                </div>

                <div
                    class="avatarCard ${avatarActual.includes("dwarf") ? "seleccionado" : ""}"
                    onclick="seleccionarAvatar('kingdom/portal/avatars/dwarf.jpg', this)"
                >
                    <img src="kingdom/portal/avatars/dwarf.jpg">
                    <span>Enano</span>
                </div>

                <div
                    class="avatarCard ${avatarActual.includes("elf") ? "seleccionado" : ""}"
                    onclick="seleccionarAvatar('kingdom/portal/avatars/elf.jpg', this)"
                >
                    <img src="kingdom/portal/avatars/elf.jpg">
                    <span>Elfo</span>
                </div>

                <div
                    class="avatarCard ${avatarActual.includes("witch") ? "seleccionado" : ""}"
                    onclick="seleccionarAvatar('kingdom/portal/avatars/witch.jpg', this)"
                >
                    <img src="kingdom/portal/avatars/witch.jpg">
                    <span>Bruja</span>
                </div>

                <div
                    class="avatarCard ${avatarActual.includes("wolf") ? "seleccionado" : ""}"
                    onclick="seleccionarAvatar('kingdom/portal/avatars/wolf.jpg', this)"
                >
                    <img src="kingdom/portal/avatars/wolf.jpg">
                    <span>Lobo</span>
                </div>

            </div>

            <br>

            <!-- ==========================
                 BOTONES
            =========================== -->

            <button onclick="guardarEdicionDesdeArmeria()">
                💾 Guardar cambios
            </button>

            <button onclick="volverDesdeArmeria()">
    ← Volver
</button>

        </section>

    `;

    // ===================================
    // AVATAR ACTUAL
    // ===================================

    avatarSeleccionado = avatarActual;
}

// =======================================
// VOLVER DESDE LA ARMERÍA
// =======================================

function volverDesdeArmeria(){

    if(origenArmeria === "aldea"){

        mostrarAldea();

        return;
    }

    if(origenArmeria === "granja"){

        mostrarGranja();

        return;
    }

    if(origenArmeria === "castillo"){

        mostrarCastillo();

        return;
    }

    // ===================================
    // DESTINO POR DEFECTO
    // ===================================

    mostrarCastillo();

}

// =======================================
// GUARDAR EDICIÓN DESDE ARMERÍA
// =======================================

function guardarEdicionDesdeArmeria(){

    const jugador = cargarJugador();

    if(!jugador){
        return;
    }

    // ===================================
    // NUEVOS DATOS
    // ===================================

    const inputNombre =
        document.getElementById("editarNombreArmeria");

    const selectRango =
        document.getElementById("editarRangoEdadArmeria");

    if(!inputNombre || !selectRango){
        console.error(
            "No se encontraron los campos de edición de la Armería."
        );
        return;
    }

    const nuevoNombre =
        inputNombre.value.trim();

    const nuevoRangoEdad =
        selectRango.value;

    // ===================================
    // VALIDAR NOMBRE
    // ===================================

    if(nuevoNombre === ""){

        mostrarMensaje(
            "⚠️ Falta un nombre",
            "Escribí un nombre para tu aventurero."
        );

        return;
    }

    // ===================================
    // ACTUALIZAR SOLAMENTE
    // LOS DATOS EDITABLES
    // ===================================

    jugador.nombre = nuevoNombre;

    jugador.rangoEdad = nuevoRangoEdad;

    jugador.avatar = avatarSeleccionado;

    jugador.foto = avatarSeleccionado;

    // ===================================
    // GUARDAR
    // ===================================

    guardarJugador(jugador);

    console.log(
        "🛡️ Perfil actualizado desde la Armería:",
        jugador
    );

    // ===================================
    // MOSTRAR CONFIRMACIÓN
    // ===================================

    mostrarMensaje(
        "🛡️ Datos cambiados",
        "Los datos de tu aventurero fueron actualizados correctamente."
    );

    // ===================================
    // CONTINUAR → VOLVER AL LUGAR DE ORIGEN
    // ===================================

    document.getElementById("cerrarModal").onclick = function(){

        document.getElementById("modal").classList.add("oculto");

        if(origenArmeria === "aldea"){

            mostrarAldea();

        }else{

            mostrarCastillo();

        }
    };
}