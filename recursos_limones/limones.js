let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");
const ALTURA_SUELO = 30;
const ALTURA_PERSONAJE = 60;
const ANCHO_PERSONAJE = 40;
let personajeX = canvas.width / 2;
let personajeY = canvas.height - (ALTURA_SUELO + ALTURA_PERSONAJE);
let limonX = canvas.width / 2 ;
let limonY = 0;
const ANCHO_LIMON = 20;
const ALTURA_LIMON = 20;
let intervaloCaida = 200;
let puntaje = 0;
let vidas = 3;
let intervalo;



function iniciar() {
    dibujarSuelo();
    dibujarPersonaje();
    intervalo = setInterval(bajarLimon, intervaloCaida);
    aparecerLimon();
}
function dibujarSuelo() {
    ctx.fillStyle = "green";
    ctx.fillRect(0, canvas.height - ALTURA_SUELO, canvas.width, ALTURA_SUELO);
}
function dibujarPersonaje() {
    ctx.fillStyle = "red";
    ctx.fillRect(personajeX , personajeY , ANCHO_PERSONAJE, ALTURA_PERSONAJE);
}
function moverIzquierda() {
    personajeX=personajeX - 10 ;
    actualizarPantalla();
    
}
function moverDerecha() {
    personajeX=personajeX + 10 ;
    actualizarPantalla();
    
}
function actualizarPantalla() {
    limpiarCanvas();
    dibujarPersonaje();
    dibujarSuelo();
    dibujarLimon();
    
}
function limpiarCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
}
function dibujarLimon() {
     ctx.fillStyle = "yellow";
    ctx.fillRect(limonX , limonY , ANCHO_LIMON, ALTURA_LIMON);
}
function bajarLimon() {
    limonY = limonY + 10;
    actualizarPantalla();
    dibujarLimon();
    detectarAtrapado();
    detectarSuelo();
}
function detectarAtrapado() {
    if (limonX + ANCHO_LIMON > personajeX && limonX < personajeX + ANCHO_PERSONAJE && limonY + ALTURA_LIMON > personajeY && limonY < personajeY + ALTURA_PERSONAJE && personajeX) {
       
         aparecerLimon();
        puntaje = puntaje + 1;
        mostrarEnSpan("txtPuntaje", puntaje);
        if (puntaje == 3) {
            intervaloCaida = intervaloCaida - 50;
           
        }
        if (puntaje == 6) {
            intervaloCaida = intervaloCaida - 50;
        } 
            if (puntaje == 10) {
            alert("GANASTE EL JUEGO FELICIDADES AHORA PUEDES HACER LA LIMONADA");
            clearInterval(intervalo);
        }
    }
    
}
function detectarSuelo() {
    if (limonY + ALTURA_LIMON == canvas.height - ALTURA_SUELO) {
        aparecerLimon();
        vidas=vidas - 1;
        mostrarEnSpan("txtVidas", vidas);
            if (vidas == 0) {
                alert("GAME OVER");
                clearInterval(intervalo);
            }
    }
}

function aparecerLimon() {
    limonX=generarAleatorio(0,canvas.width - ANCHO_LIMON);
    limonY=0;
    actualizarPantalla();
}

