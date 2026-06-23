const origen = JSON.parse(localStorage.getItem('vueloOrigen'));
const destino = JSON.parse(localStorage.getItem('vueloDestino'));
const precio = JSON.parse(localStorage.getItem('vueloPrecio'));
const duracion = JSON.parse(localStorage.getItem('vueloDuracion'));
const salida = JSON.parse(localStorage.getItem('vueloSalida'));
const llegada = JSON.parse(localStorage.getItem('vueloLlegada'));
const lugarEscala = JSON.parse(localStorage.getItem('escalaLugar'));
const cantPasajeros = 0;

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
                        <p><span>${lugarEscala !== '' || lugarEscala !== null ? `Escalas en: ${lugarEscala}` : ''}</span></p>
                        <h4><span>Horario</span></h4>
                        <ul>
                            <li><span>Salida: ${salida} - Llegada: ${llegada}</span></li>      
                            <li><span>Hora de llegada: ${llegada}</span></li>
                            <li><span>Duración del viaje: ${duracion}</span></li> 
                        </ul>
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
