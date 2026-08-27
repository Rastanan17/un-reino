// =======================================
// OBSERVATORIO DE MÍRRAFEN
// =======================================
// =======================================
// SONIDOS DEL OBSERVATORIO
// =======================================
let musicaObservatorio = null;
// =======================================
// MOSTRAR OBSERVATORIO
// =======================================
function mostrarObservatorio(){
establecerLugarTutorial("observatorio");
    console.log("🔭 Entrando al Observatorio");
    const momento = obtenerMomentoDelDia();
    console.log("🕐 Momento del día:", momento);
    const content = document.getElementById("content");
    if(!content) return;
    content.innerHTML = `
        <div class="observatorio">
            <!-- ==========================
                 🌌 FONDO
            =========================== -->
            <img id="observatoryBackground"
                class="observatory-background"
                src="assets/images/backgrounds/observatory/observatory_${momento}.jpg"
                alt="Observatorio de Mírrafen">
            <!-- ==========================
                 🌌 VENTANA — MISIONES
            =========================== -->
            <div class="zona-observatorio misiones"
                onclick="abrirMisionesObservatorio()">
                ✨ Misiones
            </div>
            <!-- ==========================
                 🗺️ MAPA ESTELAR — PLANETAS
            =========================== -->
            <div class="zona-observatorio planetas"
                onclick="verPlanetas()">
                🪐 Astros
            </div>
            <!-- ==========================
                 🔭 TELESCOPIO — CONSTELACIONES
            =========================== -->
            <div class="zona-observatorio constelaciones"
                onclick="verConstelaciones()">
                ⭐ Cosmos
            </div>
            <!-- ==========================
                 🏮 LÁMPARA — SALIDA
            =========================== -->
            <div class="zona-observatorio salida"
                onclick="salirDelObservatorio()">
                ← Salir
            </div>
        </div>
    `;
    // ===================================
    // CARGAR NPCs DEL SANTUARIO
    // ===================================
    mostrarNPCsEnLugar("Observatorio");
    iniciarSonidoObservatorio();
}
// =======================================
// ✨ ABRIR MISIONES
// =======================================
function abrirMisionesObservatorio(){
    reproducirSFX("open_place.wav");
    filtroZona = "Observatorio";
    detenerSonidoObservatorio();
    mostrarMisiones();
}
function mostrarConstelaciones(){
    console.log("⭐ Entrando al mapa estelar");
    const content = document.getElementById("content");
    if(!content) return;
    constelacionActual = 0;
    renderizarConstelacion("entrada");
}
// =======================================
// 🪐 ASTROS
// =======================================
function verPlanetas(){
    console.log("🔭 Abriendo Astros");
    reproducirSFX("open_place.wav");
    detenerSonidoObservatorio();
    mostrarAstros();
}
// =======================================
// ⭐ VER COSMOS
// =======================================
function verConstelaciones(){
    console.log("⭐ Abriendo mapa estelar");
    reproducirSFX("open_place.wav");
    detenerSonidoObservatorio();
    mostrarConstelaciones();
}
// =======================================
// 🚪 SALIR DEL OBSERVATORIO
// =======================================
function salirDelObservatorio(){
    reproducirSFX("exit.mp3");
    detenerSonidoObservatorio();
    irA("observatory", "map", mostrarMapaReino);
}
// =======================================
// 🔊 INICIAR SONIDO
// =======================================
function iniciarSonidoObservatorio(){
    console.log("🔭 Iniciando sonidos del Observatorio");
    detenerSonidoObservatorio();
    // -----------------------------------
    // AMBIENTE
    // -----------------------------------
    musicaObservatorio = new Audio("assets/sounds/ambient_observatory.mp3");
    musicaObservatorio.loop = true;
    musicaObservatorio.volume = 0.35;
    musicaObservatorio.play().catch(error => {
        console.log("🔭 El sonido del Observatorio necesita interacción:", error);
    });
}
// =======================================
// 🔇 DETENER SONIDO
// =======================================
function detenerSonidoObservatorio(){
    if(musicaObservatorio){
        musicaObservatorio.pause();
        musicaObservatorio.currentTime = 0;
        musicaObservatorio = null;
    }
}