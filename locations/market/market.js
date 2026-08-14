// =======================================
// MERCADO DE MÍRRAFEN
// =======================================
// =======================================
// PRODUCTOS DEL MERCADO
// =======================================
let productosMercado = [];
let productoActual = null;
// =======================================
// DIÁLOGOS DE BORIN
// =======================================
let dialogosBorin = {};
// =======================================
// DESAFÍOS DEL MERCADO
// =======================================
let desafiosMercado = [];
let desafioActual = null;
// =======================================
// MOSTRAR MERCADO
// =======================================
function mostrarMercado(){
    const jugador = cargarJugador();
    if(!jugador){
        console.warn("No hay un jugador activo.");
        return;
    }
    const content = document.getElementById("content");
    if(!content){
        console.error("No se encontró #content.");
        return;
    }
    // ===================================
    // ESCENARIO DEL MERCADO
    // ===================================
    content.innerHTML = `
        <section class="mercado">
            <!-- =================================
                INFORMACIÓN DEL JUGADOR
            ================================== -->
            <div id="infoJugadorMercado" class="info-jugador-mercado">

                <div class="jugador-nombre">
                    👤 ${jugador.nombre}
                </div>

                <div class="jugador-oquos">
                    🪙 ${jugador.oquos} Oquos
                </div>

            </div>
            <!-- =================================
                 MERCADER
            ================================== -->
            <div class="mercader">
                <div id="borinSprite" class="borin-sprite"></div>
            </div>
            <div id="dialogoBorin" class="dialogo-borin"></div>
            <!-- =================================
                 SALIR AL MAPA
            ================================== -->
            <div class="mercado-salida" onclick="irAlMapaDesdeMercado()">
                <img src="assets/images/items/exit.png" alt="Salir">
            </div>
        </section>
    `;
    // ===================================
    // INICIAR MERCADO
    // ===================================
    cargarBorin();
    Promise.all([
        cargarProductosMercado(),
        cargarDialogosBorin(),
        cargarDesafiosMercado()
    ]).then(() => {

        cargarItemsMercado();

    });
}
// =======================================
// BORIN — ESCALA DEL SPRITE
// =======================================
const BORIN_ESCALA = 4;
// =======================================
// BORIN — CONFIGURACIÓN DEL SPRITE
// =======================================
const BORIN_FILAS = 3;
const BORIN_COLUMNAS = 7;
// =======================================
// BORIN — VARIABLES DE ANIMACIÓN
// =======================================
let borinHoja = null;
let borinAnimacion = null;
// =======================================
// BORIN — ACCIONES
// =======================================
// =======================================
// BORIN — ACCIONES
// =======================================

const BORIN_ACCIONES = {

     quieto: {
        fila: 2,
        frames: [0],
        velocidad: 1000,
        repetir: false
    },

    // ===================================
    // FILA 1
    // ===================================

    saludar: {
        fila: 0,
        frames: [0, 1],
        velocidad: 350,
        repetir: false
    },

    hablar: {
        fila: 0,
        frames: [2, 3],
        velocidad: 600,
        repetir: true
    },

    celebrar: {
        fila: 0,
        frames: [4, 5],
        velocidad: 300,
        repetir: true
    },

    sorprendido: {
        fila: 0,
        frames: [6],
        velocidad: 500,
        repetir: false
    },

    // ===================================
    // FILA 2
    // ===================================

    señalarIzq: {
        fila: 1,
        frames: [0],
        velocidad: 500,
        repetir: false
    },

    señalarDer: {
        fila: 1,
        frames: [1],
        velocidad: 500,
        repetir: false
    },

    pensar: {
        fila: 1,
        frames: [2, 3],
        velocidad: 500,
        repetir: true
    },

    triste: {
        fila: 1,
        frames: [4],
        velocidad: 500,
        repetir: false
    },

    llorando: {
        fila: 1,
        frames: [5],
        velocidad: 500,
        repetir: false
    },

    enojado: {
        fila: 1,
        frames: [6],
        velocidad: 500,
        repetir: false
    },

    // ===================================
    // FILA 3
    // ===================================

    trabajando: {
        fila: 2,
        frames: [0, 1],
        velocidad: 500,
        repetir: true
    },

    caminarIzq: {
        fila: 2,
        frames: [2],
        velocidad: 500,
        repetir: false
    },

    caminarDer: {
        fila: 2,
        frames: [3],
        velocidad: 500,
        repetir: false
    },

    ofrecer: {
        fila: 2,
        frames: [4, 5],
        velocidad: 400,
        repetir: false
    },

    despedida: {
        fila: 2,
        frames: [6],
        velocidad: 500,
        repetir: false
    }

};

// =======================================
// CARGAR BORIN
// =======================================

function cargarBorin(){

    const borinSprite = document.getElementById("borinSprite");

    if(!borinSprite){

        console.error("No se encontró #borinSprite.");

        return;
    }

    borinHoja = new Image();

    borinHoja.src = "kingdom/npc/images/borin.png";

    borinHoja.onload = function(){

        const anchoHoja = borinHoja.naturalWidth;
        const altoHoja = borinHoja.naturalHeight;

        // ===================================
        // CALCULAR FRAME AUTOMÁTICAMENTE
        // ===================================

        const anchoFrame = anchoHoja / BORIN_COLUMNAS;
        const altoFrame = altoHoja / BORIN_FILAS;

        // ===================================
        // TAMAÑO VISUAL
        // ===================================

        borinSprite.style.width =
            `${anchoFrame * BORIN_ESCALA}px`;

        borinSprite.style.height =
            `${altoFrame * BORIN_ESCALA}px`;

        // ===================================
        // ESCALAR SPRITESHEET
        // ===================================

        borinSprite.style.backgroundSize =
            `${anchoHoja * BORIN_ESCALA}px ` +
            `${altoHoja * BORIN_ESCALA}px`;

        // ===================================
        // BORIN INICIAL
        // MERCADER TRABAJANDO
        // ===================================

        animarBorin("saludar");

    };

}

// =======================================
// ANIMAR BORIN
// =======================================

function animarBorin(accion){

    const borinSprite =
        document.getElementById("borinSprite");

    if(!borinSprite || !borinHoja){

        return;
    }

    const configuracion =
        BORIN_ACCIONES[accion];

    if(!configuracion){

        console.warn(
            `La acción "${accion}" no existe para Borin.`
        );

        return;
    }

    // ===================================
    // DETENER ANIMACIÓN ANTERIOR
    // ===================================

    detenerAnimacionBorin();

    let indiceFrame = 0;

    // ===================================
    // MOSTRAR PRIMER FRAME
    // ===================================

    mostrarFrameBorin(
        borinSprite,
        borinHoja,
        configuracion.fila,
        configuracion.frames[indiceFrame]
    );

    // ===================================
    // CREAR ANIMACIÓN
    // ===================================

    borinAnimacion = setInterval(function(){

    indiceFrame++;

    if(indiceFrame >= configuracion.frames.length){

        if(configuracion.repetir){

            indiceFrame = 0;

        }else{

            detenerAnimacionBorin();
            return;
        }
    }

    console.log(
        "FRAME BORIN:",
        configuracion.frames[indiceFrame]
    );

    mostrarFrameBorin(
        borinSprite,
        borinHoja,
        configuracion.fila,
        configuracion.frames[indiceFrame]
    );

}, configuracion.velocidad);
}

// =======================================
// DETENER ANIMACIÓN
// =======================================

function detenerAnimacionBorin(){

    if(borinAnimacion){

        clearInterval(borinAnimacion);

        borinAnimacion = null;
    }

}

// =======================================
// MOSTRAR UN FRAME DE BORIN
// =======================================

function mostrarFrameBorin(
    borinSprite,
    borinHoja,
    fila,
    columna
){

    if(!borinHoja.naturalWidth){

        return;
    }

    const anchoFrame =
        borinHoja.naturalWidth / BORIN_COLUMNAS;

    const altoFrame =
        borinHoja.naturalHeight / BORIN_FILAS;

    borinSprite.style.backgroundPosition =
        `${-(columna * anchoFrame * BORIN_ESCALA)}px ` +
        `${-(fila * altoFrame * BORIN_ESCALA)}px`;

}
// =======================================
// VOLVER AL MAPA
// =======================================
function irAlMapaDesdeMercado(){
    animarBorin("despedir");
    console.log("Saliendo del Mercado → Mapa");
    irA( "market", "map", mostrarMapaReino );
}
// =======================================
// CARGAR PRODUCTOS DEL MERCADO
// =======================================
async function cargarProductosMercado(){
    try{
        const respuesta = await fetch("locations/market/data/shop.json");
        if(!respuesta.ok){
            throw new Error(`Error HTTP ${respuesta.status}`);
        }
        productosMercado = await respuesta.json();
        console.log("🏪 Productos del mercado cargados:", productosMercado);
        return productosMercado;
    }catch(error){
        console.error("❌ Error al cargar shop.json:", error);
        productosMercado = [];
        return [];
    }
}
// =======================================
// CARGAR DIÁLOGOS DE BORIN
// =======================================
async function cargarDialogosBorin(){
    try{
        const respuesta = await fetch(
            "locations/market/data/dialogs_borin.json"
        );
        const datos = await respuesta.json();
        dialogosBorin = datos.dialogs_borin;
        console.log(
            "🧙‍♂️ Diálogos de Borin cargados:",
            dialogosBorin
        );
    }catch(error){
        console.error(
            "❌ Error cargando diálogos de Borin:",
            error
        );
    }
}
// =======================================
// OBTENER DIÁLOGO ALEATORIO DE BORIN
// =======================================
function obtenerDialogoBorin(categoria){
    const dialogos = dialogosBorin[categoria];
    if(!dialogos || dialogos.length === 0){
        console.warn(
            "⚠️ No existen diálogos para:",
            categoria
        );
        return "...";
    }
    const indice = Math.floor(
        Math.random() * dialogos.length
    );
    return dialogos[indice];
}
// =======================================
// SELECCIONAR ITEM DEL MERCADO
// =======================================
function seleccionarItemMercado(nombre){
    animarBorin("hablar");
    console.log(
        "🔎 Buscando producto para:",
        nombre
    );
    const producto = productosMercado.find(
        item => item.item === nombre
    );
    if(!producto){
        console.warn(
            "⚠️ No existe producto para el objeto:",
            nombre
        );
        return;
    }
    console.log(
        "🛒 PRODUCTO SELECCIONADO:",
        producto
    );
    // ===================================
    // DIÁLOGO DE BORIN
    // ===================================
    const dialogo = obtenerDialogoBorin(
        "seleccionar_item"
    );
    console.log(
        "🧙‍♂️ BORIN:",
        dialogo
    );
    const panel = document.getElementById("dialogoBorin");
    if(panel){
        panel.innerHTML = `
            <div class="borin-dialogo">
                <div class="borin-nombre">
                    🧙‍♂️ Borin
                </div>
                <div class="borin-texto">
                    ${dialogo}
                </div>
                <div class="producto-dialogo">
                    <div class="producto-nombre">
                        ${producto.icono} ${producto.nombre}
                    </div>
                    <div class="producto-precio">
                        🪙 ${producto.precio} Oquos
                    </div>
                </div>
                <!-- ===================================
                    BOTONES DEL PRODUCTO
                ==================================== -->
                <div class="producto-botones">
                    <button
                        class="boton-conseguir"
                        onclick="conseguirProductoMercado(${producto.id})">
                        CONSEGUIR
                    </button>
                    <button
                        class="boton-volver"
                        onclick="cerrarProductoMercado()">
                        VOLVER
                    </button>
                </div>
            </div>
        `;
    }
}
// =======================================
// CONSEGUIR PRODUCTO
// =======================================
function conseguirProductoMercado(id){
    animarBorin("señalar");
    console.log(
        "🛒 CONSEGUIR PRODUCTO:",
        id
    );
    const producto = productosMercado.find(
        item => item.id === id
    );
    if(!producto){
        console.warn(
            "⚠️ No se encontró el producto:",
            id
        );
        return;
    }
    console.log(
        "🛒 PRODUCTO A CONFIRMAR:",
        producto
    );
    productoActual = producto;
    // ===================================
    // DIÁLOGO DE CONFIRMACIÓN
    // ===================================
    const dialogo = obtenerDialogoBorin(
        "confirmar_item"
    );
    console.log(
        "🧙‍♂️ BORIN:",
        dialogo
    );
    const panel = document.getElementById(
        "dialogoBorin"
    );
    if(!panel){
        console.error(
            "❌ No se encontró #dialogoBorin."
        );
        return;
    }
    panel.innerHTML = `
        <div class="borin-dialogo">
            <div class="borin-nombre">
                🧙‍♂️ Borin
            </div>
            <div class="borin-texto">
                ${dialogo}
            </div>
            <div class="producto-dialogo">
                <div class="producto-nombre">
                    ${producto.icono}
                    ${producto.nombre}
                </div>
                <div class="producto-precio">
                    🪙 ${producto.precio} Oquos
                </div>
            </div>
            <!-- ============================
                 CONFIRMACIÓN
            ============================= -->
            <div class="producto-botones">
                <button
                    class="boton-conseguir"
                    onclick="confirmarItemMercado(${producto.id})">
                    SÍ, QUIERO
                </button>
                <button
                    class="boton-volver"
                    onclick="rechazarOfertaMercado(${producto.id})">
                    NO, VOLVER
                </button>
            </div>
        </div>
    `;
}
// =======================================
// RECHAZAR OFERTA
// =======================================
function rechazarOfertaMercado(id){
    animarBorin("señalar");
    console.log(
        "❌ OFERTA RECHAZADA:",
        id
    );

    const producto = productosMercado.find(
        item => item.id === id
    );

    if(!producto){
        console.warn(
            "⚠️ No se encontró el producto:",
            id
        );
        return;
    }

    const dialogo = obtenerDialogoBorin(
        "rechazar_oferta"
    );

    console.log(
        "🧙‍♂️ BORIN:",
        dialogo
    );

    const panel = document.getElementById(
        "dialogoBorin"
    );

    if(!panel){
        return;
    }

    panel.innerHTML = `
        <div class="borin-dialogo">

            <div class="borin-nombre">
                🧙‍♂️ Borin
            </div>

            <div class="borin-texto">
                ${dialogo}
            </div>

            <div class="producto-botones">

                <button
                    class="boton-conseguir"
                    onclick="ofrecerOtroItemMercado()">
                    VER OTRA COSA
                </button>

            </div>

        </div>
    `;
}
function borinHablar(){

    animarBorin("hablar");

}
// =======================================
// OFRECER OTRO ITEM
// =======================================
function ofrecerOtroItemMercado(){
    animarBorin("trabajando");
    console.log(
        "🔄 BORIN OFRECE OTRO ITEM"
    );

    const dialogo = obtenerDialogoBorin(
        "ofrecer_otro_item"
    );

    console.log(
        "🧙‍♂️ BORIN:",
        dialogo
    );

    const panel = document.getElementById(
        "dialogoBorin"
    );

    if(!panel){
        return;
    }

    panel.innerHTML = `
        <div class="borin-dialogo">

            <div class="borin-nombre">
                🧙‍♂️ Borin
            </div>

            <div class="borin-texto">
                ${dialogo}
            </div>

            <div class="producto-botones">

                <button
                    class="boton-volver"
                    onclick="cerrarProductoMercado()">
                    VOLVER A MIRAR
                </button>

            </div>

        </div>
    `;
}

// =======================================
// CONFIRMAR ITEM DEL MERCADO
// =======================================
function confirmarItemMercado(id){
    animarBorin("sorprendido");
    console.log(
        "✅ ITEM CONFIRMADO:",
        id
    );

    const producto = productosMercado.find(
        item => item.id === id
    );

    if(!producto){

        console.warn(
            "⚠️ No se encontró el producto:",
            id
        );

        return;
    }

    console.log(
        "🛒 ITEM CONFIRMADO:",
        producto
    );

    // ===================================
    // VERIFICAR OQUOS
    // ===================================

    const jugador = cargarJugador();

    if(!jugador){
        console.warn("⚠️ No se encontró el jugador activo.");
        return;
    }

    if(jugador.oquos < producto.precio){

        console.log(
            "🪙 OQUOS INSUFICIENTES:",
            jugador.oquos,
            "/",
            producto.precio
        );

        const dialogo = obtenerDialogoBorin(
            "sin_oquos" 
            
        );
animarBorin("enojado");
        console.log(
            "🧙‍♂️ BORIN:",
            dialogo
        );

        const panel = document.getElementById(
            "dialogoBorin"
        );

        if(!panel){
            console.warn(
                "⚠️ No se encontró #dialogoBorin"
            );
            return;
        }

        panel.innerHTML = `

            <div class="borin-dialogo">

                <div class="borin-nombre">
                    🧙‍♂️ Borin
                </div>

                <div class="borin-texto">
                    ${dialogo}
                </div>

                <div class="desafio-opciones">

                    <button
                        class="btn-desafio"
                        onclick="indecisoMercado()"
                    >
                        👀 SEGUIR MIRANDO
                    </button>

                    <button
                        class="btn-desafio"
                        onclick="salirDelMercado()"
                    >
                        🚪 SALIR
                    </button>

                </div>

            </div>

        `;

        return;
    }

    // ===================================
    // BORIN — ELEGIR TIPO DE DESAFÍO
    // ===================================

    const dialogo = obtenerDialogoBorin(
        "elegir_tipo_desafio"
    );
animarBorin("hablar");
    console.log(
        "🧙‍♂️ BORIN:",
        dialogo
    );

    const panel = document.getElementById(
        "dialogoBorin"
    );

    if(!panel){
        console.warn(
            "⚠️ No se encontró #dialogoBorin"
        );
        return;
    }

    panel.innerHTML = `

        <div class="borin-dialogo">

            <div class="borin-nombre">
                🧙‍♂️ Borin
            </div>

            <div class="borin-texto">
                ${dialogo}
            </div>

            <div class="desafio-opciones">

                <button
                    class="btn-desafio"
                    onclick="elegirDesafioPregunta(${producto.id})"
                >
                    🧠 Responder
                </button>

                <button
                    class="btn-desafio"
                    onclick="elegirDesafioAccion(${producto.id})"
                >
                    🎯 Desafío
                </button>

            </div>

        </div>

    `;

}
// =======================================
// BORIN — INDECISO
// =======================================
function indecisoMercado(){
    animarBorin("pensar");
    console.log(
        "🤔 JUGADOR INDECISO"
    );

    const dialogo = obtenerDialogoBorin(
        "indeciso_pensando"
    );

    console.log(
        "🧙‍♂️ BORIN:",
        dialogo
    );

    const panel = document.getElementById(
        "dialogoBorin"
    );

    if(!panel){
        console.warn(
            "⚠️ No se encontró #dialogoBorin"
        );
        return;
    }

    panel.innerHTML = `

        <div class="borin-dialogo">

            <div class="borin-nombre">
                🧙‍♂️ Borin
            </div>

            <div class="borin-texto">
                ${dialogo}
            </div>

            <div class="desafio-opciones">

                <button
                    class="btn-desafio"
                    onclick="ofrecerOtroItemMercado()"
                >
                    👀 VER OTRO
                </button>

                <button
                    class="btn-desafio"
                    onclick="salirDelMercado()"
                >
                    🚪 SALIR
                </button>

            </div>

        </div>

    `;

}
// =======================================
// ELEGIR DESAFÍO — PREGUNTA
// =======================================
function elegirDesafioPregunta(id){
    animarBorin("ofrecer");
    console.log(
        "🧠 TIPO DE DESAFÍO: PREGUNTA",
        id
    );

    const dialogo = obtenerDialogoBorin(
        "opcion_responder"
    );

    console.log(
        "🧙‍♂️ BORIN:",
        dialogo
    );

    // ===================================
    // BUSCAR DESAFÍOS DE PREGUNTA
    // ===================================

    const desafios = desafiosMercado.filter(
        desafio => desafio.tipo === "responder"
    );

    if(desafios.length === 0){

        console.warn(
            "⚠️ No hay desafíos de pregunta disponibles."
        );

        return;
    }

    // ===================================
    // ELEGIR UNO AL AZAR
    // ===================================

    const desafio =
        desafios[
            Math.floor(
                Math.random() * desafios.length
            )
        ];

    console.log(
        "❓ DESAFÍO DE PREGUNTA SELECCIONADO:",
        desafio
    );

    // ===================================
    // MOSTRAR PREGUNTA
    // ===================================

    mostrarDesafioPregunta(desafio, dialogo);

}
// =======================================
// ELEGIR DESAFÍO — ACCIÓN
// =======================================
function elegirDesafioAccion(id){
    animarBorin("pensar");
    console.log(
        "🎯 TIPO DE DESAFÍO: ACCIÓN",
        id
    );

    const dialogo = obtenerDialogoBorin(
        "opcion_desafio"
    );

    console.log(
        "🧙‍♂️ BORIN:",
        dialogo
    );

    // ===================================
    // BUSCAR DESAFÍOS DE ACCIÓN
    // ===================================

    const desafios = desafiosMercado.filter(
        desafio => desafio.tipo === "desafio"
    );

    if(desafios.length === 0){

        console.warn(
            "⚠️ No hay desafíos de acción disponibles."
        );

        return;
    }

    // ===================================
    // ELEGIR UNO AL AZAR
    // ===================================

    const desafio =
        desafios[
            Math.floor(
                Math.random() * desafios.length
            )
        ];

    console.log(
        "🎯 DESAFÍO SELECCIONADO:",
        desafio
    );

    // ===================================
    // MOSTRAR DESAFÍO
    // ===================================

    const panel = document.getElementById(
        "dialogoBorin"
    );

    if(!panel){
        console.warn(
            "⚠️ No se encontró #dialogoBorin"
        );
        return;
    }

    panel.innerHTML = `

        <div class="borin-dialogo">

            <div class="borin-nombre">
                🧙‍♂️ Borin
            </div>

            <div class="borin-texto">
                ${dialogo}
            </div>

            <div class="desafio-panel">

                <div class="desafio-titulo">
                    🎯 DESAFÍO
                </div>

                <div class="desafio-texto">
                    ${desafio.texto}
                </div>

                <button
                    class="btn-desafio-completar"
                    onclick="completarDesafioMercado('${desafio.id}', ${id})"
                >
                    ${desafio.boton_completar}
                </button>

            </div>

        </div>

    `;

}
// =======================================
// COMPLETAR DESAFÍO
// =======================================
function completarDesafioMercado(desafioId, productoId){
animarBorin("celebrar");
    console.log(
        "🎯 DESAFÍO COMPLETADO:",
        desafioId
    );

    const desafio = desafiosMercado.find(
        item => item.id === desafioId
    );

    if(!desafio){

        console.warn(
            "⚠️ No se encontró el desafío:",
            desafioId
        );

        return;
    }

    console.log(
        "🎯 DESAFÍO:",
        desafio
    );

    // ===================================
    // BORIN — DESAFÍO SUPERADO
    // ===================================
    animarBorin("celebrar");
    const dialogo = obtenerDialogoBorin(
        "desafio_completado"
    );

    console.log(
        "🧙‍♂️ BORIN:",
        dialogo
    );

    const panel = document.getElementById(
        "dialogoBorin"
    );

    if(!panel){
        return;
    }

    panel.innerHTML = `

        <div class="borin-dialogo">

            <div class="borin-nombre">
                🧙‍♂️ Borin
            </div>

            <div class="borin-texto">
                ${dialogo}
            </div>

            <div class="desafio-exito">

                🎉 ¡DESAFÍO SUPERADO!

            </div>

        </div>

    `;

    // ===================================
    // EFECTUAR COMPRA
    // ===================================

    efectuarCompraMercado();

}
// =======================================
// EFECTUAR COMPRA
// =======================================
function efectuarCompraMercado(){
    animarBorin("ofrecer");
    console.log(
        "🪙 EFECTUANDO COMPRA"
    );

    if(!productoActual){

        console.warn(
            "⚠️ No existe producto actual."
        );

        return;
    }

    const jugador = cargarJugador();

    if(!jugador){

        console.warn(
            "⚠️ No se encontró el jugador activo."
        );

        return;
    }

    const precio = productoActual.precio;

    console.log(
        "🪙 SALDO ANTES:",
        jugador.oquos
    );

    console.log(
        "🪙 PRECIO:",
        precio
    );

    // ===================================
    // DESCONTAR OQUOS
    // ===================================

    jugador.oquos -= precio;

    guardarJugador(jugador);

    actualizarPerfil();

    console.log(
        "🪙 OQUOS DESPUÉS:",
        jugador.oquos
    );

    // ===================================
    // DIÁLOGO COMPRA EXITOSA
    // ===================================

    const dialogo = obtenerDialogoBorin(
        "compra_exitosa"
    );

    console.log(
        "🧙‍♂️ BORIN:",
        dialogo
    );

    const panel = document.getElementById(
        "dialogoBorin"
    );

    if(!panel){
        return;
    }

    panel.innerHTML = `

        <div class="borin-dialogo">

            <div class="borin-nombre">
                🧙‍♂️ Borin
            </div>

            <div class="borin-texto">
                ${dialogo}
            </div>

            <div class="producto-conseguido">

                🎁 ¡PRODUCTO CONSEGUIDO!

            </div>

            <div class="compra-resumen">

                💸 Gastaste:
                <strong>${precio} Oquos</strong>

                <br>

                🪙 Te quedan:
                <strong>${jugador.oquos} Oquos</strong>

            </div>

            <div class="desafio-opciones">

                <button
                    class="btn-desafio"
                    onclick="volverAElegirProducto()"
                >
                    🛒 Elegir otro
                </button>

                <button
                    class="btn-desafio"
                    onclick="salirDelMercado()"
                >
                    🚪 Salir
                </button>

            </div>

        </div>

    `;

}
function mostrarDesafioPregunta(desafio, dialogo){
     animarBorin("pensar");
    console.log(
        "❓ MOSTRANDO PREGUNTA:",
        desafio
    );

    const panel = document.getElementById("dialogoBorin");

    if(!panel){
        console.error("No se encontró #dialogoBorin.");
        return;
    }

    panel.innerHTML = `
        <div class="borin-dialogo">

            <div class="borin-nombre">
                🧙‍♂️ Borin
            </div>

            <div class="borin-texto">
                ${dialogo}
            </div>

            <div class="desafio-panel">

                <div class="desafio-titulo">
                    🧠 PREGUNTA
                </div>

                <div class="desafio-texto">
                    ${desafio.texto}
                </div>

                <div class="desafio-opciones">

                    ${desafio.opciones.map((opcion, indice) => `

                        <button
                            class="boton-respuesta"
                            onclick="responderDesafio(${indice})"
                        >
                            ${opcion}
                        </button>

                    `).join("")}

                </div>

            </div>

        </div>
    `;

    desafioActual = desafio;
}
// =======================================
// RESPONDER DESAFÍO
// =======================================
function responderDesafio(indice){

    if(!desafioActual){
        console.warn("⚠️ No hay desafío activo.");
        return;
    }

    console.log(
        "🧠 RESPUESTA ELEGIDA:",
        indice
    );

    // ===================================
    // RESPUESTA INCORRECTA
    // ===================================
    if(indice !== desafioActual.respuesta_correcta){
        animarBorin("enojado");
        console.log(
            "❌ RESPUESTA INCORRECTA:",
            desafioActual.id
        );

        const dialogo = obtenerDialogoBorin(
            "respuesta_incorrecta"
        );

        console.log(
            "🧙‍♂️ BORIN:",
            dialogo
        );

        const panel = document.getElementById(
            "dialogoBorin"
        );

        if(panel){

            panel.innerHTML = `
                <div class="borin-dialogo">

                    <div class="borin-nombre">
                        🧙‍♂️ Borin
                    </div>

                    <div class="borin-texto">
                        ${dialogo}
                    </div>

                    <button
                        class="boton-respuesta"
                        onclick="mostrarDesafioPregunta(desafioActual)"
                    >
                        Intentar otra vez
                    </button>

                </div>
            `;
        }

        return;
    }

    // ===================================
    // RESPUESTA CORRECTA
    // ===================================
    console.log(
        "✅ RESPUESTA CORRECTA:",
        desafioActual.id
    );

    efectuarCompraMercado();

    // ===================================
    // BORIN — COMPRA EXITOSA
    // ===================================
animarBorin("celebrar");
    const dialogo = obtenerDialogoBorin(
        "compra_exitosa"
    );

    console.log(
        "🧙‍♂️ BORIN:",
        dialogo
    );

    const panel = document.getElementById(
        "dialogoBorin"
    );

    if(!panel){
        return;
    }

    panel.innerHTML = `

        <div class="borin-dialogo">

            <div class="borin-nombre">
                🧙‍♂️ Borin
            </div>

            <div class="borin-texto">
                ${dialogo}
            </div>

            <div class="producto-conseguido">

                🎁 ¡PRODUCTO CONSEGUIDO!

            </div>

            <div class="desafio-opciones">

                <button
                    class="btn-desafio"
                    onclick="volverAElegirProducto()"
                >
                    🛒 Elegir otro
                </button>

                <button
                    class="btn-desafio"
                    onclick="salirDelMercado()"
                >
                    🚪 Salir
                </button>

            </div>

        </div>

    `;
}
// =======================================
// VOLVER A ELEGIR PRODUCTO
// =======================================
function volverAElegirProducto(){
    animarBorin("señalar");
    console.log(
        "🔄 VOLVER A ELEGIR PRODUCTO"
    );

    const dialogo = obtenerDialogoBorin(
        "volver_a_elegir"
    );

    console.log(
        "🧙‍♂️ BORIN:",
        dialogo
    );

    const panel = document.getElementById(
        "dialogoBorin"
    );

    if(!panel){
        return;
    }

    panel.innerHTML = `

        <div class="borin-dialogo">

            <div class="borin-nombre">
                🧙‍♂️ Borin
            </div>

            <div class="borin-texto">
                ${dialogo}
            </div>

        </div>

    `;

}
// =======================================
// SALIR DEL MERCADO
// =======================================
function salirDelMercado(){
    animarBorin("despedir");
    console.log(
        "🚪 SALIR DEL MERCADO"
    );

    const dialogo = obtenerDialogoBorin(
        "salir_mercado"
    );

    console.log(
        "🧙‍♂️ BORIN:",
        dialogo
    );

    const panel = document.getElementById(
        "dialogoBorin"
    );

    if(!panel){
        return;
    }

    panel.innerHTML = `

        <div class="borin-dialogo">

            <div class="borin-nombre">
                🧙‍♂️ Borin
            </div>

            <div class="borin-texto">
                ${dialogo}
            </div>

        </div>

    `;

}
// =======================================
// CERRAR PRODUCTO
// =======================================
function cerrarProductoMercado(){
    const panel = document.getElementById(
        "dialogoBorin"
    );
    if(!panel){
        return;
    }
    panel.innerHTML = "";
}
// =======================================
// MOSTRAR ITEMS DEL MERCADO
// =======================================
function cargarItemsMercado(){

    const mercado = document.querySelector(".mercado");

    if(!mercado){
        console.error("No se encontró .mercado");
        return;
    }

    const contenedor = document.createElement("div");

    contenedor.id = "itemsMercado";

    mercado.appendChild(contenedor);

    const items = [

        /* los que estan bloqueados los dejamos para mas adelante*/
        "arbol",
        /*"arroz",*/
        /*"balanza",*/
        /*"barril",*/
        "bici",
        "burguer",
        "carta",
        "castillo",
        /*"chancho",*/
        "chocolate",
        "coca",
        /*"cofre1",*/
        /*"cofre2",*/
        "cometa",
        "compu",
        /*"flor1",*/
        /*"flor2",*/
        /*"flor3",*/
        /*"flor4",*/
        "galleta",
        "helado",
        "joystick",
        "libro",
        /*"libro1",*/
        /*"libro2",*/
        /*"luces1",*/
        "luces2",
        "mando",
        "manos",
        "mapaBosque",
        "mapaLeon",
        "mcBurguer",
        /*"monedas",*/
        "musica",
        "natacion",
        /*"pan",*/
        "pelota",
        "pintura",
        "pizza",
        "pochoclo",
        /*"pluma",*/
        /*"pollo",*/
        /*"queso",*/
        "sombrilla",
        /*"sopa",*/
        /*"tela",*/
        "tele",
        "varita",
        "vaso",
        "waffle"
    ];

    items.forEach(nombre => {

        // ===================================
        // BUSCAR PRODUCTO
        // ===================================

        const producto = productosMercado.find(
            item => item.item === nombre
        );

        if(!producto){

            console.warn(
                "⚠️ No se encontró producto para:",
                nombre
            );

            return;
        }

        // ===================================
        // CONTENEDOR DEL ITEM
        // ===================================

        const itemContenedor = document.createElement("div");

        itemContenedor.className =
            `item-mercado-contenedor item-${nombre}`;

        // ===================================
        // IMAGEN
        // ===================================

        const img = document.createElement("img");

        img.src =
            `locations/market/images/${nombre}.png`;

        img.className = "item-mercado";

        img.alt = nombre;

        // ===================================
        // PRECIO
        // ===================================

        const precio = document.createElement("div");

        precio.className = "item-precio";

        precio.innerHTML =
            `🪙 ${producto.precio}`;

        // ===================================
        // INTERACCIÓN CON EL OBJETO
        // ===================================

        itemContenedor.addEventListener("click", () => {

            seleccionarItemMercado(nombre);

        });

        // ===================================
        // ARMAR ITEM
        // ===================================

        itemContenedor.appendChild(img);

        itemContenedor.appendChild(precio);

        contenedor.appendChild(itemContenedor);

    });
}
// =======================================
// CARGAR DESAFÍOS
// =======================================
async function cargarDesafiosMercado(){

    try{

        const respuesta = await fetch(
            "locations/market/data/desafios.json"
        );

        if(!respuesta.ok){
            throw new Error(`Error HTTP ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        desafiosMercado = datos.desafios;

        console.log(
            "🎯 Desafíos cargados:",
            desafiosMercado
        );

        return desafiosMercado;

    }catch(error){

        console.error(
            "❌ Error cargando desafíos:",
            error
        );

        desafiosMercado = [];

        return [];

    }
}