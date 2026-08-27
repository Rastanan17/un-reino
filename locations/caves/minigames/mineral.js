// =======================================
// 💎 MINIJUEGO DE MINERALES
// =======================================

const ARCHIVO_DATOS_MINERAL =
    "locations/caves/data/mineral.json";

const RUTA_IMAGENES_MINERAL =
    "locations/caves/images/";

let canvasMineral = null;
let ctxMineral = null;

let datosMineral = null;

let nivelMineral = 1;
let xpMineral = 0;
let recursosMineral = 0;

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

        datosMineral = await respuesta.json();

        console.log(
            "💎 Datos de minerales cargados:",
            datosMineral
        );

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
// 🎮 PANTALLA DEL MINIJUEGO
// =======================================

function mostrarPantallaMineral(){

    const content =
        document.getElementById("content");

    if(!content) return;

    content.innerHTML = `

        <section class="mineral-game">

            <!-- ============================= -->
            <!-- CABECERA -->
            <!-- ============================= -->

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

                <div class="mineral-recursos">
                    ⛏️
                    <strong id="mineralRecursos">
                        ${recursosMineral}
                    </strong>
                </div>

            </div>

            <!-- ============================= -->
            <!-- CANVAS -->
            <!-- ============================= -->

            <canvas
                id="canvasMineral"
                class="canvas-mineral">
            </canvas>

            <!-- ============================= -->
            <!-- SALIR -->
            <!-- ============================= -->

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

// =======================================
// 🪨 GENERAR ROCAS
// =======================================

function generarRocasMineral(){

    rocasMineral = [];

    const bloque =
        Math.floor(
            (nivelMineral - 1) / 10
        );

    const cantidadBase =
        datosMineral.dificultad.base.cantidadRocas;

    const incremento =
        datosMineral.dificultad
            .incrementoCada10Niveles
            .cantidadRocas;

    const cantidad =
        cantidadBase +
        (bloque * incremento);

    for(let i = 0; i < cantidad; i++){

        rocasMineral.push({

            x: Math.random(),
            y: 0.15 +
                Math.random() * 0.70,

            escala:
                0.65 +
                Math.random() * 0.30,

            imagen:
                datosMineral.recursos.rocas[
                    Math.floor(
                        Math.random() *
                        datosMineral.recursos.rocas.length
                    )
                ],

            mineral:
                generarContenidoMineral(),

            descubierta: false

        });

    }

}

// =======================================
// 💎 GENERAR CONTENIDO
// =======================================

function generarContenidoMineral(){

    const bloque =
        Math.floor(
            (nivelMineral - 1) / 10
        );

    const dificultad =
        datosMineral.dificultad;

    const gema =
        dificultad.base.probabilidadGema +
        bloque *
        dificultad.incrementoCada10Niveles
            .probabilidadGema;

    const diamante =
        dificultad.base.probabilidadDiamante +
        bloque *
        dificultad.incrementoCada10Niveles
            .probabilidadDiamante;

    const carbon =
        dificultad.base.probabilidadCarbon +
        bloque *
        dificultad.incrementoCada10Niveles
            .probabilidadCarbon;

    const mineral =
        dificultad.base.probabilidadMineral +
        bloque *
        dificultad.incrementoCada10Niveles
            .probabilidadMineral;

    const numero =
        Math.random();

    if(numero < diamante){

        return obtenerRecurso("diamante");

    }

    if(numero < diamante + gema){

        return obtenerRecurso("gema");

    }

    if(numero < diamante + gema + carbon){

        return obtenerRecurso("carbon");

    }

    if(numero < diamante + gema + carbon + mineral){

        return obtenerRecurso("mineral");

    }

    return null;

}

// =======================================
// 🔎 OBTENER RECURSO
// =======================================

function obtenerRecurso(id){

    return datosMineral.recursos.minerales
        .find(recurso => recurso.id === id);

}

// =======================================
// 🎨 DIBUJAR
// =======================================

function dibujarMineral(){

    if(!ctxMineral || !canvasMineral) return;

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

    // -------------------------------
    // FONDO
    // -------------------------------

    ctxMineral.fillStyle =
        "#16110d";

    ctxMineral.fillRect(
        0,
        0,
        ancho,
        alto
    );

    // -------------------------------
    // ROCAS
    // -------------------------------

    rocasMineral.forEach((
        roca
    ) => {

        if(roca.descubierta) return;

        const imagen =
            new Image();

        imagen.src =
            `${RUTA_IMAGENES_MINERAL}${roca.imagen}.png`;

        const tamaño =
            88 * roca.escala;

        const x =
            roca.x * ancho -
            tamaño / 2;

        const y =
            roca.y * alto -
            tamaño / 2;

        imagen.onload = () => {

            ctxMineral.drawImage(
                imagen,
                x,
                y,
                tamaño,
                tamaño
            );

        };

    });

}

// =======================================
// 🖱️ CLICK EN ROCA
// =======================================

function manejarClickMineral(event){

    if(!juegoMineralActivo) return;

    const rect =
        canvasMineral.getBoundingClientRect();

    const x =
        event.clientX -
        rect.left;

    const y =
        event.clientY -
        rect.top;

    for(const roca of rocasMineral){

        if(roca.descubierta) continue;

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

            descubrirRoca(roca);

            break;

        }

    }

}

// =======================================
// ⛏️ DESCUBRIR ROCA
// =======================================

function descubrirRoca(roca){

    roca.descubierta = true;

    recursosMineral++;

    let xpGanada = 1;

    if(roca.mineral){

        xpGanada =
            roca.mineral.xp;

        console.log(
            "💎 Mineral encontrado:",
            roca.mineral.nombre
        );

    }else{

        console.log(
            "🪨 Roca vacía"
        );

    }

    xpMineral += xpGanada;

    comprobarNivelMineral();

    actualizarHUDMineral();

    dibujarMineral();

    if(
        rocasMineral.every(
            roca => roca.descubierta
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

    const xpNecesaria =
        nivelMineral * 100;

    if(
        xpMineral >= xpNecesaria &&
        nivelMineral <
        datosMineral.juego.nivelMaximo
    ){

        nivelMineral++;

        console.log(
            "🎉 NIVEL MINERAL:",
            nivelMineral
        );

        reproducirSFX("level_up.wav");

        actualizarHUDMineral();

    }

}

// =======================================
// 🔄 SIGUIENTE EXCAVACIÓN
// =======================================

function siguienteExcavacion(){

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

}

// =======================================
// 🚪 SALIR
// =======================================

function salirMinijuegoMineral(){

    juegoMineralActivo = false;

    window.removeEventListener(
        "resize",
        ajustarCanvasMineral
    );

    reproducirSFX("exit.mp3");

    irA(
        "mineral",
        "caves",
        mostrarCavernas
    );

}