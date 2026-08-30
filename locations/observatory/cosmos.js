// =======================================
// CONSTELACIONES DE MÍRAFEN
// =======================================
const constelaciones = [
    {   id: "orion",
        nombre: "Orión",
        imagen: "locations/observatory/images/cosmos/orion.png"
    },
    {   id: "canMayor",
        nombre: "Can Mayor",
        imagen: "locations/observatory/images/cosmos/can_mayor.jpg"
    },
    {   id: "escorpio",
        nombre: "Escorpio",
        imagen: "locations/observatory/images/cosmos/escorpio.jpg"
    },
    {   id: "laQuilla",
        nombre: "La Quilla",
        imagen: "locations/observatory/images/cosmos/la_quilla.jpg"
    },
    {   id: "centauro",
        nombre: "Centauro",
        imagen: "locations/observatory/images/cosmos/centauro.jpg"
    },
    {   id: "cruzDelSur",
        nombre: "Cruz del Sur",
        imagen: "locations/observatory/images/cosmos/cruz_del_sur.jpg"
    }
];
// =======================================
// ESTADO
// =======================================
let constelacionActual = 0;
// =======================================
// MOSTRAR CONSTELACIONES
// =======================================
function mostrarConstelaciones(){
    console.log("⭐ Entrando al mapa estelar");
    ocultarHUDJugador();
    const content = document.getElementById("content");
    if(!content) return;
    constelacionActual = 0;
    renderizarConstelacion("entrada");
}
// =======================================
// RENDERIZAR
// =======================================
function renderizarConstelacion(direccion = "entrada"){
    const content = document.getElementById("content");
    if(!content) return;
    const constelacion = constelaciones[constelacionActual];
    content.innerHTML = `
        <div class="constelaciones">
            <!-- ==========================
                 BARRA SUPERIOR
            =========================== -->
            <div class="constelaciones-barra">
                <button class="constelacion-boton" onclick="constelacionAnterior()" ${constelacionActual === 0 ? "disabled" : ""} aria-label="Constelación anterior">
                    ←
                </button>
                <div class="constelacion-centro">
                    <button class="boton-volver-observatorio" onclick="salirDeConstelaciones()">
                        🔭 Observatorio
                    </button>
                    <span class="constelacion-contador">
                        ${constelacionActual + 1}/${constelaciones.length}
                    </span>
                </div>
                <button class="constelacion-boton" onclick="constelacionSiguiente()" ${constelacionActual === constelaciones.length - 1 ? "disabled" : ""} aria-label="Siguiente constelación">
                    →
                </button>
            </div>
            <!-- ==========================
                 IMAGEN
            =========================== -->
            <div class="constelacion-pagina constelacion-${direccion}">
                <img class="constelacion-imagen" src="${constelacion.imagen}" alt="${constelacion.nombre}">
            </div>
        </div>
    `;
}
// =======================================
// ANTERIOR
// =======================================
function constelacionAnterior(){
    if(constelacionActual <= 0) return;
    animarCambioConstelacion("anterior");
}
// =======================================
// SIGUIENTE
// =======================================
function constelacionSiguiente(){
    if(constelacionActual >= constelaciones.length - 1) return;
    animarCambioConstelacion("siguiente");
}
// =======================================
// ANIMACIÓN
// =======================================
function animarCambioConstelacion(direccion){
    const pagina = document.querySelector(".constelacion-pagina");
    if(!pagina) return;
    pagina.classList.add(direccion === "siguiente" ? "salir-izquierda" : "salir-derecha");
    setTimeout(() => {
        if(direccion === "siguiente"){
            constelacionActual++;
        }else{
            constelacionActual--;
        }
        renderizarConstelacion(direccion);
    }, 350);
}
// =======================================
// VOLVER AL OBSERVATORIO
// =======================================
function salirDeConstelaciones(){
    mostrarHUDJugador();
    detenerSonidoObservatorio();
    mostrarObservatorio();
}