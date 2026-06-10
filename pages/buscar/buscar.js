document.getElementById("btn-buscar").addEventListener("click", () => {
    const origen = document.getElementById("origen").value.trim();
    const destino = document.getElementById("destino").value.trim();
    const ida = document.getElementById("ida").value;
    const vuelta = document.getElementById("vuelta").value;
    const pasajeros = document.getElementById("pasajeros").value;
    const clase = document.getElementById("clase").value;

    if (!origen || !destino || !ida || !vuelta || !pasajeros) {
        alert("Por favor completá todos los campos.");
        return;
    }

    if (origen.toLowerCase() === destino.toLowerCase()) {
        alert("El origen y el destino no pueden ser iguales.");
        return;
    }

    const fechaIda = new Date(ida);
    const fechaVuelta = new Date(vuelta);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fechaIda < hoy) {
        alert("La fecha de ida no puede ser anterior a hoy.");
        return;
    }

    if (fechaVuelta < fechaIda) {
        alert("La fecha de vuelta no puede ser anterior a la de ida.");
        return;
    }

    const busqueda = { origen, destino, ida, vuelta, pasajeros, clase };
    localStorage.setItem("busqueda", JSON.stringify(busqueda));

    window.location.href = "pages/Vuelos/buscar.html";
});