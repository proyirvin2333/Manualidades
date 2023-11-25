import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { mostrarMensaje } from "./mensajes.js";
import { auth } from "./firebase.js";
const formularioRegistro = document.querySelector('#Formulario-Registro')

formularioRegistro.addEventListener('submit', async (e) => {
    e.preventDefault()

    const EMAIL = formularioRegistro['Registrarse-Email'].value,
        PASSWORD = formularioRegistro['Registrarse-Password'].value;

    try {
        const CREDENCIALES = await createUserWithEmailAndPassword(auth, EMAIL, PASSWORD);

        const MODALREGISTRO = document.querySelector('#Registrarse'),
            MODAL = bootstrap.Modal.getInstance(MODALREGISTRO);
        MODAL.hide()

        mostrarMensaje(`Bienvenido ${CREDENCIALES.user.email}`);
    } catch (error) {
        if (error.code === 'auth/invalid-email') {
            mostrarMensaje('Correo invalido', 'noValido')
        } else if (error.code === 'auth/weak-password') {
            mostrarMensaje('Contraseña demasiado corta', 'noValido')
        } else if (error.code === 'auth/email-already-in-use') {
            mostrarMensaje('El correo ya esta en uso', 'noValido')
        } else if (error.code) {
            mostrarMensaje('Algo salio mal', 'noValido');
        }
    }
})