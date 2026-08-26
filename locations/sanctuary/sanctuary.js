// =======================================
// SANTUARIO DE MÍRRAFEN
// =======================================

function mostrarSantuario(){

    establecerLugarTutorial("santuario");

    const momento = obtenerMomentoDelDia();

    console.log("⛪ SANTUARIO");
    console.log("🕐 Momento del día:", momento);

    const content = document.getElementById("content");

    if(!content){

        console.error("❌ No se encontró #content");

        return;

    }

    // ===================================
    // ESCENARIO
    // ===================================

    content.innerHTML = `

        <section class="santuario momento-${momento}">

            <!-- =================================
                 SALIDA → MAPA
            ================================== -->

            <div class="santuario-salida"
                onclick="reproducirSFX('exit.mp3'); irA('sanctuary', 'map', mostrarMapaReino)">

                <img
                    src="../../assets/images/items/exit.png"
                    alt="Salir al mapa">

            </div>

        </section>

    `;

    // ===================================
    // CARGAR NPCs DEL SANTUARIO
    // ===================================

    mostrarNPCsEnLugar("Santuario");

}