import { deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { mostrarMensaje } from "./mensajes.js";
import { db } from "./firebase.js";

const Manualidades = document.querySelector('.Manualidades');
const FormularioActualizarManualidades = document.querySelector('#Formulario-ActualizarManualidad');

const obtenerManualidad = (id) => getDoc(doc(db, 'manualidades', id));

let id = '';

// Nueva función para actualizar manualidad
const actualizarManualidad = async (id, nuevosValores) => {
    try {
        await updateDoc(doc(db, 'manualidades', id), nuevosValores);
        mostrarMensaje('Manualidad actualizada correctamente');
    } catch (error) {
        mostrarMensaje('Error al actualizar la manualidad', 'error');
    }
};

export const MostrarListaManualidades = (Datos) => {
    if (Datos.length) {
        let html = '';
        Datos.forEach(documento => {
            const Manualidad = documento.data();
            const idDocumento = documento.id; // Obtén el identificador del documento
            const li = `
                <li class="list-group-item list-group-item-action">
                    <h5> ${Manualidad.Titulo} </h5>
                    <p> ${Manualidad.Descripcion} </p>
                    <button class="btn btn-outline-warning w-100 mb-2 botoneSinSesion Eliminar-Manualidad" data-id="${idDocumento}"> Eliminar </button>
                    <button class="btn btn-outline-success w-100 mb-2 botoneSinSesion Actualizar-Manualidad" data-id="${idDocumento}" data-bs-toggle="modal" data-bs-target="#Actualizar"> Actualizar </button>
                </li>
            `;
            html += li;
        });
        Manualidades.innerHTML = html;

        const BotonesEliminar = Manualidades.querySelectorAll('.Eliminar-Manualidad');

        // ELIMINAR MANUALIDADES
        BotonesEliminar.forEach(BotonEliminarIndividual => {
            BotonEliminarIndividual.addEventListener('click', async (event) => {
                const Documento = event.target.dataset.id;
                try {
                    await deleteDoc(doc(db, 'manualidades', Documento));
                    // Puedes agregar aquí algún código adicional después de eliminar el documento, si es necesario
                } catch (error) {
                    mostrarMensaje('Error al eliminar la manualidad:', 'error');
                }
            });
        });

        const BotonesActualizar = Manualidades.querySelectorAll('.Actualizar-Manualidad');

        BotonesActualizar.forEach(BotonActualizarIndividual => {
            BotonActualizarIndividual.addEventListener('click', async (e) => {
                const identificadorDocumento = await obtenerManualidad(e.target.dataset.id);

                // Accede a los datos del documento utilizando el método data()
                const DATOSDOCUMENTO = identificadorDocumento.data();

                // Ahora puedes acceder a las propiedades del documento
                const TITULO = FormularioActualizarManualidades['Titulo-Manualidad'];
                const DESCRIPCION = FormularioActualizarManualidades['Descripcion-Manualidad'];

                TITULO.value = DATOSDOCUMENTO.Titulo; // Accede a la propiedad 'Titulo' del objeto data
                DESCRIPCION.value = DATOSDOCUMENTO.Descripcion; // Accede a la propiedad 'Descripcion' del objeto data
                id = identificadorDocumento.id;

                console.log(id); // Datos completos del documento
                // Puedes realizar acciones adicionales con el documento obtenido, según sea necesario
            });
        });

        // Evento para actualizar la manualidad al enviar el formulario
        FormularioActualizarManualidades.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                // Validar campos aquí si es necesario
                const TITULO = FormularioActualizarManualidades['Titulo-Manualidad'].value;
                const DESCRIPCION = FormularioActualizarManualidades['Descripcion-Manualidad'].value;

                // Llamada directa a la función actualizarManualidad
                await actualizarManualidad(id, {
                    Titulo: TITULO,
                    Descripcion: DESCRIPCION
                    // Agrega aquí otras propiedades que necesitas actualizar
                });

                // Cerrar el modal (si es un modal)
                const actualizarModal = document.querySelector('#Actualizar');
                const modal = bootstrap.Modal.getInstance(actualizarModal);
                modal.hide();
            } catch (error) {
                mostrarMensaje(error.message, 'error');
            }
        });

    } else if (Datos.length === 0) {
        Manualidades.innerHTML = `
            <h1>
                Para visualizar el contenido es necesario que inicies sesión
                <br><br>
                Si no tienes una cuenta, regístrate para continuar
            </h1>
        `;
    }
};
