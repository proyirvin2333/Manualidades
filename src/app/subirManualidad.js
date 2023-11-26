import { subirManualidad } from "./firebase.js";
window.addEventListener('DOMContentLoaded', () => {

    const formularioManualidad = document.querySelector('#Formulario-Manualidad');

    formularioManualidad.addEventListener('submit', async (e) => {
        e.preventDefault()

        const TITULO = formularioManualidad['Titulo-Manualidad'].value,
            DESCRIPCION = formularioManualidad['Descripcion-Manualidad'].value;

        subirManualidad(TITULO, DESCRIPCION)
    })
})


