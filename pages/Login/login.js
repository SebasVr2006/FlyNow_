import { cuentasRegistradas } from "./cuentas.js";

document.querySelector('#login-form').addEventListener('submit', (frm) => {
    frm.preventDefault();
    if (validarFormulario()) {
        window.location.href = "../../index.html";
    }
})

// Validacion del formulario
function validarFormulario() {
    const mail = document.querySelector('#E-Mail').value;
    const contrasena = document.querySelector('#contrasena').value;

    const encontrarMail = cuentasRegistradas.find(cuenta => cuenta.mail === mail);
    let esValido = true;

    // Validacion del mail
    if (mail === '') {
        alert('Ingrese un email valido');
        esValido = false;
        return;

    } else if (!encontrarMail) {
        alert('Mail no registrado');
        esValido = false;
        return;

    } else {
        localStorage.removeItem('mail');
        localStorage.setItem('mail', mail);
    }

    //Validacion de la contraseña
    if (contrasena === '') {
        alert('Ingrese una contraseña');
        esValido = false;
        return;
    } else if (encontrarMail.contrasena !== contrasena) {
        alert('Contraseña incorrecta');
        esValido = false;
        return;
    } else {
        localStorage.removeItem('contrasena');
        localStorage.setItem('contrasena', contrasena);
    }

    return esValido;

}