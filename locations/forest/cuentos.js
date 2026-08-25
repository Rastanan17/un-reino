// =======================================
// CUENTOS DE MÍRAFEN
// =======================================
const cuentos = [
    {
        id: "caperucita",
        titulo: "Caperucita Roja",
        imagen: "locations/forest/images/caperucita.png"
    },
    {
        id: "tresCerditos",
        titulo: "Los Tres Cerditos",
        imagen: "locations/forest/images/tres_cerditos.png"
    },
    {
        id: "cenicienta",
        titulo: "Cenicienta",
        imagen: "locations/forest/images/cenicienta.png"
    },
    {
        id: "pinocho",
        titulo: "Pinocho",
        imagen: "locations/forest/images/pinocho.png"
    },
    {
        id: "hanselGretel",
        titulo: "Hansel y Gretel",
        imagen: "locations/forest/images/hansel_gretel.png"
    },
    {
        id: "patitoFeo",
        titulo: "El Patito Feo",
        imagen: "locations/forest/images/patito_feo.png"
    }
];
// =======================================
// ESTADO
// =======================================
let cuentoActual = 0;
// =======================================
// MOSTRAR CUENTOS
// =======================================
function mostrarCuentos(){
    console.log("📖 Entrando a los cuentos");
    const content = document.getElementById("content");
    if(!content) return;
    cuentoActual = 0;
    renderizarCuento("entrada");
}
// =======================================
// RENDERIZAR CUENTO
// =======================================
function renderizarCuento(direccion = "entrada"){
    const content = document.getElementById("content");
    if(!content) return;
    const cuento = cuentos[cuentoActual];
    content.innerHTML = `
        <div class="cuentos">
            <!-- ==========================
                 BARRA SUPERIOR FIJA
            =========================== -->
            <div class="cuentos-barra">
                <button class="cuento-boton cuento-anterior" onclick="cuentoAnterior()" ${cuentoActual === 0 ? "disabled" : ""} aria-label="Cuento anterior">
                    ←
                </button>
                <div class="cuento-centro">
                    <button class="boton-salir-cuentos" onclick="salirDeCuentos()">
                        🌲 Volver
                    </button>
                    <span class="cuento-contador">
                        ${cuentoActual + 1} / ${cuentos.length}
                    </span>
                </div>
                <button class="cuento-boton cuento-siguiente" onclick="cuentoSiguiente()" ${cuentoActual === cuentos.length - 1 ? "disabled" : ""} aria-label="Cuento siguiente">
                    →
                </button>
            </div>
            <!-- ==========================
                 PÁGINA
            =========================== -->
            <div class="cuento-pagina cuento-${direccion}">
                <img class="cuento-imagen" src="${cuento.imagen}" alt="${cuento.titulo}">
            </div>
        </div>
    `;
}
// =======================================
// CUENTO ANTERIOR
// =======================================
function cuentoAnterior(){
    if(cuentoActual <= 0) return;
    animarCambioCuento("anterior");
}
// =======================================
// CUENTO SIGUIENTE
// =======================================
function cuentoSiguiente(){
    if(cuentoActual >= cuentos.length - 1) return;
    animarCambioCuento("siguiente");
}
// =======================================
// ANIMAR CAMBIO DE CUENTO
// =======================================
function animarCambioCuento(direccion){
    const pagina = document.querySelector(".cuento-pagina");
    if(!pagina) return;
    // ===================================
    // ANIMACIÓN DE SALIDA
    // ===================================
    pagina.classList.add(
        direccion === "siguiente" ? "salir-izquierda" : "salir-derecha"
    );
    setTimeout(() => {
        // ===================================
        // CAMBIAR CUENTO
        // ===================================
        if(direccion === "siguiente"){
            cuentoActual++;
        }else{
            cuentoActual--;
        }
        renderizarCuento(
            direccion
        );
    }, 350);
}
// =======================================
// SALIR DE CUENTOS
// =======================================
function salirDeCuentos(){
    mostrarBosque();
}