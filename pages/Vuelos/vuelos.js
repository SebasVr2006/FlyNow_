import { VUELOS } from "../script.js";

function generarCards() {
    const contenedor = document.getElementById("contenedor-vuelos");
    contenedor.innerHTML = "";

    const resultados = filtrarResultados();

    if (resultados.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron vuelos</p>';
        return;
    }

    resultados.forEach(vuelo => {
        const div = document.createElement("div");
        div.classList.add("imagen");

        const link = vuelo.destino === 'Argentina' ? './vuelosProvincias.html' : '#';

        div.innerHTML = `
            <a href="${link}">
                <img class="img-pais" src="../../assets/images/Paises/${vuelo.destino}.jpg" alt="${vuelo.destino}">
                <div class="info-card">
                    <h4 class="nom-pais">${vuelo.destino}</h4>
                    <p class="vuelos-desde">Vuelos desde</p>
                    <p><span class="precios">USD ${vuelo.precio}</span></p>
                </div>
            </a>
        `;

        contenedor.appendChild(div);
    });
}

function filtrarResultados() {
    // Se buscan todos los inputs que tengan de nombre "tipo", se verifica q estén checkeados y se devuelve su valor
    const tipoDeVuelo = document.querySelector('input[name=tipo]:checked')?.value;

    // Se buscan los elementos check-aeroline, se corrobora que estén checkeados y luego con el map se devuelve el valor de cada uno.
    const aerolineaSeleccionada = [...document.querySelectorAll('.check-aerolinea:checked')].map(e => e.value);

    const precioMaximo = parseInt(document.querySelector('#filtro-precio')?.value) ?? 5000;

    return VUELOS.filter(vuelo => {
        const filtroPrecio = vuelo.precio <= precioMaximo;

        let pasaFiltro = true;
        if (tipoDeVuelo === 'directo') {
            if (!vuelo.escalas) {
                pasaFiltro = true;
            } else {
                pasaFiltro = false;
            }
        }
        if (tipoDeVuelo === 'escala') {
            if (vuelo.escalas) {
                pasaFiltro = true;
            } else {
                pasaFiltro = false;
            }
        }

        if (tipoDeVuelo === 'todos') pasaFiltro = true;

        let coincideAerolinea = true;
        if (aerolineaSeleccionada.length > 0) {
            coincideAerolinea = aerolineaSeleccionada.includes(vuelo.aerolinea)
        }

        return pasaFiltro && coincideAerolinea && filtroPrecio;
    });
}

function inicializarFiltroPrecio() {
    const selectorRange = document.querySelector('#filtro-precio');
    const textoValorMax = document.querySelector('#valor-precio-max');

    if (!selectorRange || !textoValorMax) return;

    selectorRange.addEventListener('input', (e) => {
        const valorActual = parseInt(e.target.value);

        textoValorMax.textContent = valorActual;

        generarCards();
    })
}

document.querySelectorAll('input[name=tipo], .check-aerolinea').forEach(input => input.addEventListener('change', generarCards));

document.addEventListener('DOMContentLoaded', () => {
    generarCards(); inicializarFiltroPrecio();
});