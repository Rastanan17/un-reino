// =======================================
// REINO DE MÍRRAFEN
// Archivo principal
// =======================================
// Sistema de Pergaminos
// =======================================
let pergaminos = [];
let habitantes = [];

// ---------------------------------------
// Cargar pergaminos
// ---------------------------------------
async function cargarPergaminos() {
    const respuesta = await fetch("data/pergaminos.json");
    pergaminos = await respuesta.json();
}

// ---------------------------------------
// Cargar habitantes
// ---------------------------------------
async function cargarHabitantes() {
    const respuesta = await fetch("data/habitantes.json");
    habitantes = await respuesta.json();
}

// ---------------------------------------
// Cargar sistema completo
// ---------------------------------------
async function cargarSistemaPergaminos() {
    await cargarPergaminos();
    await cargarHabitantes();
}

// ---------------------------------------
// Obtener un pergamino aleatorio
// ---------------------------------------
function obtenerPergaminoAleatorio() {
    if (pergaminos.length === 0) return null;
    const disponibles = pergaminos.filter(
        pergamino => pergamino.activo
    );
    if (disponibles.length === 0) return null;
    const indice = Math.floor(
        Math.random() * disponibles.length
    );
    return disponibles[indice];
}

// ---------------------------------------
// Buscar guía según la categoría
// ---------------------------------------
function obtenerGuia(categoria) {
    return habitantes.find(
        guia => guia.categoria === categoria
    );
}

// ---------------------------------------
// Mostrar pergamino
// ---------------------------------------
function mostrarPergamino(recompensa) {
    const pergamino = obtenerPergaminoAleatorio();
    if (!pergamino) {
        mostrarMensaje(
            "📜",
            "No hay pergaminos disponibles."
        );
        return;
    }
    const guia = obtenerGuia(
        pergamino.categoria
    );
    const modal = document.createElement("div");
    modal.className = "modalPergamino";
    modal.innerHTML = `
<div class="pergamino">
    <div class="pergaminoNPC"></div>
    <div class="pergaminoTexto">
        <h2>${guia ? guia.nombre : "Guía del Reino"}</h2>
        <h3>${pergamino.titulo}</h3>
        <p>${pergamino.descripcion}</p>
    </div>
    <div class="pergaminoBotones">
        <button id="btnAceptarPergamino">📜 Aceptar</button>
        <button id="btnCancelarPergamino">❌ Cancelar</button>
    </div>
</div>
`;
    document.body.appendChild(modal);
    document.getElementById("btnAceptarPergamino").addEventListener("click", () => {
        modal.remove();
        finalizarCompra(recompensa);
    });
    document.getElementById("btnCancelarPergamino").addEventListener("click", () => {
        modal.remove();
    });
}

// =======================================
// Pergamino de evento del Reino
// =======================================
function mostrarPergaminoEvento(titulo, texto, recompensa){
    const modal = document.createElement("div");
    modal.className = "modalPergamino";
    modal.innerHTML = `
<div class="pergamino">
    <div class="pergaminoTexto">
        <h2>📜 Mensaje del Reino</h2>
        <h3>${titulo}</h3>
        <p>${texto}</p>
        <p>🎁 Recompensa:
            <br>
            ⭐ +${recompensa.xp} XP
            <br>
            💰 +${recompensa.oquos} Oquos
        </p>
    </div>
    <div class="pergaminoBotones">
        <button id="aceptarEvento">📜 Reclamar</button>
    </div>
</div>
`;
    document.body.appendChild(modal);
    document.getElementById("aceptarEvento").addEventListener("click",()=>{
        const jugador = cargarJugador();
        jugador.xp += recompensa.xp;
        jugador.oquos += recompensa.oquos;
        jugador.compensacionPendiente=false;
        guardarJugador(jugador);
        actualizarPerfil();
        modal.remove();
    });
}