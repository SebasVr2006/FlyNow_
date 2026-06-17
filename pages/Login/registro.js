import { cuentasRegistradas } from "./cuentas.js";

document.querySelector('#register-form').addEventListener('submit', (rgsrt) => {
    rgsrt.preventDefault();
    if (validarFormulario()) {
        const usuario = document.querySelector('#usuario').value;
        const mail = document.querySelector('#E-Mail').value;
        const contrasena = document.querySelector('#contrasena').value;

        cuentasRegistradas.push({ usuario: usuario, contrasena: contrasena, mail: mail });
        window.location.href = "../../index.html";

    }
});

// Validacion del formulario
function validarFormulario() {
    const usuario = document.querySelector('#usuario').value;
    const mail = document.querySelector('#E-Mail').value;
    const contrasena = document.querySelector('#contrasena').value;
    const confirmarContrasena = document.querySelector('#confirmar-contrasena').value;

    const encontrarMail = cuentasRegistradas.find(cuenta => cuenta.mail === mail);
    let esValido = true;

    // Validación usuario
    if (usuario === '') {
        alert('Ingrese un usuario');
        esValido = false;
        return;
    } else {
        localStorage.removeItem('usuario');
        localStorage.setItem('usuario', usuario);
    }

    // Validacion del mail
    if (mail === '') {
        alert('Ingrese un email valido');
        esValido = false;
        return;

    } else if (encontrarMail) {
        alert('Este mail ya está registrado');
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

    } else if (confirmarContrasena !== contrasena) {
        alert('Las contraseñas no coinciden');
        esValido = false;
        return;

    } else {
        localStorage.removeItem('contrasena');
        localStorage.setItem('contrasena', contrasena);
    }

    return esValido;

}