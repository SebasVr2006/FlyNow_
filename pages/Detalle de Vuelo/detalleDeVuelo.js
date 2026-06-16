const vueloSeleccionado = localStorage.getItem('vueloSeleccionado');

function seleccionarAsiento() {
    const asientos = document.querySelectorAll('.item-asiento');

    asientos.forEach(asiento => {
        
        asiento.classList.add('disponible')

        asiento.addEventListener('click', () => {

            if (asiento.classList.contains('ocupado')) {
                alert('Asiento ocupado');
            }

            if (asiento.classList.contains('disponible')) {
                asiento.classList.remove('disponible')
                asiento.classList.add('ocupado')
            }
        })
    })



}


seleccionarAsiento();