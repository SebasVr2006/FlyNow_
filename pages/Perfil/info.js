import { cuentasRegistradas } from "../Login/cuentas.js";

const mail = localStorage.getItem('mail');
const usuario = cuentasRegistradas.find(c => c.mail === mail)

function renderizarDatosDeUsuario() {
    const container = document.querySelector('.datos_usuario');
    container.innerHTML = '';

    container.innerHTML = `
        <h3 class="datos_encabezado">Datos del Usuario</h3>
            <ul>
                <li>
                    <strong>Nombre Completo:</strong>
                    <span>${usuario.usuario}</span>
                </li>
                <li>
                    <strong>Correo Electrónico:</strong>
                    <span>${mail}</span>
                </li>
                <li>
                    <strong>DNI:</strong>
                    <span>12.345.678</span>
                </li>
            </ul>`;
}

renderizarDatosDeUsuario();