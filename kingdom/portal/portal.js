// =======================================
// PORTAL DE MÍRRAFEN
// =======================================
// Avatar seleccionado por defecto
let avatarSeleccionado = "kingdom/portal/avatars/explorer.jpg";
let musicaPortal = null;
// =======================================
// RANGOS DE EDAD
// =======================================
const RANGOS_EDAD = [
    { id: "6-8", nombre: "6 a 8 años" },
    { id: "9-11", nombre: "9 a 11 años" },
    { id: "12-14", nombre: "12 a 14 años" },
    { id: "15-17", nombre: "15 a 17 años" }
];
// =======================================
// PORTAL
// =======================================
function mostrarPortal(){
    const intro = document.getElementById("introScreen");
    const reino = document.getElementById("reinoUI");
    const perfil = document.querySelector(".profile");
    if(intro){
        intro.style.display="none";
    }
    if(reino){
        reino.style.display="block";
    }
    if(perfil){
        perfil.style.display="none";
    }
    // =======================================
    // MÚSICA DEL PORTAL
    // =======================================
    if(!musicaPortal){
        musicaPortal = new Audio("assets/sounds/ambient_portal.mp3");
        musicaPortal.loop = true;
        musicaPortal.volume = 0.5;
    }
    musicaPortal.currentTime = 0;
    musicaPortal.play().catch(error => {
        console.log("La música del portal necesita interacción del usuario:", error);
    });
    const content=document.getElementById("content");
    content.innerHTML=`
        <section class="portal">
            <h1>🌀 Portal de Mírrafen</h1>
            <p class="portalTexto">Todo héroe tiene una historia.<br>¿Quién cruzará el portal?</p>
            <div id="listaPerfiles"></div>
            <button class="btnNuevoPerfil" onclick="reproducirSFX('open_place.wav'); mostrarCrearPerfil()">✨ Nuevo Aventurero</button>
        </section>
    `;
    cargarTarjetasPerfiles();
}
// =======================================
// TARJETAS DE PERFILES
// =======================================

function cargarTarjetasPerfiles(){
    const lista = document.getElementById("listaPerfiles");
    const perfiles = JSON.parse(localStorage.getItem("perfiles")) || {};
    lista.innerHTML = "";
    for(const id in perfiles){
        const jugador = perfiles[id];
        // ===================================
        // AVATAR
        // ===================================
        let avatar = jugador.avatar || jugador.foto;
        if( !avatar ||
            avatar.includes("images/characters") ||
            avatar.includes("assets/images")
        ){
            avatar = "kingdom/portal/avatars/explorer.jpg";
        }
        if(!avatar.includes("/")){
            avatar = `kingdom/portal/avatars/${avatar}`;
        }
        // ===================================
        // RANGO DE EDAD
        // ===================================
        const rangoEdad = jugador.rangoEdad || "6-8";
        // ===================================
        // TARJETA
        // ===================================
        lista.innerHTML += `
            <div class="cardPerfil">
                <img src="${avatar}" class="avatarPerfil" alt="Avatar de ${jugador.nombre}">
                <h2>${jugador.nombre}</h2>
                <p>🎂 ${rangoEdad} años</p>
                <p>Nivel ${jugador.nivel}</p>
                <p>${jugador.rango || "Aprendiz"}</p>
                <button onclick="reproducirSFX('open_place.wav'); entrarPerfil('${id}')">
                    ⚔️ Entrar
                </button>
                <button onclick="reproducirSFX('touch.mp3'); editarPerfil('${id}')">
                    ✏️ Editar
                </button>
                <button onclick="reproducirSFX('non.mp3'); eliminarPerfil('${id}')">
                    🗑️ Eliminar
                </button>
            </div>
        `;
    }
}
// =======================================
// EDITAR PERFIL
// =======================================
function editarPerfil(id){
    const perfiles = JSON.parse(localStorage.getItem("perfiles")) || {};
    const jugador = perfiles[id];
    if(!jugador){
        alert("No se encontró el perfil.");
        return;
    }
    // ===================================
    // DATOS ACTUALES
    // ===================================
    const nombreActual = jugador.nombre || "";
    const rangoActual = jugador.rangoEdad || "6-8";
    let avatarActual = jugador.avatar || "kingdom/portal/avatars/explorer.jpg";
    // ===================================
    // MOSTRAR FORMULARIO
    // ===================================
    const content = document.getElementById("content");
    content.innerHTML = `
        <section class="portal">
            <h1>✏️ Editar Aventurero</h1>
            <!-- ==========================
                 NOMBRE
            =========================== -->
            <input id="editarNombre" value="${nombreActual}" placeholder="Nombre del aventurero">
            <br><br>
            <!-- ==========================
                 RANGO DE EDAD
            =========================== -->
            <h3>🎂 Rango de edad</h3>
            <select id="editarRangoEdad">
                <option value="6-8" ${rangoActual === "6-8" ? "selected" : ""}>
                    6 a 8 años
                </option>
                <option value="9-11" ${rangoActual === "9-11" ? "selected" : ""}>
                    9 a 11 años
                </option>
                <option value="12-14" ${rangoActual === "12-14" ? "selected" : ""}>
                    12 a 14 años
                </option>
                <option value="15-17" ${rangoActual === "15-17" ? "selected" : ""}>
                    15 a 17 años
                </option>
            </select>
            <br><br>
            <!-- ==========================
                 AVATAR
            =========================== -->
            <h3>🧙 Elige tu personaje</h3>
            <div class="selectorAvatares">
                <div class="avatarCard ${avatarActual.includes("explorer") ? "seleccionado" : ""}"
                    onclick="reproducirSFX('touch.mp3'); seleccionarAvatar('kingdom/portal/avatars/explorer.jpg', this)">
                        <img src="kingdom/portal/avatars/explorer.jpg">
                        <span>Explorador</span>
                </div>
                <div class="avatarCard ${avatarActual.includes("alien") ? "seleccionado" : ""}"
                    onclick="reproducirSFX('touch.mp3'); seleccionarAvatar('kingdom/portal/avatars/alien.jpg', this)">
                        <img src="kingdom/portal/avatars/alien.jpg">
                        <span>Alien</span>
                </div>
                <div class="avatarCard ${avatarActual.includes("dwarf") ? "seleccionado" : ""}"
                    onclick="reproducirSFX('touch.mp3'); seleccionarAvatar('kingdom/portal/avatars/dwarf.jpg', this)">
                        <img src="kingdom/portal/avatars/dwarf.jpg">
                        <span>Enano</span>
                </div>
                <div class="avatarCard ${avatarActual.includes("elf") ? "seleccionado" : ""}"
                    onclick="reproducirSFX('touch.mp3'); seleccionarAvatar('kingdom/portal/avatars/elf.jpg', this)">
                        <img src="kingdom/portal/avatars/elf.jpg">
                        <span>Elfo</span>
                </div>
                <div class="avatarCard ${avatarActual.includes("witch") ? "seleccionado" : ""}"
                    onclick="reproducirSFX('touch.mp3'); seleccionarAvatar('kingdom/portal/avatars/witch.jpg', this)">
                        <img src="kingdom/portal/avatars/witch.jpg">
                        <span>Bruja</span>
                </div>
                <div class="avatarCard ${avatarActual.includes("wolf") ? "seleccionado" : ""}"
                    onclick="reproducirSFX('touch.mp3'); seleccionarAvatar('kingdom/portal/avatars/wolf.jpg', this)">
                        <img src="kingdom/portal/avatars/wolf.jpg">
                        <span>Lobo</span>
                </div>
            </div>
            <br>
            <button onclick="reproducirSFX('open_place.wav'); guardarEdicionPerfil('${id}')">
                💾 Guardar cambios
            </button>
            <button onclick="reproducirSFX('exit.mp3'); mostrarPortal()">
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
    const perfiles = JSON.parse(localStorage.getItem("perfiles")) || {};
    const jugador = perfiles[id];
    if(!jugador){
        alert("No se encontró el perfil.");
        return;
    }
    // ===================================
    // NUEVOS DATOS
    // ===================================
    const nuevoNombre = document.getElementById("editarNombre").value.trim();
    const nuevoRangoEdad = document.getElementById("editarRangoEdad").value;
    // ===================================
    // VALIDAR NOMBRE
    // ===================================
    if(nuevoNombre === ""){
        alert("Escribí un nombre.");
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
    perfiles[id] = jugador;
    localStorage.setItem("perfiles", JSON.stringify(perfiles));
    // ===================================
    // VOLVER AL PORTAL
    // ===================================
    mostrarPortal();
}
// =======================================
// ELIMINAR PERFIL
// =======================================
function eliminarPerfil(id){
    const perfiles = JSON.parse(localStorage.getItem("perfiles")) || {};
    const jugador = perfiles[id];
    if(!jugador){
        alert("No se encontró el perfil.");
        return;
    }
    // ===================================
    // CONFIRMAR ELIMINACIÓN
    // ===================================
    const confirmar = confirm(
        `¿Seguro que querés eliminar el perfil de ${jugador.nombre}?\n\n` +
        `Se perderá todo su progreso, nivel, XP, Oquos y logros.`
    );
    if(!confirmar){
        return;
    }
    // ===================================
    // ELIMINAR PERFIL
    // ===================================
    delete perfiles[id];
    // ===================================
    // GUARDAR PERFILES
    // ===================================
    localStorage.setItem("perfiles", JSON.stringify(perfiles));
    // ===================================
    // SI ERA EL PERFIL ACTIVO
    // ===================================
    if(
        localStorage.getItem("perfilActivo") === id
    ){
        localStorage.removeItem("perfilActivo");
    }
    // ===================================
    // VOLVER A MOSTRAR PERFILES
    // ===================================
    mostrarPortal();
}
// =======================================
// NUEVO AVENTURERO
// =======================================
function mostrarCrearPerfil(){
    localStorage.removeItem("perfilActivo");
    const intro = document.getElementById("introScreen");
    const reino = document.getElementById("reinoUI");
    const perfil = document.querySelector(".profile");
    const content=document.getElementById("content");
    content.innerHTML=`
    <section class="portal">
        <h1>⚔️ Nuevo Aventurero</h1>
        <input id="nuevoNombre" placeholder="Nombre del aventurero">
        <br><br>
        <div class="selectorEdad">
            <h3>🎂 Elige el rango de edad</h3>
            <select id="nuevoRangoEdad">
                <option value="6-8">6 a 8 años</option>
                <option value="9-11">9 a 11 años</option>
                <option value="12-14">12 a 14 años</option>
                <option value="15-17">15 a 17 años</option>
            </select>
        </div>
        <h3>Elige tu personaje</h3>
        <div class="selectorAvatares">
            <div class="avatarCard seleccionado"
                onclick="reproducirSFX('touch.mp3'); seleccionarAvatar('kingdom/portal/avatars/explorer.jpg',this)">
                <img src="kingdom/portal/avatars/explorer.jpg">
                <span>Explorador</span>
            </div>
            <div class="avatarCard"
                onclick="reproducirSFX('touch.mp3'); seleccionarAvatar('kingdom/portal/avatars/alien.jpg',this)">
                <img src="kingdom/portal/avatars/alien.jpg">
                <span>Alien</span>
            </div>
            <div class="avatarCard"
                onclick="reproducirSFX('touch.mp3'); seleccionarAvatar('kingdom/portal/avatars/dwarf.jpg',this)">
                <img src="kingdom/portal/avatars/dwarf.jpg">
                <span>Enano</span>
            </div>
            <div class="avatarCard"
                onclick="reproducirSFX('touch.mp3'); seleccionarAvatar('kingdom/portal/avatars/elf.jpg',this)">
                <img src="kingdom/portal/avatars/elf.jpg">
                <span>Elfo</span>
            </div>
            <div class="avatarCard"
                onclick="reproducirSFX('touch.mp3'); seleccionarAvatar('kingdom/portal/avatars/witch.jpg',this)">
                <img src="kingdom/portal/avatars/witch.jpg">
                <span>Bruja</span>
            </div>
            <div class="avatarCard"
                onclick="reproducirSFX('touch.mp3'); seleccionarAvatar('kingdom/portal/avatars/wolf.jpg',this)">
                <img src="kingdom/portal/avatars/wolf.jpg">
                <span>Lobo</span>
            </div>
        </div>
        <br>
        <button onclick="reproducirSFX('open_place.wav'); crearNuevoPerfil()">⚔️ Comenzar aventura</button>
        <button onclick="reproducirSFX('exit.mp3'); mostrarPortal()">← Volver</button>
    </section>
    `;
}
// =======================================
// SELECCIONAR AVATAR
// =======================================
function seleccionarAvatar(avatar,card){
    avatarSeleccionado = avatar;
    document.querySelectorAll(".avatarCard").forEach(a=>{
        a.classList.remove("seleccionado");
    });
    card.classList.add("seleccionado");
}
// =======================================
// CREAR PERFIL
// =======================================
async function crearNuevoPerfil(){
    const nombre = document.getElementById("nuevoNombre").value.trim();
    const rangoEdad = document.getElementById("nuevoRangoEdad").value;
    if(nombre === ""){
        mostrarMensaje("⚠️ Falta un nombre", "Escribe el nombre del aventurero.");
        return;
    }
    const id = nombre.toLowerCase().replace(/\s+/g, "_");
    // ===================================
    // VERIFICAR SI YA EXISTE
    // ===================================
    const perfiles = JSON.parse(localStorage.getItem("perfiles")) || {};
    if(perfiles[id]){
        mostrarMensaje("⚠️ Ese héroe ya existe", "Elegí otro nombre para tu aventurero.");
        return;
    }
    // ===================================
    // CREAR PERFIL
    // ===================================
    crearPerfil(
        id,
        nombre,
        avatarSeleccionado,
        rangoEdad
    );
    // ===================================
    // ACTIVAR PERFIL
    // ===================================
    localStorage.setItem("perfilActivo", id);
    // ===================================
    // ENTRAR AL REINO
    // ===================================
    irA("portal", "map", async () => {
            await entrarAlReino();
        }
    );
}