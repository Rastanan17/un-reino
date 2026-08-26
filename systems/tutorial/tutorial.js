// =======================================
// UN REINO EN MÍRRAFEN
// SISTEMA DE TUTORIAL
// =======================================
// =======================================
// CONFIGURACIÓN
// =======================================
const RUTA_TUTORIAL = "systems/tutorial/";
let tutorialActivo = false;
let tutorialSeccionActual = null;
// =======================================
// DATOS DEL TUTORIAL
// =======================================
let datosTutorial = null;
let lugarTutorialActual = "mapa";
// =======================================
// CARGAR TUTORIAL.JSON
// =======================================
async function cargarDatosTutorial(){
    try{
        const respuesta = await fetch(
            RUTA_TUTORIAL + "data/tutorial.json"
        );
        if(!respuesta.ok){
            throw new Error(
                "No se pudo cargar tutorial.json"
            );
        }
        datosTutorial = await respuesta.json();
        console.log(
            "📜 Tutorial JSON cargado correctamente."
        );
    }catch(error){
        console.error(
            "❌ Error cargando tutorial.json:",
            error
        );

    }
}
// =======================================
// ESTABLECER LUGAR DEL TUTORIAL
// =======================================
function establecerLugarTutorial(lugar){
    if(!lugar){
        return;
    }
    lugarTutorialActual = lugar;
    console.log(
        "📍 Lugar del tutorial:",
        lugarTutorialActual
    );
}
// =======================================
// OBTENER DATOS DEL LUGAR
// =======================================
function obtenerDatosLugarTutorial(){
    if(!datosTutorial){
        console.warn(
            "⚠️ Los datos del tutorial todavía no fueron cargados."
        );
        return null;
    }
    return datosTutorial[
        lugarTutorialActual
    ] || null;
}
// =======================================
// CONFIGURACIÓN DEL SPRITESHEET
// =======================================
const SPRITE_ANCHO = 476;
const SPRITE_ALTO = 500;
const SPRITE_FILAS = 3;
// Filas 1 y 2 → 7 frames
// Fila 3 → 6 frames
const COLUMNAS_FILA_1 = 7;
const COLUMNAS_FILA_2 = 7;
const COLUMNAS_FILA_3 = 6;
let animacionTutorialTimer = null;
let animacionTutorialActiva = false;
const ANIMACIONES_TUTORIAL = {
    hablar: {
        fila: 2,
        frames: [1, 2, 3, 2, 1],
        velocidad: 180,
        repetir: true
    },
    pensar: {
        fila: 2,
        frames: [4, 5, 4, 5],
        velocidad: 300,
        repetir: true
    },
    reposo: {
        fila: 2,
        frames: [6, 7],
        velocidad: 500,
        repetir: true
    },
    victoria: {
        fila: 3,
        frames: [1, 2, 3],
        velocidad: 220,
        repetir: false
    },
    despedida: {
        fila: 3,
        frames: [4, 5, 6],
        velocidad: 250,
        repetir: false
    }
};
// =======================================
// OBTENER AVATAR DEL JUGADOR
// =======================================
function obtenerAvatarTutorial(){
    const jugador = cargarJugador();
    if(!jugador){
        return "explorer.png";
    }
    const avatar = jugador.avatar || "";
    if(avatar.includes("alien")){
        return "alien.png";
    }
    if(avatar.includes("dwarf")){
        return "dwarf.png";
    }
    if(avatar.includes("elf")){
        return "elf.png";
    }
    if(avatar.includes("witch")){
        return "witch.png";
    }
    if(avatar.includes("wolf")){
        return "wolf.png";
    }
    return "explorer.png";
}
// =======================================
// OBTENER RUTA DEL SPRITESHEET
// =======================================
function obtenerRutaAvatarTutorial(){
    return RUTA_TUTORIAL +
        "images/" +
        obtenerAvatarTutorial();
}
// =======================================
// CONFIGURAR AVATAR DEL TUTORIAL
// =======================================
function configurarAvatarTutorial(
    fila = 2,
    columna = 1
){
    const avatar =
        document.getElementById("tutorialAvatar");
    if(!avatar){
        return;
    }
    // -----------------------------------
    // CANTIDAD DE FRAMES SEGÚN LA FILA
    // -----------------------------------
    let columnas;
    if(fila === 3){
        columnas = COLUMNAS_FILA_3;
    }
    else if(fila === 2){
        columnas = COLUMNAS_FILA_2;
    }
    else{
        columnas = COLUMNAS_FILA_1;
    }
    // -----------------------------------
    // TAMAÑO DEL FRAME
    // -----------------------------------
    const frameAncho =
        SPRITE_ANCHO / columnas;
    const frameAlto =
        SPRITE_ALTO / SPRITE_FILAS;
    // -----------------------------------
    // IMAGEN
    // -----------------------------------
    avatar.style.backgroundImage =
        `url("${obtenerRutaAvatarTutorial()}")`;
    avatar.style.backgroundRepeat =
        "no-repeat";
    avatar.style.backgroundSize =
        `${SPRITE_ANCHO}px ${SPRITE_ALTO}px`;
    // -----------------------------------
    // POSICIÓN
    // -----------------------------------
    const posicionX =
        (columna - 1) * frameAncho;
    const posicionY =
        (fila - 1) * frameAlto;
    avatar.style.backgroundPosition =
        `-${posicionX}px -${posicionY}px`;
    // -----------------------------------
    // TAMAÑO DEL VISOR
    // -----------------------------------
    avatar.style.width =
        `${frameAncho}px`;
    avatar.style.height =
        `${frameAlto}px`;
    // -----------------------------------
    // NO USAR SRC
    // -----------------------------------
    avatar.removeAttribute("src");
}
// =======================================
// REPRODUCIR ANIMACIÓN
// =======================================
function reproducirAnimacionTutorial(nombre){
    const animacion =
        ANIMACIONES_TUTORIAL[nombre];
    if(!animacion){
        console.warn(
            "⚠️ Animación no encontrada:",
            nombre
        );
        return;
    }
    const tutorial =
        document.getElementById("tutorial");
    if(!tutorial){
        return;
    }
    // -----------------------------------
    // DETENER ANIMACIÓN ANTERIOR
    // -----------------------------------
    if(animacionTutorialTimer){
        clearInterval(
            animacionTutorialTimer
        );
        animacionTutorialTimer = null;
    }
    animacionTutorialActiva = true;
    let indice = 0;
   // -----------------------------------
    // MOSTRAR PRIMER FRAME
    // -----------------------------------
    configurarAvatarTutorial(
        animacion.fila,
        animacion.frames[indice]
    );
    // -----------------------------------
    // AVANZAR FRAMES
    // -----------------------------------
    animacionTutorialTimer =
        setInterval(() => {
            indice++;
           // --------------------------------
            // ANIMACIÓN TERMINADA
            // --------------------------------
            if(indice >= animacion.frames.length){
                if(animacion.repetir){
                    indice = 0;
                }
                else{
                    clearInterval(
                        animacionTutorialTimer
                    );
                    animacionTutorialTimer = null;
                    animacionTutorialActiva = false;
                    return;
               }
           }
            configurarAvatarTutorial(
                animacion.fila,
                animacion.frames[indice]
            );

        }, animacion.velocidad);
}
// =======================================
// ABRIR TUTORIAL
// =======================================
function abrirTutorial(){
    const visor = document.getElementById("visorPantalla");
    if(!visor){
        console.error("❌ No se encontró #visorPantalla para abrir el tutorial.");
        return;
    }
    console.log("📜 Abriendo tutorial en:", lugarTutorialActual);
    tutorialActivo = true;
    tutorialSeccionActual = null;
    // ===================================
    // EVITAR DUPLICAR EL TUTORIAL
    // ===================================
    let tutorial = document.getElementById("tutorial");
    if(!tutorial){
        visor.insertAdjacentHTML(
            "beforeend",
            `
            <section id="tutorial" class="tutorial">
                <div class="tutorialPanel">
                    <button class="tutorialCerrar" onclick="cerrarTutorial()" aria-label="Cerrar tutorial">
                        ❌
                    </button>
                    <div class="tutorialAvatar">
                        <div id="tutorialAvatar" class="tutorialSprite" aria-label="Avatar del tutorial"></div>
                    </div>
                    <div class="tutorialContenido">
                        <h2 id="tutorialTitulo">Tutorial</h2>
                        <div id="tutorialTexto">¿En qué puedo ayudarte?</div>
                        <div id="tutorialOpciones" class="tutorialOpciones">
                        </div>
                    </div>
                </div>
            </section>
            `
       );
    }
    // ===================================
    // MOSTRAR AVATAR
    // ===================================
    configurarAvatarTutorial(2, 1);
    // ===================================
    // MOSTRAR
    // ===================================
    tutorial = document.getElementById("tutorial");
    if(tutorial){
        tutorial.style.display = "flex";
    }
    // ===================================
    // CONTENIDO INICIAL
    // ===================================
    mostrarInicioTutorial();
}
// =======================================
// CERRAR TUTORIAL
// =======================================
function cerrarTutorial(){
    const tutorial = document.getElementById("tutorial");
    if(!tutorial){
        return;
    }
    // -----------------------------------
    // EVITAR DOBLE CIERRE
    // -----------------------------------
    if(tutorial.dataset.cerrando === "true"){
        return;
    }
    tutorial.dataset.cerrando = "true";
    // -----------------------------------
    // BLOQUEAR BOTÓN X
    // -----------------------------------
    const botonCerrar = tutorial.querySelector(".tutorialCerrar");
    if(botonCerrar){
        botonCerrar.disabled = true;
        botonCerrar.style.pointerEvents = "none";
        botonCerrar.style.opacity = "0.5";
    }
    // -----------------------------------
    // 👋 DESPEDIDA
    // -----------------------------------
    reproducirAnimacionTutorial("despedida");
    // -----------------------------------
    // ESPERAR 1 SEGUNDOS
    // -----------------------------------
    setTimeout(() => {
        // Detener cualquier animación
        if(animacionTutorialTimer){
            clearInterval(animacionTutorialTimer);
            animacionTutorialTimer = null;
        }
        animacionTutorialActiva = false;
        // Ocultar tutorial
        tutorial.style.display = "none";
        // Limpiar estado
        tutorialActivo = false;
        tutorialSeccionActual = null;
        tutorial.dataset.cerrando = "false";
        // Reactivar X
        if(botonCerrar){
            botonCerrar.disabled = false;
            botonCerrar.style.pointerEvents = "auto";
            botonCerrar.style.opacity = "1";
        }
    }, 1000);
}
// =======================================
// PANTALLA INICIAL
// =======================================
function mostrarInicioTutorial(){
    const titulo = document.getElementById("tutorialTitulo");
    const texto = document.getElementById("tutorialTexto");
    const opciones = document.getElementById("tutorialOpciones");
    if(!titulo || !texto || !opciones){
        return;
    }
    const datosLugar = obtenerDatosLugarTutorial();
    if(!datosLugar){
        titulo.textContent = "📜 Guía de Mírrafen";
        texto.innerHTML = `
            <p>Todavía no hay información disponible para este lugar.</p>
        `;
        opciones.innerHTML = "";
        return;
    }
    // ===================================
    // AVATAR HABLANDO
    // ===================================
    reproducirAnimacionTutorial("hablar");
    // ===================================
    // TÍTULO
    // ===================================
    titulo.textContent = datosLugar.titulo;
    // ===================================
    // TEXTO
    // ===================================
    texto.innerHTML = `
        <p>¡Hola, aventurero!</p>
        <p>¿Qué querés saber?</p>
    `;
    // ===================================
    // OPCIONES
    // ===================================
    opciones.innerHTML = "";
    const listaOpciones = datosLugar.opciones;
    if(!listaOpciones){
        return;
    }
    Object.keys(listaOpciones).forEach(
        clave => {
            const opcion = listaOpciones[clave];
            crearBotonTutorial(opcion.titulo, `mostrarTutorialSeccion('${clave}')`);
        }
    );
}
// =======================================
// CREAR BOTÓN DEL TUTORIAL
// =======================================
function crearBotonTutorial(texto, accion){
    const opciones = document.getElementById("tutorialOpciones");
    if(!opciones){
        return;
    }
    const boton = document.createElement("button");
    boton.className = "tutorialBoton";
    boton.textContent = texto;
    boton.setAttribute("onclick", accion);
    opciones.appendChild(boton);
}
// =======================================
// MOSTRAR SECCIÓN
// =======================================
function mostrarTutorialSeccion(seccion){
    const titulo = document.getElementById("tutorialTitulo");
    const texto = document.getElementById("tutorialTexto");
    const opciones = document.getElementById("tutorialOpciones");
    if(!titulo || !texto || !opciones){
        return;
    }
    const datosLugar = obtenerDatosLugarTutorial();
    if(!datosLugar){
        return;
    }
    const opcion = datosLugar.opciones?.[seccion];
    if(!opcion){
       console.warn("⚠️ No existe la sección:", seccion);
        return;
   }
    tutorialSeccionActual = seccion;
    // ===================================
    // AVATAR
    // ===================================
    reproducirAnimacionTutorial("hablar");
    // ===================================
    // TÍTULO
    // ===================================
    titulo.textContent = opcion.titulo;
    // ===================================
    // TEXTO
    // ===================================
    texto.innerHTML = opcion.texto.map(parrafo => `<p>${parrafo}</p>`).join("");
    // ===================================
    // OPCIONES
    // ===================================
    opciones.innerHTML = "";
    crearBotonTutorial("⬅️ Volver", "mostrarInicioTutorial()");
}
// =======================================
// INICIALIZAR SISTEMA
// =======================================
async function iniciarSistemaTutorial(){
    console.log("📜 Sistema de tutorial iniciado.");
    await cargarDatosTutorial();
}