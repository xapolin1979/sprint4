var _a;
var chistes = document.querySelector(".chistes");
var peticion = "https://icanhazdadjoke.com/";
var peticion2 = "https://api.chucknorris.io/jokes/random";
var reportAcudits = [];
var fecha = new Date();
var dia = fecha.toISOString();
var puntuacion1 = document.querySelector("#puntuacion1");
var puntuacion2 = document.querySelector("#puntuacion2");
var puntuacion3 = document.querySelector("#puntuacion3");
var contador = -1;
var chiste1;
var chiste2;
var arrayChistes = [];
var aleatorio;
// Chiste api
var mostrarChistes = function () {
    fetch(peticion, {
        headers: {
            Accept: "application/json",
        },
    })
        .then(function (res) { return res.json(); })
        .then(function (datos) {
        if (chistes && datos.joke) {
            chiste1 = datos.joke;
            arrayChistes.push(chiste1);
        }
    })
        .catch(function (error) { return console.log(error); });
    fetch(peticion2, {
        headers: {
            Accept: "application/json",
        },
    })
        .then(function (res) { return res.json(); })
        .then(function (datos) {
        if (chistes && datos.value) {
            chiste2 = datos.value;
            arrayChistes.push(chiste2);
            chistes.innerHTML = arrayChistes[aleatorio];
        }
    })
        .catch(function (error) { return console.log(error); });
    aleatorio = Math.floor(Math.random() * arrayChistes.length);
    console.log(aleatorio);
    contador++;
    var imagen1 = document.querySelector('#img1');
    var imagen2 = document.querySelector('#img2');
    var imagen3 = document.querySelector('#img3');
    var img1 = ['blob1', 'blob2', 'blob3', 'blob4', 'blob5', 'blob6', 'blob7'];
    var img2 = ['blob7', 'blob6', 'blob5', 'blob4', 'blob3', 'blob2', 'blob1'];
    var img3 = ['blob3', 'blob4', 'blob4', 'blob6', 'blob7', 'blob1', 'blob2'];
    imagen1.src = "./img/".concat(img1[contador], ".svg");
    imagen2.src = "./img/".concat(img2[contador], ".svg");
    imagen3.src = "./img/".concat(img3[contador], ".svg");
    if (contador == 6) {
        contador = -1;
    }
};
// Puntuacion
var addPuntuacion = function (score) {
    if (arrayChistes) {
        var chisteIndex = reportAcudits.findIndex(function (elemento) { return elemento.joke === arrayChistes[aleatorio]; });
        if (chisteIndex !== -1) {
            reportAcudits[chisteIndex].score = score;
        }
        else {
            reportAcudits.push({ joke: arrayChistes[aleatorio], score: score, date: dia });
        }
        console.log(reportAcudits);
    }
};
var elTiempo = function () {
    var icono = document.getElementById('icono');
    var peticion = "https://www.el-tiempo.net/api/json/v2/home";
    var grados = document.querySelector('h3');
    fetch(peticion, {
        headers: {
            Accept: "application/json",
        },
    })
        .then(function (res) { return res.json(); })
        .then(function (datos) {
        grados.innerHTML = "Max: ".concat(datos.ciudades[0].temperatures.max, "\u00BA / Min: ").concat(datos.ciudades[0].temperatures.min, "\u00BA");
        switch (datos.ciudades[0].stateSky.description) {
            case 'Poco nuboso':
                icono.src = 'animated/cloudy-day-1.svg';
                console.log('Poco nuboso');
                break;
            case '"Despejado"':
                icono.src = 'animated/day.svg';
                console.log('"Despejado"');
                break;
            case '"Muy nuboso con lluvia escasa"':
                icono.src = 'animated/rainy-7.svg';
                console.log('lluvia');
                break;
            case '"Intervalos nubosos"':
                icono.src = 'animated/cloudy-day-1.svg';
                console.log('Intervalos nubosos');
                break;
            case '""Muy nuboso con lluvia""':
                icono.src = 'animated/rainy-7.svg';
                console.log('"Muy nuboso con lluvia"');
                break;
            default:
                icono.src = 'animated/cloudy-day-1.svg';
                console.log('por defecto');
        }
    })
        .catch((function (error) { return console.log(error); }));
};
elTiempo();
// Eventos 
window.onload = mostrarChistes;
(_a = document.querySelector("button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", mostrarChistes);
puntuacion1 === null || puntuacion1 === void 0 ? void 0 : puntuacion1.addEventListener("click", function () { return addPuntuacion(1); });
puntuacion2 === null || puntuacion2 === void 0 ? void 0 : puntuacion2.addEventListener("click", function () { return addPuntuacion(2); });
puntuacion3 === null || puntuacion3 === void 0 ? void 0 : puntuacion3.addEventListener("click", function () { return addPuntuacion(3); });
