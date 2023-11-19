import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

export function setupGoogleLogin(buttonId) {
    const googleAuthButton = document.querySelector(`#${buttonId}`);

    if (googleAuthButton) {
        googleAuthButton.addEventListener('click', async () => {
            const provider = new GoogleAuthProvider();
            const auth = getAuth();

            try {
                // Iniciar sesión con Google y obtener el resultado
                const result = await signInWithPopup(auth, provider);

                // Manejar la autenticación de Google exitosa
                console.log("Autenticación exitosa:", result);

                // Resto del código para manejar la autenticación de Google
                // Puedes agregar más lógica aquí según tus necesidades

                // Por ejemplo, puedes redirigir a otra página después de la autenticación
                // window.location.href = "/dashboard";
            } catch (error) {
                // Manejar errores durante la autenticación de Google
                console.error("Error de autenticación:", error);

                // Resto del código para manejar errores
                // Puedes agregar más lógica aquí según tus necesidades
            }
        });
    }
}
