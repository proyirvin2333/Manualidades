import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

export class headerContent extends HTMLElement {
    constructor() {
        super();
        this.name;
        this.surname;
    }

    static get observedAttributes() {
        return ['name', 'surname'];
    }

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

    connectedCallback() {
        this.innerHTML = `
            <header>
                <h1 class="title-main">Bienvenido a nuestra página de Manualidades</h1>
                <p class="paragraph-main">
                    Aquí podrás observar todas las manualidades creadas por nuestra comunidad
                    <br>
                </p>
                <nav class="navigation-content">
                    <ul>
                        <li>
                            <a href="#" id="Google-Auth">Iniciar sesión con Google</a>
                        </li>
                        <li>
                            <a href="#" id="Logout-Button">Cerrar sesión</a>
                        </li>
                    </ul>
                </nav>
            </header>
        `;

        // Llama a la función del módulo para configurar el botón de inicio de sesión de Google
        setupGoogleLogin('Google-Auth');
    }
}

window.customElements.define('header-component', headerContent);

function setupGoogleLogin(buttonId) {
    const googleAuthButton = document.querySelector(`#${buttonId}`);

    if (googleAuthButton) {
        googleAuthButton.addEventListener('click', async () => {
            const provider = new GoogleAuthProvider();
            const auth = getAuth();

            try {
                const result = await signInWithPopup(auth, provider);
                getAuth.onAuthStateChanged(console.log('Hola'));
            } catch (error) {
                console.error("Error de autenticación:", error);
                // Resto del código para manejar errores
            }
        });
    }
}
