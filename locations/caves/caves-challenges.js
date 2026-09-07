// =======================================
// CAVERNAS - DESAFÍOS DE ELIANA
// =======================================
const CLAVE_DESAFIO_CAVERNA_ACTIVO = "desafioNPCActivo";
const CLAVE_DESAFIOS_CAVERNA_COMPLETADOS = "desafiosNPCCompletados";
let desafioCavernaMostrado = null;
// =======================================
// OBTENER DESAFÍO ACTIVO
// =======================================
function obtenerDesafioCavernaActivo(){
    const guardado = localStorage.getItem(CLAVE_DESAFIO_CAVERNA_ACTIVO);
    if(!guardado){
        return null;
    }try{
        return JSON.parse(guardado);
    }catch(error){
        console.error("❌ Desafío de Cavernas inválido:", error);
        localStorage.removeItem(CLAVE_DESAFIO_CAVERNA_ACTIVO);
        return null;
    }
}
// =======================================
// GUARDAR DESAFÍO ACTIVO
// =======================================
function guardarDesafioCavernaActivo(desafio){
    localStorage.setItem(CLAVE_DESAFIO_CAVERNA_ACTIVO, JSON.stringify(desafio));
    console.log("💾 Desafío de Cavernas guardado:", desafio);
}
// =======================================
// ELIMINAR DESAFÍO ACTIVO
// =======================================
function eliminarDesafioCavernaActivo(){
    localStorage.removeItem(CLAVE_DESAFIO_CAVERNA_ACTIVO);
}
// =======================================
// OBTENER DESAFÍOS COMPLETADOS
// =======================================
function obtenerDesafiosCavernaCompletados(){
    try{
        return JSON.parse(localStorage.getItem(CLAVE_DESAFIOS_CAVERNA_COMPLETADOS)) || [];
    }catch(error){
        console.error("❌ Lista de desafíos completados inválida:", error);
        return [];
    }
}
// =======================================
// SABER SI YA FUE COMPLETADO
// =======================================
function desafioCavernaYaCompletado(desafio){
    const completados = obtenerDesafiosCavernaCompletados();
    const clave = `${desafio.proveedor_id || "forjadora"}_${desafio.id}`;
    return completados.some(item => item.clave === clave);
}
// =======================================
// INTERACCIÓN ESPECIAL DE NPC
// =======================================
async function procesarInteraccionEspecialNPC(npc){
    const desafioActivo = obtenerDesafioCavernaActivo();
    if(desafioActivo){
        const enCamino = desafioActivo.estado === "en_camino" || desafioActivo.estado === "enCurso";
        if(enCamino && desafioActivo.destinatario_id === npc.id){
            recibirEntregaDesafioCaverna(npc, desafioActivo);
            return true;
        }if(desafioActivo.estado === "entregado" && desafioActivo.proveedor_id === npc.id){
            finalizarDesafioCaverna(npc, desafioActivo);
            return true;
        }if(enCamino && npc.id === desafioActivo.proveedor_id){
            mostrarMensaje(npc.nombre, `El encargo sigue en marcha.<br><br>📦 Debes llevar <strong>${desafioActivo.objeto_a_entregar || "el encargo"}</strong> a <strong>${desafioActivo.destinatario || "su destinatario"}</strong>.`);
            return true;
        }
    }if(npc.id === "forjadora" && !desafioActivo){
        const ofrecido = await intentarOfrecerDesafioCaverna(npc);
        if(ofrecido){
            return true;
        }
    }
    return false;
}
function recibirEntregaDesafioCaverna(npc, desafio){
    const enCamino = desafio.estado === "en_camino" || desafio.estado === "enCurso";
    if(!enCamino){
        return false;
    }if(desafio.destinatario_id !== npc.id){
        return false;
    }if(desafio.recompensa_destinatario_entregada){
        mostrarMensaje(npc.nombre, "Ya recibí el encargo. Debes regresar con Eliana.");
        return true;
    }
    const recompensa = desafio.recompensa_destinatario || {};
    const xp = Number(recompensa.xp) || 0;
    const oquos = Number(recompensa.oquos) || 0;
    if(typeof sumarRecompensa !== "function"){
        console.error("❌ sumarRecompensa() no está disponible.");
        return false;
    }
    sumarRecompensa(xp, oquos);
    desafio.recompensa_destinatario_entregada = true;
    desafio.estado = "entregado";
    guardarDesafioCavernaActivo(desafio);
    mostrarMensaje(npc.nombre, `${desafio.dialogo_destinatario || "Recibí el encargo. Buen trabajo."}<br><br><strong>🏆 Recompensa</strong><br>⭐ +${xp} XP<br>💰 +${oquos} Oquos<br><br>↩️ Ahora regresa con <strong>${desafio.proveedor || "Eliana"}</strong>.`);
    console.log("📦 Entrega de Cavernas realizada:", desafio);
    return true;
}
// =======================================
// FINALIZAR DESAFÍO CON ELIANA
// =======================================
function finalizarDesafioCaverna(npc, desafio){
    if(!desafio || desafio.estado !== "entregado"){
        return false;
    }if(desafio.proveedor_id !== npc.id){
        return false;
    }if(desafio.recompensa_final_entregada || desafio.recompensa_eliana_entregada){
        console.warn("⚠️ La recompensa final ya fue entregada.");
        return true;
    }
    const recompensaEntregada = otorgarRecompensaFinalCaverna(desafio);
    if(!recompensaEntregada){
        console.error("❌ No se pudo entregar la recompensa final. El desafío seguirá activo.");
        mostrarMensaje(npc.nombre, "Tengo tu recompensa preparada, pero ocurrió un problema al entregarla. El encargo seguirá pendiente.");
        return true;
    }
    desafio.recompensa_final_entregada = true;
    desafio.recompensa_eliana_entregada = true;
    desafio.estado = "reclamado";
    registrarDesafioCavernaCompletado(desafio);
    eliminarDesafioCavernaActivo();
    const recompensa = desafio.recompensa_final || desafio.recompensa_eliana || {};
    const cantidad = Number(recompensa.picos) || 0;
    const tipo = recompensa.tipo_pico || "picos";
    mostrarMensaje(npc.nombre, `${desafio.dialogo_regreso || "Buen trabajo. Has cumplido el encargo."}<br><br><strong>⛏️ Recompensa final</strong><br>+${cantidad} ${tipo}`);
    console.log("✅ Desafío de Cavernas completado:", desafio);
    return true;
}
// =======================================
// ENTREGAR RECOMPENSA FINAL
// =======================================
function otorgarRecompensaFinalCaverna(desafio){
    const recompensa = desafio.recompensa_final || desafio.recompensa_eliana;
    if(!recompensa){
        console.error("❌ El desafío no tiene recompensa final.");
        return false;
    }
    const cantidad = Number(recompensa.picos) || 0;
    if(cantidad <= 0){
        console.error("❌ Cantidad de picos inválida:", cantidad);
        return false;
    }switch(recompensa.tipo_pico){
        case "Pico de minería":
        case "Pico de minerales":
            if(typeof agregarPicosMineral !== "function"){
                console.error("❌ agregarPicosMineral() no está disponible.");
                return false;
            }
            agregarPicosMineral(cantidad);
            break;
        case "Pico de fuego":
            if(typeof agregarPicosFuego !== "function"){
                console.error("❌ agregarPicosFuego() no está disponible.");
                return false;
            }
            agregarPicosFuego(cantidad);
            break;
        case "Pico de hielo":
            if(typeof agregarPicosHielo !== "function"){
                console.error("❌ agregarPicosHielo() no está disponible.");
                return false;
            }
            agregarPicosHielo(cantidad);
            break;
        default:
            console.error("❌ Tipo de pico desconocido:", recompensa.tipo_pico);
            return false;
    }
    console.log(`⛏️ Recompensa final entregada: +${cantidad} ${recompensa.tipo_pico}`);
    return true;
}
// =======================================
// REGISTRAR DESAFÍO COMPLETADO
// =======================================
function registrarDesafioCavernaCompletado(desafio){
    const completados = obtenerDesafiosCavernaCompletados();
    const clave = `${desafio.proveedor_id || "forjadora"}_${desafio.id}`;
    if(completados.some(item => item.clave === clave)){
        return;
    }
    completados.push({
        clave: clave,
        id: desafio.id,
        proveedor_id: desafio.proveedor_id,
        destinatario_id: desafio.destinatario_id,
        completado: Date.now()
    });
    localStorage.setItem(CLAVE_DESAFIOS_CAVERNA_COMPLETADOS, JSON.stringify(completados));
    console.log("📜 Desafío registrado como completado:", clave);
}
// =======================================
// INTENTAR OFRECER DESAFÍO
// =======================================
async function intentarOfrecerDesafioCaverna(npc){
    const datos = await cargarDatosNPC(npc.id);
    if(!datos || !Array.isArray(datos.desafios_cavernas) || datos.desafios_cavernas.length === 0){
        return false;
    }
    const disponibles = datos.desafios_cavernas.filter(desafio => {
        return !desafioCavernaYaCompletado(desafio);
    });
    if(disponibles.length === 0){
        return false;
    }
    // Conservamos la idea anterior:
    // Eliana no ofrece un desafío en cada diálogo.
    const ofrecer = Math.random() < 0.25;
    if(!ofrecer){
        return false;
    }
    const desafio = disponibles[Math.floor(Math.random() * disponibles.length)];
    mostrarDesafioCaverna(npc, desafio);
    console.log("🎯 Desafío de Cavernas seleccionado:", desafio);
    return true;
}
// =======================================
// MOSTRAR OFERTA
// =======================================
function mostrarDesafioCaverna(npc, desafio){
    if(!npc || !desafio){
        return;
    }if(obtenerDesafioCavernaActivo()){
        mostrarMensaje(npc.nombre, "Ya tienes un encargo en curso.");
        return;
    }
    desafioCavernaMostrado = desafio;
    const titulo = `🎯 DESAFÍO DE ${npc.nombre}`;
    const dialogo = desafio.dialogo_inicio || desafio.dialogo_eliana || desafio.descripcion || "";
    const objeto = desafio.objeto_a_entregar
        ? `<div class="desafio-linea">📦 <strong>Objeto:</strong> ${desafio.objeto_a_entregar}</div>`
        : "";
    const destinatario = desafio.destinatario
        ? `<div class="desafio-linea">👤 <strong>Destinatario:</strong> ${desafio.destinatario}</div>`
        : "";
    const contenido = `
        <div class="desafio-npc">
            <div class="desafio-titulo">${desafio.mision || "Nuevo encargo"}</div>
            <div class="desafio-descripcion">${dialogo}</div>
            <div class="desafio-datos">
                ${objeto}
                ${destinatario}
            </div>
            <div class="desafio-botones">
                <button class="boton-desafio aceptar" onclick="aceptarDesafioCavernaMostrado()">⚔️ Aceptar desafío</button>
                <button class="boton-desafio cancelar" onclick="cerrarOfertaDesafioCaverna()">Ahora no</button>
            </div>
        </div>
    `;
    const modal = document.getElementById("modal");
    const modalTitulo = document.getElementById("modalTitulo");
    const modalTexto = document.getElementById("modalTexto");
    if(!modal || !modalTitulo || !modalTexto){
        console.error("❌ No se encontró el modal principal de Mírrafen.");
        return;
    }
    modalTitulo.textContent = titulo;
    modalTexto.innerHTML = contenido;
    modal.classList.remove("oculto");
    console.log("📜 Oferta de desafío mostrada:", desafio);
}
// =======================================
// ACEPTAR DESAFÍO MOSTRADO
// =======================================
function aceptarDesafioCavernaMostrado(){
    if(!desafioCavernaMostrado){
        console.error("❌ No hay un desafío de Cavernas mostrado.");
        return;
    }
    if(obtenerDesafioCavernaActivo()){
        mostrarMensaje("Dear Eliana", "Ya tienes un encargo pendiente.");
        return;
    }
    const desafioActivo = {
        ...desafioCavernaMostrado,
        proveedor_id: desafioCavernaMostrado.proveedor_id || "forjadora",
        estado: "en_camino",
        recompensa_destinatario_entregada: false,
        recompensa_final_entregada: false
    };
    guardarDesafioCavernaActivo(desafioActivo);
    desafioCavernaMostrado = null;
    const modal = document.getElementById("modal");
    if(modal){
        modal.classList.add("oculto");
    }
    console.log("⛏️ Desafío de Cavernas aceptado:", desafioActivo);
}
// =======================================
// RECHAZAR / CERRAR OFERTA
// =======================================
function cerrarOfertaDesafioCaverna(){
    desafioCavernaMostrado = null;
    const modal = document.getElementById("modal");
    if(modal){
        modal.classList.add("oculto");
    }
    console.log("📜 Oferta de desafío cerrada.");
}