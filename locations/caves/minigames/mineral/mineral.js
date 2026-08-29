// =======================================
// 💎 MINIJUEGO DE MINERALES
// =======================================

const ARCHIVO_DATOS_MINERAL =
    "locations/caves/minigames/mineral/mineral.json";

const RUTA_IMAGENES_MINERAL =
    "locations/caves/minigames/mineral/images/";

const CLAVE_PICOS_MINERAL =
    "picosMineral";

const FONDO_MINERAL =
    "assets/images/backgrounds/cave_mineral.png";

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

let rocasMineral = [];

let juegoMineralActivo = false;

// =======================================
// 💎 INICIAR MINIJUEGO
// =======================================

async function iniciarMinijuegoMineral(){

    console.log("💎 Iniciando Minijuego de Minerales");

    try{

        const respuesta =
            await fetch(ARCHIVO_DATOS_MINERAL);

        if(!respuesta.ok){

            throw new Error(
                "No se pudo cargar mineral.json"
            );
        }

        datosMineral =
            await respuesta.json();

        console.log(
            "💎 Datos de minerales cargados:",
            datosMineral
        );

        cargarPicosMineral();

        mostrarPantallaMineral();

    }catch(error){

        console.error(
            "❌ Error cargando datos minerales:",
            error
        );

        mostrarMensaje(
            "❌ Error",
            "No se pudieron cargar los datos de la caverna."
        );
    }
}

// =======================================
// ⛏️ CARGAR PICOS
// =======================================

function cargarPicosMineral(){

    const guardados =
        localStorage.getItem(
            CLAVE_PICOS_MINERAL
        );

    if(
        guardados !== null
    ){

        const cantidad =
            parseInt(
                guardados,
                10
            );

        picosMineral =
            Number.isFinite(cantidad)
                ? Math.max(0, cantidad)
                : 0;

    }else{

        picosMineral =
            datosMineral.picos &&
            Number.isFinite(
                datosMineral.picos.cantidadInicial
            )
                ? datosMineral.picos.cantidadInicial
                : 0;

        guardarPicosMineral();
    }

    console.log(
        "⛏️ Picos de minería:",
        picosMineral
    );
}

// =======================================
// 💾 GUARDAR PICOS
// =======================================

function guardarPicosMineral(){

    localStorage.setItem(
        CLAVE_PICOS_MINERAL,
        String(picosMineral)
    );
}

// =======================================
// ➕ AGREGAR PICOS
// =======================================

function agregarPicosMineral(cantidad){

    cantidad =
        parseInt(
            cantidad,
            10
        );

    if(
        !Number.isFinite(cantidad) ||
        cantidad <= 0
    ) return;

    picosMineral += cantidad;

    guardarPicosMineral();

    actualizarHUDMineral();

    console.log(
        `⛏️ +${cantidad} picos de minería. Total: ${picosMineral}`
    );
}

// =======================================
// ➖ CONSUMIR PICO
// =======================================

function consumirPicoMineral(){

    if(
        picosMineral <= 0
    ){

        return false;
    }

    const consumo =
        datosMineral.picos &&
        Number.isFinite(
            datosMineral.picos.consumoPorGolpe
        )
            ? datosMineral.picos.consumoPorGolpe
            : 1;

    picosMineral =
        Math.max(
            0,
            picosMineral - consumo
        );

    guardarPicosMineral();

    actualizarHUDMineral();

    console.log(
        `⛏️ Pico utilizado. Picos restantes: ${picosMineral}`
    );

    return true;
}

// =======================================
// 🎮 PANTALLA DEL MINIJUEGO
// =======================================

function mostrarPantallaMineral(){

    const content =
        document.getElementById("content");

    if(!content) return;

    ocultarHUDJugador();

    content.innerHTML = `

        <section class="mineral-game">

            <div class="mineral-hud">

                <div class="mineral-titulo">
                    💎 LA GRAN EXCAVACIÓN
                </div>

                <div class="mineral-nivel">
                    Nivel
                    <strong id="mineralNivel">
                        ${nivelMineral}
                    </strong>
                </div>

                <div class="mineral-xp">
                    XP:
                    <strong id="mineralXP">
                        ${xpMineral}
                    </strong>
                </div>

                <div class="mineral-picos">
                    <img
                        id="mineralPicoIcon"
                        src="${RUTA_IMAGENES_MINERAL}${obtenerImagenPico()}.png"
                        alt="Picos de minería"
                    >

                    <strong id="mineralPicos">
                        ${picosMineral}
                    </strong>
                </div>

                <div class="mineral-recursos">
                    💎
                    <strong id="mineralRecursos">
                        ${recursosMineral}
                    </strong>
                </div>

            </div>

            <canvas
                id="canvasMineral"
                class="canvas-mineral">
            </canvas>

            <button
                class="mineral-salida"
                onclick="salirMinijuegoMineral()">

                ← Salir

            </button>

        </section>
    `;

    canvasMineral =
        document.getElementById(
            "canvasMineral"
        );

    if(!canvasMineral) return;

    ctxMineral =
        canvasMineral.getContext("2d");

    ajustarCanvasMineral();

    window.addEventListener(
        "resize",
        ajustarCanvasMineral
    );

    canvasMineral.addEventListener(
        "click",
        manejarClickMineral
    );

    generarRocasMineral();

    juegoMineralActivo = true;

    dibujarMineral();
}

// =======================================
// ⛏️ IMAGEN DEL PICO
// =======================================

function obtenerImagenPico(){

    if(
        picosMineral <= 0
    ){

        return datosMineral.picos
            .imagenes
            .sinPicos;
    }

    return datosMineral.picos
        .imagenes
        .normal;
}

// =======================================
// 📐 AJUSTAR CANVAS
// =======================================

function ajustarCanvasMineral(){

    if(!canvasMineral) return;

    const rect =
        canvasMineral.getBoundingClientRect();

    const dpr =
        window.devicePixelRatio || 1;

    canvasMineral.width =
        rect.width * dpr;

    canvasMineral.height =
        rect.height * dpr;

    ctxMineral.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

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

    if(zona.nombre !== "Caverna de Fuego" &&
       zona.nombre !== "Caverna de Hielo"){

        return nivelJugador >= (Number(zona.nivel) || 1);
    }

    // ===================================
    // 🔥 CAVERNA DE FUEGO
    // ===================================

    if(zona.nombre === "Caverna de Fuego"){

        const nivelMineralGuardado =
            localStorage.getItem("nivelMineral");

        const nivelMineral =
            Number(nivelMineralGuardado) || 1;

        return nivelMineral >= 30;
    }

    // ===================================
    // ❄️ CAVERNA DE HIELO
    // ===================================

    if(zona.nombre === "Caverna de Hielo"){

        const nivelFuegoGuardado =
            localStorage.getItem("nivelFuego");

        const nivelFuego =
            Number(nivelFuegoGuardado) || 1;

        return nivelFuego >= 30;
    }

    return false;
}

// =======================================
// 🪨 GENERAR ROCAS
// =======================================

function generarRocasMineral(){

    rocasMineral = [];

    const bloque =
        Math.floor(
            (nivelMineral - 1) /
            datosMineral.juego.bloquesDificultad
        );

    const cantidadBase =
        datosMineral.dificultad
            .base
            .cantidadRocas;

    const incremento =
        datosMineral.dificultad
            .incrementoCada10Niveles
            .cantidadRocas;

    const cantidad =
        cantidadBase +
        bloque * incremento;

    for(
        let i = 0;
        i < cantidad;
        i++
    ){

        const indiceRoca =
            Math.floor(
                Math.random() *
                datosMineral.recursos.rocas
                    .intactas.length
            );

        rocasMineral.push({

            x:
                Math.random(),

            y:
                0.15 +
                Math.random() * 0.70,

            escala:
                0.65 +
                Math.random() * 0.30,

            indiceRoca,

            estado:
                "intacta",

            golpes:
                0,

            mineral:
                generarContenidoMineral(),

            imagenDescubierta:
                null,

            descubierta:
                false
        });
    }

    console.log(
        `🪨 Excavación generada: ${cantidad} rocas`
    );
}

// =======================================
// 💎 GENERAR CONTENIDO
// =======================================

function generarContenidoMineral(){

    const bloque =
        Math.floor(
            (nivelMineral - 1) /
            datosMineral.juego.bloquesDificultad
        );

    const dificultad =
        datosMineral.dificultad;

    const gema =
        dificultad.base
            .probabilidadGema +
        bloque *
        dificultad.incrementoCada10Niveles
            .probabilidadGema;

    const carbon =
        dificultad.base
            .probabilidadCarbon +
        bloque *
        dificultad.incrementoCada10Niveles
            .probabilidadCarbon;

    const mineral =
        dificultad.base
            .probabilidadMineral +
        bloque *
        dificultad.incrementoCada10Niveles
            .probabilidadMineral;

    const numero =
        Math.random();

    // 💜 GEMA
    if(
        numero < gema
    ){

        return obtenerRecurso(
            "gema"
        );
    }

    // ⚫ CARBÓN
    if(
        numero <
        gema + carbon
    ){

        return obtenerRecurso(
            "carbon"
        );
    }

    // 💎 MINERAL
    if(
        numero <
        gema +
        carbon +
        mineral
    ){

        return obtenerRecurso(
            "mineral"
        );
    }

    return null;
}

// =======================================
// 🔎 OBTENER RECURSO
// =======================================

function obtenerRecurso(id){

    return datosMineral
        .recursos
        .minerales
        .find(
            recurso =>
                recurso.id === id
        );
}

// =======================================
// 🎨 OBTENER IMAGEN ACTUAL
// =======================================

function obtenerImagenRoca(roca){

    // ===================================
    // 🪨 ROCA NORMAL
    // ===================================

    if(
        roca.estado === "intacta"
    ){

        return datosMineral
            .recursos
            .rocas
            .intactas[
                roca.indiceRoca
            ];
    }

    // ===================================
    // 💥 ROCA DAÑADA
    // ===================================

    if(
        roca.estado === "dañada"
    ){

        return datosMineral
            .recursos
            .rocas
            .dañadas[
                roca.indiceRoca
            ];
    }

    // ===================================
    // 💎 RECURSO DESCUBIERTO
    // ===================================

    if(
        roca.estado === "descubierto" &&
        roca.mineral
    ){

        if(
            roca.imagenDescubierta
        ){

            return roca.imagenDescubierta;
        }

        const imagenes =
            roca.mineral.imagenes;

        if(
            Array.isArray(
                imagenes.descubierto
            )
        ){

            roca.imagenDescubierta =
                imagenes.descubierto[
                    Math.floor(
                        Math.random() *
                        imagenes.descubierto.length
                    )
                ];

            return roca.imagenDescubierta;
        }

        if(
            imagenes.descubierto
        ){

            roca.imagenDescubierta =
                imagenes.descubierto;

            return roca.imagenDescubierta;
        }
    }

    return null;
}

// =======================================
// 🎨 DIBUJAR
// =======================================

function dibujarMineral(){

    if(
        !ctxMineral ||
        !canvasMineral
    ) return;

    const ancho =
        canvasMineral.clientWidth;

    const alto =
        canvasMineral.clientHeight;

    ctxMineral.clearRect(
        0,
        0,
        ancho,
        alto
    );

    // =======================================
    // 🪨 FONDO DE LA CUEVA
    // =======================================

    if(
        imagenFondoMineral &&
        imagenFondoMineral.complete
    ){
        ctxMineral.drawImage(
            imagenFondoMineral,
            0,
            0,
            ancho,
            alto
        );

        // 🌑 OSCURECER EL FONDO
        ctxMineral.fillStyle =
            "rgba(0, 0, 0, 0.45)";

        ctxMineral.fillRect(
            0,
            0,
            ancho,
            alto
        );

    }else{

        ctxMineral.fillStyle =
            "#16110d";

        ctxMineral.fillRect(
            0,
            0,
            ancho,
            alto
        );
    }

    // ===================================
    // 🪨 ROCAS
    // ===================================

    rocasMineral.forEach(
        roca => {

            if(
                roca.estado === "recogido"
            ) return;

            const imagenNombre =
                obtenerImagenRoca(
                    roca
                );

            if(!imagenNombre) return;

            const imagen =
                new Image();

            imagen.src =
                `${RUTA_IMAGENES_MINERAL}${imagenNombre}.png`;

            const tamaño =
                88 * roca.escala;

            const x =
                roca.x * ancho -
                tamaño / 2;

            const y =
                roca.y * alto -
                tamaño / 2;

            imagen.onload = () => {

                if(
                    !juegoMineralActivo
                ) return;

                ctxMineral.drawImage(
                    imagen,
                    x,
                    y,
                    tamaño,
                    tamaño
                );
            };
        }
    );
}

function procesarPicosMision(mision){

    const cantidad =
        parseInt(
            mision.picos_otorgados,
            10
        );

    if(
        !Number.isFinite(cantidad) ||
        cantidad <= 0
    ){
        return;
    }

    if(
        mision.tipo_pico === "Pico de minería"
    ){

        agregarPicosMineral(cantidad);

        console.log(
            `⛏️ Misión → +${cantidad} picos de minería`
        );
    }
}
// =======================================
// 🖱️ CLICK EN ROCA
// =======================================

function manejarClickMineral(event){

    if(
        !juegoMineralActivo
    ) return;

    // ===================================
    // 🚫 SIN PICOS
    // ===================================

    if(
        picosMineral <= 0
    ){

        console.log(
            "🔨 No quedan picos de minería"
        );

        reproducirSFX(
            "error.wav"
        );

        actualizarHUDMineral();

        return;
    }

    const rect =
        canvasMineral.getBoundingClientRect();

    const x =
        event.clientX -
        rect.left;

    const y =
        event.clientY -
        rect.top;

    for(
        const roca of rocasMineral
    ){

        if(
            roca.estado === "recogido"
        ) continue;

        const tamaño =
            88 * roca.escala;

        const rocaX =
            roca.x *
            canvasMineral.clientWidth;

        const rocaY =
            roca.y *
            canvasMineral.clientHeight;

        const distanciaX =
            Math.abs(
                x - rocaX
            );

        const distanciaY =
            Math.abs(
                y - rocaY
            );

        if(
            distanciaX <= tamaño / 2 &&
            distanciaY <= tamaño / 2
        ){

            golpearRoca(
                roca
            );

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

    if(
        !consumirPicoMineral()
    ){

        return;
    }

    roca.golpes++;

    console.log(
        `⛏️ Golpe ${roca.golpes}`
    );

    reproducirSFX(
        "touch.mp3"
    );

    // ===================================
    // 🪨 PRIMER GOLPE
    // ===================================

    if(
        roca.estado === "intacta"
    ){

        // -------------------------------
        // ⚫ CARBÓN
        // -------------------------------

        if(
            roca.mineral &&
            roca.mineral.id === "carbon"
        ){

            roca.estado =
                "carbon_dañado";

        }else{

            roca.estado =
                "dañada";
        }

        dibujarMineral();

        return;
    }

    // ===================================
    // ⚫ CARBÓN
    // ===================================

    if(
        roca.estado === "carbon_dañado"
    ){

        descubrirRoca(
            roca
        );

        return;
    }

    // ===================================
    // 💥 ROCA DAÑADA
    // ===================================

    if(
        roca.estado === "dañada"
    ){

        descubrirRoca(
            roca
        );

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

    if(
        roca.estado !==
        "descubierto"
    ) return;

    roca.estado =
        "recogido";

    dibujarMineral();

    if(
        rocasMineral.every(
            roca =>
                roca.estado ===
                "recogido"
        )
    ){

        setTimeout(
            siguienteExcavacion,
            500
        );
    }
}

// =======================================
// 📈 NIVEL
// =======================================

function comprobarNivelMineral(){

    let xpNecesaria =
        nivelMineral * 100;

    while(
        xpMineral >= xpNecesaria &&
        nivelMineral <
        datosMineral.juego.nivelMaximo
    ){

        nivelMineral++;

        console.log(
            "🎉 NIVEL MINERAL:",
            nivelMineral
        );

        reproducirSFX(
            "level_up.wav"
        );

        xpNecesaria =
            nivelMineral * 100;
    }

    actualizarHUDMineral();
}

// =======================================
// 🔄 SIGUIENTE EXCAVACIÓN
// =======================================

function siguienteExcavacion(){

    if(
        !juegoMineralActivo
    ) return;

    generarRocasMineral();

    dibujarMineral();
}

// =======================================
// 📊 ACTUALIZAR HUD
// =======================================

function actualizarHUDMineral(){

    const nivel =
        document.getElementById(
            "mineralNivel"
        );

    const xp =
        document.getElementById(
            "mineralXP"
        );

    const recursos =
        document.getElementById(
            "mineralRecursos"
        );

    const picos =
        document.getElementById(
            "mineralPicos"
        );

    const picoIcon =
        document.getElementById(
            "mineralPicoIcon"
        );

    if(nivel){

        nivel.textContent =
            nivelMineral;
    }

    if(xp){

        xp.textContent =
            xpMineral;
    }

    if(recursos){

        recursos.textContent =
            recursosMineral;
    }

    if(picos){

        picos.textContent =
            picosMineral;
    }

    if(picoIcon){

        picoIcon.src =
            `${RUTA_IMAGENES_MINERAL}${obtenerImagenPico()}.png`;
    }
}

// =======================================
// 🎁 HALLAZGO ESPECIAL: +3 PICOS
// =======================================

function encontrarPicosMineral(){

    const cantidad =
        datosMineral.picos
            .hallazgoCantidad || 3;

    agregarPicosMineral(
        cantidad
    );

    const picoIcon =
        document.getElementById(
            "mineralPicoIcon"
        );

    if(picoIcon){

        picoIcon.src =
            `${RUTA_IMAGENES_MINERAL}${datosMineral.picos.imagenes.hallazgo}.png`;

        setTimeout(
            actualizarHUDMineral,
            1000
        );
    }

    console.log(
        `🎁 ¡Hallazgo especial! +${cantidad} picos`
    );
}

// =======================================
// 🚪 SALIR
// =======================================

function salirMinijuegoMineral(){

    juegoMineralActivo =
        false;

    window.removeEventListener(
        "resize",
        ajustarCanvasMineral
    );

    if(canvasMineral){

        canvasMineral.removeEventListener(
            "click",
            manejarClickMineral
        );
    }

    reproducirSFX(
        "exit.mp3"
    );

    mostrarHUDJugador();
    
    irA(
        "mineral",
        "caves",
        mostrarCavernas
    );
}
