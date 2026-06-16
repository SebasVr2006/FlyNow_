import { VUELOS } from "../script.js";

function generarCards() {
    const contenedor = document.getElementById("contenedor-vuelos");
    contenedor.innerHTML = "";

    VUELOS.forEach(vuelo => {
        const div = document.createElement("div");
        div.classList.add("imagen");

        const link = vuelo.destino === 'Argentina' ? './vuelosProvincias.html' : '#';

        div.innerHTML = `
            <a href="${link}">
                <img class="img-pais" src="../../assets/images/Paises/${vuelo.destino}.jpg" alt="${vuelo.destino}">
                <div class="info-card">
                    <h4>${vuelo.destino}</h4>
                    <p class="vuelos-desde">Vuelos desde</p>
                    <p><span>USD ${vuelo.precio}</span></p>
                </div>
            </a>
        `;

        contenedor.appendChild(div);
    });
}

generarCards();