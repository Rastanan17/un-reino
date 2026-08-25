// =======================================
// SISTEMA DE MISIONES — CASTILLO
// =======================================
// ---------------------------------------
// CONFIGURACIÓN
// ---------------------------------------
const MISIONES_POR_PAGINA = 2;
let misiones = [];
let paginaActual = 0;
let zonaMisionesActual = "Castillo";
let filtroZona = "Castillo";
// Archivo de datos del Castillo
const ARCHIVO_MISIONES_CASTILLO = "systems/missions/data/missionsCastle.json";
const ARCHIVO_MISIONES_ALDEA = "systems/missions/data/missionsVillage.json";
const ARCHIVO_MISIONES_ACADEMIA = "systems/missions/data/missionsAcademy.json";
const ARCHIVO_MISIONES_GRANJA = "systems/missions/data/missionsFarm.json";
const ARCHIVO_MISIONES_BOSQUE = "systems/missions/data/missionsForest.json";
const ARCHIVO_MISIONES_HIELO = "systems/missions/data/missionsFrost.json";
const ARCHIVO_MISIONES_NIEVE = "systems/missions/data/missionsSnow.json";
const ARCHIVO_MISIONES_BIBLIOTECA = "systems/missions/data/missionsLibrary.json";
const ARCHIVO_MISIONES_MUSEO = "systems/missions/data/missionsMusseum.json";
const ARCHIVO_MISIONES_OBSERVATORIO = "systems/missions/data/missionsObservatory.json";
const ARCHIVO_MISIONES_MASCOTAS = "systems/missions/data/missionsPets.json";
const ARCHIVO_MISIONES_PUERTO = "systems/missions/data/missionsPort.json";
const ARCHIVO_MISIONES_SANTUARIO = "systems/missions/data/missionsSanctuary.json";
// =======================================
// OBTENER CLAVE DE MISIONES POR EDAD
// =======================================
function obtenerClaveMisionesPorEdad(){
    const jugador = cargarJugador();
    if(!jugador){
        return "misiones_6_8";
    }
    switch(jugador.rangoEdad){
        case "6-8": return "misiones_6_8";
        case "9-11": return "misiones_9_11";
        case "12-14": return "misiones_12_14";
        case "15-17": return "misiones_15_17";
        default: return "misiones_6_8";
    }
}
// =======================================
// CLAVE DE ESTADOS SEGÚN LA ZONA
// =======================================
function obtenerClaveEstadoMisiones(){
    const claves = {
        "Castillo": "estadoMisionesCastillo",
        "Aldea": "estadoMisionesAldea",
        "Granja": "estadoMisionesGranja",
        "Bosque": "estadoMisionesBosque",
        "Hielo": "estadoMisionesHielo",
        "Nieve": "estadoMisionesNieve",
        "Biblioteca": "estadoMisionesBiblioteca",
        "Museo": "estadoMisionesMuseo",
        "Observatorio": "estadoMisionesObservatorio",
        "Mascotas": "estadoMisionesMascotas",
        "Puerto": "estadoMisionesPuerto",
        "Santuario": "estadoMisionesSantuario"
    };
    return claves[zonaMisionesActual] || "estadoMisionesCastillo";
}
// =======================================
// CARGAR MISIONES DEL CASTILLO
// =======================================
async function cargarMisionesCastillo(){
    zonaMisionesActual = "Castillo";
    try{
        const respuesta = await fetch(
            ARCHIVO_MISIONES_CASTILLO
        );
        if(!respuesta.ok){
            throw new Error(`No se pudo cargar ${ARCHIVO_MISIONES_CASTILLO}`);
        }
        const datos = await respuesta.json();
        const claveEdad = obtenerClaveMisionesPorEdad();
        misiones = datos[claveEdad] || [];
        console.log("MISIONES CASTILLO CARGADAS:", claveEdad, misiones);
        // Recuperar estados guardados
        cargarEstadoMisiones();
        paginaActual = 0;
        mostrarTablonMisiones();
    }catch(error){
        console.error("Error cargando misiones del Castillo:", error);
        const content = document.getElementById("content");
        if(content){
            content.innerHTML = `
                <section class="tablon-misiones">
                    <h2>⚠️ Error</h2>
                    <p>No se pudieron cargar las misiones del Castillo.</p>
                    <button onclick="mostrarCastillo()">
                        ← Volver
                    </button>
                </section>
            `;
        }
    }
}
// =======================================
// CARGAR MISIONES DE LA ALDEA
// =======================================
async function cargarMisionesAldea(){
    zonaMisionesActual = "Aldea";
    try{
        const respuesta = await fetch(ARCHIVO_MISIONES_ALDEA);
        if(!respuesta.ok){
            throw new Error(`No se pudo cargar ${ARCHIVO_MISIONES_ALDEA}`);
        }
        const datos = await respuesta.json();
        const claveEdad = obtenerClaveMisionesPorEdad();
        misiones = datos[claveEdad] || [];
        console.log("MISIONES ALDEA CARGADAS:", misiones);
        // Recuperar estados guardados
        cargarEstadoMisiones();
        paginaActual = 0;
        mostrarTablonMisiones();
    }catch(error){
        console.error("Error cargando misiones de la Aldea:", error);
        const content = document.getElementById("content");
        if(content){
            content.innerHTML = `
                <section class="tablon-misiones">
                    <h2>⚠️ Error</h2>
                    <p>No se pudieron cargar las misiones de la Aldea.</p>
                    <button onclick="mostrarAldea()">← Volver</button>
                </section>
            `;
        }
    }
}
async function cargarMisionesGranja(){
    zonaMisionesActual = "Granja";
    try{
        const respuesta = await fetch(ARCHIVO_MISIONES_GRANJA);
        if(!respuesta.ok){
            throw new Error(`No se pudo cargar ${ARCHIVO_MISIONES_GRANJA}`);
        }
        const datos = await respuesta.json();
        const claveEdad = obtenerClaveMisionesPorEdad();
        misiones = datos[claveEdad] || [];
        console.log("MISIONES GRANJA CARGADAS:", misiones);
        cargarEstadoMisiones();
        paginaActual = 0;
        mostrarTablonMisiones();
    }catch(error){
        console.error("Error cargando misiones de la Granja:", error);
        const content = document.getElementById("content");
        if(content){
            content.innerHTML = `
                <section class="tablon-misiones">
                    <h2>⚠️ Error</h2>
                    <p>No se pudieron cargar las misiones de la Granja.</p>
                    <button onclick="mostrarGranja()">
                        ← Volver
                    </button>
                </section>
            `;
        }
    }
}
// =======================================
// CARGAR MISIONES DEL BOSQUE
// =======================================
async function cargarMisionesBosque(){
    // ===================================
    // ZONA ACTUAL
    // ===================================
    zonaMisionesActual = "Bosque";
    try{
        // ===================================
        // CARGAR JSON
        // ===================================
        const respuesta = await fetch(ARCHIVO_MISIONES_BOSQUE);
        if(!respuesta.ok){
            throw new Error(`No se pudo cargar ${ARCHIVO_MISIONES_BOSQUE}`);
        }
        const datos = await respuesta.json();
        // ===================================
        // OBTENER MISIONES SEGÚN EDAD
        // ===================================
        const claveEdad = obtenerClaveMisionesPorEdad();
        misiones = datos[claveEdad] || [];
        console.log("🌲 MISIONES BOSQUE CARGADAS:", claveEdad, misiones);
        // ===================================
        // RECUPERAR ESTADOS GUARDADOS
        // ===================================
        cargarEstadoMisiones();
        // ===================================
        // COMENZAR DESDE LA PRIMERA PÁGINA
        // ===================================
        paginaActual = 0;
        // ===================================
        // MOSTRAR TABLÓN
        // ===================================
        mostrarTablonMisiones();
    }catch(error){
        console.error("Error cargando misiones del Bosque:", error);
        // ===================================
        // MOSTRAR ERROR
        // ===================================
        const content = document.getElementById("content");
        if(content){
            content.innerHTML = `
                <section class="tablon-misiones">
                    <h2>⚠️ Error</h2>
                    <p>No se pudieron cargar las misiones del Bosque.</p>
                    <button onclick="mostrarBosque()">
                        ← Volver al Bosque
                    </button>
                </section>
            `;
        }
    }
}
// =======================================
// CARGAR MISIONES DEL OBSERVATORIO
// =======================================
async function cargarMisionesObservatorio(){
    zonaMisionesActual = "Observatorio";
    try{
        const respuesta = await fetch(ARCHIVO_MISIONES_OBSERVATORIO);
        if(!respuesta.ok){
            throw new Error(`No se pudo cargar ${ARCHIVO_MISIONES_OBSERVATORIO}`);
        }
        const datos = await respuesta.json();
        const claveEdad = obtenerClaveMisionesPorEdad();
        misiones = datos[claveEdad] || [];
        console.log("🔭 MISIONES OBSERVATORIO CARGADAS:", claveEdad, misiones);
        cargarEstadoMisiones();
        paginaActual = 0;
        mostrarTablonMisiones();
    }catch(error){
        console.error("Error cargando misiones del Observatorio:", error);
        const content = document.getElementById("content");
        if(content){
            content.innerHTML = `
                <section class="tablon-misiones">
                    <h2>⚠️ Error</h2>
                    <p>No se pudieron cargar las misiones del Observatorio.</p>
                    <button onclick="mostrarObservatorio()">
                        ← Volver al Observatorio
                    </button>
                </section>
            `;
        }
    }
}
// =======================================
// TABLÓN DE MISIONES
// =======================================
function mostrarTablonMisiones(){
    const content = document.getElementById("content");
    if(!content) return;
    const inicio = paginaActual * MISIONES_POR_PAGINA;
    const fin = inicio + MISIONES_POR_PAGINA;
    const pagina = misiones.slice(inicio, fin);
    content.innerHTML = `
        <section class="tablon-misiones misiones-${zonaMisionesActual.toLowerCase()}">
            <!-- VOLVER -->
            <img class="btn-volver" src="assets/images/items/exit.png" alt="Volver" onclick="volverDeMisiones()">
            <!-- ANTERIOR -->
            <img class="btn-anterior ${paginaActual === 0 ? "flecha-deshabilitada" : ""}"
                src="assets/images/items/arrow_left.png" alt="Anterior" onclick="paginaAnteriorMisiones()">
            <!-- INDICADOR DE PÁGINA -->
            <div class="indicador-pagina">
                Página ${paginaActual + 1} de ${Math.ceil(misiones.length / MISIONES_POR_PAGINA)}
            </div>
            <!-- SIGUIENTE -->
            <img class="btn-siguiente ${paginaActual >= Math.ceil(misiones.length / MISIONES_POR_PAGINA) - 1 ? "flecha-deshabilitada" : ""}"
                src="assets/images/items/arrow_right.png" alt="Siguiente" onclick="paginaSiguienteMisiones()">
            <!-- PERGAMINOS -->
            <div class="pergaminos">
                ${pagina.length > 0 ? pagina .map(crearPergamino) .join("")
                    : `<p class="sin-misiones">No hay misiones disponibles.</p>`
                }
            </div>
        </section>
    `;
}
// =======================================
// VOLVER DESDE LAS MISIONES
// =======================================
function volverDeMisiones(){
    reproducirSFX("exit.mp3");
    if(zonaMisionesActual === "Aldea"){
        mostrarAldea();
        return;
    }
    if(zonaMisionesActual === "Bosque"){
        mostrarBosque();
        return;
    }
    if(zonaMisionesActual === "Granja"){
        mostrarGranja();
        return;
    }
    if(zonaMisionesActual === "Observatorio"){
        mostrarObservatorio();
        return;
    }
    mostrarCastillo();
}
// =======================================
// CREAR PERGAMINO DEL TABLÓN
// =======================================
function crearPergamino(mision){
    let tiempo = "";
    // ===================================
    // TIEMPO SOLO SI ESTÁ EN CURSO
    // ===================================
    if(mision.estado === "enCurso"){
        const inicio = mision.inicio || Date.now();
        const transcurrido =
            Math.floor((Date.now() - inicio) / 1000);
        const restante = Math.max(0, mision.duracion - transcurrido);
        tiempo = `
            <div class="tiempo-mision"
                 data-inicio="${inicio}"
                 data-duracion="${mision.duracion}">
                ⏳
                <span class="temporizador-mision">
                    ${formatearTiempo(restante)}
                </span>
            </div>
        `;
    }
    return `
        <div
            class="pergamino2 estado-${mision.estado}"
            onclick="abrirPergaminoMision(${mision.id})">
            <div class="contenido-pergamino-mision">
                <div class="titulo-mision">
                    ${mision.icono}
                    ${mision.titulo}
                </div>
                ${tiempo}
            </div>
        </div>
    `;
}
// =======================================
// TEXTO DEL ESTADO
// =======================================
function textoEstadoMision(estado){
    if(estado === "disponible")
        return "Nueva misión";
    if(estado === "enCurso")
        return "En progreso";
    if(estado === "completada")
        return "Completada";
    return "";
}
// =======================================
// PÁGINA ANTERIOR
// =======================================
function paginaAnteriorMisiones(){
    if(paginaActual <= 0){
        reproducirSFX("non.mp3");
        const flecha = document.querySelector(".btn-anterior");
        if(flecha){
            flecha.classList.remove("flecha-limite");
            void flecha.offsetWidth;
            flecha.classList.add("flecha-limite");
        }
        return;
    }
    reproducirSFX("swords.mp3");
    paginaActual--;
    mostrarTablonMisiones();
}
// =======================================
// PÁGINA SIGUIENTE
// =======================================
function paginaSiguienteMisiones(){
    const totalPaginas = Math.ceil(
        misiones.length / MISIONES_POR_PAGINA
    );
    if(paginaActual >= totalPaginas - 1){
        reproducirSFX("non.mp3");
        const flecha = document.querySelector(".btn-siguiente");
        if(flecha){
            flecha.classList.remove("flecha-limite");
            void flecha.offsetWidth;
            flecha.classList.add("flecha-limite");
        }
        return;
    }
    reproducirSFX("swords.mp3");
    paginaActual++;
    mostrarTablonMisiones();
}
// =======================================
// ABRIR MISIÓN
// =======================================
function abrirPergaminoMision(id){
    const mision = misiones.find(m => m.id === id);
    if(!mision) return;
    let botones = [];
    // ===================================
    // MISIÓN DISPONIBLE
    // ===================================
    if(mision.estado === "disponible"){
        botones.push({
            texto: "⚔️ Comenzar misión",
            accion: `accionBotonMision(() => iniciarMision(${mision.id}))`
        });
    }
    // ===================================
    // MISIÓN EN CURSO
    // ===================================
    else if(mision.estado === "enCurso"){
        botones.push({
            texto: "✅ Ya terminé",
            accion: `accionBotonMision(() => terminarMision(${mision.id}))`
        });
        botones.push({
            texto: "⏸️ Posponer",
            accion: `accionBotonMision(() => posponerMision(${mision.id}))`
        });
    }
    // ===================================
    // MISIÓN COMPLETADA
    // ===================================
    else if(mision.estado === "completada"){
        botones.push({
            texto: "🏆 Completada",
            accion: `accionBotonMision(() => cerrarPergamino())`
        });
    }
    // ===================================
    // CERRAR
    // ===================================
    botones.push({
        texto: "❌ Cerrar",
        accion: `accionBotonMision(() => cerrarPergamino())`
    });
    // ===================================
    // INFORMACIÓN DEL TIEMPO
    // ===================================
    let informacionTiempo = "";
    if(mision.estado === "enCurso"){
        const inicio = mision.inicio || Date.now();
        const transcurrido = Math.floor((Date.now() - inicio) / 1000);
        const restante = Math.max(0, mision.duracion - transcurrido);
        if(restante > 0){
            informacionTiempo = `
                <br>
                <strong>⏳ Tiempo restante:</strong>
                <span id="temporizadorMision">${formatearTiempo(restante)}</span>
            `;
        }else{
            informacionTiempo = `
                <br>
                <strong class="mision-lista">🏆 ¡Tiempo terminado!</strong>
                <br>
                <span>Podés finalizar la misión cuando quieras.</span>
            `;
        }
    }
    // ===================================
    // MOSTRAR PERGAMINO
    // ===================================
    mostrarPergamino({
        icono: mision.icono,
        titulo: mision.titulo,
        descripcion: `
            <p>${mision.descripcion}</p>
            <br>
            <strong>⚔️ Dificultad:</strong>
            ${mision.dificultad}
            <br>
            <strong>⭐ XP:</strong>
            ${mision.xp}
            <br>
            <strong>💰 Oquos:</strong>
            ${mision.oquos}
            <br>
            <strong>⏱️ Duración:</strong>
            ${formatearDuracion(mision.duracion)}
            ${informacionTiempo}
        `,
        botones: botones
    });
    // ===================================
    // TEMPORIZADOR
    // ===================================
    if(mision.estado === "enCurso"){
        iniciarTemporizadorPergamino(
            mision.id
        );
    }
}
// =======================================
// ACCIÓN DE BOTÓN DE MISIÓN
// =======================================
function accionBotonMision(accion){
    reproducirSFX("touch.mp3");
    if(typeof accion === "function"){
        accion();
    }
}
// =======================================
// FORMATEAR DURACIÓN
// =======================================
function formatearDuracion(segundos){
    if(!segundos){
        return "Sin duración";
    }
    const minutos = Math.floor(segundos / 60);
    if(minutos < 1){
        return `${segundos} segundos`;
    }
    if(minutos === 1){
        return "1 minuto";
    }
    return `${minutos} minutos`;
}
// =======================================
// FORMATEAR TEMPORIZADOR
// =======================================
function formatearTiempo(segundos){
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${String(minutos).padStart(2,"0")}:${String(segundosRestantes).padStart(2,"0")}`;
}
// =======================================
// TEMPORIZADOR DEL PERGAMINO
// =======================================
function iniciarTemporizadorPergamino(id){
    const mision = misiones.find(m => m.id === id);
    if(!mision) return;
    const intervalo = setInterval(() => {
            const elemento = document.getElementById("temporizadorMision");
            // Si el pergamino se cerró,
            // dejamos de actualizarlo.
            if(!elemento){
                clearInterval(intervalo);
                return;
            }
            const inicio = mision.inicio || Date.now();
            const transcurrido = Math.floor(
                    (Date.now() - inicio) / 1000
                );
            const restante = Math.max(0, mision.duracion - transcurrido);
            // -------------------------------
            // TODAVÍA QUEDA TIEMPO
            // -------------------------------
            if(restante > 0){
                elemento.textContent = formatearTiempo(restante);
            }
            // -------------------------------
            // TERMINÓ EL TIEMPO
            // -------------------------------
            else{
                clearInterval(intervalo);
                abrirPergaminoMision(id);
            }
        },1000);
}
// =======================================
// INICIAR MISIÓN
// =======================================
function iniciarMision(id){
    const mision = misiones.find(m => m.id === id);
    if(!mision) return;
    mision.estado = "enCurso";
    mision.inicio = Date.now();
    guardarEstadoMisiones();
    console.log("MISIÓN INICIADA:", mision);
    cerrarPergamino();
    mostrarMensaje("⚔️ Misión iniciada",
        `Has comenzado: "${mision.titulo}"`
    );
    mostrarTablonMisiones();
}
// =======================================
// TERMINAR MISIÓN MANUALMENTE
// =======================================
function terminarMision(id){
    const mision = misiones.find(m => m.id === id);
    if(!mision) return;
    if(mision.estado !== "enCurso"){
        return;
    }
    cerrarPergamino();
    completarMision(id);
}
// =======================================
// POSPONER MISIÓN
// =======================================
function posponerMision(id){
    const mision = misiones.find(m => m.id === id);
    if(!mision) return;
    if(mision.estado !== "enCurso"){
        return;
    }
    mision.estado = "disponible";
    delete mision.inicio;
    guardarEstadoMisiones();
    mostrarTablonMisiones();
    cerrarPergamino();
    reproducirSFX("non.mp3");
    mostrarMensaje("📜 Misión pospuesta", "Podrás retomarla cuando quieras.");
}
// =======================================
// COMPLETAR MISIÓN
// =======================================
function completarMision(id){
    const mision = misiones.find(m => m.id === id);
    if(!mision) return;
    // ===================================
    // SOLO SE PUEDE COMPLETAR EN CURSO
    // ===================================
    if(mision.estado !== "enCurso"){
        return;
    }
    // ===================================
    // COMPLETAR
    // ===================================
    mision.estado = "completada";
    guardarEstadoMisiones();
    // ===================================
    // DAR RECOMPENSA
    // ===================================
    sumarRecompensa(mision.xp, mision.oquos);
    /// ===================================
    // REGISTRAR EN PERFIL
    // ===================================
    const jugador = cargarJugador();
    if(jugador){
        const identificadorMision = `${zonaMisionesActual}:${mision.id}`;
        if(
            !jugador.misionesCompletadas.includes(identificadorMision)
        ){
            jugador.misionesCompletadas.push(identificadorMision);
        }
        guardarJugador(jugador);
    }
    console.log("MISIÓN COMPLETADA:", mision);
    reproducirSFX("mission_complete.wav");
    mostrarMensaje("🏆 Misión completada", `Ganaste ⭐ ${mision.xp} XP y 💰 ${mision.oquos} Oquos`);
    mostrarTablonMisiones();
}
// =======================================
// GUARDAR ESTADOS DE MISIONES
// =======================================
function guardarEstadoMisiones(){
    const estadosGuardados = JSON.parse(localStorage.getItem("estadoMisiones")) || {};
    const rangoEdad = cargarJugador()?.rangoEdad || "6-8";
    misiones.forEach(mision => {
        const identificador = `${zonaMisionesActual}:${rangoEdad}:${mision.id}`;
        estadosGuardados[identificador] = {
            estado: mision.estado,
            inicio: mision.inicio || null
        };
    });
    localStorage.setItem("estadoMisiones", JSON.stringify(estadosGuardados));
}
// =======================================
// RECUPERAR ESTADOS DE MISIONES
// =======================================
function cargarEstadoMisiones(){
    const datos = localStorage.getItem("estadoMisiones");
    if(!datos){
        return;
    }
    try{
        const estados = JSON.parse(datos);
        const rangoEdad = cargarJugador()?.rangoEdad || "6-8";
        misiones.forEach(mision => {
            const identificador = `${zonaMisionesActual}:${rangoEdad}:${mision.id}`;
            if(estados[identificador]){
                mision.estado = estados[identificador].estado;
                mision.inicio = estados[identificador].inicio;
            }
        });
    }catch(error){
        console.error("Error recuperando estados:", error);
    }
}
// =======================================
// OBTENER TIEMPO RESTANTE
// =======================================
function obtenerTiempoRestante(mision){
    if(
        !mision.inicio || !mision.duracion
    ){
        return "";
    }
    const total = mision.duracion * 1000;
    const pasado = Date.now() - mision.inicio;
    const restante = total - pasado;
    if(restante <= 0){
        return "🏆 Tiempo terminado";
    }
    const segundos = Math.floor(restante / 1000);
    const minutos = Math.floor(segundos / 60);
    const seg = segundos % 60;
        return `⏳ ${minutos}:${seg.toString().padStart(2,"0")
    }`;
}
// =======================================
// INICIALIZAR SISTEMA
// =======================================
async function iniciarSistemaMisiones(){
    try{
        const respuesta = await fetch(ARCHIVO_MISIONES_CASTILLO);
        if(!respuesta.ok){
            throw new Error("No se pudo cargar el JSON de misiones.");
        }
        const datos = await respuesta.json();
        console.log("Sistema de misiones iniciado:", datos);
    }catch(error){
        console.error("Error iniciando sistema de misiones:", error);
    }
}
// =======================================
// COMPATIBILIDAD CON MAPA
// =======================================
function mostrarMisiones(){
    if(filtroZona === "Aldea"){
        cargarMisionesAldea();
        return;
    }
    if(filtroZona === "Granja"){
        cargarMisionesGranja();
        return;
    }
    if(filtroZona === "Bosque"){
        cargarMisionesBosque();
        return;
    }
    if(filtroZona === "Observatorio"){
        cargarMisionesObservatorio();
        return;
    }
    cargarMisionesCastillo();
}