let recompensas = [];
// ---------------------------------------
// Cargar recompensas
// ---------------------------------------
async function cargarRecompensas(){
    const respuesta = await fetch("data/rewards.json");
    recompensas = await respuesta.json();
}

// ---------------------------------------
// Mostrar mercado
// ---------------------------------------
function mostrarMercadoDelReino(){
    const content = document.getElementById("content");
    content.innerHTML = `
        <h2>🛒 Mercado del Reino</h2>
        <div id="market"></div>
    `;
    const market = document.getElementById("market");
    recompensas.forEach(item=>{
        const card = document.createElement("div");
        card.className = "mission-card";
        card.innerHTML = `
            <div class="icono">${item.icono} </div>
            <h3>${item.nombre}</h3>
            <p>💰 ${item.precio} Oquos</p>
            <button onclick="comprarRecompensa(${item.id})">
                Comprar
            </button>
        `;
        market.appendChild(card);
    });
}

function comprarRecompensa(id){
    const recompensa = recompensas.find(r => r.id === id);
    mostrarPergamino(recompensa);
}

function finalizarCompra(recompensa){
    const jugador = cargarJugador();
    if(!recompensa) return;
    if(jugador.oquos < recompensa.precio){
        mostrarMensaje(
            "💰 Oquos insuficientes",
            "Necesitas más Oquos."
        );
        return;
    }
    jugador.oquos -= recompensa.precio;
    guardarJugador(jugador);
    actualizarPerfil();
    mostrarMensaje(
        "🎉 Compra realizada",
        `${recompensa.icono} ${recompensa.nombre} ha sido comprada.`
    );
}