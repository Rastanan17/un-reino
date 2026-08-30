// =======================================
// ASTROS DE MÍRAFEN
// =======================================
const astros = [
    {   id: "sol",
        nombre: "Sol",
        imagen: "locations/observatory/images/astros/sol.jpg"
    },
    {   id: "tierra",
        nombre: "Tierra",
        imagen: "locations/observatory/images/astros/tierra.jpg"
    },
    {   id: "marte",
        nombre: "Marte",
        imagen: "locations/observatory/images/astros/marte.jpg"
    },
    {   id: "jupiter",
        nombre: "Júpiter",
        imagen: "locations/observatory/images/astros/jupiter.jpg"
    },
    {   id: "saturno",
        nombre: "Saturno",
        imagen: "locations/observatory/images/astros/saturno.jpg"
    },
    {   id: "venus",
        nombre: "Venus",
        imagen: "locations/observatory/images/astros/venus.jpg"
    }
];
// =======================================
// ESTADO
// =======================================
let astroActual = 0;
// =======================================
// MOSTRAR ASTROS
// =======================================
function mostrarAstros(){
    console.log("🔭 Entrando a Astros");
    ocultarHUDJugador();
    const content = document.getElementById("content");
    if(!content) return;
    astroActual = 0;
    renderizarAstro("entrada");
}
// =======================================
// RENDERIZAR ASTRO
// =======================================
function renderizarAstro(direccion = "entrada"){
    const content = document.getElementById("content");
    if(!content) return;
    const astro = astros[astroActual];
    content.innerHTML = `
        <div class="astros">
            <!-- ==========================
                 BARRA SUPERIOR
            =========================== -->
            <div class="astros-barra">
                <button class="astro-boton" onclick="astroAnterior()" ${astroActual === 0 ? "disabled" : ""} aria-label="Astro anterior">
                   ←
                </button>
                <div class="astro-centro">
                    <button class="boton-volver-observatorio" onclick="salirDeAstros()">
                        🔭 Observatorio
                    </button>
                    <span class="astro-contador">
                        ${astroActual + 1} / ${astros.length}
                    </span>
                </div>
                <button class="astro-boton astro-siguiente" onclick="astroSiguiente()" ${astroActual === astros.length - 1 ? "disabled" : ""} aria-label="Siguiente astro">
                    →
                </button>
            </div>
            <!-- ==========================
                 IMAGEN
            =========================== -->
            <div class="astro-pagina astro-${direccion}">
                <img class="astro-imagen" src="${astro.imagen}" alt="${astro.nombre}">
            </div>
        </div>
    `;
}
// =======================================
// ASTRO ANTERIOR
// =======================================
function astroAnterior(){
    if(astroActual <= 0) return;
    animarCambioAstro("anterior");
}
// =======================================
// ASTRO SIGUIENTE
// =======================================
function astroSiguiente(){
    if(astroActual >= astros.length - 1)
        return;
    animarCambioAstro("siguiente");
}
// =======================================
// ANIMACIÓN
// =======================================
function animarCambioAstro(direccion){
    const pagina = document.querySelector(".astro-pagina");
    if(!pagina) return;
    pagina.classList.add(direccion === "siguiente" ? "astro-salida-izquierda" : "astro-salida-derecha");
    setTimeout(() => {
        if(direccion === "siguiente"){
            astroActual++;
        }else{
            astroActual--;
        }
        renderizarAstro(direccion);
    }, 350);
}
// =======================================
// VOLVER AL OBSERVATORIO
// =======================================
function salirDeAstros(){
    mostrarHUDJugador();
    mostrarObservatorio();
}