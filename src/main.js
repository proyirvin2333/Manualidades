import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { revisaSesion } from "./app/revisaSesion.js";
import { auth } from "./app/firebase.js";
import './app/iniciaSesionEmailAndPass.js'
import './app/formularioRegistro.js'
import './app/cierreSesion.js'

onAuthStateChanged(auth, async (usuario) => {
    revisaSesion(usuario)
})