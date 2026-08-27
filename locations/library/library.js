// =======================================
// BIBLIOTECA DE MÍRRAFEN
// =======================================
// =======================================
// SONIDOS DE LA BIBLIOTECA
// =======================================
let musicaBiblioteca = null;
// =======================================
// MOSTRAR BIBLIOTECA
// =======================================
function mostrarBiblioteca(){
    establecerLugarTutorial("biblioteca");
    console.log("📚 Entrando a la Biblioteca");
    const momento = obtenerMomentoDelDia();
    console.log("🕐 Momento del día:", momento);
    const content = document.getElementById("content");
    if(!content) return;
    content.innerHTML = `
        <div class="biblioteca">
            <!-- ==========================
                 📚 FONDO
            =========================== -->
            <img id="libraryBackground"
                class="library-background"
                src="assets/images/backgrounds/library/library_${momento}.jpg"
                alt="Biblioteca de Mírrafen">
            <!-- ==========================
                 📜 VENTANA — MISIONES
            =========================== -->
            <div class="zona-biblioteca misiones"
                onclick="abrirMisionesBiblioteca()">
                📜 Misiones
            </div>
            <!-- ==========================
                 📖 LIBROS
            =========================== -->
            <div class="zona-biblioteca libros"
                onclick="verLibros()">
                📖 Libros
            </div>
            <!-- ==========================
                 🗺️ SABIDURÍA
            =========================== -->
            <div class="zona-biblioteca sabiduria"
                onclick="verSabiduria()">
                🧠 Sabiduría
            </div>
            <!-- ==========================
                 🚪 SALIDA
            =========================== -->
            <div class="zona-biblioteca salida"
                onclick="salirDeBiblioteca()">
                ← Salir
            </div>
        </div>
    `;
    // ===================================
    // NPCs
    // ===================================
    mostrarNPCsEnLugar("Biblioteca");
    // ===================================
    // SONIDO
    // ===================================
    iniciarSonidoBiblioteca();
}
// =======================================
// 📜 ABRIR MISIONES
// =======================================
function abrirMisionesBiblioteca(){
    reproducirSFX("open_place.wav");
    filtroZona = "Biblioteca";
    detenerSonidoBiblioteca();
    mostrarMisiones();
}
// =======================================
// 📖 VER LIBROS
// =======================================
function verLibros(){
    console.log("📖 Abriendo Libros");
    reproducirSFX("open_place.wav");
    detenerSonidoBiblioteca();
    // Próximamente
}
// =======================================
// 🧠 VER SABIDURÍA
// =======================================
function verSabiduria(){
    console.log("🧠 Abriendo Sabiduría");
    reproducirSFX("open_place.wav");
    detenerSonidoBiblioteca();
    // Próximamente
}
// =======================================
// 🚪 SALIR DE LA BIBLIOTECA
// =======================================
function salirDeBiblioteca(){
    reproducirSFX("exit.mp3");
    detenerSonidoBiblioteca();
    irA("library", "map", mostrarMapaReino);
}
// =======================================
// 🔊 INICIAR SONIDO
// =======================================
function iniciarSonidoBiblioteca(){
    console.log("📚 Iniciando sonidos de la Biblioteca");
    detenerSonidoBiblioteca();
    // -----------------------------------
    // AMBIENTE
    // -----------------------------------
    musicaBiblioteca = new Audio("assets/sounds/ambient_library.mp3");
    musicaBiblioteca.loop = true;
    musicaBiblioteca.volume = 0.35;
    musicaBiblioteca.play().catch(error => {
        console.log("📚 El sonido de la Biblioteca necesita interacción:", error);
    });
}
// =======================================
// 🔇 DETENER SONIDO
// =======================================
function detenerSonidoBiblioteca(){
    if(musicaBiblioteca){
        musicaBiblioteca.pause();
        musicaBiblioteca.currentTime = 0;
        musicaBiblioteca = null;
    }
}