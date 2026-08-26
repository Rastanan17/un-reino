// =======================================
// ALDEA DE MÍRRAFEN
// =======================================
// =======================================
// DIÁLOGOS
// =======================================
let dialogosAldea = {
    nino: [],
    aldeano: [],
    aldeana: []
};
// =======================================
// CARGAR DIÁLOGOS
// =======================================
async function cargarDialogosAldea(){
    try{
        const respuesta = await fetch("locations/village/data/villagers.json");
        if(!respuesta.ok){
            throw new Error("No se pudo cargar villagers.json");
        }
        const datos = await respuesta.json();
        dialogosAldea = datos.dialogos_aldea || {
            nino: [],
            aldeano: [],
            aldeana: []
        };
        console.log("🏡 Diálogos de la aldea cargados:", dialogosAldea);
    }catch(error){
        console.error("❌ Error cargando diálogos de la aldea:", error);
    }
}
// =======================================
// MOSTRAR ALDEA
// =======================================
function mostrarAldea(){
    establecerLugarTutorial("aldea");
    const momento = obtenerMomentoDelDia();
    console.log("🌅 MOMENTO RECIBIDO POR ALDEA:", momento);
    console.log("🌅 TIPO:", typeof momento);
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
        <section class="aldea momento-${momento}">
            <!-- =================================
                PERSONAJES — ALDEANAS
            ================================== -->
            <div class="zona-interactiva senora1">
                <span class="nombre-zona">SEÑORAS</span>
                <canvas id="senora1" class="zona-aldea" onclick="reproducirSonidoAldea('assets/sounds/woman_talk.mp3'); hablarPersonaAldea('aldeana');"></canvas>
            </div>
            <div class="zona-interactiva senora2">
                <span class="nombre-zona">SEÑORA</span>
                <canvas id="senora2" class="zona-aldea" onclick=" reproducirSonidoAldea('assets/sounds/woman_talk.mp3'); hablarPersonaAldea('aldeana');"></canvas>
            </div>
            <!-- =================================
                PERSONAJES — ALDEANOS
            ================================== -->
            <div class="zona-interactiva senor1">
                <span class="nombre-zona">SEÑOR</span>
                <canvas id="senor1" class="zona-aldea" onclick="reproducirSonidoAldea('assets/sounds/man_talk.mp3'); hablarPersonaAldea('aldeano');"></canvas>
            </div>
            <div class="zona-interactiva senor2">
                <span class="nombre-zona">SEÑOR</span>
                <canvas id="senor2" class="zona-aldea" onclick="reproducirSonidoAldea('assets/sounds/man_talk.mp3'); hablarPersonaAldea('aldeano'); "></canvas>
            </div>
            <!-- =================================
                NIÑOS
            ================================== -->
            <div class="zona-interactiva nino1">
                <span class="nombre-zona">NIÑOS</span>
                <canvas id="nino1" class="zona-aldea" onclick="reproducirSonidoAldea('assets/sounds/man_talk.mp3'); hablarPersonaAldea('nino');"></canvas>
            </div>
            <div class="zona-interactiva nino2">
                <span class="nombre-zona">NIÑOS</span>
                <canvas id="nino2" class="zona-aldea" onclick="reproducirSonidoAldea('assets/sounds/man_talk.mp3'); hablarPersonaAldea('nino');"></canvas>
            </div>
            <!-- =================================
                PATOS
            ================================== -->
            <div class="zona-interactiva patos1">
                <span class="nombre-zona">PATOS</span>
                <canvas id="patos1" class="zona-aldea" onclick="reproducirSonidoAldea('assets/sounds/pato1.mp3');"></canvas>
            </div>
            <!-- =================================
                MISIONES
            ================================== -->
            <div class="zona-interactiva campana">
                <span class="nombre-zona">MISIONES</span>
                <canvas id="campana" class="zona-aldea" onclick=" reproducirSFX('open_place.wav'); mostrarMisionesAldea();"></canvas>
            </div>
            <!-- =================================
                SALIDA → MAPA
            ================================== -->
            <div class="zona-interactiva salidaAldea">
                <span class="nombre-zona">SALIDA</span>
                <canvas id="salidaAldea" class="zona-aldea" onclick="reproducirSFX('exit.mp3'); irA('village', 'map', mostrarMapaReino);"></canvas>
            </div>
        </section>
    `;
    // ===================================
    // CARGAR DIÁLOGOS
    // ===================================
    if(!dialogosAldea.nino.length && !dialogosAldea.aldeano.length && !dialogosAldea.aldeana.length){
        cargarDialogosAldea();
    }
}
// =======================================
// MISIONES
// =======================================
function mostrarMisionesAldea(){
    filtroZona = "Aldea";
    mostrarMisiones();
}
// =======================================
// SONIDOS
// =======================================
function reproducirSonidoAldea(ruta){
    const audio = new Audio(ruta);
    audio.volume = 0.8;
    audio.play().catch(error => {
        console.warn("No se pudo reproducir el sonido:", error);
    }); setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
    }, 5000);
}
// =======================================
// HABLAR CON HABITANTE
// =======================================
function hablarPersonaAldea(tipo){
    const disponibles = dialogosAldea[tipo];
    if(!disponibles || disponibles.length === 0){
        mostrarMensaje("🏡 Habitante de Mírrafen", "Hola, viajero.");
        return;
    }
    // ===================================
    // FRASE ALEATORIA
    // ===================================
    const dialogo = disponibles[ Math.floor(Math.random() * disponibles.length) ];
    // ===================================
    // MOSTRAR DIÁLOGO
    // ===================================
    mostrarMensaje( tipo === "nino"
        ? "🧒 Niño de Mírrafen"
        : tipo === "aldeana"
        ? "👩 Aldeana de Mírrafen"
        : "👨 Aldeano de Mírrafen",
        dialogo.texto
    );
}