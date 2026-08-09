// =======================================
// PORTAL DE MÍRRAFEN
// =======================================
// Avatar seleccionado por defecto
let avatarSeleccionado = "kingdom/portal/avatars/explorer.jpg";
let musicaPortal = null;
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
        <button class="btnNuevoPerfil" onclick="mostrarCrearPerfil()">✨ Nuevo Aventurero</button>
    </section>
    `;
    cargarTarjetasPerfiles();
}

// =======================================
// TARJETAS
// =======================================
function cargarTarjetasPerfiles(){

    const lista = document.getElementById("listaPerfiles");

    const perfiles = JSON.parse(
        localStorage.getItem("perfiles")
    ) || {};

    lista.innerHTML = "";

    for(const id in perfiles){

        const jugador = perfiles[id];

        // Compatible con perfiles nuevos y antiguos
        let avatar = jugador.avatar || jugador.foto;

        // Si no existe o usa una ruta vieja,
        // usamos un avatar válido del portal.
        if(
            !avatar ||
            avatar.includes("images/characters") ||
            avatar.includes("assets/images")
        ){
            avatar = "kingdom/portal/avatars/explorer.jpg";
        }

        // Si solo tenemos el nombre del archivo,
        // construimos la ruta correcta.
        if(
            !avatar.includes("/")
        ){
            avatar = `kingdom/portal/avatars/${avatar}`;
        }

        lista.innerHTML += `
            <div class="cardPerfil">

                <img
                    src="${avatar}"
                    class="avatarPerfil"
                    alt="Avatar de ${jugador.nombre}"
                >

                <h2>${jugador.nombre}</h2>

                <p>Nivel ${jugador.nivel}</p>

                <p>${jugador.rango || "Aprendiz"}</p>

                <button onclick="entrarPerfil('${id}')">
                    ⚔️ Entrar
                </button>

            </div>
        `;
    }
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
        <h3>Elige tu personaje</h3>
        <div class="selectorAvatares">
            <div class="avatarCard seleccionado"
                onclick="seleccionarAvatar('kingdom/portal/avatars/explorer.jpg',this)">
                <img src="kingdom/portal/avatars/explorer.jpg">
                <span>Explorador</span>
            </div>

            <div class="avatarCard"
                onclick="seleccionarAvatar('kingdom/portal/avatars/alien.jpg',this)">
                <img src="kingdom/portal/avatars/alien.jpg">
                <span>Alien</span>
            </div>

            <div class="avatarCard"
                onclick="seleccionarAvatar('kingdom/portal/avatars/dwarf.jpg',this)">
                <img src="kingdom/portal/avatars/dwarf.jpg">
                <span>Enano</span>
            </div>

            <div class="avatarCard"
                onclick="seleccionarAvatar('kingdom/portal/avatars/elf.jpg',this)">
                <img src="kingdom/portal/avatars/elf.jpg">
                <span>Elfo</span>
            </div>

            <div class="avatarCard"
                onclick="seleccionarAvatar('kingdom/portal/avatars/witch.jpg',this)">
                <img src="kingdom/portal/avatars/witch.jpg">
                <span>Bruja</span>
            </div>

            <div class="avatarCard"
                onclick="seleccionarAvatar('kingdom/portal/avatars/wolf.jpg',this)">
                <img src="kingdom/portal/avatars/wolf.jpg">
                <span>Lobo</span>
            </div>
            </div>
            </div>
        </div>
        <br>
        <button onclick="crearNuevoPerfil()">⚔️ Comenzar aventura</button>
        <button onclick="mostrarPortal()">← Volver</button>
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
    const nombre=document.getElementById("nuevoNombre").value.trim();
    if(nombre===""){
        mostrarMensaje(
            "⚠️ Falta un nombre",
            "Escribe el nombre del aventurero."
        );
        return;
    }
    const id=nombre.toLowerCase().replace(/\s+/g,"_");
    crearPerfil(
        id,
        nombre,
        avatarSeleccionado
    );
    localStorage.setItem(
        "perfilActivo",
        id
    );
    await entrarAlReino();
}

function cambiarPerfil(){
    localStorage.removeItem("perfilActivo");
    const perfil = document.querySelector(".profile");
    if(perfil){
        perfil.style.display = "none";
    }
    document.getElementById("content").innerHTML = "";
    mostrarPortal();
}