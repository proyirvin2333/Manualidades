import { deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { mostrarMensaje } from "./mensajes.js";
import { db } from "./firebase.js";

const Manualidades = document.querySelector('.Manualidades');

export const MostrarListaManualidades = (data) => {
    if (data.length) {
        let html = '';
        data.forEach(documento => {
            const Manualidad = documento.data();
            const id = documento.id; // Obtén el identificador del documento
            const li = `
                <li class="list-group-item list-group-item-action">
                    <h5> ${Manualidad.Titulo} </h5>
                    <p> ${Manualidad.Descripcion} </p>
                    <button class="btn btn-outline-warning w-100 mb-2 botoneSinSesion Eliminar-Manualidad" data-id="${id}"> Eliminar </button>
                </li>
            `;
            html += li;
        });
        Manualidades.innerHTML = html;

        const BotonesEliminarIndividual = Manualidades.querySelectorAll('.Eliminar-Manualidad');

        BotonesEliminarIndividual.forEach(BotonEliminarIndividual => {
            BotonEliminarIndividual.addEventListener('click', async (event) => {
                const id = event.target.dataset.id;
                try {
                    await deleteDoc(doc(db, 'manualidades', id));
                    // Puedes agregar aquí algún código adicional después de eliminar el documento, si es necesario
                } catch (error) {
                    mostrarMensaje('Error al eliminar la manualidad:', 'error');
                }
            });
        });

    } else if (data.length === 0) {
        Manualidades.innerHTML = `
            <h1>
                Para visualizar el contenido es necesario que inicies sesión
                <br><br>
                Si no tienes una cuenta, regístrate para continuar
            </h1>
        `;
    }
};
