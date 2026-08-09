// =======================================
// REINO DE MÍRRAFEN
// Archivo principal
// =======================================
// Interfaz de Usuario
// =======================================
// Interfaz de Usuario
// =======================================
function actualizarPerfil() {
    const jugador = cargarJugador();
    if(!jugador){
        console.log("No hay perfil activo");
        return;
    }
    // Nombre
    document.getElementById("playerName").textContent = jugador.nombre;
    // Avatar
    document.getElementById("playerAvatar").src = jugador.avatar;
    // Rango
    document.getElementById("playerRank").textContent = jugador.rango;
    // Nivel
    document.getElementById("playerLevel").textContent = jugador.nivel;
    // Oquos
    document.getElementById("playerCoins").textContent = jugador.oquos;
    // XP
    document.getElementById("playerXP").textContent = jugador.xp;
    // Próximo nivel
    document.getElementById("playerNextXP").textContent = jugador.xpNecesaria;
    // Barra experiencia
    const porcentaje = (jugador.xp / jugador.xpNecesaria) * 100;
    const barra = document.getElementById("xpFill");
    barra.style.width = porcentaje + "%";
    barra.classList.remove("levelUp");
    void barra.offsetWidth;
    barra.classList.add("levelUp");
}

// =======================================
// Mensaje del Reino
// (lo usaremos para reemplazar los alert())
// =======================================
function mostrarMensaje(titulo, mensaje){
    document.getElementById("modalTitulo").textContent = titulo;
    document.getElementById("modalTexto").innerHTML = mensaje.replace(/\n/g,"<br>");
    document.getElementById("modal").classList.remove("oculto");
    document.getElementById("cerrarModal").addEventListener("click",()=>{
        document.getElementById("modal").classList.add("oculto");
    });
}