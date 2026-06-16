// Estructura de arrays y objetos con tus vuelos
const misReservas = [
    {
        destinoGeneral: "Buenos Aires (BUE) → Madrid (MAD)",
        vuelos:[
            {
                tipo: "Ida: Buenos Aires(BUE) → Madrid (MAD)",
                horario: "12:00 - 08:40 (+1)",
                duracion: "2h 15min 11/8"
            },
            {
                tipo: "Vuelta: Madrid (MAD) → Buenos Aires (BUE)",
                horario: "18:30 - 06:40 (+1)",
                duracion: "2h 15min"
            }
        ]
    },
    {
        destinoGeneral: "New York(NY) → Paris",
        vuelos: [
            {
                tipo: "Ida: New York(NY) → Paris",
                horario: "19:30 - 08:45 (+1)",
                duracion: "7h 15min 15/09"
            },
            {
                tipo:"Vuelta: Paris → New York(NY)",
                horario:"11:00 - 13:30",
                duracion: "8h 30min"
            }
        ]
    },
    {
        destinoGeneral: "Barcelona → Roma",
        vuelos:[
            {
                tipo: "Ida: Barcelona → Roma",
                horario: "09:20 - 11:10",
                duracion: "1h 50min 10/10"
            },
            {
                tipo: "Vuelta: Roma → Barcelona",
                horario: "18:40 - 20:30",
                duracion: "1h 50min 17/10"
            }
        ]
    }
];

//Funcion para renderiar dinamicamente

function cargarReservas(){

   //se busca la seccion en el html por su ID 
    const contenedor = document.getElementById('contenedor-reservas');

    //si no existe el contenedor frena la ejecucion
    if(!contenedor) return;

    let estructuraHTML = '<h1>Mis vuelos Reservados</h1>';

    //recorro el array 
    misReservas.forEach(reserva => {

        estructuraHTML += `
            <details>
                <summary>${reserva.destinoGeneral}</summary>
                <div class="contenido_vuelos">
                    <ul>
        `;

        reserva.vuelos.forEach(vuelo => {
            estructuraHTML += `
            <div class="info_vuelos">
            <li><h3>${vuelo.tipo}</h3></li>
            <li>Horario: ${vuelo.horario}</li>
            <li>Duracion: ${vuelo.duracion}</li>
            </div>`;
        });

        estructuraHTML += `
        </ul>
        </div>
        </details>
        `;
        
    });

    contenedor.innerHTML = estructuraHTML;
}

document.addEventListener("DOMContentLoaded", cargarReservas);