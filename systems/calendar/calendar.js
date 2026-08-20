// =======================================
// CALENDARIO DEL REINO DE MÍRRAFEN
// =======================================
function revisarCalendario(){
    const jugador = cargarJugador();
    if(!jugador) return;
    const hoy = new Date();
    if(!jugador.ultimoIngreso){
        jugador.ultimoIngreso = hoy.toISOString().split("T")[0];
        guardarJugador(jugador);
        return;
    }
    const ultima = new Date(jugador.ultimoIngreso);
    const diferencia = Math.floor(
        (hoy - ultima) /
        (1000*60*60*24)
    );
    if(diferencia >= 7){
        jugador.compensacionPendiente = true;
        guardarJugador(jugador);
    }
    jugador.ultimoIngreso = hoy.toISOString().split("T")[0];
    guardarJugador(jugador);
}
// =======================================
// MOMENTO DEL DÍA
// =======================================

function obtenerMomentoDelDia(){

    const hora = new Date().getHours();

    if(hora >= 6 && hora < 9){
        return "dawn";
    }

    if(hora >= 9 && hora < 18){
        return "day";
    }

    if(hora >= 18 && hora < 21){
        return "sunset";
    }

    return "night";

}