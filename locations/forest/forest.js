// =======================================
// BOSQUE DE MÍRRAFEN
// =======================================

function mostrarBosque(){

    console.log("🌲 Entrando al Bosque");

    const content =
        document.getElementById("content");

    if(!content) return;

    content.innerHTML = `

        <div class="bosque">

        </div>

    `;

}