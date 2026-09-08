// =======================================
// 💎 MINIJUEGO DE MINERALES
// =======================================
const ARCHIVO_DATOS_MINERAL = "locations/caves/minigames/mineral/mineral.json";
const RUTA_IMAGENES_MINERAL = "locations/caves/minigames/mineral/images/";
const CLAVE_PICOS_MINERAL = "picosMineral";
const CLAVE_PROGRESO_MINERAL = "progresoMineral";
const FONDO_MINERAL = "assets/images/backgrounds/caves/cave_mineral.png";
let imagenFondoMineral = null;
imagenFondoMineral = new Image();
imagenFondoMineral.src = FONDO_MINERAL;
let canvasMineral = null;
let ctxMineral = null;
let datosMineral = null;
let nivelMineral = 1;
let xpMineral = 0;
let recursosMineral = 0;
let picosMineral = 0;
let picosFuego = 0;
let picosHielo = 0;
let picoSeleccionadoMineral = "mineral";
let progresoMineralCargado = false;
let rocasMineral = [];
let juegoMineralActivo = false;
// =======================================
// 💎 INICIAR MINIJUEGO
// =======================================
async function iniciarMinijuegoMineral(){
    console.log("💎 Iniciando Minijuego de Minerales");
    try{
        const respuesta = await fetch(ARCHIVO_DATOS_MINERAL);
        if(!respuesta.ok){
            throw new Error("No se pudo cargar mineral.json");
        }
        datosMineral = await respuesta.json();
        console.log("💎 Datos de minerales cargados:", datosMineral);
        cargarProgresoMineral();
        mostrarPantallaMineral();
    }catch(error){
        console.error("❌ Error cargando datos minerales:", error);
        mostrarMensaje("❌ Error", "No se pudieron cargar los datos de la caverna.");
    }
}
// =======================================
// 💾 CARGAR PROGRESO DE MINERALES
// =======================================
function cargarProgresoMineral(){
    const progresoGuardado = localStorage.getItem(CLAVE_PROGRESO_MINERAL);
    // ===================================
    // GUARDADO NUEVO
    // ===================================
    if(progresoGuardado){
        try{
            const progreso = JSON.parse(progresoGuardado);
            nivelMineral = Math.max(1, Number(progreso.nivel) || 1);
            xpMineral = Math.max(0, Number(progreso.xp) || 0);
            recursosMineral = Math.max(0, Number(progreso.recursos) || 0);
            // ===================================
            // COMPATIBILIDAD CON EL GUARDADO
            // QUE SOLO TENÍA "picos"
            // ===================================
            if(progreso.picosMineral !== undefined){
                picosMineral = Math.max(0, Number(progreso.picosMineral) || 0);
            }else if(progreso.picos !== undefined){
                picosMineral = Math.max(0, Number(progreso.picos) || 0);
            }else{
                const picosViejos = Number(localStorage.getItem("picosMineral"));
                picosMineral = Number.isFinite(picosViejos) ? Math.max(0, picosViejos) : 0;
            }
            picosFuego = Math.max(0, Number(progreso.picosFuego !== undefined ? progreso.picosFuego : localStorage.getItem("picosFuego")) || 0);
            picosHielo = Math.max(0, Number(progreso.picosHielo !== undefined ? progreso.picosHielo : localStorage.getItem("picosHielo")) || 0);
            picoSeleccionadoMineral = progreso.picoSeleccionadoMineral || localStorage.getItem("picoSeleccionadoMineral") || "mineral";
            if(!["mineral", "fuego", "hielo"].includes(picoSeleccionadoMineral)){
                picoSeleccionadoMineral = "mineral";
            }
            console.log("💾 Progreso Mineral cargado:", {
                nivelMineral,
                xpMineral,
                recursosMineral,
                picosMineral,
                picosFuego,
                picosHielo,
                picoSeleccionadoMineral
            });
            progresoMineralCargado = true;
            guardarProgresoMineral();
            return;
        }catch(error){
            console.error("❌ Error leyendo progreso Mineral:", error);
        }
    }
    // ===================================
    // COMPATIBILIDAD CON GUARDADO ANTIGUO
    // ===================================
    const picosAntiguos = localStorage.getItem(CLAVE_PICOS_MINERAL);
    if(picosAntiguos !== null){
        const cantidad = parseInt(picosAntiguos, 10);
        picosMineral = Number.isFinite(cantidad) ? Math.max(0, cantidad) : 0;
    }else{
        picosMineral = datosMineral.picos && Number.isFinite(datosMineral.picos.cantidadInicial) ? datosMineral.picos.cantidadInicial : 0;
    }
    picosFuego = Math.max(0, Number(localStorage.getItem("picosFuego")) || 0);
    picosHielo = Math.max(0, Number(localStorage.getItem("picosHielo")) || 0);
    picoSeleccionadoMineral =
        localStorage.getItem("picoSeleccionadoMineral") || "mineral";
    if(!["mineral", "fuego", "hielo"].includes(picoSeleccionadoMineral)){
        picoSeleccionadoMineral = "mineral";
    }
    // ===================================
    // INTENTAR RECUPERAR DATOS ANTIGUOS
    // ===================================
    const nivelAntiguo = Number(localStorage.getItem("nivelMineral"));
    const xpAntigua = Number(localStorage.getItem("xpMineral"));
    const recursosAntiguos = Number(localStorage.getItem("recursosMineral"));
    nivelMineral = Number.isFinite(nivelAntiguo) && nivelAntiguo > 0 ? nivelAntiguo : 1;
    xpMineral = Number.isFinite(xpAntigua) && xpAntigua >= 0 ? xpAntigua : 0;
    recursosMineral = Number.isFinite(recursosAntiguos) && recursosAntiguos >= 0 ? recursosAntiguos : 0;
    progresoMineralCargado = true;
    guardarProgresoMineral();
    console.log("💾 Progreso Mineral inicializado:", {
        nivelMineral,
        xpMineral,
        recursosMineral,
        picosMineral,
        picosFuego,
        picosHielo,
        picoSeleccionadoMineral
    });
}
// =======================================
// 💾 GUARDAR PROGRESO DE MINERALES
// =======================================
function guardarProgresoMineral(){
    const progreso = {
        nivel: Math.max(1, Number(nivelMineral) || 1),
        xp: Math.max(0, Number(xpMineral) || 0),
        recursos: Math.max(0, Number(recursosMineral) || 0),
        picosMineral: Math.max(0, Number(picosMineral) || 0),
        picosFuego: Math.max(0, Number(picosFuego) || 0),
        picosHielo: Math.max(0, Number(picosHielo) || 0),
        picoSeleccionadoMineral: picoSeleccionadoMineral
    };
    localStorage.setItem(CLAVE_PROGRESO_MINERAL, JSON.stringify(progreso));
    // ===================================
    // COMPATIBILIDAD
    // ===================================
    localStorage.setItem("nivelMineral", String(progreso.nivel));
    localStorage.setItem("xpMineral", String(progreso.xp));
    localStorage.setItem("recursosMineral", String(progreso.recursos));
    localStorage.setItem("picosMineral", String(progreso.picosMineral));
    localStorage.setItem("picosFuego", String(progreso.picosFuego));
    localStorage.setItem("picosHielo", String(progreso.picosHielo));
    localStorage.setItem("picoSeleccionadoMineral", progreso.picoSeleccionadoMineral);
    console.log("💾 Progreso Mineral guardado:", progreso);
}
// =======================================
// 💾 COMPATIBILIDAD
// =======================================
function guardarPicosMineral(){
    guardarProgresoMineral();
}
// =======================================
// ➕ AGREGAR PICOS
// =======================================
function agregarPicosMineral(cantidad){
    if(!progresoMineralCargado){
        cargarProgresoMineral();
    }
    cantidad = parseInt(cantidad, 10);
    if(!Number.isFinite(cantidad) || cantidad <= 0){
        return false;
    }
    picosMineral += cantidad;
    guardarProgresoMineral();
    actualizarHUDMineral();
    console.log(`⛏️ +${cantidad} picos de minería. Total: ${picosMineral}`);
    return true;
}
function agregarPicosFuego(cantidad){
    if(!progresoMineralCargado){
        cargarProgresoMineral();
    }
    cantidad = parseInt(cantidad, 10);
    if(!Number.isFinite(cantidad) || cantidad <= 0){
        return false;
    }
    picosFuego += cantidad;
    guardarProgresoMineral();
    actualizarHUDMineral();
    console.log(`🔥 +${cantidad} picos de fuego. Total: ${picosFuego}`);
    return true;
}
function agregarPicosHielo(cantidad){
    if(!progresoMineralCargado){
        cargarProgresoMineral();
    }
    cantidad = parseInt(cantidad, 10);
    if(!Number.isFinite(cantidad) || cantidad <= 0){
        return false;
    }
    picosHielo += cantidad;
    guardarProgresoMineral();
    actualizarHUDMineral();
    console.log(`❄️ +${cantidad} picos de hielo. Total: ${picosHielo}`);
    return true;
}
function seleccionarPicoMineral(tipo){
    if(!["mineral", "fuego", "hielo"].includes(tipo)){
        return;
    }
    picoSeleccionadoMineral = tipo;
    guardarProgresoMineral();
    actualizarHUDMineral();
    console.log(`⛏️ Pico seleccionado: ${tipo}`);
}
function obtenerCantidadPicoSeleccionado(){
    switch(picoSeleccionadoMineral){
        case "fuego":
            return picosFuego;
        case "hielo":
            return picosHielo;
        default:
            return picosMineral;
    }
}
function obtenerPotenciaPicoSeleccionado(){
    switch(picoSeleccionadoMineral){
        case "fuego":
            return 2;
        case "hielo":
            return 3;
        default:
            return 1;
    }
}
// =======================================
// ➖ CONSUMIR PICO
// =======================================
function consumirPicoMineral(){
    const cantidadActual = obtenerCantidadPicoSeleccionado();
    if(cantidadActual <= 0){
        return false;
    }
    switch(picoSeleccionadoMineral){
        case "fuego":
            picosFuego = Math.max(0, picosFuego - 1);
            break;
        case "hielo":
            picosHielo = Math.max(0, picosHielo - 1);
            break;
        default:
            picosMineral = Math.max(0, picosMineral - 1);
            break;
    }
    guardarProgresoMineral();
    actualizarHUDMineral();
    console.log(`⛏️ Pico ${picoSeleccionadoMineral} utilizado.`);
    return true;
}
// =======================================
// 🎮 PANTALLA DEL MINIJUEGO
// =======================================
function mostrarPantallaMineral(){
    const content = document.getElementById("content");
    if(!content) return;
    ocultarHUDJugador();
    content.innerHTML = `
        <section class="mineral-game">
            <div class="mineral-hud">
                <div class="mineral-titulo">
                    💎 LA GRAN EXCAVACIÓN
                </div>
                <div class="mineral-nivel">
                    Nivel <strong id="mineralNivel"> ${nivelMineral} </strong>
                </div>
                <div class="mineral-xp">
                    XP: <strong id="mineralXP"> ${xpMineral} </strong>
                </div>
                <div class="mineral-picos-selector">
                    <button id="picoMineralBtn" class="mineral-pico-btn" onclick="seleccionarPicoMineral('mineral')">
                        ⛏️ <strong id="mineralPicos">${picosMineral}</strong>
                        <small>×1</small>
                    </button>
                    <button id="picoFuegoBtn" class="mineral-pico-btn" onclick="seleccionarPicoMineral('fuego')">
                        🔥 <strong id="mineralPicosFuego">${picosFuego}</strong>
                        <small>×2</small>
                    </button>
                    <button id="picoHieloBtn" class="mineral-pico-btn" onclick="seleccionarPicoMineral('hielo')">
                        ❄️ <strong id="mineralPicosHielo">${picosHielo}</strong>
                        <small>×3</small>
                    </button>
                </div>
                <div class="mineral-recursos">
                    💎 <strong id="mineralRecursos"> ${recursosMineral} </strong>
                </div>
            </div>
            <canvas id="canvasMineral" class="canvas-mineral">
            </canvas>
            <button class="mineral-salida" onclick="salirMinijuegoMineral()">
                ← Salir
            </button>
        </section>
    `;
    canvasMineral = document.getElementById("canvasMineral");
    if(!canvasMineral) return;
    ctxMineral = canvasMineral.getContext("2d");
    ajustarCanvasMineral();
    window.addEventListener("resize", ajustarCanvasMineral);
    canvasMineral.addEventListener("click", manejarClickMineral);
    generarRocasMineral();
    juegoMineralActivo = true;
    actualizarHUDMineral();
    dibujarMineral();
}
// =======================================
// ⛏️ IMAGEN DEL PICO
// =======================================
function obtenerImagenPico(){
    if(picosMineral <= 0){
        return datosMineral.picos.imagenes.sinPicos;
    }
    return datosMineral.picos.imagenes.normal;
}
// =======================================
// 📐 AJUSTAR CANVAS
// =======================================
function ajustarCanvasMineral(){
    if(!canvasMineral) return;
    const rect = canvasMineral.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvasMineral.width = rect.width * dpr;
    canvasMineral.height = rect.height * dpr;
    ctxMineral.setTransform(dpr, 0, 0, dpr, 0, 0);
    dibujarMineral();
}
function zonaDisponibleParaMisiones(zona, jugador){
    if(!zona || !jugador){
        return false;
    }
    const nivelJugador = Number(jugador.nivel) || 1;
    // ===================================
    // 🗺️ ZONAS NORMALES
    // ===================================
    if(zona.nombre !== "Caverna de Fuego" && zona.nombre !== "Caverna de Hielo"){
        return nivelJugador >= (Number(zona.nivel) || 1);
    }
    // ===================================
    // 🔥 CAVERNA DE FUEGO
    // ===================================
    if(zona.nombre === "Caverna de Fuego"){
        const nivelMineralGuardado = localStorage.getItem("nivelMineral");
        const nivelMineral = Number(nivelMineralGuardado) || 1;
        return nivelMineral >= 30;
    }
    // ===================================
    // ❄️ CAVERNA DE HIELO
    // ===================================
    if(zona.nombre === "Caverna de Hielo"){
        const nivelFuegoGuardado = localStorage.getItem("nivelFuego");
        const nivelFuego = Number(nivelFuegoGuardado) || 1;
        return nivelFuego >= 30;
    }
    return false;
}
// =======================================
// 🪨 GENERAR ROCAS
// =======================================
function generarRocasMineral(){
    rocasMineral = [];
    const bloque = Math.floor((nivelMineral - 1) / datosMineral.juego.bloquesDificultad);
    const cantidadBase = datosMineral.dificultad.base.cantidadRocas;
    const incremento = datosMineral.dificultad.incrementoCada10Niveles.cantidadRocas;
    const cantidad = cantidadBase + bloque * incremento;
    for(let i = 0; i < cantidad; i++){
        const indiceRoca = Math.floor(Math.random() * datosMineral.recursos.rocas.intactas.length);
        rocasMineral.push({
            x: Math.random(),
            y: 0.15 + Math.random() * 0.70,
            escala: 0.65 + Math.random() * 0.30, indiceRoca,
            estado: "intacta",
            golpes: 0,
            mineral: generarContenidoMineral(),
            imagenDescubierta: null,
            descubierta: false
        });
    }
    console.log(`🪨 Excavación generada: ${cantidad} rocas`);
}
// =======================================
// 💎 GENERAR CONTENIDO
// =======================================
function generarContenidoMineral(){
    const bloque = Math.floor((nivelMineral - 1) / datosMineral.juego.bloquesDificultad);
    const dificultad = datosMineral.dificultad;
    const gema = dificultad.base.probabilidadGema + bloque * dificultad.incrementoCada10Niveles.probabilidadGema;
    const carbon = dificultad.base.probabilidadCarbon + bloque * dificultad.incrementoCada10Niveles.probabilidadCarbon;
    const mineral = dificultad.base.probabilidadMineral + bloque * dificultad.incrementoCada10Niveles.probabilidadMineral;
    const numero = Math.random();
    // 💜 GEMA
    if(numero < gema){
        return obtenerRecurso("gema");
    }
    // ⚫ CARBÓN
    if(numero < gema + carbon){
        return obtenerRecurso("carbon");
    }
    // 💎 MINERAL
    if(numero < gema + carbon + mineral){
        return obtenerRecurso("mineral");
    }
    return null;
}
// =======================================
// 🔎 OBTENER RECURSO
// =======================================
function obtenerRecurso(id){
    return datosMineral.recursos.minerales.find(recurso => recurso.id === id);
}
// =======================================
// 🎨 OBTENER IMAGEN ACTUAL
// =======================================
function obtenerImagenRoca(roca){
    // ===================================
    // 🪨 ROCA NORMAL
    // ===================================
    if(roca.estado === "intacta"){
        return datosMineral.recursos.rocas.intactas[roca.indiceRoca];
    }
    // ===================================
    // 💥 ROCA DAÑADA
    // ===================================
    if(roca.estado === "dañada"){
        return datosMineral.recursos.rocas.dañadas[roca.indiceRoca];
    }
    // ===================================
    // 💎 RECURSO DESCUBIERTO
    // ===================================
    if(roca.estado === "descubierto" && roca.mineral){
        if(roca.imagenDescubierta){
            return roca.imagenDescubierta;
        }
        const imagenes = roca.mineral.imagenes;
        if(Array.isArray(imagenes.descubierto)){
            roca.imagenDescubierta = imagenes.descubierto[
                    Math.floor(Math.random() * imagenes.descubierto.length)
                ];
            return roca.imagenDescubierta;
        }
        if(imagenes.descubierto){
            roca.imagenDescubierta = imagenes.descubierto;
            return roca.imagenDescubierta;
        }
    }
    return null;
}
// =======================================
// 🎨 DIBUJAR
// =======================================
function dibujarMineral(){
    if(!ctxMineral || !canvasMineral) return;
    const ancho = canvasMineral.clientWidth;
    const alto = canvasMineral.clientHeight;
    ctxMineral.clearRect(0, 0, ancho, alto);
    // =======================================
    // 🪨 FONDO DE LA CUEVA
    // =======================================
    if(imagenFondoMineral && imagenFondoMineral.complete){
        ctxMineral.drawImage(imagenFondoMineral, 0, 0, ancho, alto);
        // 🌑 OSCURECER EL FONDO
        ctxMineral.fillStyle = "rgba(0, 0, 0, 0.45)";
        ctxMineral.fillRect(0, 0, ancho, alto);
    }else{
        ctxMineral.fillStyle = "#16110d";
        ctxMineral.fillRect(0, 0, ancho, alto);
    }
    // ===================================
    // 🪨 ROCAS
    // ===================================
    rocasMineral.forEach(roca => {
        if(roca.estado === "recogido") return;
        const imagenNombre =obtenerImagenRoca(roca);
        if(!imagenNombre) return;
        const imagen = new Image();
        imagen.src = `${RUTA_IMAGENES_MINERAL}${imagenNombre}.png`;
        const tamaño = 88 * roca.escala;
        const x = roca.x * ancho - tamaño / 2;
        const y = roca.y * alto - tamaño / 2;
        imagen.onload = () => {
            if(!juegoMineralActivo) return;
            ctxMineral.drawImage(imagen, x, y, tamaño, tamaño);
        };
    });
}
function procesarPicosMision(mision){
    const cantidad = parseInt(mision.picos_otorgados, 10);
    if(!Number.isFinite(cantidad) || cantidad <= 0){
        return;
    }
    switch(mision.tipo_pico){
        case "Pico de minería":
        case "Pico de minerales":
            agregarPicosMineral(cantidad);
            console.log(`⛏️ Misión → +${cantidad} picos de minería`);
            break;
        case "Pico de fuego":
            agregarPicosFuego(cantidad);
            console.log(`🔥 Misión → +${cantidad} picos de fuego`);
            break;
        case "Pico de hielo":
            agregarPicosHielo(cantidad);
            console.log(`❄️ Misión → +${cantidad} picos de hielo`);
            break;
        default:
            console.warn("⚠️ Tipo de pico desconocido:", mision.tipo_pico);
    }
}
// =======================================
// 🖱️ CLICK EN ROCA
// =======================================
function manejarClickMineral(event){
    if(!juegoMineralActivo) return;
    // ===================================
    // 🚫 SIN PICOS
    // ===================================
    if(obtenerCantidadPicoSeleccionado() <= 0){
        console.log(`🔨 No quedan picos de ${picoSeleccionadoMineral}`);
        reproducirSFX("error.wav");
        actualizarHUDMineral();
        return;
    }
    const rect = canvasMineral.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    for(const roca of rocasMineral){
        if(roca.estado === "recogido") continue;
        const tamaño = 88 * roca.escala;
        const rocaX = roca.x * canvasMineral.clientWidth;
        const rocaY = roca.y * canvasMineral.clientHeight;
        const distanciaX = Math.abs(x - rocaX);
        const distanciaY = Math.abs(y - rocaY);
        if(distanciaX <= tamaño / 2 && distanciaY <= tamaño / 2){
            golpearRoca(roca);
            break;
        }
    }
}
// =======================================
// ⛏️ GOLPEAR ROCA
// =======================================
function golpearRoca(roca){
    // ===================================
    // ⛏️ CONSUMIR PICO
    // ===================================
    if(!consumirPicoMineral()){
        return;
    }
    const potencia = obtenerPotenciaPicoSeleccionado();
    roca.golpes += potencia;
    console.log(`⛏️ Golpe ${roca.golpes} | Potencia x${potencia}`);
    reproducirSFX("touch.mp3");
    // ===================================
    // 🪨 PRIMER GOLPE
    // ===================================
    if(roca.estado === "intacta"){
        // -------------------------------
        // ⚫ CARBÓN
        // -------------------------------
        if(roca.mineral && roca.mineral.id === "carbon"){
            roca.estado = "carbon_dañado";
        }else{
            roca.estado = "dañada";
        }
        dibujarMineral();
        return;
    }
    // ===================================
    // ⚫ CARBÓN
    // ===================================
    if(roca.estado === "carbon_dañado"){
        descubrirRoca(roca);
        return;
    }
    // ===================================
    // 💥 ROCA DAÑADA
    // ===================================
    if(roca.estado === "dañada"){
        descubrirRoca(roca);
        return;
    }
}
// =======================================
// 💎 DESCUBRIR ROCA
// =======================================
function descubrirRoca(roca){
    roca.estado = "descubierto";
    roca.descubierta = true;
    recursosMineral++;
    let xpGanada = datosMineral.excavacion.xpRocaVacia;
    if(roca.mineral){
        xpGanada = roca.mineral.xp;
        console.log("💎 Recurso encontrado:", roca.mineral.nombre);
    }else{
        console.log("🪨 Roca vacía");
    }
    xpMineral += xpGanada;
    comprobarNivelMineral();
    guardarProgresoMineral();
    // =======================================
    // 🎁 HALLAZGO ESPECIAL: +3 PICOS
    // =======================================
    const probabilidadPicos = datosMineral.picos?.probabilidadHallazgo || 0;
    if(Math.random() < probabilidadPicos){
        encontrarPicosMineral();
    }
    actualizarHUDMineral();
    dibujarMineral();
    setTimeout(() => recogerRecurso(roca), 700);
}
// =======================================
// 🎒 RECOGER RECURSO
// =======================================
function recogerRecurso(roca){
    if(roca.estado !== "descubierto") return;
    roca.estado = "recogido";
    dibujarMineral();
    if(rocasMineral.every(roca => roca.estado === "recogido")){
        setTimeout(siguienteExcavacion, 500);
    }
}
// =======================================
// 📈 NIVEL
// =======================================
function comprobarNivelMineral(){
    let xpNecesaria = nivelMineral * 100;
    while(xpMineral >= xpNecesaria && nivelMineral < datosMineral.juego.nivelMaximo){
        nivelMineral++;
        console.log("🎉 NIVEL MINERAL:", nivelMineral);
        reproducirSFX("level_up.wav");
        xpNecesaria = nivelMineral * 100;
    }
    guardarProgresoMineral();
    actualizarHUDMineral();
}
// =======================================
// 🔄 SIGUIENTE EXCAVACIÓN
// =======================================
function siguienteExcavacion(){
    if(!juegoMineralActivo) return;
    generarRocasMineral();
    dibujarMineral();
}
// =======================================
// 📊 ACTUALIZAR HUD
// =======================================
function actualizarHUDMineral(){
    const nivel = document.getElementById("mineralNivel");
    const xp = document.getElementById("mineralXP");
    const recursos = document.getElementById("mineralRecursos");
    const picos = document.getElementById("mineralPicos");
    const picosFuegoHUD = document.getElementById("mineralPicosFuego");
    const picosHieloHUD = document.getElementById("mineralPicosHielo");
    const botonMineral = document.getElementById("picoMineralBtn");
    const botonFuego = document.getElementById("picoFuegoBtn");
    const botonHielo = document.getElementById("picoHieloBtn");
    if(nivel){
        nivel.textContent = nivelMineral;
    }if(xp){
        xp.textContent = xpMineral;
    }if(recursos){
        recursos.textContent = recursosMineral;
    }if(picos){
        picos.textContent = picosMineral;
    }if(picosFuegoHUD){
        picosFuegoHUD.textContent = picosFuego;
    }if(picosHieloHUD){
        picosHieloHUD.textContent = picosHielo;
    }if(botonMineral){
        botonMineral.classList.toggle("seleccionado", picoSeleccionadoMineral === "mineral");
    }if(botonFuego){
        botonFuego.classList.toggle("seleccionado", picoSeleccionadoMineral === "fuego");
    }if(botonHielo){
        botonHielo.classList.toggle("seleccionado", picoSeleccionadoMineral === "hielo");
    }
}
// =======================================
// 🎁 HALLAZGO ESPECIAL: +3 PICOS
// =======================================
function encontrarPicosMineral(){
    const cantidad = datosMineral.picos.hallazgoCantidad || 3;
    agregarPicosMineral(cantidad);
    const picoIcon = document.getElementById("mineralPicoIcon");
    if(picoIcon){
        picoIcon.src = `${RUTA_IMAGENES_MINERAL}${datosMineral.picos.imagenes.hallazgo}.png`;
        setTimeout(actualizarHUDMineral, 1000);
    }
    console.log(`🎁 ¡Hallazgo especial! +${cantidad} picos`);
}
// =======================================
// 🚪 SALIR
// =======================================
function salirMinijuegoMineral(){
    guardarProgresoMineral();
    juegoMineralActivo = false;
    window.removeEventListener("resize", ajustarCanvasMineral);
    if(canvasMineral){
        canvasMineral.removeEventListener("click", manejarClickMineral);
    }
    reproducirSFX("exit.mp3");
    mostrarHUDJugador();
    irA("mineral", "caves", mostrarCavernas);
}
// =======================================
// 💾 PROTEGER PROGRESO ANTE RECARGA
// =======================================
window.addEventListener("beforeunload", () => {
    if(datosMineral){
        guardarProgresoMineral();
    }
});