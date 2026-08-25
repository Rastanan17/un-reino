// =======================================
// ARMERÍA DE MÍRRAFEN
// SISTEMA GLOBAL
// =======================================

let origenArmeria = "castillo";

// =======================================
// MOSTRAR ARMERÍA
// =======================================

function mostrarArmeria(){

    const perfilActivo =
        localStorage.getItem("perfilActivo");

    if(!perfilActivo){

        console.error(
            "No hay un perfil activo."
        );

        return;
    }

    editarPerfil(perfilActivo);
}

// =======================================
// VOLVER DESDE LA ARMERÍA
// =======================================

function volverDesdeArmeria(){

    // ===================================
    // ALDEA
    // ===================================

    if(origenArmeria === "aldea"){

        mostrarAldea();

        return;
    }

    // ===================================
    // GRANJA
    // ===================================

    if(origenArmeria === "granja"){

        mostrarGranja();

        return;
    }

    // ===================================
    // CASTILLO
    // ===================================

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
// EDITAR PERFIL
// =======================================

function editarPerfil(id){

    const perfiles =
        JSON.parse(
            localStorage.getItem("perfiles")
        ) || {};

    const jugador = perfiles[id];

    if(!jugador){

        alert("No se encontró el perfil.");

        return;
    }

    // ===================================
    // DATOS ACTUALES
    // ===================================

    const nombreActual =
        jugador.nombre || "";

    const rangoActual =
        jugador.rangoEdad || "6-8";

    let avatarActual =
        jugador.avatar ||
        "kingdom/portal/avatars/explorer.jpg";

    // ===================================
    // MOSTRAR FORMULARIO
    // ===================================

    const content =
        document.getElementById("content");

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
                id="editarNombre"
                value="${nombreActual}"
                placeholder="Nombre del aventurero"
            >

            <br><br>

            <!-- ==========================
                 RANGO DE EDAD
            =========================== -->

            <h3>🎂 Rango de edad</h3>

            <select id="editarRangoEdad">

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
                    class="avatarCard ${
                        avatarActual.includes("explorer")
                        ? "seleccionado"
                        : ""
                    }"
                    onclick="
                        reproducirSFX('touch.mp3');
                        seleccionarAvatar(
                            'kingdom/portal/avatars/explorer.jpg',
                            this
                        )
                    "
                >
                    <img src="kingdom/portal/avatars/explorer.jpg">
                    <span>Explorador</span>
                </div>

                <div
                    class="avatarCard ${
                        avatarActual.includes("alien")
                        ? "seleccionado"
                        : ""
                    }"
                    onclick="
                        reproducirSFX('touch.mp3');
                        seleccionarAvatar(
                            'kingdom/portal/avatars/alien.jpg',
                            this
                        )
                    "
                >
                    <img src="kingdom/portal/avatars/alien.jpg">
                    <span>Alien</span>
                </div>

                <div
                    class="avatarCard ${
                        avatarActual.includes("dwarf")
                        ? "seleccionado"
                        : ""
                    }"
                    onclick="
                        reproducirSFX('touch.mp3');
                        seleccionarAvatar(
                            'kingdom/portal/avatars/dwarf.jpg',
                            this
                        )
                    "
                >
                    <img src="kingdom/portal/avatars/dwarf.jpg">
                    <span>Enano</span>
                </div>

                <div
                    class="avatarCard ${
                        avatarActual.includes("elf")
                        ? "seleccionado"
                        : ""
                    }"
                    onclick="
                        reproducirSFX('touch.mp3');
                        seleccionarAvatar(
                            'kingdom/portal/avatars/elf.jpg',
                            this
                        )
                    "
                >
                    <img src="kingdom/portal/avatars/elf.jpg">
                    <span>Elfo</span>
                </div>

                <div
                    class="avatarCard ${
                        avatarActual.includes("witch")
                        ? "seleccionado"
                        : ""
                    }"
                    onclick="
                        reproducirSFX('touch.mp3');
                        seleccionarAvatar(
                            'kingdom/portal/avatars/witch.jpg',
                            this
                        )
                    "
                >
                    <img src="kingdom/portal/avatars/witch.jpg">
                    <span>Bruja</span>
                </div>

                <div
                    class="avatarCard ${
                        avatarActual.includes("wolf")
                        ? "seleccionado"
                        : ""
                    }"
                    onclick="
                        reproducirSFX('touch.mp3');
                        seleccionarAvatar(
                            'kingdom/portal/avatars/wolf.jpg',
                            this
                        )
                    "
                >
                    <img src="kingdom/portal/avatars/wolf.jpg">
                    <span>Lobo</span>
                </div>

            </div>

            <br>

            <!-- ==========================
                 BOTONES
            =========================== -->

            <button
                onclick="
                    reproducirSFX('open_place.wav');
                    guardarEdicionPerfil('${id}')
                "
            >
                💾 Guardar cambios
            </button>

            <button
                onclick="
                    reproducirSFX('exit.mp3');
                    volverDesdeArmeria()
                "
            >
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
// GUARDAR EDICIÓN DEL PERFIL
// =======================================

function guardarEdicionPerfil(id){

    const perfiles =
        JSON.parse(
            localStorage.getItem("perfiles")
        ) || {};

    const jugador = perfiles[id];

    if(!jugador){

        alert("No se encontró el perfil.");

        return;
    }

    // ===================================
    // NUEVOS DATOS
    // ===================================

    const inputNombre =
        document.getElementById("editarNombre");

    const selectRango =
        document.getElementById("editarRangoEdad");

    if(!inputNombre || !selectRango){

        console.error(
            "No se encontraron los campos de edición."
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

        alert("Escribí un nombre.");

        return;
    }

    // ===================================
    // ACTUALIZAR DATOS EDITABLES
    // ===================================

    jugador.nombre =
        nuevoNombre;

    jugador.rangoEdad =
        nuevoRangoEdad;

    jugador.avatar =
        avatarSeleccionado;

    jugador.foto =
        avatarSeleccionado;

    // ===================================
    // GUARDAR
    // ===================================

    perfiles[id] = jugador;

    localStorage.setItem(
        "perfiles",
        JSON.stringify(perfiles)
    );

    // ===================================
    // ACTUALIZAR HUD
    // ===================================

    if(
        localStorage.getItem("perfilActivo") === id
    ){
        actualizarHUDJugador();
    }

    console.log(
        "🛡️ Perfil actualizado:",
        jugador
    );

    // ===================================
    // CONFIRMACIÓN
    // ===================================

    mostrarMensaje(
        "🛡️ Datos guardados",
        "Los datos de tu aventurero se guardaron con éxito."
    );

    // ===================================
    // CONTINUAR DESPUÉS DEL MODAL
    // ===================================

    document.getElementById("cerrarModal").onclick = function(){

        document.getElementById("modal").classList.add("oculto");

        volverDesdeArmeria();

    };

}