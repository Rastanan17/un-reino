// =======================================
// REINO DE MÍRRAFEN
// Archivo principal
// =======================================
// Sistema de Misiones
// =======================================
const zonasMapa = [
"Todas",
"Castillo",
"Aldea",
"Observatorio",
"Santuario",
"Granja",
"Bosque",
"Biblioteca",
"Mercado"
];
let intervalosMisiones = {};
let misiones = [];
let filtroZona = "Todas";
let filtroEstado = "todos";
// ---------------------------------------
// Cargar misiones
// ---------------------------------------
async function cargarMisiones() {
    //console.log("1. Entró a cargarMisiones");
    const guardadas = localStorage.getItem("orion_misiones");
    //console.log("2. LocalStorage:", guardadas);
    if (guardadas) {
        misiones = JSON.parse(guardadas);
    }
    //console.log("3. Misiones después del localStorage:", misiones);
    if (!misiones || misiones.length === 0) {
        //console.log("4. Leyendo missions.json...");
        const respuesta = await fetch("systems/missions/missions.json");
        misiones = await respuesta.json();
        //console.log("5. JSON cargado:", misiones);
        guardarMisiones();
    }
    //console.log("6. Total de misiones:", misiones.length);
}
// ---------------------------------------
// Guardar
// ---------------------------------------
function guardarMisiones() {
    localStorage.setItem(
        "orion_misiones",
        JSON.stringify(misiones)
    );
}
function mostrarMisiones(){
    const content = document.getElementById("content");
    // Estadísticas generales
    const total = misiones.length;
    const completadas = misiones.filter(m=>m.estado==="completada").length;
    const enCurso = misiones.filter(m=>m.estado==="enCurso").length;
    const disponibles = misiones.filter(m=>m.estado==="disponible").length;
    const porcentaje = total>0 ? Math.floor(completadas*100/total) : 0;
    content.innerHTML = `
        <button onclick="mostrarMapaReino()" class="btnVolver">
            🗺️ Volver al Reino
        </button>
        <h2>📜 Misiones del Reino</h2>
        <div class="missions-summary">
            <h3>${completadas}/${total} completadas</h3>
            <div class="progress">
                <div class="progressFill" style="width:${porcentaje}%"></div>
            </div>
            <p>
                <button class="status-filter-btn ${filtroEstado==='completada' ? 'active':''}" data-status="completada" style="background:none; border:none; cursor:pointer; color:inherit;">🟢 ${completadas}</button>&nbsp;&nbsp;
                <button class="status-filter-btn ${filtroEstado==='enCurso' ? 'active':''}" data-status="enCurso" style="background:none; border:none; cursor:pointer; color:inherit;">🟡 ${enCurso}</button>&nbsp;&nbsp;
                <button class="status-filter-btn ${filtroEstado==='disponible' ? 'active':''}" data-status="disponible" style="background:none; border:none; cursor:pointer; color:inherit;">🔴 ${disponibles}</button>
                ${filtroEstado !== 'todos' ? ' <button onclick="filtroEstado=\'todos\'; mostrarMisiones();" style="font-size:0.8rem; cursor:pointer;">(Ver todos)</button>' : ''}
            </p>
        </div>
        <div id="missionFilters"></div>
        <div id="missions"></div>
    `;
    // =====================
    // FILTROS DE ZONA
    // =====================
    const filtros = document.getElementById("missionFilters");
    let htmlFiltros = "";
    zonasMapa.forEach(zona=>{
        const totalZona = misiones.filter(m=>m.zona===zona).length;
        const hechasZona = misiones.filter(m=>m.zona===zona && m.estado==="completada").length;
        htmlFiltros += `
            <button class="filter-btn ${zona===filtroZona ? "active":""}" data-zone="${zona}">
                ${zona==="Todas" ? "Todas" : `${zona} (${hechasZona}/${totalZona})`}
            </button>
        `;
    });
    filtros.innerHTML = htmlFiltros;
    // Eventos para botones de zona
    document.querySelectorAll(".filter-btn").forEach(btn=>{
        btn.onclick=()=>{
            filtroZona = btn.dataset.zone;
            mostrarMisiones();
        };
    });
    // Eventos para los botones de estado (colores)
    document.querySelectorAll(".status-filter-btn").forEach(btn=>{
        btn.onclick=()=>{
            const statusClicked = btn.dataset.status;
            // Si hace click en el mismo estado activo, lo quita (vuelve a 'todos')
            filtroEstado = (filtroEstado === statusClicked) ? "todos" : statusClicked;
            mostrarMisiones();
        };
    });
    // =====================
    // LISTA Y FILTRADO COMBINADO
    // =====================
    const contenedor = document.getElementById("missions");
    // Filtramos por zona y por estado al mismo tiempo
    let lista = misiones.filter(m => {
        const cumpleZona = (filtroZona === "Todas" || m.zona === filtroZona);
        const cumpleEstado = (filtroEstado === "todos" || m.estado === filtroEstado);
        return cumpleZona && cumpleEstado;
    });
    lista.forEach(mision=>{
        const tarjeta = document.createElement("div");
        tarjeta.className="mission-card";
        let estado="🔴";
        if(mision.estado==="enCurso")
            estado="🟡";
        if(mision.estado==="completada")
            estado="🟢";
        let contenidoBoton="";
        if(mision.estado==="disponible"){
            contenidoBoton=`
                <button onclick="confirmarMision(${mision.id})">
                    ⚔️ Comenzar misión
                </button>
            `;
        }
        else if(mision.estado==="enCurso"){
            contenidoBoton=`
                <div class="progress">
                    <div id="barra${mision.id}" class="progressFill"></div>
                </div>
                <p id="tiempo${mision.id}">⏳ Preparando...</p>
                <div class="mission-actions">
                    <button onclick="terminarMision(${mision.id})">✅ Ya terminé</button>
                    <button class="secondary" onclick="posponerMision(${mision.id})">⏸️ Posponer</button>
                </div>
            `;
        }
        else{
            contenidoBoton=`
                <button disabled>🏆 Completada</button>
            `;
        }
        tarjeta.innerHTML=`
            <div class="categoria">${estado}${mision.categoria}</div>
            <div class="icono">${mision.icono}</div>
            <h3>${mision.titulo}</h3>
            <p>${mision.descripcion}</p>
            <div class="recompensas">
                ⭐ ${mision.xp} XP<br>
                💰 ${mision.oquos} Oquos<br>
                ⏱️ ${Math.floor(mision.duracion/60)} min
            </div>
            ${contenidoBoton}
        `;
        contenedor.appendChild(tarjeta);
        if(mision.estado==="enCurso"){
            continuarTemporizador(mision);
        }
    });
}
function confirmarMision(id){
    const mision = misiones.find(m => m.id === id);
    if(!mision) return;
    mostrarMensaje(
        "📜 Nueva misión",
        `
            <h3>${mision.icono} ${mision.titulo}</h3>
            <p>${mision.descripcion}</p>
            <br>
            ⭐ ${mision.xp} XP<br>
            💰 ${mision.oquos} Oquos<br>
            ⏱️ ${Math.floor(mision.duracion/60)} minutos
            <br><br>
            ¿Deseas comenzar esta misión?
            <br><br>
            <button id="aceptarMision">⚔️ Aceptar</button>
            <button id="cancelarMision">❌ Cancelar</button>
        `
    );
    setTimeout(()=>{
        document.getElementById("aceptarMision").onclick=()=>{
            document.getElementById("modal").classList.add("oculto");
            iniciarMision(id);
        };
        document.getElementById("cancelarMision").onclick=()=>{
            document.getElementById("modal").classList.add("oculto");
        };
    },10);
}
// ---------------------------------------
// Iniciar misión
// ---------------------------------------
function iniciarMision(id) {
    const mision = misiones.find(m => m.id === id);
    if (!mision) return;
    mision.estado = "enCurso";
    mision.inicio = Date.now();
    guardarMisiones();
    mostrarMisiones();
}
// ---------------------------------------
// Continuar temporizador
// ---------------------------------------
function continuarTemporizador(mision) {
    const barra = document.getElementById("barra" + mision.id);
    const tiempo = document.getElementById("tiempo" + mision.id);
        // Evitar intervalos duplicados
    if(intervalosMisiones[mision.id]){
        clearInterval(intervalosMisiones[mision.id]);
    } 
    intervalosMisiones[mision.id] = setInterval(()=> {
        const pasado = Math.floor(
            (Date.now() - mision.inicio) / 1000
        );
        const restante = mision.duracion - pasado;
        const porcentaje = (pasado / mision.duracion) * 100;
        barra.style.width = Math.min(porcentaje,100) + "%";
        if (restante <= 0) {
            clearInterval(intervalosMisiones[mision.id]);
            delete intervalosMisiones[mision.id];
            completarMision(mision);
            return;
        }
        const minutos = Math.floor(restante / 60);
        const segundos = restante % 60;
        tiempo.textContent = `⏳ ${minutos}:${segundos.toString().padStart(2,"0")}`;
    },1000);
}    
// ---------------------------------------
// Completar
// ---------------------------------------
function completarMision(mision) {
    if(mision.estado==="completada"){
    return;
    }
    mision.estado = "completada";
    guardarMisiones();
        console.log("MISIÓN", mision);
        console.log("XP:", mision.xp);
        console.log("OQUOS:", mision.oquos);
    sumarRecompensa(
        mision.xp,
        mision.oquos
    );
    restaurarZona(
        mision.zona,
        mision.restauracion
    );
    if(document.getElementById("missions") === null){
    mostrarMapaReino();
    }
    // desbloquearZona(
    //     mision.zona
    // );
    actualizarPerfil();
    mostrarMisiones();
    mostrarMensaje(
        "🏆 Misión completada",
        `${mision.titulo}
        +${mision.xp} XP
        +${mision.oquos} Oquos`
    );
}
// ---------------------------------------
// Reiniciar misiones diarias
// ---------------------------------------
function reiniciarMisionesDiarias() {
    misiones.forEach(mision => {
        mision.estado = "disponible";
        delete mision.inicio;
    });
    guardarMisiones();
};
function terminarMision(id){
    const mision = misiones.find(
        m=>m.id===id
    );
    if(!mision) return;
    completarMision(mision);
}
function posponerMision(id){
    const mision = misiones.find(
        m=>m.id===id
    );
    if(!mision) return;
    mision.estado="disponible";
    delete mision.inicio;
    guardarMisiones();
    mostrarMisiones();
    mostrarMensaje(
        "📜 Misión pospuesta",
        "Podrás retomarla cuando quieras."
    );
}

/*NUEVO SISTEMA DE MISIONES*/

// =======================================
// TABLÓN DE MISIONES
// =======================================
let paginaActual = 0;
const MISIONES_POR_PAGINA = 2;
// =======================================
// TABLÓN DE MISIONES
// =======================================
function mostrarTablonMisiones(zona = "Castillo"){

    const content = document.getElementById("content");

    const misionesZona = misiones.filter(
        mision => mision.zona === zona
    );

    const inicio = paginaActual * MISIONES_POR_PAGINA;
    const fin = inicio + MISIONES_POR_PAGINA;

    const pagina = misionesZona.slice(inicio, fin);

    content.innerHTML = `
        <section class="tablon-misiones">

            <img
                class="btn-volver"
                src="assets/images/items/exit.png"
                alt="Volver"
                onclick="mostrarCastillo()">

            <img
                class="btn-anterior"
                src="assets/images/items/arrow_left.png"
                alt="Anterior"
                onclick="paginaAnteriorMisiones('${zona}')">

            <img
                class="btn-siguiente"
                src="assets/images/items/arrow_right.png"
                alt="Siguiente"
                onclick="paginaSiguienteMisiones('${zona}')">

            <div class="pergaminos">
                ${pagina.map(crearPergamino).join("")}
            </div>

        </section>
    `;
}
// =======================================
// CREAR PERGAMINO
// =======================================
function crearPergamino(mision){

    return `
        <div
            class="pergamino2"
            onclick="abrirPergaminoMision(${mision.id})">

            <div class="titulo-mision">
                ${mision.icono} ${mision.titulo}
            </div>

            <div class="categoria-mision">
                ${mision.categoria}
            </div>

            <div class="dificultad-mision">
                ⚔️ ${mision.dificultad}
            </div>

            <div class="xp-mision">
                ⭐ ${mision.xp} XP
            </div>

            <div class="oquos-mision">
                💰 ${mision.oquos} Oquos
            </div>

        </div>
    `;
}
function abrirPergaminoMision(id){
    const mision = misiones.find(m => m.id === id);
    if(!mision) return;
    let botones = [];
    switch(mision.estado){
        case "disponible":
            botones.push({
                texto:"⚔️ Comenzar misión",
                accion:`iniciarMision(${mision.id}); cerrarPergamino();`
            });
            break;
        case "enCurso":
            botones.push({
                texto:"⏳ Continuar misión",
                accion:`cerrarPergamino();`
            });
            break;
        case "completada":
            botones.push({
                texto:"🏆 Completada",
                accion:`cerrarPergamino();`
            });
            break;
    }
    botones.push({
        texto:"❌ Cerrar",
        accion:"cerrarPergamino();"
    });
    mostrarPergamino({
        icono:mision.icono,
        titulo:mision.titulo,
        descripcion:`
            <p>${mision.descripcion}</p>
            <br>
            <strong>📍 Zona:</strong> ${mision.zona}<br>
            <strong>⚔️ Dificultad:</strong> ${mision.dificultad}<br>
            <strong>⭐ XP:</strong> ${mision.xp}<br>
            <strong>💰 Oquos:</strong> ${mision.oquos}
        `,
        botones:botones
    });
}