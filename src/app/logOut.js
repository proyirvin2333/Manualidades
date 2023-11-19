import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
const LOGOUTBUTTON = document.querySelector('#Logout-Button')

const auth = getAuth();
signOut(auth).then(() => {
    // Sign-out successful.
}).catch((error) => {
    // An error happened.
});
