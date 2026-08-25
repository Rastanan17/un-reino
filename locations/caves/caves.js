// =======================================
// CAVERNAS DE MÍRRAFEN
// =======================================

function mostrarCavernas(){
establecerLugarTutorial("cuevas");
    console.log("🪨 Entrando a las Cavernas");

    const content =
        document.getElementById("content");

    if(!content) return;

    content.innerHTML = `

        <section class="cavernas">

            <img
                class="cavernas-proximamente"
                src="assets/images/ui/next_soon.png"
                alt="Próximamente"
                onclick="salirDeCavernas()">

        </section>

    `;

}

// =======================================
// SALIR DE LAS CAVERNAS
// =======================================

function salirDeCavernas(){

    irA(
        "caves",
        "map",
        mostrarMapaReino
    );

}