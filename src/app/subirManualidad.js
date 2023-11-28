import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { mostrarMensaje } from "./mensajes.js";
import { db } from "./firebase.js";

window.addEventListener('DOMContentLoaded', () => {
    const formularioMaestro = document.querySelector('#Formulario-Maestro');

    formularioMaestro.addEventListener('submit', async (e) => {
        e.preventDefault();

        const NOMBRE = formularioMaestro['Nombre-Maestro'].value;
        const EXPERIENCIA = parseInt(formularioMaestro['Experiencia-Maestro'].value);
        const ESPECIALIDAD = formularioMaestro['Especialidad-Maestro'].value;
        const HORAS_SEMANALES = parseInt(formularioMaestro['Horas-Semanales-Maestro'].value);
        const FECHA_CONTRATACION = formularioMaestro['Fecha-Contratacion-Maestro'].value;

        try {
            // Utiliza addDoc para agregar un documento con un identificador generado automáticamente
            const nuevoMaestroRef = await addDoc(collection(db, 'Maestros'), {
                Nombre: NOMBRE,
                Experiencia: EXPERIENCIA,
                Especialidad: ESPECIALIDAD,
                HorasSemanales: HORAS_SEMANALES,
                FechaContratacion: FECHA_CONTRATACION
            });

            // Muestra un mensaje si todo sale bien
            mostrarMensaje(`Maestro ${NOMBRE} ha sido registrado exitosamente`);

            // Limpia el formulario
            formularioMaestro.reset();
        } catch (error) {
            // Maneja el error y muestra un mensaje con el error
            mostrarMensaje('Error al registrar al maestro:', 'noValido');
        }
    });
});
