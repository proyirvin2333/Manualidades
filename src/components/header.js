/**
 * Inicializamos la clase con el nombre que nosotros queramos y la extendemos de HTMLElement
 * Esa clase es una clase general, sin embargo existen clases dedicadas a otros elementos
 * como los inputs, buttons y demás
 * 
 * Generamos el constructor como en toda clase y el método Super para llamar todos los
 * métodos de la clase general.
 * 
 * En el constructor también podemos usar variables para definir datos que podremos usar
 * más adelante en el HTML y que tendran un valor el cual mostrar.
 */
import { setupGoogleLogin } from './googleLoginModule.js';

export class headerContent extends HTMLElement {
    constructor() {
        super();
        this.name;
        this.surname;
    }

    /**
     * observedAttributes devuelve una lista de los atributos que se pueden cambiar
     * ya sea atraves de datos ingresados por el usuario o atraves de una base de datos 
     */
    static get observedAttributes() {
        return ['name', 'surname'];
    }

    /**
     * attributeChangedCallback nos permite utilizar los atributos y realizar los cambios
     * En este caso recibe 3 parametros
     * El primero recibe el nombre del atributo que estamos utilizando
     * El segundo recibe valor anterior que contenia el atributo
     * Y tercero recibe el nuevo valor que contendra el atributo
     */
    attributeChangedCallback(nameAtr, oldValue, newValue) {
        switch (nameAtr) {
            case 'name':
                this.name = newValue;
                break;
            case 'surname':
                this.surname = newValue;
                break;
        }
    }

    /**
     * connectedCallback inicializa y crea el web component que requerimos, es donde
     * se debe generar este código HTML
     */
    connectedCallback() {
        this.innerHTML = `
        <!-- 
            Como puedes ver, aquí también podemos usar comentarios 
            Y también podemos observar que tenemos definido el nombre
            De los Atributos que utilizamos anteriormente, estos devuelveb
            el valor de "name" y "surname"
        -->
        <header>
                <h1 class="title-main">Bienvenido a nuestra pagina de Manualidades</h1>
                <p class="pragraph-main">
                    Aquí podras observar todas las manualidades creadas por nuestra comunidad
                    <br>
                </p class="pragraph-main">
                <nav class="navigation-content">
                    <ul>
                        <li>
                            <a href="#" id="Google-Auth">Iniciar sesión con google</a>
                        </li>
                        <li>
                            <a href="#" id="Logout-Button">Cerrar sesión</a>
                        </li>
                        <li>

                        </li>
                    </ul>
                </nav>
            </header>
        `;

        // Llamar a la función del módulo para configurar el botón de inicio de sesión de Google
        setupGoogleLogin('Google-Auth');
        /**
         * Otra cosa importante a destacar es que aquí mismo podemos definir estilos
         * Y esos estilos unicamente afectaran este componente y no al resto del documento
         * O podemos manegarlo como se hace comunmente en HTML que es usando
         * nuestro archivo CSS y utilizando clases 
         */
    }
}

/**
 * Window customElement nos sirve para declarar el Componente que queremos utilizar
 * como parametros recibe un STRING el cual sera el nombre del web component y sera el
 * que se utilizara dentro del HTML y después tenemos el nombre de la clase
 * Simplemente para que construya el elemento. 
 */
window.customElements.define('header-component', headerContent);
