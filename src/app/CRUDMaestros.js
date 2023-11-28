import { deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { mostrarMensaje } from "./mensajes.js";
import { db } from "./firebase.js";

const Maestros = document.querySelector('.Maestros');
const FormularioActualizarMaestro = document.querySelector('#Formulario-ActualizarMaestro');

const obtenerMaestros = (id) => getDoc(doc(db, 'Maestros', id));

let id = '';

// Nueva función para actualizar manualidad
const actualizarManualidad = async (id, nuevosValores) => {
    try {
        await updateDoc(doc(db, 'Maestros', id), nuevosValores);
        mostrarMensaje('Manualidad actualizada correctamente');
    } catch (error) {
        mostrarMensaje('Error al actualizar la manualidad', 'error');
    }
};

export const MostrarListaMaestros = (Datos) => {
    if (Datos.length) {
        let html = '';
        Datos.forEach(documento => {
            const Maestro = documento.data();
            const idDocumento = documento.id; // Obtén el identificador del documento
            const li = `
                <li class="list-group-item list-group-item-action">
                    <h5> Nombre del maestro: ${Maestro.Nombre} </h5>
                    <p> Experiencia laboral: ${Maestro.Experiencia} </p>
                    <p> Especialidad: ${Maestro.Especialidad} </p>
                    <p> Fecha de contrato: ${Maestro.FechaContratacion} </p>
                    <p> Horas Semanales: ${Maestro.HorasSemanales} </p>
                    <button class="btn btn-outline-warning w-100 mb-2 botoneSinSesion Eliminar-Maestro" data-id="${idDocumento}"> Eliminar </button>
                    <button class="btn btn-outline-success w-100 mb-2 botoneSinSesion Actualizar-Maestro" data-id="${idDocumento}" data-bs-toggle="modal" data-bs-target="#ActualizarMaestro"> Actualizar </button>
                </li>
            `;
            html += li;
        });
        Maestros.innerHTML = html;

        const BotonesEliminar = Maestros.querySelectorAll('.Eliminar-Maestro');

        // ELIMINAR MANUALIDADES
        BotonesEliminar.forEach(BotonEliminarIndividual => {
            BotonEliminarIndividual.addEventListener('click', async (event) => {
                const Documento = event.target.dataset.id;
                try {
                    await deleteDoc(doc(db, 'Maestros', Documento));
                    // Puedes agregar aquí algún código adicional después de eliminar el documento, si es necesario
                } catch (error) {
                    mostrarMensaje('Error al eliminar la manualidad:', 'error');
                }
            });
        });

        const BotonesActualizar = Maestros.querySelectorAll('.Actualizar-Maestro');

        BotonesActualizar.forEach(BotonActualizarIndividual => {
            BotonActualizarIndividual.addEventListener('click', async (e) => {
                const identificadorDocumento = await obtenerMaestros(e.target.dataset.id);

                // Accede a los datos del documento utilizando el método data()
                const DATOSDOCUMENTO = identificadorDocumento.data();

                // Ahora puedes acceder a las propiedades del documento
                const NOMBRE = FormularioActualizarMaestro['Actualizar-Nombre'];
                const EXPERIENCIA = FormularioActualizarMaestro['Actualizar-Experiencia'];
                const ESPECIALIDAD = FormularioActualizarMaestro['Actualizar-Especialidad'];
                const FECHA_CONTRATACION = FormularioActualizarMaestro['Actualizar-FechaContratacion'];
                const HORAS_SEMANALES = FormularioActualizarMaestro['Actualizar-HoraSemanales'];

                NOMBRE.value = DATOSDOCUMENTO.Nombre; // Accede a la propiedad 'Titulo' del objeto data
                EXPERIENCIA.value = DATOSDOCUMENTO.Experiencia; // Accede a la propiedad 'Titulo' del objeto data
                ESPECIALIDAD.value = DATOSDOCUMENTO.Especialidad; // Accede a la propiedad 'Titulo' del objeto data
                FECHA_CONTRATACION.value = DATOSDOCUMENTO.FechaContratacion; // Accede a la propiedad 'Titulo' del objeto data
                HORAS_SEMANALES.value = DATOSDOCUMENTO.HorasSemanales; // Accede a la propiedad 'Descripcion' del objeto data
                id = identificadorDocumento.id;
            });
        });

        // Evento para actualizar la manualidad al enviar el formulario
        FormularioActualizarMaestro.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                // Validar campos aquí si es necesario
                const NOMBRE = FormularioActualizarMaestro['Actualizar-Nombre'].value;
                const EXPERIENCIA = FormularioActualizarMaestro['Actualizar-Experiencia'].value;
                const ESPECIALIDAD = FormularioActualizarMaestro['Actualizar-Especialidad'].value;
                const FECHA_CONTRATACION = FormularioActualizarMaestro['Actualizar-FechaContratacion'].value;
                const HORAS_SEMANALES = FormularioActualizarMaestro['Actualizar-HoraSemanales'].value;

                // Llamada directa a la función actualizarManualidad
                await actualizarManualidad(id, {
                    Nombre: NOMBRE,
                    Experiencia: EXPERIENCIA,
                    Especialidad: ESPECIALIDAD,
                    FechaContratacion: FECHA_CONTRATACION,
                    HorasSemanales: HORAS_SEMANALES,
                    // Agrega aquí otras propiedades que necesitas actualizar
                });

                // Cerrar el modal (si es un modal)
                const actualizarModal = document.querySelector('#ActualizarMaestro');
                const modal = bootstrap.Modal.getInstance(actualizarModal);
                modal.hide();
            } catch (error) {
                mostrarMensaje(error.message, 'error');
            }
        });

    } else if (Datos.length === 0) {
        Maestros.innerHTML = `
            <h1>
                Para visualizar el contenido es necesario que inicies sesión
                <br><br>
                Si no tienes una cuenta, regístrate para continuar
            </h1>
        `;
    }
};
