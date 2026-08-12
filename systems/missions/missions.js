// =======================================
// SISTEMA DE MISIONES — CASTILLO
// =======================================
// ---------------------------------------
// CONFIGURACIÓN
// ---------------------------------------
const MISIONES_POR_PAGINA = 2;
let misiones = [];
let paginaActual = 0;
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
// CARGAR MISIONES
// =======================================
async function cargarMisionesCastillo(){
    try{
        const respuesta = await fetch(ARCHIVO_MISIONES_CASTILLO);
        if(!respuesta.ok){
            throw new Error(`No se pudo cargar ${ARCHIVO_MISIONES_CASTILLO}`);
        }
        misiones = await respuesta.json();
        console.log("MISIÓNES CASTILLO CARGADAS:", misiones);
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
                    <button onclick="mostrarCastillo()">← Volver</button>
                </section>
            `;
        }
    }
}
// =======================================
// CARGAR MISIONES DE LA ALDEA
// =======================================
async function cargarMisionesAldea(){
    try{
        const respuesta = await fetch(ARCHIVO_MISIONES_ALDEA);
        if(!respuesta.ok){
            throw new Error(`No se pudo cargar ${ARCHIVO_MISIONES_ALDEA}`);
        }
        misiones = await respuesta.json();
        console.log("MISIONES ALDEA CARGADAS:", misiones);
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
        <section class="tablon-misiones ${filtroZona === "Aldea" ? "misiones-aldea" : "misiones-castillo"}">
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
    if(filtroZona === "Aldea"){
        mostrarAldea();
        return;
    }
    if(filtroZona === "Bosque"){
        mostrarBosque();
        return;
    }
    if(filtroZona === "Granja"){
        mostrarGranja();
        return;
    }
    mostrarCastillo();
}
// =======================================
// CREAR PERGAMINO DEL TABLÓN
// =======================================
function crearPergamino(mision){
    return `
        <div
            class="pergamino2 estado-${mision.estado}"
            onclick="abrirPergaminoMision(${mision.id})">
            <div class="estado-mision">${textoEstadoMision(mision.estado)}</div>
            <div class="titulo-mision">${mision.icono} ${mision.titulo}</div>
            <div class="dificultad-mision">⚔️ ${mision.dificultad}</div>
            <div class="xp-mision">⭐ ${mision.xp} XP</div>
            <div class="oquos-mision">💰 ${mision.oquos} Oquos</div>
            <div class="tiempo-mision">
                ${mision.estado === "enCurso" ? obtenerTiempoRestante(mision) : ""}
            </div>
        </div>
    `;
}
// =======================================
// TEXTO DEL ESTADO
// =======================================
function textoEstadoMision(estado){
    if(estado === "disponible")
        return "📜 Nueva misión";
    if(estado === "enCurso")
        return "⏳ En progreso";
    if(estado === "completada")
        return "🏆 Completada";
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
            accion:`iniciarMision(${mision.id}); cerrarPergamino();`
        });
    }
    // ===================================
    // MISIÓN EN CURSO
    // ===================================
        else if(mision.estado === "enCurso"){
        botones.push({
            texto: "✅ Ya terminé",
            accion: `terminarMision(${mision.id}); cerrarPergamino();`
        });
        botones.push({
            texto: "⏸️ Posponer",
            accion: `posponerMision(${mision.id}); cerrarPergamino();`
        });
    }
    // ===================================
    // MISIÓN COMPLETADA
    // ===================================
    else if(mision.estado === "completada"){
        botones.push({
            texto: "🏆 Completada",
            accion: "cerrarPergamino();"
        });
    }
    // ===================================
    // CERRAR
    // ===================================
    botones.push({
        texto: "❌ Cerrar",
        accion: "cerrarPergamino();"
    });
    // ===================================
    // INFORMACIÓN DEL TIEMPO
    // =======================================
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
            <br><strong>📍 Lugar:</strong>
            Castillo
            <br><strong>⚔️ Dificultad:</strong>
            ${mision.dificultad}
            <br><strong>⭐ XP:</strong>
            ${mision.xp}
            <br><strong>💰 Oquos:</strong>
            ${mision.oquos}
            <br><strong>⏱️ Duración:</strong>
            ${formatearDuracion(mision.duracion)}
            ${informacionTiempo}
        `,
        botones: botones
    });
    // ===================================
    // INICIAR ACTUALIZACIÓN DEL TEMPORIZADOR
    // ===================================
    if(mision.estado === "enCurso"){
        iniciarTemporizadorPergamino(mision.id);
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
    mostrarMensaje("📜 Misión pospuesta",
        "Podrás retomarla cuando quieras."
    );
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
    // ===================================
    // REGISTRAR EN PERFIL
    // ===================================
    const jugador = cargarJugador();
    if(jugador){
        if(
            !jugador.misionesCompletadas.includes(mision.id)
        ){
            jugador.misionesCompletadas.push(mision.id);
        }
        guardarJugador(jugador);
    }
    console.log("MISIÓN COMPLETADA:", mision);
    mostrarMensaje("🏆 Misión completada",
        `Ganaste ⭐ ${mision.xp} XP y 💰 ${mision.oquos} Oquos`
    );
    mostrarTablonMisiones();
}
// =======================================
// GUARDAR ESTADOS
// =======================================
function guardarEstadoMisiones(){
    const estados = {};
    misiones.forEach(
        mision => {
            estados[mision.id] = {estado: mision.estado, inicio: mision.inicio || null};
        }
    );
    localStorage.setItem("estadoMisionesCastillo", JSON.stringify(estados));
}
// =======================================
// RECUPERAR ESTADOS
// =======================================
function cargarEstadoMisiones(){
    const datos = localStorage.getItem("estadoMisionesCastillo");
    if(!datos) return;
    try{
        const estados = JSON.parse(datos);
        misiones.forEach(
            mision => {
                if(estados[mision.id]){
                    mision.estado = estados[mision.id].estado;
                    mision.inicio = estados[mision.id].inicio;
                }
            }
        );
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
        misiones = await respuesta.json();
        cargarEstadoMisiones();
        console.log("Sistema de misiones iniciado:", misiones);
    }catch(error){
        console.error("Error iniciando sistema de misiones:", error);
    }
}
// =======================================
// INICIO
// =======================================
iniciarSistemaMisiones();
// =======================================
// COMPATIBILIDAD CON MAPA
// =======================================
function mostrarMisiones(){
    if(filtroZona === "Aldea"){
        cargarMisionesAldea();
        return;
    }
    cargarMisionesCastillo();
}