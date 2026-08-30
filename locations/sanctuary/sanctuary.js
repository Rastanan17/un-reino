// =======================================
// SANTUARIO DE MÍRRAFEN
// =======================================
let musicaSantuarioActual = 1;
function reproducirMusicaSantuario(){
    const numero = musicaSantuarioActual;
    reproducirMusica(`assets/sounds/ambient_sanctuary${numero}.mp3`, 0.35);
    console.log(`🎵 Ambiente del Santuario: ${numero}`);
}
function cambiarMusicaSantuario(){
    musicaSantuarioActual++;
    if(musicaSantuarioActual > 5){
        musicaSantuarioActual = 1;
    }
    reproducirMusicaSantuario();
    console.log(`🗺️ Mapa → cambiando ambiente del Santuario`);
}
// =======================================
// MOSTRAR SANTUARIO
// =======================================
function mostrarSantuario(){
    establecerLugarTutorial("santuario");
    const momento = obtenerMomentoDelDia();
    console.log("⛪ SANTUARIO");
    console.log("🕐 Momento del día:", momento);
    const content = document.getElementById("content");
    if(!content){
        console.error("❌ No se encontró #content");
        return;
    }
    // ===================================
    // ESCENARIO
    // ===================================
    content.innerHTML = `
        <section class="santuario momento-${momento}">
            <!-- =================================
                 SALIDA → MAPA
            ================================== -->
            <div class="santuario-salida" onclick=" reproducirSFX('touch.mp3'); irA('sanctuary', 'map', mostrarMapaReino);">
                <img src="assets/images/items/antorcha1.png" alt="Salir al mapa">
            </div>
            <!-- =================================
                 MAPA → CAMBIAR AMBIENTE
            ================================== -->
            <div class="santuario-musica" onclick="reproducirSFX('touch.mp3'); cambiarMusicaSantuario();">
                <img src="assets/images/items/mapa-letters.png" alt="Cambiar ambiente">
            </div>
        </section>
    `;
    // ===================================
    // NPCs
    // ===================================
    mostrarNPCsEnLugar("Santuario");
    // ===================================
    // MÚSICA INICIAL
    // ===================================
    musicaSantuarioActual = 1;
    reproducirMusicaSantuario();
}