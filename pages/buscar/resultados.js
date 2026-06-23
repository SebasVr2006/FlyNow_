import { VUELOS } from "../script.js";

const origen = localStorage.getItem('origen');
const destino = localStorage.getItem('destino');
const fechaIda = localStorage.getItem('fechaIda');
const fechaVuelta = localStorage.getItem('fechaVuelta');
const pasajeros = localStorage.getItem('pasajeros');
const clase = localStorage.getItem('clase');

function filtrarResultados() {
    // Se buscan todos los inputs que tengan de nombre "tipo", se verifica q estén checkeados y se devuelve su valor
    const tipoDeVuelo = document.querySelector('input[name=tipo]:checked')?.value;

    // Se buscan los elementos check-aeroline, se corrobora que estén checkeados y luego con el map se devuelve el valor de cada uno.
    const aerolineaSeleccionada = [...document.querySelectorAll('.check-aerolinea:checked')].map(e => e.value);

    return VUELOS.filter(vuelo => {
        const coincidenciaRuta = vuelo.origen.toLowerCase() === origen.toLowerCase() && vuelo.destino.toLowerCase() === destino.toLowerCase();

        // Nombre erroneo, sería pasaFiltro
        let pasaFiltro = true;
        if (tipoDeVuelo === 'directo') pasaFiltro = !vuelo.escalas;
        if (tipoDeVuelo === 'escala') pasaFiltro = vuelo.escalas;

        let coincideAerolinea = true;
        if (aerolineaSeleccionada.length > 0) {
            coincideAerolinea = aerolineaSeleccionada.includes(vuelo.aerolinea)
        }

        return coincidenciaRuta && pasaFiltro && coincideAerolinea;
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
                    <h3>${vuelo.origen} a ${vuelo.destino}</h3>
                    <p>${vuelo.escalas ? 'Con escalas' : 'Sin escalas'}</p>
                </div>
                <div class="vue-boton">
                     <button>Seleccionar</button>
                </div>
                <div>
                    <p>Salida: ${vuelo.horario}</p>
                    <p>Llegada: ${vuelo.llegada}</p>
                    <p>Duración: ${vuelo.duracion}</p>
                    <p>Precio: USD ${vuelo.precio}</p>
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
    localStorage.setItem('vueloLlegada', JSON.stringify(vuelo.llegada))
    localStorage.setItem('escalaLugar', JSON.stringify(vuelo.lugarEscalas))

    console.log('Vuelo registrado: ' + vuelo.origen + ' a ' + vuelo.destino)

    div.querySelectorAll('.vue').forEach(v => {
        v.classList.remove('seleccionado')
    });

    div.classList.add('seleccionado');
    window.location.href = "../Detalle de Vuelo/DetalleDeVuelo.html";
}

document.querySelectorAll('input[name=tipo], .check-aerolinea').forEach(input => input.addEventListener('change', mostrarResultados));


mostrarResultados();
