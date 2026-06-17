document.addEventListener("DOMContentLoaded", () => {
    const datosVuelo = {
        origen: "Buenos Aires",
        codigoOrigen: "BUE",
        destino: "Madrid",
        codigoDestino: "MAD",
        fechaInicio: "10/08/2024",
        fechaFin: "20/08/2024",
        precioBase: 550
    };

    let totalActual = datosVuelo.precioBase;
    let cuponAplicado = false;

    const inputNombre = document.getElementById("nombre");
    const inputDNI = document.getElementById("DNI");
    const inputCorreo = document.getElementById("correo_electronico");

    const radiosPago = document.getElementsByName("metodo_pago");
    const txtMetodoSeleccionado = document.getElementById("metodo_seleccionado");

    const txtRuta = document.getElementById("resumen_ruta");
    const txtFecha = document.getElementById("resumen_fecha");
    const txtTotal = document.getElementById("precio_total");

    const inputCupon = document.getElementById("input_cupon");
    const btnCupon = document.getElementById("btn_cupon");
    const btnFinalizar = document.getElementById("btn_finalizar");


    //  Renderizar resumen dinámicamente
    function renderizarResumen() {
        txtRuta.innerHTML = `<strong>${datosVuelo.origen}</strong> (${datosVuelo.codigoOrigen}) - ${datosVuelo.destino} (${datosVuelo.codigoDestino})`;
        txtFecha.textContent = `${datosVuelo.fechaInicio} - ${datosVuelo.fechaFin}`;
        actualizarInterfazTotal();
    }


    //  Actualizar el total en tiempo real
    function actualizarInterfazTotal() {
        txtTotal.textContent = `$ ${totalActual} USD`;
    }



    // Actualizar método de pago visualmente
    radiosPago.forEach(radio => {
        radio.addEventListener("change", (e) => {
            txtMetodoSeleccionado.textContent = `Seleccionado: ${e.target.value}`;
        });
    });



    //  Validar código de descuento y recalcular
    btnCupon.addEventListener("click", () => {
        const codigo = inputCupon.value.trim().toUpperCase();

        if (cuponAplicado) {
            alert("Ya has aplicado un cupón para esta compra.");
            return;
        }


        if (codigo === "FLYNOW10") {
            const descuento = datosVuelo.precioBase * 0.10; // 10%
            totalActual = datosVuelo.precioBase - descuento;
            cuponAplicado = true;

            alert("¡Cupón del 10% aplicado con éxito!");
            actualizarInterfazTotal(); // Consigna 6 en acción
        } else if (codigo === "") {
            alert("Por favor, ingresa un código de cupón.");
        } else {
            alert("Cupón no válido.");
        }
    });



    // Capturar, validar dinámicamente y confirmar
    btnFinalizar.addEventListener("click", () => {
        // Captura de datos
        const nombre = inputNombre.value.trim();
        const dni = inputDNI.value.trim();
        const correo = inputCorreo.value.trim();

        // Determinar si seleccionó pago
        let pagoSeleccionado = null;
        radiosPago.forEach(radio => {
            if (radio.checked) pagoSeleccionado = radio.value;
        });

        // Validaciones de campos obligatorios
        if (nombre === "") {
            alert("El campo 'Nombre' es obligatorio.");
            inputNombre.focus();
            return;
        }

        if (dni === "" || isNaN(dni)) {
            alert("Por favor, ingresa un número de DNI válido.");
            inputDNI.focus();
            return;
        }

        // Validación simple de correo electrónico mediante Expresión Regular
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(correo)) {
            alert("Por favor, ingresa un correo electrónico válido.");
            inputCorreo.focus();
            return;
        }

        if (!pagoSeleccionado) {
            alert("Por favor, selecciona un método de pago.");
            return;
        }

        // Si pasa todas las validaciones
        alert(`¡Reserva confirmada con éxito!\n\nPasajero: ${nombre}\nDNI: ${dni}\nTotal pagado: $${totalActual} USD\nMétodo: ${pagoSeleccionado}`);
    });


    renderizarResumen();
});