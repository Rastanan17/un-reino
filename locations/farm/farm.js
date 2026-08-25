// =======================================
// GRANJA DE MÍRRAFEN
// =======================================

// =======================================
// MOSTRAR GRANJA
// =======================================

function mostrarGranja(){
    establecerLugarTutorial("granja");
    const momento =
        obtenerMomentoDelDia();

    console.log(
        "🕐 Momento del día:",
        momento
    );

    const content = document.getElementById("content");

    if(!content) return;

    // ===================================
    // 🎵 MÚSICA DE LA GRANJA
    // ===================================

    reproducirMusica(
        "assets/sounds/ambiental_farm.mp3",
        0.35
    );

    // ===================================
    // CONTENIDO
    // ===================================

    content.innerHTML = `

        <section class="granja momento-${momento}">

            <!-- =================================
                 NAVEGACIÓN
            ================================== -->

            <!-- ARMERÍA -->
            <div class="granja-item armeria" onclick="reproducirSFX('open_place.wav'); entrarArmeriaDesdeGranja()">
                <img src="locations/farm/images/armeria.png" alt="Armería">
                <p class="name">Editar</p>
            </div>
            <!-- SALIDA → MAPA -->
            <div class="granja-item salida" onclick="reproducirSFX('exit.mp3'); irA('farm', 'map', mostrarMapaReino)">
                <img src="locations/farm/images/salida.png" alt="Salir al mapa">
                <p class="name">Salir</p>
            </div>
            <!-- =================================
                 CASA → MISIONES
            ================================== -->
            <div class="granja-item casa"
                onclick="reproducirSFX('open_place.wav'); mostrarMisionesGranja()">
                <img src="locations/farm/images/casa.png"
                    alt="Casa">
                <p class="name">Misiones</p>
            </div>
            <!-- =================================
                 CABALLOS
            ================================== -->
            <div class="granja-animal caballo1"
                onclick="sonidoAnimalGranja('caballo1')">
                <img src="locations/farm/images/caballo1.png"
                    alt="Caballo">
                <p class="name">Caballo</p>
            </div>
            <div class="granja-animal caballo2"
                onclick="sonidoAnimalGranja('caballo2')">
                <img src="locations/farm/images/caballo2.png"
                    alt="Caballo">
                <p class="name">Caballo</p>
            </div>
            <div class="granja-animal caballo3"
                onclick="sonidoAnimalGranja('caballo3')">
                <img src="locations/farm/images/caballo3.png"
                    alt="Caballo">
                <p class="name">Caballo</p>
            </div>
            <!-- =================================
                 CABRAS
            ================================== -->
            <div class="granja-animal cabra1"
                onclick="sonidoAnimalGranja('cabra1')">
                <img src="locations/farm/images/cabra1.png"
                    alt="Cabra">
                <p class="name">Cabra</p>
            </div>
            <div class="granja-animal cabra2"
                onclick="sonidoAnimalGranja('cabra2')">
                <img src="locations/farm/images/cabra2.png"
                    alt="Cabra">
                <p class="name">Cabra</p>
            </div>
            <div class="granja-animal cabra3"
                onclick="sonidoAnimalGranja('cabra3')">
                <img src="locations/farm/images/cabra3.png"
                    alt="Cabra">
                <p class="name">Cabra</p>
            </div>
            <!-- =================================
                 VACAS
            ================================== -->
            <div class="granja-animal vaca1"
                onclick="sonidoAnimalGranja('vaca1')">
                <img src="locations/farm/images/vaca1.png"
                    alt="Vaca">
                <p class="name">Vaca</p>
            </div>
            <div class="granja-animal vaca2"
                onclick="sonidoAnimalGranja('vaca2')">
                <img src="locations/farm/images/vaca2.png"
                    alt="Vaca">
                <p class="name">Vaca</p>
            </div>
            <div class="granja-animal vaca3"
                onclick="sonidoAnimalGranja('vaca3')">
                <img src="locations/farm/images/vaca3.png"
                    alt="Vaca">
                <p class="name">Vaca</p>
            </div>
            <!-- =================================
                 OVEJAS
            ================================== -->
            <div class="granja-animal oveja1" onclick="sonidoAnimalGranja('oveja1')">
                <img src="locations/farm/images/oveja1.png" alt="Oveja">
                <p class="name">Oveja</p>
            </div>
            <!-- =================================
                 GALLINAS
            ================================== -->
            <div class="granja-animal gallina1"
                onclick="sonidoAnimalGranja('gallina1')">
                <img src="locations/farm/images/gallina1.png"
                    alt="Gallina">
                <p class="name">Gallina</p>
            </div>
            <div class="granja-animal gallina2"
                onclick="sonidoAnimalGranja('gallina2')">
                <img src="locations/farm/images/gallina2.png"
                    alt="Gallina">
                <p class="name">Gallina</p>
            </div>
            <div class="granja-animal gallina3"
                onclick="sonidoAnimalGranja('gallina3')">
                <img src="locations/farm/images/gallina3.png"
                    alt="Gallina">
                <p class="name">Gallina</p>
            </div>
            <!-- =================================
                 POLLITOS
            ================================== -->
            <div class="granja-animal pollito1"
                onclick="sonidoAnimalGranja('pollito1')">
                <img src="locations/farm/images/pollito1.png"
                    alt="Pollito">
                <p class="name">Pollito</p>
            </div>
            <div class="granja-animal pollito2"
                onclick="sonidoAnimalGranja('pollito2')">
                <img src="locations/farm/images/pollito2.png"
                    alt="Pollito">
                <p class="name">Pollito</p>
            </div>
            <!-- =================================
                 CERDO
            ================================== -->
            <div class="granja-animal cerdo" onclick="sonidoAnimalGranja('cerdo1')">
                <img src="locations/farm/images/cerdo.png" alt="Cerdo">
                <p class="name">Cerdo</p>
            </div>
        </section>
    `;
}

// =======================================
// ARMERÍA DE LA GRANJA
// =======================================

function entrarArmeriaDesdeGranja(){

    origenArmeria = "granja";

    mostrarArmeria();

}

// =======================================
// MISIONES DE LA GRANJA
// =======================================

function mostrarMisionesGranja(){

    filtroZona = "Granja";

    mostrarMisiones();

}

// =======================================
// CASA
// =======================================

function tocarCasaGranja(){

    reproducirSonidoGranja(
        "assets/sounds/timbre.mp3"
    );

    mostrarMisionesGranja();

}

// =======================================
// SONIDOS DE ANIMALES
// =======================================
function sonidoAnimalGranja(animal){
    const sonidos = {
        caballo1: "assets/sounds/caballo1.mp3",
        caballo2: "assets/sounds/caballo2.mp3",
        caballo3:
            "assets/sounds/caballo3.mp3",
        cabra1:
            "assets/sounds/cabra1.mp3",
        cabra2:
            "assets/sounds/cabra2.mp3",
        cabra3:
            "assets/sounds/cabra3.mp3",
        cerdo1:
            "assets/sounds/cerdo1.mp3",
        gallina1:
            "assets/sounds/gallina1.mp3",
        gallina2:
            "assets/sounds/gallina2.mp3",
        gallina3:
            "assets/sounds/gallina3.mp3",
        oveja1:
            "assets/sounds/oveja1.mp3",
        oveja2:
            "assets/sounds/oveja2.mp3",
        oveja3:
            "assets/sounds/oveja3.mp3",
        pollito1:
            "assets/sounds/pollito1.mp3",
        pollito2:
            "assets/sounds/pollito2.mp3",
        vaca1:
            "assets/sounds/vaca1.mp3",
        vaca2:
            "assets/sounds/vaca2.mp3",
        vaca3:
            "assets/sounds/vaca3.mp3"
    };
    const sonido = sonidos[animal];
    if(!sonido){
        console.warn(
            "No existe sonido para:",
            animal
        );

        return;
    }

    reproducirSonidoGranja(sonido);

}

// =======================================
// REPRODUCIR SONIDO DE GRANJA
// =======================================

function reproducirSonidoGranja(ruta){

    const audio = new Audio(ruta);

    audio.volume = 0.8;

    audio.play().catch(error => {

        console.warn(
            "No se pudo reproducir el sonido:",
            error
        );

    });

    // Máximo 5 segundos
    setTimeout(() => {

        audio.pause();
        audio.currentTime = 0;

    }, 5000);

}