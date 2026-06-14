document.querySelector('#form-busqueda').addEventListener('submit', (e) => {
    e.preventDefault();
    if (validarFormulario()) {
        console.log('Redirigiendo...')
    }
});

function mostrarError(id) {
    document.querySelector(id).classList.add('visible');
}

function ocultarError(id) {
    document.querySelector(id).classList.remove('visible');
}

function validarFormulario() {
    const origen = document.querySelector('#origen').value;
    const destino = document.querySelector('#destino').value;
    const fechaIda = document.querySelector('#ida').value;
    const fechaVuelta = document.querySelector('#vuelta').value;
    const pasajeros = document.querySelector('#pasajeros').value;
    const clase = document.querySelector('#clase').value;
}