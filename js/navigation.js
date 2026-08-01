// ===================================
// NAVEGACIÓN DEL REINO
// ===================================
const content = document.getElementById("content");
document.getElementById("btnMisiones").addEventListener("click", mostrarMisionesPagina);
document
    .getElementById("btnMapa")
    .addEventListener("click", mostrarMapaReino);document.getElementById("btnMercado").addEventListener("click", mostrarMercado);
document.getElementById("btnLogros").addEventListener("click", mostrarLogros);

// ----------------------------
function mostrarMisionesPagina(){
    mostrarMisiones();
}

// ----------------------------
function mostrarMapa() {
    mostrarMapaReino();
}

// ----------------------------
function mostrarMercado(){
    mostrarMercadoDelReino();
}

// ----------------------------
function mostrarLogros(){
    content.innerHTML = `
        <h2>🏆 Logros</h2>
        <p>Aquí aparecerán las medallas del explorador.</p>
    `;
}