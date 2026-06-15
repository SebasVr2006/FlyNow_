import { VUELOS } from "../script.js";

const origen = localStorage.getItem('origen');
const destino = localStorage.getItem('destino');
const fechaIda = localStorage.getItem('fechaIda');
const fechaVuelta = localStorage.getItem('fechaVuelta');
const pasajeros = localStorage.getItem('pasajeros');
const clase = localStorage.getItem('clase');

function filtrarResultados() {
    VUELOS.filter(vuelo =>
        vuelo.origen.toLowerCase() === origen.toLowerCase() &&
        vuelo.destino.toLowerCase() === destino.toLowerCase()
    );

}

function mostrarResultados() {
    const container = document.querySelector('.vuelos');
    const resultados = filtrarResultados();
}