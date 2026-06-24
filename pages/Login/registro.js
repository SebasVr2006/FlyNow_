import { cuentasRegistradas } from "./cuentas.js";

// Validacion del formulario
document.querySelector('#register-form').addEventListener('submit', (rgsrt) => {
    rgsrt.preventDefault();

    const usuario = document.querySelector('#usuario').value;
    const mail = document.querySelector('#E-Mail').value;
    const contrasena = document.querySelector('#contrasena').value;
    const confirmarContrasena = document.querySelector('#confirmar-contrasena').value;
    const DNI = parseInt(document.querySelector('#DNI').value);

    const encontrarMail = cuentasRegistradas.find(cuenta => cuenta.mail === mail);
    let esValido = true;

    // Validación usuario
    if (usuario === '') {
        alert('Ingrese un usuario');
        esValido = false;
        return;
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

    }

    //Validacion del DNI
    if (DNI < 0) {
        alert('Ingrese un número de DNI válido')
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
    }

    if (esValido) {
        
        // Se crea una versión local del JS de cuentas en el cual se pueden agregar nuevas cuentas
        let cuentasActuales = JSON.parse(localStorage.getItem('cuentasUsuarios')) || cuentasRegistradas;

        const registrarUsuario = {
            usuario: usuario,
            contrasena: contrasena,
            DNI: DNI,
            mail: mail,
            logueado: true,
            reservas: []
        }

        // Se agrega la cuenta al array
        cuentasActuales.push(registrarUsuario);

        // Se guarda el array en el localStorage
        localStorage.setItem('cuentasUsuarios', JSON.stringify(cuentasActuales))

        localStorage.removeItem('usuarioLogueado')
        localStorage.setItem('usuarioLogueado', mail);

        console.log(cuentasActuales)

        window.location.href = "../../index.html";
    }

});