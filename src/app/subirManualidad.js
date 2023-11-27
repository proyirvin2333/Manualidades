import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { mostrarMensaje } from "./mensajes.js";
import './modulosFirebase.js';
import { db } from "./firebase.js";

window.addEventListener('DOMContentLoaded', () => {
    const formularioManualidad = document.querySelector('#Formulario-Manualidad');

    formularioManualidad.addEventListener('submit', async (e) => {
        e.preventDefault();

        const TITULO = formularioManualidad['Titulo-Manualidad'].value;
        const DESCRIPCION = formularioManualidad['Descripcion-Manualidad'].value;

        try {
            // Utiliza addDoc para agregar un documento con un identificador generado automáticamente
            const nuevoDocumentoRef = await addDoc(collection(db, 'manualidades'), { Titulo: TITULO, Descripcion: DESCRIPCION });

            // Obtiene el identificador generado automáticamente
            const nuevoIdentificador = nuevoDocumentoRef.id;

            // Muestra un mensaje si todo sale bien
            mostrarMensaje(`La manualidad ${nuevoIdentificador} ha sido subida exitosamente`);

            // Limpia el formulario
            formularioManualidad.reset();
        } catch (error) {
            // Maneja el error y muestra un mensaje con el error
            mostrarMensaje('Error al subir el documento:', 'noValido');
        }
    });
});
