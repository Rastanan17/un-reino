// =======================================
// CAVERNAS DE MÍRRAFEN
// =======================================
function mostrarCavernas(){
    establecerLugarTutorial("cuevas");
    console.log("🪨 Entrando a las Cavernas");
    const momento = "subterraneo";
    const content = document.getElementById("content");
    if(!content) return;
    content.innerHTML = `
        <section class="cavernas">
            <!-- ===================================
                 🪨 FONDO DE LAS CAVERNAS
            ==================================== -->
            <img class="cavernas-background" src="assets/images/backgrounds/caves_all.jpg"
                alt="Cavernas de Mírrafen">
            <!-- ===================================
                 💎 CUEVA DE MINERALES
            ==================================== -->
            <div class="zona-caverna minerales" onclick="abrirMinijuegoMineral()">
                <span>💎 Minerales</span>
            </div>
            <!-- ===================================
                 🔥 CUEVA DE FUEGO
            ==================================== -->
            <div class="zona-caverna fuego" onclick="proximamenteCaverna(this)">
                <img src="assets/images/ui/next_soon.png" alt="Próximamente">
            </div>
            <!-- ===================================
                 ❄️ CUEVA DE HIELO
            ==================================== -->
            <div class="zona-caverna hielo" onclick="proximamenteCaverna(this)">
                <img src="assets/images/ui/next_soon.png" alt="Próximamente">
            </div>
            <!-- ===================================
                 🛒 CARRO MINERO — SALIDA
            ==================================== -->
            <div class="caverna-salida" onclick="salirDeCavernas()">
                <img src="assets/images/items/anvil.png" alt="Salir de las Cavernas">
            </div>
        </section>
    `;
    // ===================================
    // NPC — DEAR ELIANA
    // ===================================
    mostrarNPCsEnLugar("Cavernas");
}
// =======================================
// 💎 ABRIR MINIJUEGO DE MINERALES
// =======================================
function abrirMinijuegoMineral(){
    console.log("💎 Abriendo Minijuego de Minerales");
    reproducirSFX("open_place.wav");
    irA("caves", "mineral", iniciarMinijuegoMineral);
}
// =======================================
// 🔥❄️ PRÓXIMAMENTE
// =======================================
function proximamenteCaverna(elemento){
    console.log("⚠️ Minijuego todavía no disponible");
    reproducirSFX("error.wav");
    if(!elemento) return;
    elemento.classList.remove("caverna-temblor");
    void elemento.offsetWidth;
    elemento.classList.add("caverna-temblor");
}
// =======================================
// 🛒 SALIR DE LAS CAVERNAS
// =======================================
function salirDeCavernas(){
    reproducirSFX("exit.mp3");
    irA("caves", "map", mostrarMapaReino);
}