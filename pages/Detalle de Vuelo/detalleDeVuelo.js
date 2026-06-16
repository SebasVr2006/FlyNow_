const origen = localStorage.getItem('vueloOrigen');
const destino = localStorage.getItem('vueloDestino');
const precio = localStorage.getItem('vueloPrecio');
const duracion = localStorage.getItem('vueloDuracion');
const salida = localStorage.getItem('vueloSalida');

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

    container.innerHTML = `
            <h3>Detalle de Vuelo</h3>

                <div class="section">
                    <div class="ruta">Ida: ${origen} -> ${destino}</div>

                    <div class="horario">
                        <p><span>Hora de salida: ${salida}</span></p>
                        <p><span>Duración del viaje: ${duracion}</span></p>
                    </div>
                </div>
                </div>
                <div class="total">
                    <span>Total</span>
                    <span class="precio">USD ${precio}</span>
                </div>`;

}

generarInfo(); seleccionarAsiento();
