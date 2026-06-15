document.querySelector('#form-busqueda').addEventListener('submit', (e) => {
    e.preventDefault();
    if (validarFormulario()) {
        console.log('Redirigiendo...')
        window.location.href = 'pages/Vuelos/buscar.html'
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
    let esValido = true;

    if (origen.trim() === '') {
        mostrarError('#error-origen')
        esValido = false
    } else {
        ocultarError('#error-origen')
        localStorage.setItem('origen', origen)
    }

    if (destino.trim() === '') {
        mostrarError('#error-destino')
        esValido = false
    } else {
        ocultarError('#error-destino')
    }

    if (origen.trim() !== '' && origen.trim() === destino.trim()) {
        mostrarError('#error-igual')
        esValido = false
    } else {
        ocultarError('#error-igual')
        localStorage.setItem('destino', destino)
    }

    if (fechaIda.trim() === '') {
        mostrarError('#error-ida')
        esValido = false
    } else {
        ocultarError('#error-ida')
        localStorage.setItem('fechaIda', fechaIda)
    }

    if (fechaVuelta.trim() === '') {
        mostrarError('#error-vuelta')
        esValido = false
    } else {
        ocultarError('#error-vuelta')
        localStorage.setItem('fechaVuelta', fechaVuelta)
    }

    if (pasajeros.trim() === '') {
        mostrarError('#error-pasajeros')
        esValido = false
    } else {
        ocultarError('#error-pasajeros')
        localStorage.setItem('pasajeros', pasajeros)
    }

    if (clase.trim() === '') {
        mostrarError('#error-clase')
        esValido = false
    } else {
        ocultarError('#error-clase')
        localStorage.setItem('clase', clase)
    }

    return esValido;
}