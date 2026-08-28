// =======================================
// REINO DE MÍRRAFEN
// Archivo principal
// =======================================
// Interfaz de Usuario
// =======================================
function actualizarPerfil() {
    const jugador = cargarJugador();
    if(!jugador){
        console.log("No hay perfil activo");
        return;
    }
    // Nombre
    document.getElementById("playerName").textContent = jugador.nombre;
    // Avatar
    document.getElementById("playerAvatar").src = jugador.avatar;
    // Rango
    document.getElementById("playerRank").textContent = jugador.rango;
    // Nivel
    document.getElementById("playerLevel").textContent = jugador.nivel;
    // Oquos
    document.getElementById("playerCoins").textContent = jugador.oquos;
    // XP
    document.getElementById("playerXP").textContent = jugador.xp;
    // Próximo nivel
    document.getElementById("playerNextXP").textContent = jugador.xpNecesaria;
    // Barra experiencia
    const porcentaje = (jugador.xp / jugador.xpNecesaria) * 100;
    const barra = document.getElementById("xpFill");
    barra.style.width = porcentaje + "%";
    barra.classList.remove("levelUp");
    void barra.offsetWidth;
    barra.classList.add("levelUp");
}
// =======================================
// Mensaje del Reino
// (lo usaremos para reemplazar los alert())
// =======================================
function mostrarMensaje(titulo, mensaje){
    document.getElementById("modalTitulo").textContent = titulo || "Mírrafen";
    document.getElementById("modalTexto").innerHTML = (mensaje || "No hay información disponible en este momento.").replace(/\n/g, "<br>");
    document.getElementById("modal").classList.remove("oculto");
    const botonCerrar = document.getElementById("cerrarModal");
    if(botonCerrar){
        botonCerrar.onclick = () => {
            document.getElementById("modal").classList.add("oculto");
        };
    }
}
// =======================================
// 🎯 MOSTRAR DESAFÍO DE NPC
// =======================================
function mostrarDesafioNPC(npc, desafio){
    if(!desafio){
        console.warn("⚠️ No hay datos del desafío");
        return;
    }
    console.log("🎯 Mostrando desafío:", desafio);
    window.desafioNPCMostrado = desafio;
    const titulo = "🎯 DESAFÍO DE " + npc.nombre;
    let contenido = `
        <div class="desafio-npc">
            <div class="desafio-titulo">
                ${desafio.mision || "Nuevo desafío"}
            </div>
            <div class="desafio-datos">
                ${desafio.objeto_a_entregar ? `
                    <div class="desafio-linea">
                        📦 <strong>Objeto:</strong>
                        ${desafio.objeto_a_entregar}
                    </div>
                    `
                    : ""
                }
                ${
                    desafio.destinatario
                    ? `
                    <div class="desafio-linea">
                        👤 <strong>Destinatario:</strong>
                        ${desafio.destinatario}
                    </div>
                    `
                    : ""
                }
                ${
                    desafio.herramienta_requerida
                    ? `
                    <div class="desafio-linea">
                        ⛏️ <strong>Herramienta:</strong>
                        ${desafio.herramienta_requerida}
                    </div>
                    `
                    : ""
                }
            </div>
            ${
                desafio.descripcion
                ? `
                <div class="desafio-descripcion">
                    ${desafio.descripcion}
                </div>
                `
                : ""
            }
            <div class="desafio-recompensa">
                <div class="desafio-recompensa-titulo">
                    🏆 RECOMPENSA
                </div>
                ${
                    desafio.recompensa_intermedia
                    ? `
                    <div>
                        💰 ${desafio.recompensa_intermedia}
                    </div>
                    `
                    : ""
                }
                ${
                    desafio.picos_otorgados
                    ? `
                    <div>
                        ⛏️ +${desafio.picos_otorgados}
                        ${desafio.tipo_pico || "picos"}
                    </div>
                    `
                    : ""
                }
            </div>
            <div class="desafio-botones">
                <button
                    class="boton-desafio aceptar"
                    onclick="aceptarDesafioNPC(${desafio.id})">
                    ⚔️ Aceptar desafío
                </button>
                <button
                    class="boton-desafio cancelar"
                    onclick="cerrarDesafioNPC()">
                    Ahora no
                </button>
            </div>
        </div>
    `;
    document.getElementById("modalTitulo").textContent = titulo;
    document.getElementById("modalTexto").innerHTML = contenido;
    document.getElementById("modal").classList.remove("oculto");
}
// =======================================
// 🎯 ACEPTAR DESAFÍO NPC
// =======================================
function aceptarDesafioNPC(idDesafio){
    console.log("🎯 Aceptando desafío NPC:", idDesafio);
    // El desafío actualmente mostrado
    const datosGuardados = window.desafioNPCMostrado;
    if( !datosGuardados ||
        Number(datosGuardados.id) !== Number(idDesafio)
    ){
        console.error("❌ No se encontraron los datos del desafío:", idDesafio);
        return;
    }
    const desafioActivo = {
        ...datosGuardados,
        estado: "enCurso",
        fechaAceptado: new Date().toISOString()
    };
    localStorage.setItem("desafioNPCActivo", JSON.stringify(desafioActivo));
    console.log("📜 DESAFÍO NPC ACTIVO:", desafioActivo);
    document.getElementById("modal").classList.add("oculto");
    mostrarMensaje("🎯 DESAFÍO ACEPTADO",
        `Has aceptado el desafío:<br><br>
        <strong>${desafioActivo.mision}</strong><br><br>
        Debes entregar el encargo a <strong>${desafioActivo.destinatario}</strong>.`
    );
}
// =======================================
// 📦 MOSTRAR ENTREGA DE DESAFÍO NPC
// =======================================
function mostrarEntregaDesafioNPC(npc, desafio){
    if(!desafio){
        return;
    }
    console.log(
        "📦 Mostrando entrega del desafío:",
        desafio
    );
    const titulo =
        "📦 ENTREGA PARA " + npc.nombre;
    let contenido = `
        <div class="desafio-npc">
            <div class="desafio-titulo">
                ${desafio.mision || "Encargo"}
            </div>
            <div class="desafio-datos">
                ${
                    desafio.objeto_a_entregar
                    ? `
                    <div class="desafio-linea">
                        📦 <strong>Encargo:</strong>
                        ${desafio.objeto_a_entregar}
                    </div>
                    `
                    : ""
                }
            </div>
            <div class="desafio-descripcion">
                ${
                    desafio.dialogo_destinatario
                    || "He recibido el encargo."
                }
            </div>
            <div class="desafio-recompensa">
                <div class="desafio-recompensa-titulo">
                    🏆 RECOMPENSA
                </div>
                ${
                    desafio.recompensa_intermedia
                    ? `
                    <div>
                        🎁 ${desafio.recompensa_intermedia}
                    </div>
                    `
                    : ""
                }
                ${
                    desafio.picos_otorgados
                    ? `
                    <div>
                        ⛏️ +${desafio.picos_otorgados}
                        ${desafio.tipo_pico || "picos"}
                    </div>
                    `
                    : ""
                }
            </div>
            <div class="desafio-botones">
                <button
                    class="boton-desafio aceptar"
                    onclick="entregarDesafioNPC()">
                    📦 Entregar encargo
                </button>
                <button
                    class="boton-desafio cancelar"
                    onclick="cerrarDesafioNPC()">
                    Ahora no
                </button>
            </div>
        </div>
    `;
    document.getElementById("modalTitulo").textContent = titulo;
    document.getElementById("modalTexto").innerHTML = contenido;
    document.getElementById("modal").classList.remove("oculto");
}
// =======================================
// 🎁 ENTREGAR DESAFÍO NPC
// =======================================
function entregarDesafioNPC(){
    const datosGuardados =
        localStorage.getItem("desafioNPCActivo");
    if(!datosGuardados){
        console.error(
            "❌ No hay desafío NPC activo."
        );
        return;
    }
    let desafio;
    try{
        desafio = JSON.parse(datosGuardados);
    }catch(error){
        console.error(
            "❌ Error leyendo desafío activo:",
            error
        );
        return;
    }
    console.log(
        "🎁 ENTREGANDO DESAFÍO NPC:",
        desafio
    );
    // ===================================
    // 🎁 RECOMPENSA INTERMEDIA
    // ===================================
    const recompensa =
        desafio.recompensa_intermedia;
    // ===================================
    // ⛏️ PICOS
    // ===================================
    const picos =
        Number(desafio.picos_otorgados) || 0;
    const tipoPico =
        desafio.tipo_pico || "Picos";
    // ===================================
    // CERRAR MODAL ACTUAL
    // ===================================
    document
        .getElementById("modal")
        .classList
        .add("oculto");
    // ===================================
    // 🏆 CONSTRUIR MENSAJE
    // ===================================
    let mensaje = `
        ${desafio.dialogo_destinatario || "¡Gracias por traer el encargo!"}
        <br><br>
        <strong>🏆 RECOMPENSAS</strong>
    `;
    if(recompensa){
        mensaje += `
            <br>
            🎁 ${recompensa}
        `;
    }
    if(picos > 0){
        mensaje += `
            <br>
            ⛏️ +${picos} ${tipoPico}
        `;
    }
    // ===================================
    // 🏁 MARCAR COMPLETADO
    // ===================================
    desafio.estado = "completada";
    desafio.fechaCompletado =
        new Date().toISOString();
    // ===================================
    // GUARDAR ÚLTIMO RESULTADO
    // ===================================
    localStorage.setItem(
        "ultimoDesafioNPCCompletado",
        JSON.stringify(desafio)
    );
    // ===================================
    // ELIMINAR DESAFÍO ACTIVO
    // ===================================
    localStorage.removeItem(
        "desafioNPCActivo"
    );
    console.log(
        "🏁 DESAFÍO NPC COMPLETADO:",
        desafio
    );
    // ===================================
    // MOSTRAR RECOMPENSA
    // ===================================
    mostrarMensaje(
        "🏆 DESAFÍO COMPLETADO",
        mensaje
    );
}
// =======================================
// ❌ CERRAR DESAFÍO NPC
// =======================================
function cerrarDesafioNPC(){
    document.getElementById("modal").classList.add("oculto");
}