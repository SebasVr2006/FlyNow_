function cargarReservas() {

    const contenedor = document.getElementById('contenedor-reservas');
    if (!contenedor) return;

    const mailActivo = localStorage.getItem('usuarioLogueado');
    const todasLasCuentas = JSON.parse(localStorage.getItem('cuentasUsuarios'));


    const cuenta = todasLasCuentas.find(c => c.mail === mailActivo);

    if (cuenta) {
        const listaReservas = cuenta.reservas;

        let estructuraHTML = '<h1>Mis vuelos Reservados</h1>';

        if (!listaReservas || listaReservas.length === 0) {
            contenedor.innerHTML = '<h1>Mis vuelos Reservados</h1><p>No tenés reservas aún.</p>';
            return;
        }

        listaReservas.forEach((reserva, index) => {
            estructuraHTML += `
        <details>
            <summary>${reserva.origen} → ${reserva.destino}</summary>
            <div class="contenido_vuelos">
                <ul>
                    <li><span>Hora de salida:</span> ${reserva.salida}</li>
                    <li><span>Hora de llegada:</span> ${reserva.llegada}</li>
                    ${reserva.lugarEscala ? `<li><span>Escala/s en:</span> ${reserva.lugarEscala}</li>` : ''}
                    <li><span>Duración:</span> ${reserva.duracion}</li>
                    <li><span>Precio:</span> USD ${reserva.precio}</li>
                </ul>
            </div>
        </details>
        `;
            contenedor.innerHTML = estructuraHTML;
        });
    } else {
        // Si el mail del localStorage no coincide con ninguna cuenta registrada
        contenedor.innerHTML = '<h1>Mis vuelos Reservados</h1><p>Usuario no encontrado.</p>';

    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cargarReservas);
} else {
    cargarReservas();
}