// =======================================
// MERCADO DE MÍRRAFEN
// =======================================
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
                 MERCADER
            ================================== -->
            <div class="mercader">
                <div id="borinSprite" class="borin-sprite"></div>
            </div>
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
    cargarProductosMercado();
    cargarItemsMercado();
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
// CARGAR BORIN
// =======================================
function cargarBorin(){
    const borinSprite = document.getElementById("borinSprite");
    if(!borinSprite){
        console.error("No se encontró #borinSprite.");
        return;
    }
    const borinHoja = new Image();
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
        borinSprite.style.width = `${anchoFrame * BORIN_ESCALA}px`;
        borinSprite.style.height = `${altoFrame * BORIN_ESCALA}px`;
        // ===================================
        // ESCALAR SPRITESHEET
        // ===================================
        borinSprite.style.backgroundSize = `${anchoHoja * BORIN_ESCALA}px ` + `${altoHoja * BORIN_ESCALA}px`;
        // ===================================
        // FRAME INICIAL
        // WALK → FORWARD
        // ===================================
        mostrarFrameBorin(
            borinSprite,
            borinHoja,
            0,
            0
        );
    };
}
// =======================================
// MOSTRAR UN FRAME DE BORIN
// =======================================
function mostrarFrameBorin(
    borinSprite, borinHoja, fila, columna
){  if(!borinHoja.naturalWidth){ return; }
    const anchoFrame = borinHoja.naturalWidth / BORIN_COLUMNAS;
    const altoFrame = borinHoja.naturalHeight / BORIN_FILAS;
    borinSprite.style.backgroundPosition =
        `${-(columna * anchoFrame * BORIN_ESCALA)}px ` +
        `${-(fila * altoFrame * BORIN_ESCALA)}px`;
}
// =======================================
// VOLVER AL MAPA
// =======================================
function irAlMapaDesdeMercado(){
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
        const productos = await respuesta.json();
        console.log("🏪 Productos del mercado cargados:", productos);
        return productos;
    }catch(error){
        console.error("❌ Error al cargar shop.json:", error);
        return [];
    }
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
        "arroz",
        "balanza",
        "barril",
        "chancho",
        "cofre1",
        "cofre2",
        "flor1",
        "flor2",
        "flor3",
        "flor4",
        "libro1",
        "libro2",
        "luces1",
        "luces2",
        "mapaBosque",
        "mapaLeon",
        "monedas",
        "pan",
        "pluma",
        "pollo",
        "queso",
        "sopa",
        "tela"
    ];
    items.forEach(nombre => {
        const img = document.createElement("img");
        img.src = `locations/market/images/${nombre}.png`;
        img.className = `item-mercado item-${nombre}`;
        img.alt = nombre;
        contenedor.appendChild(img);
    });
}