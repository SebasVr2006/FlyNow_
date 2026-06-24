import { cuentasRegistradas } from "../Login/cuentas.js";

const origen = JSON.parse(localStorage.getItem('vueloOrigen'));
const destino = JSON.parse(localStorage.getItem('vueloDestino'));
const precio = parseInt(localStorage.getItem('vueloPrecio'));
const duracion = JSON.parse(localStorage.getItem('vueloDuracion'));
const salida = JSON.parse(localStorage.getItem('vueloSalida'));
const llegada = JSON.parse(localStorage.getItem('vueloLlegada'));
const lugarEscala = JSON.parse(localStorage.getItem('escalaLugar'));
const cantPasajeros = parseInt(localStorage.getItem('pasajeros'));
const clase = localStorage.getItem('clase');

function seleccionarAsiento() {
    const asientos = document.querySelectorAll('.item-asiento');

    asientos.forEach(asiento => {

        if (!asiento.classList.contains('ocupado')) {
            asiento.classList.add('disponible');
        }

        asiento.addEventListener('click', () => {

            if (asiento.classList.contains('ocupado-permanente')) {
                alert('Asiento ocupado');
            }

            if (asiento.classList.contains('ocupado')) {
                asiento.classList.remove('ocupado')
                asiento.classList.add('disponible')
                return;
            }

            // Se crea una constante en la que se almacenan todos los asientos seleccionados por el usuario
            const asientosSeleccionados = document.querySelectorAll('.item-asiento.ocupado').length;

            // Si el usuario selecciona más asientos de los que debería, se muestra un error
            if (asiento.classList.contains('disponible')) {
                if (asientosSeleccionados >= cantPasajeros) {
                    alert('Ya saleccionó todos los asientos permitidos')
                    return;
                }
                asiento.classList.remove('disponible');
                asiento.classList.add('ocupado');
            }


        })
    })
}

function calcularPrecioTotal() {
    const equipaje = document.querySelector('input[name=equipaje]:checked')?.value;
    let precioFinal = precio;

    if (clase === 'Primera Clase' || clase === 'primera') {
        precioFinal = precioFinal * 2;
    }


    if (cantPasajeros > 1) {
        precioFinal = precioFinal * (cantPasajeros * 0.75)
    }

    if (equipaje === 'equipajeDeMano') {
        precioFinal += 5
    } else if (equipaje === 'valija') {
        precioFinal += 25
    }


    return precioFinal;
}

function actualizarPrecioEnPantalla() {
    document.querySelector('.precio').textContent = `USD ${calcularPrecioTotal()}`;

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
                        <p><span>Cantidad de pasajeros: ${cantPasajeros}</span></p>
                        <h4><span>Horario</span></h4>
                        <ul>
                            <li><span>Salida: ${salida} - Llegada: ${llegada}</span></li>      
                            <li><span>Hora de llegada: ${llegada}</span></li>
                            <li><span>Duración del viaje: ${duracion}</span></li> 
                        </ul>
                    </div>
                </div>
                <div class="seleccion-equipaje">
                    <label for="equipaje"><input type="radio" name="equipaje" value="equipajeDeMano">Equipaje de mano</label>
                    <label for="equipaje"><input type="radio" name="equipaje" value="valija">Equipaje para despachar</label>
                </div>
                </div>
                <div class="total">
                    <span>Total</span>
                    <span class="precio">USD ${calcularPrecioTotal()}</span>
                </div>`;

    // Cuando se selecciona un tipo de equipaje, se actualiza el precio. 
    document.querySelectorAll('input[name="equipaje"]').forEach(input => {
        input.addEventListener('change', actualizarPrecioEnPantalla);
    });
}

function guardarReserva() {
    // Se crea un array de reservas buscando reservas existentes o se crea un array vacio.
    const reservasGuardadas = JSON.parse(localStorage.getItem('reservas')) || [];
    const precioFinalLS = localStorage.setItem('precioFinal', calcularPrecioTotal());

    const nuevaReserva = {
        origen: origen,
        destino: destino,
        precio: calcularPrecioTotal(),
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

        const mailActivo = localStorage.getItem('usuarioLogueado');
        let todasLasCuentas = JSON.parse(localStorage.getItem('cuentasUsuarios'));

        const cuenta = todasLasCuentas.find(c => c.mail === mailActivo);

        if (!cuenta) {
            alert('No has iniciado sesión. Por favor, inicia sesión para reservar tu vuelo.');
        } else {
            cuenta.reservas.push(nuevaReserva);

            // Se guarda una versión local del array de cuentas para poder usarla en otras vistas
            localStorage.setItem('cuentasUsuarios', JSON.stringify(todasLasCuentas));
            localStorage.setItem('reservas', JSON.stringify(reservasGuardadas));

            window.location.href = '../Perfil/checkout.html';
        }
    } else {
        alert('Este vuelo ya existe')
    }
}

document.querySelector('.confirmar-reserva').addEventListener('click', guardarReserva);
document.querySelector('#volver').addEventListener('click', function () {
    window.location.href = "../Vuelos/buscar.html"
});

generarInfo(); seleccionarAsiento();
