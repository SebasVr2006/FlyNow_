import { VUELOS } from "../script.js";

function generarCards() {
    const contenedor = document.getElementById("contenedor-vuelos");
    contenedor.innerHTML = "";

    VUELOS.forEach(vuelo => {
        const div = document.createElement("div");
        div.classList.add("imagen");

        div.innerHTML = `
            <a href="#">
                <img class="img-pais" src="../../assets/images/Paises/${vuelo.destino}.jpg" alt="${vuelo.destino}">
                <div class="info-card">
                    <h4>${vuelo.destino}</h4>
                    <p class="vuelos-desde">Vuelos desde</p>
                    <p><span>$${vuelo.precio.toLocaleString("es-AR")}</span></p>
                </div>
            </a>
        `;

        contenedor.appendChild(div);
    });
}

generarCards();