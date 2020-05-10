var firebaseConfig = {
    apiKey: "AIzaSyB4DqSbqNjPjQsDqt1U-lkYjuR2T7xEKxg",
    authDomain: "ecosistemas-18806.firebaseapp.com",
    databaseURL: "https://ecosistemas-18806.firebaseio.com",
    projectId: "ecosistemas-18806",
    storageBucket: "ecosistemas-18806.appspot.com",
    messagingSenderId: "779124682049",
    appId: "1:779124682049:web:cb780e6a09bf421baa85c0",
    measurementId: "G-DPGXRD7Q0J"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const estudiantenombre = document.getElementById("estudiantenombre");
const nombreIT = document.getElementById("nombreIT");
const profesorIT = document.getElementById("profesorIT");
const registrarBtn = document.getElementById("registrarBtn");
const materiasContainer = document.getElementById("materiasContainer");
const database = firebase.database();
const storage = window.localStorage;

//Recuperacion de datos
const idEst = storage.getItem("id");





//leer un objeto
database.ref().child("estudiantes").child(idEst).on("value", function (snapshot) {

    var estObj = snapshot.val();
    console.log(estObj.nombre);

    estudiantenombre.innerHTML = "Perfil de " + estObj.nombre + " " + estObj.apellido;
});




registrarBtn.addEventListener("click", function () {

    var id = database.ref().child("estudiantes").child(idEst).child("materias").push().key;
    //cual rama va a contener las materias

    var nombre = nombreIT.value;
    var profesor = profesorIT.value;

    var materia = new Materia(id, nombre, profesor);

    database.ref().child("estudiantes").child(idEst).child("materias")
        .child(id).set(materia);
});

//leer lista de materias del estuiantes 
database.ref().child("estudiantes").child(idEst).child("materias")
    .on("child_added", function (snapshot) {
        var materia = snapshot.val();
        var item = document.createElement("p");

        item.innerHTML = materia.nombre + " (" + materia.profesor + ")";

        materiasContainer.appendChild(item);
    });