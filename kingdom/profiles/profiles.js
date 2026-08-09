// =======================================
// SELECTOR DE PERFILES
// =======================================
function mostrarSelectorPerfiles(){
    const content = document.getElementById("content");
    const perfiles = JSON.parse(
        localStorage.getItem("perfiles")
    ) || {};
    content.innerHTML = `
        <div class="selectorPerfiles">
            <h1>🏰 El Reino de Mírrrafen</h1>
            <h2>👥 Elige tu héroe</h2>
            <div id="listaPerfiles"></div>
            <button onclick="crearPerfilNuevo()">
                🧙 Crear nuevo héroe
            </button>
        </div>
    `;
    const lista = document.getElementById("listaPerfiles");
    Object.values(perfiles).forEach(perfil=>{
        const boton=document.createElement("button");
        boton.className="perfilCard";
        boton.innerHTML=`
            <h3>🧙 ${perfil.nombre}</h3>
            <p>Nivel ${perfil.nivel}
                <br>⭐ ${perfil.xp} XP
                <br>💰 ${perfil.oquos} Oquos
            </p>
        `;
        boton.onclick=()=>{
            localStorage.setItem(
                "perfilActivo",
                perfil.id
            );
            window.location.href="../../index.html";
        };
        lista.appendChild(boton);
    });
}
// =======================================
// CREAR PERFIL
// =======================================
function crearPerfilNuevo(){
    const nombre=prompt(
        "Nombre del héroe:"
    );
    if(!nombre)return;
    const id=nombre
        .toLowerCase()
        .replaceAll(" ","_");
    const perfiles=JSON.parse(
        localStorage.getItem("perfiles")
    ) || {};
    if(perfiles[nombre]){
        alert(
            "Ese héroe ya existe"
        );
        return;
    }
    perfiles[id]={
        ...perfilBase,
        id:id,
        nombre:nombre,
        avatar:"kingdom/portal/avatars/explorer.jpg",
    };
    localStorage.setItem(
        "perfiles",
        JSON.stringify(perfiles)
    );
    localStorage.setItem(
        "perfilActivo",
        id
    );
    window.location.href="../../index.html";
}
// =======================================
// CAMBIAR PERFIL DESDE EL REINO
// =======================================
function cambiarPerfil(){
    localStorage.removeItem("perfilActivo");
    window.location.href="../../profiles.html";
}