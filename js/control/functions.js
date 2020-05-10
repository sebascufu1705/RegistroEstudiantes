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


const firstnameIT = document.getElementById("firstnameIT");
const secondnameIt = document.getElementById("secondnameIt");
const codeIt = document.getElementById("codeIt");
const registerBtn = document.getElementById("registerBtn");
const contenedorBase = document.getElementById("contenedorBase");
const database = firebase.database();
const storage = window.localStorage;

var imagenSeleccionada = "";

registerBtn.addEventListener("click", registrar);

function registrar() {


    let nombre = firstnameIT.value;
    let apellido = secondnameIt.value;
    let code = codeIt.value;

    let id = database.ref().child("estudiantes").push().key;


    let estudiante = new Estudiante(id, nombre, apellido, code, imagenSeleccionada);



    //   registrar  estudiante en una rama
    database.ref().child("estudiantes").child(id).set(estudiante);
}

// leer la lista de forma correcta
database.ref().child("estudiantes").on("child_added", function (snapshot) {

    var estObj = snapshot.val();

    var item = document.createElement("li");

    var img = document.createElement("img");
    img.src = estObj.url;
    img.width = 36;

    var enlace = document.createElement("a");
    enlace.innerHTML = estObj.nombre + " " + estObj.apellido;
    enlace.href = "#";
    enlace.id = estObj.id;
    //<a href="" id="idFirebase">Enlalces</a>
    item.appendChild(img);
    item.appendChild(enlace);
    contenedorBase.appendChild(item);

    //crear listener para el elemento
    document.getElementById(estObj.id).addEventListener("click", function (event) {
        event.preventDefault();

        storage.setItem("id", estObj.id);
        window.location.href = "agregarmaterias.html";

    });

});

document.querySelectorAll(".avatar").forEach(
    item => {
        item.addEventListener("click", function () {
            restoreButtons();
            item.width = 128;
            imagenSeleccionada = item.src;
            console.log(imagenSeleccionada);
        });
    }
);
function restoreButtons() {
    document.querySelectorAll(".avatar").forEach(
        item => {
            item.width = 96;
        }
    );
}