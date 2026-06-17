function cargarReservas() {
    const contenedor = document.getElementById('contenedor-reservas');
    if (!contenedor) return;

    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];

    if (reservas.length === 0) {
        contenedor.innerHTML = '<h1>Mis vuelos Reservados</h1><p>No tenés reservas aún.</p>';
        return;
    }

    let estructuraHTML = '<h1>Mis vuelos Reservados</h1>';

    reservas.forEach(reserva => {
        estructuraHTML += `
            <details>
                <summary>${reserva.origen} → ${reserva.destino}</summary>
                <div class="contenido_vuelos">
                    <ul>
                        <li>Hora de salida: ${reserva.salida}</li>
                        <li>Hora de llegada: ${reserva.llegada}</li>
                        <li>${reserva.lugarEscala !== null || reserva.lugarEscala !== '' ? `Escala/s en: ${reserva.lugarEscala}` : ''}</li>
                        <li>Duración: ${reserva.duracion}</li>
                        <li>Precio: USD ${reserva.precio}</li>
                    </ul>
                </div>
            </details>
        `;
    });

    contenedor.innerHTML = estructuraHTML;
}

document.addEventListener("DOMContentLoaded", cargarReservas);