import { cuentasRegistradas } from "../Login/cuentas.js";

const mailActivo = localStorage.getItem('usuarioLogueado');
const todasLasCuentas = JSON.parse(localStorage.getItem('cuentasUsuarios'));

const usuario = todasLasCuentas.find(c => c.mail === mailActivo);

function renderizarDatosDeUsuario() {
    const container = document.querySelector('.datos_usuario');
    container.innerHTML = '';

    container.innerHTML = `
            <ul>
                <li>
                    <strong>Nombre Completo:</strong>
                    <span>${usuario.usuario}</span>
                </li>
                <li>
                    <strong>Correo Electrónico:</strong>
                    <span>${usuario.mail}</span>
                </li>
                <li>
                    <strong>DNI:</strong>
                    <span>${usuario.DNI}</span>
                </li>
            </ul>`;
}

renderizarDatosDeUsuario();