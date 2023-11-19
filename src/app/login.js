import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import "../app/googleLogin"

const auth = getAuth();
signOut(auth).then(() => {
    // Sign-out successful.
}).catch((error) => {
    // An error happened.
});
