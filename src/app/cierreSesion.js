import { signOut } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { mostrarMensaje } from "./mensajes.js";
import { auth } from "./firebase.js";

const CerrarSesion = document.querySelector('#CerrarSesion');

CerrarSesion.addEventListener('click', async () => {
    await signOut(auth)
    mostrarMensaje('Hasta Pronto')
})