import { VUELOS } from "../script.js";

const origen = localStorage.getItem('origen');
const destino = localStorage.getItem('destino');
const fechaIda = localStorage.getItem('fechaIda');
const fechaVuelta = localStorage.getItem('fechaVuelta');
const pasajeros = localStorage.getItem('pasajeros');
const clase = localStorage.getItem('clase');

function filtrarResultados() {
    const tipoDeVuelo = document.querySelector('input[name=tipo]:checked')?.value;
    const aerolineaSeleccionada = [...document.querySelectorAll('.check-aerolinea:checked')].map(e => e.value);

    return VUELOS.filter(vuelo => {
        const coincidenciaRuta = vuelo.origen.toLowerCase() === origen.toLowerCase() && vuelo.destino.toLowerCase() === destino.toLowerCase();

        let tieneEscala = true;
        if (tipoDeVuelo === 'directo') tieneEscala = !vuelo.escalas;
        if (tipoDeVuelo === 'escala') tieneEscala = vuelo.escalas;

        let coincideAerolinea = true;
        if (aerolineaSeleccionada.length > 0) {
            coincideAerolinea = aerolineaSeleccionada.includes(vuelo.aerolinea)
        }

        return coincidenciaRuta && tieneEscala && coincideAerolinea;
    });
}

function mostrarResultados() {
    const container = document.querySelector('.vuelos');
    const resultados = filtrarResultados();

    container.innerHTML = ''

    if (resultados.length === 0) {
        container.innerHTML = '<p>No se encontraron vuelos</p>'
        return;
    }

    resultados.forEach(vuelo => {
        const div = document.createElement('div')
        div.className = 'vue';

        div.innerHTML = `
                <div class="imagen-aerolinea">
                    <img src="../../assets/images/Aerolineas/${vuelo.codeAerolinea}.jpg" alt="${vuelo.aerolinea}">
                </div>
                <div class="titulo-vue" >
                    <h1>${vuelo.origen} a ${vuelo.destino}</h1>
                    <button>Seleccionar</button>
                </div>
                <div>
                    <p>${vuelo.escalas ? 'Con escalas' : 'Sin escalas'}</p>
                    <p>Salida: ${vuelo.horario}</p>
                    <p>Duración: ${vuelo.duracion}</p>
                    <p>Precio: $${vuelo.precio}</p>
                </div>`;

        div.querySelector('button').addEventListener('click', () => { seleccionarVuelo(vuelo, div) })
        container.appendChild(div)
    });
}

function seleccionarVuelo(vuelo, div) {

    localStorage.setItem('vueloOrigen', JSON.stringify(vuelo.origen))
    localStorage.setItem('vueloDestino', JSON.stringify(vuelo.destino))
    localStorage.setItem('vueloPrecio', JSON.stringify(vuelo.precio))
    localStorage.setItem('vueloDuracion', JSON.stringify(vuelo.duracion))
    localStorage.setItem('vueloSalida', JSON.stringify(vuelo.horario))

    console.log('Vuelo registrado: ' + vuelo.origen + ' a ' + vuelo.destino)

    div.querySelectorAll('.vue').forEach(v => {
        v.classList.remove('seleccionado')
    });

    div.classList.add('seleccionado');
    window.location.href = "../Detalle de Vuelo/DetalleDeVuelo.html";
}

document.querySelectorAll('input[name=tipo], .check-aerolinea').forEach(input => input.addEventListener('change', mostrarResultados));


mostrarResultados();
