import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { mostrarMensaje } from "./mensajes.js";
import { auth, db } from "./firebase.js";

const formularioRegistro = document.querySelector('#Formulario-Registro');

formularioRegistro.addEventListener('submit', async (e) => {
    e.preventDefault();

    const EMAIL = formularioRegistro['Registrarse-Email'].value;
    const PASSWORD = formularioRegistro['Registrarse-Password'].value;

    try {
        // Crea un nuevo usuario
        const CREDENCIALES = await createUserWithEmailAndPassword(auth, EMAIL, PASSWORD);

        // Asigna el rol de "Usuario" al nuevo usuario
        await updateProfile(CREDENCIALES.user, { displayName: "Usuario" });

        // Agrega un documento a la colección "Usuarios" con el ID igual al correo del usuario
        await setDoc(doc(db, 'Usuarios', EMAIL), { Roles: ["Usuario"] });

        const MODALREGISTRO = document.querySelector('#Registrarse');
        const MODAL = bootstrap.Modal.getInstance(MODALREGISTRO);
        MODAL.hide();

        mostrarMensaje(`Bienvenido ${CREDENCIALES.user.email}. Se ha creado tu cuenta como Usuario.`);
    } catch (error) {
        if (error.code === 'auth/invalid-email') {
            mostrarMensaje('Correo inválido', 'noValido');
        } else if (error.code === 'auth/weak-password') {
            mostrarMensaje('Contraseña demasiado corta', 'noValido');
        } else if (error.code === 'auth/email-already-in-use') {
            mostrarMensaje('El correo ya está en uso', 'noValido');
        } else if (error.code) {
            mostrarMensaje('Algo salió mal', 'noValido');
        }
    }
});
