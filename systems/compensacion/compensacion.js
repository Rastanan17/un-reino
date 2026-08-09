function revisarCompensacion(){
    const jugador=cargarJugador();
    if(!jugador) return;
    if(jugador.compensacionPendiente){
        mostrarPergaminoEvento(
            "Los ladrones de Mírrafen",
            `
            Durante tu ausencia,
            unos malvados ladrones intentaron
            saquear el Reino.
            Nuestros cazadores fueron tras ellos
            y lograron recuperar parte de tus tesoros.
            El Reino te entrega esta compensación
            por las pérdidas sufridas.
            `,
            {xp:1000,oquos:1000}
        );
    }
}