// =======================================
// CASTILLO DE MÍRRAFEN
// =======================================
// =======================================
// DIÁLOGOS DE LOS GUARDIAS
// =======================================
let dialogosGuardias = [];
let cargandoDialogosGuardias = null;
async function cargarDialogosGuardias(){
    if(cargandoDialogosGuardias){
        return cargandoDialogosGuardias;
    }
    cargandoDialogosGuardias = fetch("locations/castle/data/castle.json")
    .then(respuesta => {
        if(!respuesta.ok){
            throw new Error("No se pudo cargar castle.json");
        }
        return respuesta.json();
    })
    .then(datos => {
        dialogosGuardias = datos;
        console.log("DIÁLOGOS DE GUARDIAS CARGADOS:", dialogosGuardias);
        return dialogosGuardias;
    })
    .catch(error => {
        console.error("Error cargando diálogos de guardias:", error);
        return [];
    });
    return cargandoDialogosGuardias;
}
// =======================================
// CASTILLO
// =======================================
function mostrarCastillo(){
    const jugador = cargarJugador();
    if (!jugador) {
        return;
    }
    reproducirMusica("assets/sounds/ambient_castle.mp3",
        0.35
    );
    const content = document.getElementById("content");
    content.innerHTML = `
        <section class="castillo">
            <!-- ===========================
                 GUARDIAS
            ============================ -->
            <div class="guardias1" onclick="hablarGuardias1()">
                <h2 class="name">Guardias</h2>
                <img src="locations/castle/images/guards_1.png" alt="Guardias">
            </div>
            <div class="guardias2" onclick="hablarGuardias2()">
                <h2 class="name">Guardias</h2>
                <img src="locations/castle/images/guards_2.png" alt="Guardias">
            </div>
            <!-- ===========================
                 OBJETOS
            ============================ -->
            <div class="objeto trono" onclick="reproducirSFX('open_place.wav'); mostrarPerfilJugador()">
                <h2 class="name">Trono</h2>
                <img src="locations/castle/images/throne.png" alt="Trono">
            </div>
            <div class="objeto tablon" onclick="reproducirSFX('open_place.wav'); mostrarMisionesCastillo()">
                <h2 class="name">Misiones</h2>
                <img src="locations/castle/images/missions.png" alt="Tablón">
            </div>
            <div class="objeto armeria" onclick="reproducirSFX('open_place.wav'); mostrarArmeria()">
                <h2 class="name">Editar</h2>
                <img src="locations/castle/images/armery.png" alt="Armería">
            </div>
            <div class="objeto salir" onclick="reproducirSFX('exit.mp3'); irA('castle', 'map', mostrarMapaReino)">
                <h2 class="name">Salir</h2>
                <img src="locations/castle/images/exit.png" alt="Salir">
            </div>
            <!-- ===========================
                 LUCES
            ============================ -->
            <div class="objeto light1">
                <img src="locations/castle/images/light_1.png" alt="Luz">
            </div>
            <div class="objeto light2">
                <img src="locations/castle/images/light_2.png" alt="Luz">
            </div>
            <div class="objeto light3">
                <img src="locations/castle/images/light_3.png" alt="Luz">
            </div>
            <div class="objeto light4">
                <img src="locations/castle/images/light_4.png" alt="Luz">
            </div>
        </section>
    `;
    // Cargar diálogos si todavía no están cargados
    if(dialogosGuardias.length === 0){
        cargarDialogosGuardias();
    }
}
// =======================================
// HABLAR CON GUARDIAS 1
// =======================================
function hablarGuardias1(){
    mostrarDialogoGuardia("guardias1");
}
// =======================================
// HABLAR CON GUARDIAS 2
// =======================================
function hablarGuardias2(){
    mostrarDialogoGuardia("guardias2");
}
// =======================================
// MOSTRAR DIÁLOGO DE GUARDIA
// =======================================
async function mostrarDialogoGuardia(guardia){
    // Si todavía no cargamos los diálogos,
    // esperamos a que termine la carga.
    if(dialogosGuardias.length === 0){
        await cargarDialogosGuardias();
    }
    const disponibles = dialogosGuardias.filter(
        dialogo => dialogo.guardia === guardia
    );
    // Si no encontramos diálogos
    if(disponibles.length === 0){
        mostrarMensaje("🛡️ Guardia del Castillo",
            "No tengo nada que decirte, ciudadano..."
        );
        return;
    }
    // Elegir uno al azar
    const dialogo = disponibles[
        Math.floor(Math.random() * disponibles.length)
    ];
    mostrarMensaje("🛡️ Guardia del Castillo",dialogo.texto);
}
// =======================================
// PERFIL DEL JUGADOR
// =======================================
function mostrarPerfilJugador(){
    document.getElementById("panelJugador").style.display = "flex";
}
function cerrarPanelJugador(){
    document.getElementById("panelJugador").style.display = "none";
}
// =======================================
// ARMERÍA
// =======================================
function mostrarArmeria(){
    mostrarMensaje("🛡️ Armería",
        "Aquí podrás cambiar tu apariencia, equipar objetos y mejorar a tu aventurero."
    );
}