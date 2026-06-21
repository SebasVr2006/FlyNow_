const form = document.querySelector('#form-busqueda');

function mostrarError(id) {
    document.querySelector(id).classList.add('visible');
}

function ocultarError(id) {
    document.querySelector(id).classList.remove('visible');
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const origen = document.querySelector('#origen').value.trim();
    const destino = document.querySelector('#destino').value.trim();
    const fechaIda = document.querySelector('#ida').value.trim();
    const fechaVuelta = document.querySelector('#vuelta').value.trim();
    const pasajeros = parseInt(document.querySelector('#pasajeros').value);
    const clase = document.querySelector('#clase').value;

    let esValido = true

    // Validación origen
    if (origen === '') {
        mostrarError('#error-origen')
        esValido = false;
    } else {
        ocultarError('#error-origen')
        localStorage.setItem('origen', origen)
    }

    // Validación destino
    if (destino === '') {
        mostrarError('#error-destino')
        esValido = false;
    } else {
        ocultarError('#error-destino')
    }

    // Se evalúa que el origen y el destino no coincidan
    if (origen !== '' && origen === destino) {
        mostrarError('#error-igual')
        esValido = false;
    } else {
        ocultarError('#error-igual')
        localStorage.setItem('destino', destino)
    }

    // Validación de fechaIda
    if (fechaIda === '') {
        mostrarError('#error-ida')
        esValido = false;
    } else {
        ocultarError('#error-ida')
        localStorage.setItem('fechaIda', fechaIda)
    }

    // Validación de fechaVuelta
    if (fechaVuelta === '') {
        mostrarError('#error-vuelta')
        esValido = false;
    } else {
        ocultarError('#error-vuelta')
        localStorage.setItem('fechaVuelta', fechaVuelta)
    }

    // Validación de pasajeros
    if (isNaN(pasajeros) || pasajeros < 1) {
        mostrarError('#error-pasajeros')
        esValido = false;
    } else {
        ocultarError('#error-pasajeros')
        localStorage.setItem('pasajeros', pasajeros)
    }

    // Validación de clase
    if (clase === '') {
        mostrarError('#error-clase')
        esValido = false;
    } else {
        ocultarError('#error-clase')
        localStorage.setItem('clase', clase)
    }

    if (esValido) window.location.href = "pages/Vuelos/buscar.html";
});
