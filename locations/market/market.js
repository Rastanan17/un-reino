// =======================================
// MERCADO DE MÍRRAFEN
// =======================================
// =======================================
// PRODUCTOS DEL MERCADO
// =======================================
let productosMercado = [];
let productoActual = null;
// =======================================
// DIÁLOGOS DE BORIN
// =======================================
let dialogosBorin = {};
// =======================================
// DESAFÍOS DEL MERCADO
// =======================================
let desafiosMercado = [];
let desafioActual = null;
// =======================================
// MOSTRAR MERCADO
// =======================================
function mostrarMercado(){
    establecerLugarTutorial("mercado");
    const jugador = cargarJugador();
    if(!jugador){
        console.warn("No hay un jugador activo.");
        return;
    }
    const momento = obtenerMomentoDelDia();
    console.log("🕐 Momento del día:", momento);
    const content = document.getElementById("content");
    if(!content){
        console.error("No se encontró #content.");
        return;
    }
    // ===================================
    // ESCENARIO DEL MERCADO
    // ===================================
    content.innerHTML = `
        <section class="mercado ${momento}">
            <!-- =================================
                 DIÁLOGO DE BORIN
            ================================== -->
            <div id="dialogoBorin" class="dialogo-borin"></div>
            <!-- =================================
                 SALIR AL MAPA
            ================================== -->
            <div class="mercado-salida" onclick="irAlMapaDesdeMercado()">
                <img src="assets/images/items/exit.png" alt="Salir">
            </div>
        </section>
    `;
    // ===================================
    // CARGAR DATOS DEL MERCADO
    // ===================================
    Promise.all([
        cargarProductosMercado(),
        cargarDialogosBorin(),
        cargarDesafiosMercado()
    ]).then(() => {
        cargarItemsMercado();
    });
}
// =======================================
// VOLVER AL MAPA
// =======================================
function irAlMapaDesdeMercado(){
    console.log("Saliendo del Mercado → Mapa");
    irA("market", "map", mostrarMapaReino);
}
// =======================================
// CARGAR PRODUCTOS DEL MERCADO
// =======================================
async function cargarProductosMercado(){
    try{
        const respuesta = await fetch(
            "locations/market/data/shop.json"
        );
        if(!respuesta.ok){
            throw new Error(`Error HTTP ${respuesta.status}`);
        }
        productosMercado = await respuesta.json();
        console.log("🏪 Productos del mercado cargados:", productosMercado
        );
        return productosMercado;
    }catch(error){
        console.error(
            "❌ Error al cargar shop.json:",
            error
        );
        productosMercado = [];
        return [];
    }
}
// =======================================
// CARGAR DIÁLOGOS DE BORIN
// =======================================
async function cargarDialogosBorin(){
    try{
        const respuesta = await fetch(
            "locations/market/data/dialogs_borin.json"
        );
        const datos = await respuesta.json();
        dialogosBorin = datos.dialogs_borin;
        console.log(
            "🧙‍♂️ Diálogos de Borin cargados:",
            dialogosBorin
        );
    }catch(error){
        console.error(
            "❌ Error cargando diálogos de Borin:",
            error
        );
    }
}
// =======================================
// OBTENER DIÁLOGO ALEATORIO DE BORIN
// =======================================
function obtenerDialogoBorin(categoria){
    const dialogos = dialogosBorin[categoria];
    if(!dialogos || dialogos.length === 0){
        console.warn(
            "⚠️ No existen diálogos para:",
            categoria
        );
        return "...";
    }
    const indice = Math.floor(
        Math.random() * dialogos.length
    );
    return dialogos[indice];
}
// =======================================
// SELECCIONAR ITEM DEL MERCADO
// =======================================
function seleccionarItemMercado(nombre){
    console.log(
        "🔎 Buscando producto para:",
        nombre
    );
    const producto = productosMercado.find(
        item => item.item === nombre
    );
    if(!producto){
        console.warn(
            "⚠️ No existe producto para el objeto:",
            nombre
        );
        return;
    }
    console.log(
        "🛒 PRODUCTO SELECCIONADO:",
        producto
    );
    // ===================================
    // DIÁLOGO DE BORIN
    // ===================================
    const dialogo = obtenerDialogoBorin(
        "seleccionar_item"
    );
    console.log(
        "🧙‍♂️ BORIN:",
        dialogo
    );
    const panel = document.getElementById(
        "dialogoBorin"
    );
    if(panel){
        panel.innerHTML = `
            <div class="borin-dialogo">
                <div class="borin-nombre">
                    🧙‍♂️ Borin
                </div>
                <div class="borin-texto">
                    ${dialogo}
                </div>
                <div class="producto-dialogo">
                    <div class="producto-nombre">
                        ${producto.icono} ${producto.nombre}
                    </div>
                    <div class="producto-precio">
                        🪙 ${producto.precio} Oquos
                    </div>
                </div>
                <div class="producto-botones">
                    <button
                        class="boton-conseguir"
                        onclick="conseguirProductoMercado(${producto.id})"
                    >
                        CONSEGUIR
                    </button>
                    <button
                        class="boton-volver"
                        onclick="cerrarProductoMercado()"
                    >
                        VOLVER
                    </button>
                </div>
           </div>
        `;
    }
}
// =======================================
// CONSEGUIR PRODUCTO
// =======================================
function conseguirProductoMercado(id){
    console.log(
        "🛒 CONSEGUIR PRODUCTO:",
        id
    );
    const producto = productosMercado.find(
        item => item.id === id
    );
    if(!producto){
       console.warn(
            "⚠️ No se encontró el producto:",
            id
        );
        return;
    }
    productoActual = producto;
    console.log(
        "🛒 PRODUCTO A CONFIRMAR:",
        producto
    );
    // ===================================
   // DIÁLOGO DE CONFIRMACIÓN
    // ===================================
    const dialogo = obtenerDialogoBorin(
       "confirmar_item"
    );
    const panel = document.getElementById(
        "dialogoBorin"
    );
    if(!panel){
        console.error(
            "❌ No se encontró #dialogoBorin."
        );
        return;
    }
    panel.innerHTML = `
        <div class="borin-dialogo">
            <div class="borin-nombre">
               🧙‍♂️ Borin
           </div>
            <div class="borin-texto">
               ${dialogo}
           </div>
            <div class="producto-dialogo">
                <div class="producto-nombre">
                   ${producto.icono}
                   ${producto.nombre}
               </div>
                <div class="producto-precio">
                   🪙 ${producto.precio} Oquos
               </div>
            </div>
            <div class="producto-botones">
                <button
                   class="boton-conseguir"
                   onclick="confirmarItemMercado(${producto.id})"
               >
                   SÍ, QUIERO
               </button>
                <button
                   class="boton-volver"
                   onclick="rechazarOfertaMercado(${producto.id})"
               >
                   NO, VOLVER
               </button>
            </div>
        </div>
    `;
}
// =======================================
// RECHAZAR OFERTA
// =======================================
function rechazarOfertaMercado(id){
    console.log(
        "❌ OFERTA RECHAZADA:",
        id
    );
    const producto = productosMercado.find(
       item => item.id === id
   );
    if(!producto){
        console.warn(
           "⚠️ No se encontró el producto:",
           id
       );
        return;
    }
    const dialogo = obtenerDialogoBorin(
       "rechazar_oferta"
   );
    const panel = document.getElementById(
       "dialogoBorin"
   );
    if(!panel){
       return;
   }
    panel.innerHTML = `
        <div class="borin-dialogo">
            <div class="borin-nombre">
               🧙‍♂️ Borin
           </div>
            <div class="borin-texto">
               ${dialogo}
           </div>
            <div class="producto-botones">
                <button
                   class="boton-conseguir"
                   onclick="ofrecerOtroItemMercado()"
               >
                   VER OTRA COSA
               </button>
            </div>
        </div>
    `;
}
// =======================================
// OFRECER OTRO ITEM
// =======================================
function ofrecerOtroItemMercado(){
    console.log(
       "🔄 BORIN OFRECE OTRO ITEM"
   );
    const dialogo = obtenerDialogoBorin(
       "ofrecer_otro_item"
   );
    const panel = document.getElementById(
       "dialogoBorin"
   );
    if(!panel){
       return;
   }
    panel.innerHTML = `
        <div class="borin-dialogo">
            <div class="borin-nombre">
               🧙‍♂️ Borin
           </div>
            <div class="borin-texto">
               ${dialogo}
           </div>
            <div class="producto-botones">
                <button
                   class="boton-volver"
                   onclick="cerrarProductoMercado()"
               >
                   VOLVER A MIRAR
               </button>
            </div>
        </div>
    `;
}
// =======================================
// CONFIRMAR ITEM DEL MERCADO
// =======================================
function confirmarItemMercado(id){
    console.log(
       "✅ ITEM CONFIRMADO:",
       id
   );
    const producto = productosMercado.find(
       item => item.id === id
   );
    if(!producto){
        console.warn(
           "⚠️ No se encontró el producto:",
           id
       );
        return;
    }
    console.log(
       "🛒 ITEM CONFIRMADO:",
       producto
   );
    // ===================================
   // VERIFICAR OQUOS
    // ===================================
    const jugador = cargarJugador();
    if(!jugador){
        console.warn(
           "⚠️ No se encontró el jugador activo."
        );
        return;
    }
    if(jugador.oquos < producto.precio){
        console.log(
           "🪙 OQUOS INSUFICIENTES:",
           jugador.oquos,
           "/",
           producto.precio
       );
        const dialogo = obtenerDialogoBorin(
           "sin_oquos"
       );
        const panel = document.getElementById(
           "dialogoBorin"
       );
        if(!panel){
           return;
       }
        panel.innerHTML = `
            <div class="borin-dialogo">
                <div class="borin-nombre">
                   🧙‍♂️ Borin
               </div>
                <div class="borin-texto">
                   ${dialogo}
               </div>
                <div class="desafio-opciones">
                    <button
                       class="btn-desafio"
                       onclick="indecisoMercado()"
                   >
                       👀 SEGUIR MIRANDO
                   </button>
                    <button
                       class="btn-desafio"
                       onclick="salirDelMercado()"
                   >
                       🚪 SALIR
                   </button>
                </div>
            </div>
        `;
        return;
    }
    // ===================================
   // BORIN — ELEGIR TIPO DE DESAFÍO
   // ===================================
    const dialogo = obtenerDialogoBorin(
       "elegir_tipo_desafio"
   );
    const panel = document.getElementById(
       "dialogoBorin"
   );
    if(!panel){
       return;
   }
    panel.innerHTML = `
        <div class="borin-dialogo">
            <div class="borin-nombre">
               🧙‍♂️ Borin
           </div>
            <div class="borin-texto">
               ${dialogo}
           </div>
            <div class="desafio-opciones">
                <button
                   class="btn-desafio"
                   onclick="elegirDesafioPregunta(${producto.id})"
               >
                   🧠 Responder
               </button>
                <button
                   class="btn-desafio"
                    onclick="elegirDesafioAccion(${producto.id})"
               >
                   🎯 Desafío
               </button>

          </div>

       </div>
    `;
}
// =======================================
// INDECISO
// =======================================
function indecisoMercado(){
    console.log(
       "🤔 JUGADOR INDECISO"
   );
    const dialogo = obtenerDialogoBorin(
       "indeciso_pensando"
   );
    const panel = document.getElementById(
       "dialogoBorin"
   );

   if(!panel){
       return;
   }
    panel.innerHTML = `
        <div class="borin-dialogo">
            <div class="borin-nombre">
               🧙‍♂️ Borin
           </div>
            <div class="borin-texto">
                ${dialogo}
           </div>
            <div class="desafio-opciones">
                <button
                   class="btn-desafio"
                   onclick="ofrecerOtroItemMercado()"
               >
                    👀 VER OTRO
               </button>
                <button
                    class="btn-desafio"
                   onclick="salirDelMercado()"
               >
                   🚪 SALIR
                </button>
            </div>
        </div>
    `;
}
// =======================================
// ELEGIR DESAFÍO — PREGUNTA
// =======================================
function elegirDesafioPregunta(id){
    console.log(
       "🧠 TIPO DE DESAFÍO: PREGUNTA",
       id
    );
    const dialogo = obtenerDialogoBorin(
       "opcion_responder"
   );
    const desafios = desafiosMercado.filter(
        desafio => desafio.tipo === "responder"
   );
    if(desafios.length === 0){
        console.warn(
            "⚠️ No hay desafíos de pregunta disponibles."
       );
        return;
    }
    const desafio =
       desafios[
            Math.floor(
               Math.random() * desafios.length
           )
       ];
    console.log(
        "❓ DESAFÍO DE PREGUNTA SELECCIONADO:",
       desafio
   );
    mostrarDesafioPregunta(
       desafio,
        dialogo
   );
}
// =======================================
// ELEGIR DESAFÍO — ACCIÓN
// =======================================
function elegirDesafioAccion(id){
    console.log(
       "🎯 TIPO DE DESAFÍO: ACCIÓN",
       id
   );
    const dialogo = obtenerDialogoBorin(
        "opcion_desafio"
   );
    const desafios = desafiosMercado.filter(
       desafio => desafio.tipo === "desafio"
    );
    if(desafios.length === 0){
        console.warn(
           "⚠️ No hay desafíos de acción disponibles."
       );

       return;
    }
    const desafio =
       desafios[
           Math.floor(
               Math.random() * desafios.length
            )
       ];
    const panel = document.getElementById(
       "dialogoBorin"
   );

   if(!panel){
       return;
    }
    panel.innerHTML = `
        <div class="borin-dialogo">
            <div class="borin-nombre">
               🧙‍♂️ Borin
           </div>

           <div class="borin-texto">
               ${dialogo}
           </div>
            <div class="desafio-panel">

               <div class="desafio-titulo">
                   🎯 DESAFÍO
               </div>

               <div class="desafio-texto">
                   ${desafio.texto}
                </div>
                <button
                   class="btn-desafio-completar"
                   onclick="completarDesafioMercado('${desafio.id}', ${id})"
               >
                    ${desafio.boton_completar}
               </button>
            </div>
        </div>
    `;
}
// =======================================
// COMPLETAR DESAFÍO
// =======================================
function completarDesafioMercado(
    desafioId,
    productoId
){
    console.log(
       "🎯 DESAFÍO COMPLETADO:",
       desafioId
   );
    const desafio = desafiosMercado.find(
       item => item.id === desafioId
    );
    if(!desafio){
        console.warn(
           "⚠️ No se encontró el desafío:",
           desafioId
        );
        return;
    }
    const dialogo = obtenerDialogoBorin(
       "desafio_completado"
   );
    const panel = document.getElementById(
        "dialogoBorin"
   );
    if(!panel){
       return;
   }
    panel.innerHTML = `
        <div class="borin-dialogo">

           <div class="borin-nombre">
               🧙‍♂️ Borin
           </div>

           <div class="borin-texto">
               ${dialogo}
           </div>

           <div class="desafio-exito">
               🎉 ¡DESAFÍO SUPERADO!
           </div>
        </div>
    `;

   // ===================================
    // EFECTUAR COMPRA
   // ===================================
    efectuarCompraMercado();
}
// =======================================
// EFECTUAR COMPRA
// =======================================
function efectuarCompraMercado(){
    console.log(
       "🪙 EFECTUANDO COMPRA"
   );

   if(!productoActual){
        console.warn(
            "⚠️ No existe producto actual."
       );
        return;
    }
    const jugador = cargarJugador();
   if(!jugador){
        console.warn(
           "⚠️ No se encontró el jugador activo."
       );
        return;
    }
    const precio = productoActual.precio;
   console.log(
       "🪙 SALDO ANTES:",
       jugador.oquos
   );
    console.log(
        "🪙 PRECIO:",
       precio
   );
    // ===================================
   // DESCONTAR OQUOS
    // ===================================
    jugador.oquos -= precio;
    guardarJugador(jugador);
    actualizarPerfil();
   console.log(
       "🪙 OQUOS DESPUÉS:",
        jugador.oquos
   );
    // ===================================
    // DIÁLOGO COMPRA EXITOSA
   // ===================================
    const dialogo = obtenerDialogoBorin(
        "compra_exitosa"
    );
    const panel = document.getElementById(
       "dialogoBorin"
   );
    if(!panel){
       return;
    }
    panel.innerHTML = `
        <div class="borin-dialogo">
            <div class="borin-nombre">
               🧙‍♂️ Borin
           </div>
            <div class="borin-texto">
                ${dialogo}
           </div>
            <div class="producto-conseguido">
               🎁 ¡PRODUCTO CONSEGUIDO!
            </div>
            <div class="compra-resumen">
                💸 Gastaste:
               <strong>${precio} Oquos</strong>
                <br>
                🪙 Te quedan:
                <strong>${jugador.oquos} Oquos</strong>
            </div>
            <div class="desafio-opciones">
                <button
                   class="btn-desafio"
                    onclick="volverAElegirProducto()"
               >
                   🛒 Elegir otro
               </button>
                <button
                   class="btn-desafio"
                    onclick="salirDelMercado()"
               >
                   🚪 Salir
               </button>
            </div>

       </div>
    `;
}
// =======================================
// MOSTRAR PREGUNTA
// =======================================
function mostrarDesafioPregunta(
    desafio,
    dialogo
){
    console.log(
        "❓ MOSTRANDO PREGUNTA:",
        desafio
    );
    const panel = document.getElementById(
       "dialogoBorin"
   );
    if(!panel){
        console.error(
            "No se encontró #dialogoBorin."
       );
        return;
    }

   panel.innerHTML = `
        <div class="borin-dialogo">
            <div class="borin-nombre">
               🧙‍♂️ Borin, el mercader
           </div>

           <div class="borin-texto">
               ${dialogo}
           </div>
           <div class="desafio-panel">
                <div class="desafio-titulo">
                  🧠 PREGUNTA
              </div>
              <div class="desafio-texto">
                   ${desafio.texto}
               </div>
                <div class="desafio-opciones">
                    ${desafio.opciones.map(
                       (opcion, indice) => `
                        <button
                          class="boton-respuesta"
                           onclick="responderDesafio(${indice})"
                       >
                           ${opcion}
                       </button>
                   `
                   ).join("")}
                </div>
            </div>
        </div>
    `;
    desafioActual = desafio;
}
// =======================================
// RESPONDER DESAFÍO
// =======================================
function responderDesafio(indice){
    if(!desafioActual){
        console.warn(
           "⚠️ No hay desafío activo."
       );
        return;
    }
   console.log(
       "🧠 RESPUESTA ELEGIDA:",
       indice
   );
   // ===================================
   // RESPUESTA INCORRECTA
   // ===================================
    if(indice !== desafioActual.respuesta_correcta){
        console.log(
          "❌ RESPUESTA INCORRECTA:",
           desafioActual.id
       );
        const dialogo = obtenerDialogoBorin(
           "respuesta_incorrecta"
       );
        const panel = document.getElementById(
           "dialogoBorin"
      );
        if(panel){
            panel.innerHTML = `
                <div class="borin-dialogo">
                    <div class="borin-nombre">
                       🧙‍♂️ Borin
                  </div>
                    <div class="borin-texto">
                       ${dialogo}
                   </div>
                    <button
                       class="boton-respuesta"
                      onclick="mostrarDesafioPregunta(
                           desafioActual,
                           obtenerDialogoBorin('opcion_responder')
                      )"
                   >
                       Intentar otra vez
                   </button>
                </div>
            `;
       }
        return;
    }
    // ===================================
   // RESPUESTA CORRECTA
   // ===================================
   console.log(
       "✅ RESPUESTA CORRECTA:",
       desafioActual.id
   );
    efectuarCompraMercado();
}
// =======================================
// VOLVER A ELEGIR PRODUCTO
// =======================================
function volverAElegirProducto(){
    console.log(
       "🔄 VOLVER A ELEGIR PRODUCTO"
   );
    const dialogo = obtenerDialogoBorin(
        "volver_a_elegir"
   );
    const panel = document.getElementById(
       "dialogoBorin"
    );
    if(!panel){
       return;
   }
    panel.innerHTML = `
        <div class="borin-dialogo">
            <div class="borin-nombre">
               🧙‍♂️ Borin
           </div>
            <div class="borin-texto">
                ${dialogo}
           </div>
        </div>
    `;
}
// =======================================
// SALIR DEL MERCADO
// =======================================
function salirDelMercado(){
    console.log(
       "🚪 SALIR DEL MERCADO"
   );
    const dialogo = obtenerDialogoBorin(
       "salir_mercado"
   );
    const panel = document.getElementById(
       "dialogoBorin"
   );
    if(!panel){
       return;
   }
  panel.innerHTML = `
       <div class="borin-dialogo">
            <div class="borin-nombre">
               🧙‍♂️ Borin
            </div>
            <div class="borin-texto">
               ${dialogo}
           </div>
        </div>
    `;
}
// =======================================
// CERRAR PRODUCTO
// =======================================
function cerrarProductoMercado(){
    const panel = document.getElementById(
       "dialogoBorin"
   );
    if(!panel){
       return;
   }
    panel.innerHTML = "";
}
// =======================================
// MOSTRAR ITEMS DEL MERCADO
// =======================================
function cargarItemsMercado(){
    const mercado = document.querySelector(
       ".mercado"
   );
    if(!mercado){
        console.error(
           "No se encontró .mercado"
       );
       return;
    }
    // ===================================
   // CREAR CONTENEDOR
   // ===================================
    const contenedor = document.createElement(
       "div"
    );
    contenedor.id = "itemsMercado";
    mercado.appendChild(contenedor);
    // ===================================
   // ITEMS DISPONIBLES
   // ===================================
    const items = [
        // Los bloqueados quedan
       // para una etapa posterior.
        /* los que estan bloqueados los dejamos para mas adelante*/
       "arbol",
       /*"arroz",*/
       /*"balanza",*/
       /*"barril",*/
       "bici",
       "burguer",
       "carta",
       "castillo",
       /*"chancho",*/
       "chocolate",
       "coca",
       /*"cofre1",*/
       /*"cofre2",*/
       "cometa",
       "compu",
        /*"flor1",*/
        /*"flor2",*/
        /*"flor3",*/
        /*"flor4",*/
        "galleta",
        "helado",
        "joystick",
        "libro",
        /*"libro1",*/
        /*"libro2",*/
        /*"luces1",*/
        "luces2",
        "mando",
        "manos",
        "mapaBosque",
        "mapaLeon",
        "mcBurguer",
        /*"monedas",*/
        "musica",
        "natacion",
        /*"pan",*/
        "pelota",
        "pintura",
        "pizza",
        "pochoclo",
        /*"pluma",*/
        /*"pollo",*/
        /*"queso",*/
        "sombrilla",
        /*"sopa",*/
        /*"tela",*/
        "tele",
        "varita",
        "vaso",
        "waffle"
    ];
    // ===================================
    // CREAR CADA ITEM
    // ===================================
    items.forEach(nombre => {
        // ===================================
       // BUSCAR PRODUCTO
       // ===================================
        const producto = productosMercado.find(
           item => item.item === nombre
       );
        if(!producto){
            console.warn(
               "⚠️ No se encontró producto para:",
               nombre
           );
            return;
        }
        // ===================================
       // CONTENEDOR DEL ITEM
       // ===================================
        const itemContenedor =
           document.createElement("div");
        itemContenedor.className =
           `item-mercado-contenedor item-${nombre}`;
        // ===================================
       // IMAGEN
       // ===================================
        const img =
           document.createElement("img");
        img.src =
           `locations/market/images/${nombre}.png`;
        img.className =
           "item-mercado";
        img.alt =
           nombre;
        // ===================================
       // INTERACCIÓN
        // ===================================
        itemContenedor.addEventListener(
           "click",
           () => {
                seleccionarItemMercado(nombre);
            }
       );
        // ===================================
       // ARMAR ITEM
       // ===================================

       itemContenedor.appendChild(img);
        contenedor.appendChild(
           itemContenedor
       );
    });
}
// =======================================
// CARGAR DESAFÍOS
// =======================================
async function cargarDesafiosMercado(){
    try{
        const respuesta = await fetch(
           "locations/market/data/desafios.json"
       );
        if(!respuesta.ok){
            throw new Error(
               `Error HTTP ${respuesta.status}`
           );
        }
        const datos =
          await respuesta.json();
       desafiosMercado =
          datos.desafios;
       console.log(
           "🎯 Desafíos cargados:",
           desafiosMercado
       );
        return desafiosMercado;
    }catch(error){
        console.error(
           "❌ Error cargando desafíos:",
           error
       );
        desafiosMercado = [];
        return [];
    }
}