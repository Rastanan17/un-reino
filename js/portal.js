// =======================================
// PORTAL DE MÍRRAFEN
// =======================================
// Avatar seleccionado por defecto
let avatarSeleccionado = "explorer.jpg";

// =======================================
// PORTAL
// =======================================
function mostrarPortal(){
    document.getElementById("introScreen").style.display="none";
    document.getElementById("reinoUI").style.display="block";
    document.querySelector(".profile").style.display="none";
    document.getElementById("mainMenu").style.display="none";
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
    const lista=document.getElementById("listaPerfiles");
    const perfiles=JSON.parse(
        localStorage.getItem("perfiles")
    ) || {};
    lista.innerHTML="";
    for(const id in perfiles){
        const jugador=perfiles[id];
        lista.innerHTML+=`
        <div class="cardPerfil">
            <img src="images/characters/${jugador.avatar}" class="avatarPerfil">
            <h2>${jugador.nombre}</h2>
            <p>Nivel ${jugador.nivel}</p>
            <p>${jugador.rango}</p>
            <button onclick="entrarPerfil('${id}')">⚔️ Entrar</button>
        </div>
        `;
    }
}

// =======================================
// NUEVO AVENTURERO
// =======================================
function mostrarCrearPerfil(){
    const content=document.getElementById("content");
    content.innerHTML=`
    <section class="portal">
        <h1>⚔️ Nuevo Aventurero</h1>
        <input id="nuevoNombre" placeholder="Nombre del aventurero">
        <br><br>
        <h3>Elige tu personaje</h3>
        <div class="selectorAvatares">
            <div class="avatarCard seleccionado" onclick="seleccionarAvatar('explorer.jpg',this)">
                <img src="images/characters/explorer.jpg">
                <span>Explorador</span>
            </div>
            <div class="avatarCard" onclick="seleccionarAvatar('alien.jpg',this)">
                <img src="images/characters/alien.jpg">
                <span>Alien</span>
            </div>
            <div class="avatarCard" onclick="seleccionarAvatar('dwarf.jpg',this)">
                <img src="images/characters/dwarf.jpg">
                <span>Enano</span>
            </div>
            <div class="avatarCard" onclick="seleccionarAvatar('elf.jpg',this)">
                <img src="images/characters/elf.jpg">
                <span>Elfo</span>
            </div>
            <div class="avatarCard" onclick="seleccionarAvatar('witch.jpg',this)">
                <img src="images/characters/witch.jpg">
                <span>Bruja</span>
            </div>
            <div class="avatarCard" onclick="seleccionarAvatar('wolf.jpg',this)">
                <img src="images/characters/wolf.jpg">
                <span>Lobo</span>
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