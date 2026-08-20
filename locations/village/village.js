// =======================================
// ALDEA DE MÍRRAFEN
// =======================================
// =======================================
// DIÁLOGOS
// =======================================
let dialogosAldea = [];
async function cargarDialogosAldea(){
    try{
        const respuesta = await fetch("locations/village/data/villagers.json");
        if(!respuesta.ok){
            throw new Error("No se pudo cargar village.json");
        }
        dialogosAldea = await respuesta.json();
        console.log("Diálogos de la aldea cargados:", dialogosAldea);
    }catch(error){
        console.error("Error cargando diálogos de la aldea:", error);
    }
}
// =======================================
// MOSTRAR ALDEA
// =======================================
function mostrarAldea(){
    const momento =
        obtenerMomentoDelDia();

    console.log(
        "🕐 Momento del día:",
        momento
    );
    const content = document.getElementById("content");
    if(!content) return;
    content.innerHTML = `
        <section class="aldea momento-${momento}">
            <!-- =================================
                 NAVEGACIÓN
            ================================== -->
            <!-- GUARDIA → CASTILLO -->
            <div class="aldea-item guardia" onclick="reproducirSonidoAldea('assets/sounds/man_talk.mp3'); entrarArmeriaDesdeAldea()">
                <img src="locations/village/images/castillo.png" alt="guardia">
            </div>
            <!-- ANCIANO → MAPA -->
            <div class="aldea-item mapa" onclick="reproducirSFX('exit.mp3'); irA('village', 'map', mostrarMapaReino)">
                <img src="locations/village/images/mapa.png" alt="Mapa">
                <p class="name">Salir</p>
            </div>
            <!-- MERCADO -->
            <div class="aldea-item tienda" onclick="reproducirSonidoAldea('assets/sounds/woman_talk.mp3'); hablarPersonaAldea()">
                <p class="name">Mercado</p>
                <img src="locations/village/images/mercado.png" alt="Mercado">
            </div>
            <!-- MISIONES -->
            <div class="aldea-item misiones" onclick="reproducirSonidoAldea('assets/sounds/woman_talk.mp3'); mostrarMisionesAldea()">
                <p class="name">Misiones</p>
                <img src="locations/village/images/misiones.png" alt="Misiones">
            </div>
            <!-- =================================
                 PERSONAJES
            ================================== -->
            <div class="aldea-personaje persona1" onclick="reproducirSonidoAldea('assets/sounds/man_talk.mp3'); hablarPersonaAldea('persona1')">
                <img src="locations/village/images/persona1.png" alt="Habitante">
            </div>
            <div class="aldea-personaje persona2" onclick="reproducirSonidoAldea('assets/sounds/man_talk.mp3'); hablarPersonaAldea('persona2')">
                <img src="locations/village/images/persona2.png" alt="Habitante">
            </div>
            <div class="aldea-personaje persona3" onclick="reproducirSonidoAldea('assets/sounds/man_talk.mp3'); hablarPersonaAldea('persona3')">
                <img src="locations/village/images/persona3.png" alt="Niño">
            </div>
            <div class="aldea-personaje persona4" onclick="reproducirSonidoAldea('assets/sounds/man_talk.mp3'); hablarPersonaAldea('persona4')">
                <img src="locations/village/images/persona4.png" alt="Niño">
            </div>
            <div class="aldea-personaje people4" onclick="reproducirSonidoAldea('assets/sounds/woman_talk.mp3'); hablarPersonaAldea('people4')">
                <img src="locations/village/images/people4.png" alt="Habitante">
            </div>
            <div class="aldea-personaje people7" onclick="reproducirSonidoAldea('assets/sounds/woman_talk.mp3'); hablarPersonaAldea('people7')">
                <img src="locations/village/images/people7.png" alt="Habitante">
            </div>
            <div class="aldea-personaje people9" onclick="reproducirSonidoAldea('assets/sounds/woman_talk.mp3'); hablarPersonaAldea('people9')">
                <img src="locations/village/images/people9.png" alt="Niña">
            </div>
            <!-- =================================
                 PERROS
            ================================== -->
            <div class="aldea-animal dog1" onclick="reproducirSonidoAldea('assets/sounds/perro1.mp3')">
                <img src="locations/village/images/dog1.png" alt="Perro">
            </div>
           <div class="aldea-animal dog2" onclick="reproducirSonidoAldea('assets/sounds/perro2.mp3')">
                <img src="locations/village/images/dog2.png" alt="Perro">
            </div>
            <div class="aldea-animal dog3" onclick="reproducirSonidoAldea('assets/sounds/perro3.mp3')">
                <img src="locations/village/images/dog3.png" alt="Perro">
            </div>
            <div class="aldea-animal dog4" onclick="reproducirSonidoAldea('assets/sounds/perro1.mp3')">
                <img src="locations/village/images/dog4.png" alt="Perro">
            </div>
            <!-- =================================
                 VASIJAS
            ================================== -->
            <div class="aldea-objeto vasija1" onclick="reproducirSonidoAldea('assets/sounds/woman_talk.mp3')">
                <img src="locations/village/images/vasija1.png" alt="Vasija">
            </div>
            <div class="aldea-objeto vasija2" onclick="reproducirSonidoAldea('assets/sounds/man_talk.mp3')">
                <img src="locations/village/images/vasija2.png" alt="Vasija">
            </div>
        </section>
    `;    // Cargar diálogos si todavía no están cargados
    if(dialogosAldea.length === 0){
        cargarDialogosAldea();
    }
}
// =======================================
// ARMERÍA DE LA ALDEA
// =======================================

function entrarArmeriaDesdeAldea(){

    origenArmeria = "aldea";

    mostrarArmeria();
}
// =======================================
// CASTILLO
// =======================================
function irAlCastillo(){
    mostrarCastillo();
}
// =======================================
// MERCADO
// =======================================
function entrarMercadoDesdeAldea(){
    mostrarMercado();
}
// =======================================
// MISIONES DE LA ALDEA
// =======================================
function mostrarMisionesAldea(){
    filtroZona = "Aldea";
    mostrarMisiones();
}
// =======================================
// REPRODUCIR SONIDO DE ALDEA
// =======================================
function reproducirSonidoAldea(ruta){
    const audio = new Audio(ruta);
    audio.volume = 0.8;
    audio.play().catch(error => {
        console.warn("No se pudo reproducir el sonido:", error);
    });
    // Máximo 5 segundos
    setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
    }, 5000);
}
// =======================================
// HABLAR CON HABITANTE
// =======================================
function hablarPersonaAldea(personaje){
    const disponibles = dialogosAldea.filter(
        dialogo => dialogo.personaje === personaje
    );
    if(disponibles.length === 0){
        mostrarMensaje("🏡 Habitante de Mírrafen",
            "Hola, viajero."
        );
        return;
    }
    const dialogo = disponibles[ Math.floor(Math.random() * disponibles.length) ];
    mostrarMensaje("🏡 Habitante de Mírrafen", dialogo.texto);
}