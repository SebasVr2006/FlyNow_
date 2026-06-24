import { cuentasRegistradas } from "./cuentas.js";

const loginForm = document.querySelector('#login-form');

const mailActivo = localStorage.getItem('usuarioLogueado');
const todasLasCuentas = JSON.parse(localStorage.getItem('cuentasUsuarios'));

const avisoLogueado = document.querySelector('#ya-logueado');

avisoLogueado.style.display = 'none';

// Se verifica que no haya una cuenta logueada previamente
function verificarSesion() {
    if (mailActivo) {
        const cuenta = todasLasCuentas.find(c => c.mail === mailActivo);
        if (cuenta) {
            avisoLogueado.style.display = 'flex';
            loginForm.style.display = 'none';
            document.querySelector('.botones-container').style.display = 'none';
            return;
        }
    }
    avisoLogueado.style.display = 'none';
    loginForm.style.display = 'flex';
}

// Al cerrar sesión se elimina el localStorage
document.querySelector('#btn-cerrar-sesion').addEventListener('click', () => {
    const cuenta = cuentasRegistradas.find(c => c.mail === mailActivo);
    if (cuenta) cuenta.logueado = false;

    localStorage.removeItem('usuarioLogueado')
    location.reload();
});

// Validacion del formulario
loginForm.addEventListener('submit', (frm) => {
    frm.preventDefault();

    const mail = document.querySelector('#E-Mail').value;
    const contrasena = document.querySelector('#contrasena').value;

    const encontrarMail = cuentasRegistradas.find(cuenta => cuenta.mail === mail);
    let esValido = true;

    // Validacion del mail
    if (mail === '') {
        alert('Ingrese un email valido');
        esValido = false;

    } else if (!encontrarMail) {
        alert('Mail no registrado');
        esValido = false;

    } else {
        localStorage.removeItem('mail');
        localStorage.setItem('mail', mail);
    }

    //Validacion de la contraseña
    if (contrasena === '') {
        alert('Ingrese una contraseña');
        esValido = false;

    } else if (encontrarMail.contrasena !== contrasena) {
        alert('Contraseña incorrecta');
        esValido = false;

    }

    if (esValido) {

        let cuentasActuales = JSON.parse(localStorage.getItem('cuentasUsuarios')) || cuentasRegistradas;
        localStorage.setItem('cuentasUsuarios', JSON.stringify(cuentasActuales))

        localStorage.setItem('usuarioLogueado', mail);


        window.location.href = "../../index.html";
    }

})

verificarSesion();