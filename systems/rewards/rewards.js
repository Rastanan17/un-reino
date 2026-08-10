let recompensas = [];
// ---------------------------------------
// Cargar recompensas
// ---------------------------------------
async function cargarRecompensas(){
    const respuesta = await fetch("systems/rewards/rewards.json");
    recompensas = await respuesta.json();
}
function comprarRecompensa(id){
    const recompensa = recompensas.find(r => r.id === id);
    mostrarPergamino(recompensa);
}
function finalizarCompra(recompensa){
    const jugador = cargarJugador();
    if(!recompensa) return;
    if(jugador.oquos < recompensa.precio){
        mostrarMensaje("💰 Oquos insuficientes", "Necesitas más Oquos.");
        return;
    }
    jugador.oquos -= recompensa.precio;
    guardarJugador(jugador);
    actualizarPerfil();
    mostrarMensaje("🎉 Compra realizada", `${recompensa.icono} ${recompensa.nombre} ha sido comprada.`);
}