import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { mostrarMensaje } from "./mensajes.js";
import { auth } from "./firebase.js";

const FormularioInicioSesion = document.querySelector('#Formulario-InicioSesion');

FormularioInicioSesion.addEventListener('submit', async e => {
    e.preventDefault();

    const PASSWORD = FormularioInicioSesion['InicioSesion-Password'].value,
        EMAIL = FormularioInicioSesion['InicioSesion-Email'].value;

    try {
        const CREDENCIALES = await signInWithEmailAndPassword(auth, EMAIL, PASSWORD);
        console.log(CREDENCIALES);

        const MODALINICIASESION = document.querySelector('#InicioSesion'),
            MODAL = bootstrap.Modal.getInstance(MODALINICIASESION);
        MODAL.hide()

        mostrarMensaje(`Bienvenido ${CREDENCIALES.user.email}`);
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            mostrarMensaje('Usuario No encontrado', 'noValido')
        } else if (error.code === 'auth/wrong-password') {
            mostrarMensaje('Correo o contraseña incorrecta', 'noValido')
        } else if (error.code) {
            mostrarMensaje('Algo salio mal: ' + error.code, 'noValido');
        }
    }

})