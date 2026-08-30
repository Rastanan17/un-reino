// =======================================
// PERGAMINO DEL REINO
// =======================================
const sonidoPergamino = new Audio("assets/sounds/paper_slide.mp3");
// ---------------------------------------
// Abrir pergamino
// ---------------------------------------
function mostrarPergamino(config){
    sonidoPergamino.currentTime = 1;
    sonidoPergamino.play();
    let botones = "";
    if(config.botones){
        config.botones.forEach(btn=>{
            botones += `
                <button class="btnPergamino" onclick="${btn.accion}">${btn.texto}</button>
            `;
        });
    }
    const html = `
        <div id="modalPergamino" class="pergamino-overlay">
            <div class="pergamino">
                <button class="cerrarPergamino" onclick="cerrarPergamino()">✖</button>
                <h2>${config.icono || "📜"} ${config.titulo}</h2>
                <div class="contenidoPergamino">${config.descripcion}</div>
                <div class="botonesPergamino">${botones}</div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML("beforeend", html);
}
// ---------------------------------------
// Cerrar
// ---------------------------------------
function cerrarPergamino(){
    const modal = document.getElementById("modalPergamino");
    if(modal){
        modal.remove();
    }
}