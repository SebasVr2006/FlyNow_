const origen = localStorage.getItem('vueloOrigen');
const destino = localStorage.getItem('vueloDestino');
const precio = localStorage.getItem('vueloPrecio');
const duracion = localStorage.getItem('vueloDuracion');
const salida = localStorage.getItem('vueloSalida');
const llegada = localStorage.getItem('vueloLlegada');
const lugarEscala = localStorage.getItem('escalaLugar');

function seleccionarAsiento() {
    const asientos = document.querySelectorAll('.item-asiento');
    asientos.forEach(asiento => {

        asiento.classList.add('disponible')

        asiento.addEventListener('click', () => {

            if (asiento.classList.contains('ocupado')) {
                alert('Asiento ocupado');
            }

            if (asiento.classList.contains('disponible')) {
                asiento.classList.remove('disponible')
                asiento.classList.add('ocupado')
            }
        })
    })
}

function generarInfo() {
    const container = document.querySelector('.DetalleDeVuelo');
    container.innerHTML = '';

    container.innerHTML = `
            <h3>Detalle de Vuelo</h3>

                <div class="section">
                    <div class="ruta">Ida: ${origen} -> ${destino}</div>

                    <div class="horario">
                        <p><span>Hora de salida: ${salida}</span></p>
                        <p><span>Hora de llegada: ${llegada}</span></p>
                        <p><span>Duración del viaje: ${duracion}</span></p>
                        <p><span>${lugarEscala !== '' || lugarEscala !== null ? `Escalas en: ${lugarEscala}` : ''}</span></p>
                    </div>
                </div>
                </div>
                <div class="total">
                    <span>Total</span>
                    <span class="precio">USD ${precio}</span>
                </div>`;
}

function guardarReserva() {
    // Se crea un array de reservas buscando reservas existentes o se crea un array vacio.
    const reservasGuardadas = JSON.parse(localStorage.getItem('reservas')) || [];

    const nuevaReserva = {
        origen: origen,
        destino: destino,
        precio: precio,
        duracion: duracion,
        salida: salida,
        llegada: llegada,
        lugarEscala: lugarEscala
    };

    const yaExiste = reservasGuardadas.some(rsrv =>
        rsrv.origen === nuevaReserva.origen &&
        rsrv.destino === nuevaReserva.destino &&
        rsrv.salida === nuevaReserva.salida);

    if (!yaExiste) {
        reservasGuardadas.push(nuevaReserva);
        localStorage.setItem('reservas', JSON.stringify(reservasGuardadas));
        window.location.href = '../Perfil/reservas.html';
    } else {
        alert('Este vuelo ya existe')
    }
}

document.querySelector('.confirmar-reserva').addEventListener('click', guardarReserva);

generarInfo(); seleccionarAsiento();
