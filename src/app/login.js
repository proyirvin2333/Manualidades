import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import "../app/googleLogin"

const auth = getAuth();
signOut(auth).then(() => {
    console.log("Logueado")
}).catch((error) => {
    console.log(error);
});
