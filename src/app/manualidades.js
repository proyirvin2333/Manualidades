const Manualidades = document.querySelector('.Manualidades');

export const MostrarListaManualidades = (data) => {
    if (data.length) {
        let html = ''
        data.forEach(documento => {
            const Manualidad = documento.data()
            const li = `
            <li class="list-group-item list-group-item-action">
                <h5> ${Manualidad.title} </h5>
                <p> ${Manualidad.content} </p>
            </li>
            `
            html += li
        });
        Manualidades.innerHTML = html;
    } else {
        Manualidades.innerHTML = 
        `
        <h1>
        Para visualizar el contenido es necesario que inicies sesión
        <br><br>
        Si no tienes una cuenta registrate para continuar
        </h1>
        `;
    }
}