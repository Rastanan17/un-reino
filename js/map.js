// =======================================
// MAPA DEL REINO
// =======================================
let zonas = [];
async function cargarMapa(){
    const guardado = cargarMapaGuardado();
    if(guardado && guardado.length > 0){
        zonas = guardado;
        return;
    }
    const respuesta = await fetch("data/map.json");
    zonas = await respuesta.json();
    guardarMapa(zonas);
}

// =======================================
function mostrarMapaReino() {
    const content = document.getElementById("content");
    content.innerHTML = `
        <h2>🗺️ Reino de Mírrafen</h2>
        <div id="kingdomMap"></div>
    `;
    const mapa = document.getElementById("kingdomMap");
    zonas.forEach(zona => {
        const div = document.createElement("div");
        div.className = "zone";
        div.style.left = zona.x + "%";
        div.style.top = zona.y + "%";
        div.innerHTML = `
            <div class="zoneSprite">
                <img src="${zona.sprite}" alt="${zona.nombre}">
            </div>
            <div class="zoneName">${zona.nombre}</div>
        `;
        div.onclick = () => abrirZona(zona.nombre);
        mapa.appendChild(div);
    });
}

// =======================================
function restaurarZona(nombreZona, cantidad = 10){
    const zona = zonas.find(
        z => z.nombre === nombreZona
    );
    if(!zona) return;
    zona.progreso += cantidad;
    if(zona.progreso > zona.objetivo){
        zona.progreso = zona.objetivo;
    }
    guardarMapa(zonas);
}

// =======================================
function abrirZona(nombre){
    console.log("Zona seleccionada:", nombre);
    switch(nombre){
        case "Granja":
            alert("Entrando a la Granja 🌾");
            break;
        case "Bosque":
            alert("Entrando al Bosque 🌲");
            break;
        case "Castillo":
            alert("Entrando al Castillo 🏰");
            break;
        default:
            alert("Entrando a " + nombre);
    }
}

// =======================================
function obtenerEstadoZona(zona){
    if(zona.progreso < 40){
        return "ruins";
    }
    if(zona.progreso < 80){
        return "construction";
    }
    return "restored";
}