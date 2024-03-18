let chistes: HTMLElement | null = document.querySelector(".chistes");
let peticion: string = "https://icanhazdadjoke.com/";
let peticion2: string = "https://api.chucknorris.io/jokes/random";
interface Datos {
  id?: string;
  joke?: string;
  status?: number;
}
type Puntuacion = {
  joke?: string;
  score?: number;
  date?: string;
};
let reportAcudits: Puntuacion[] = [];
let fecha: Date = new Date();
let dia: string = fecha.toISOString();
let puntuacion1: HTMLElement | null = document.querySelector("#puntuacion1");
let puntuacion2: HTMLElement | null = document.querySelector("#puntuacion2");
let puntuacion3: HTMLElement | null = document.querySelector("#puntuacion3");
let contador: number = -1;
interface Chuck {
  categories: any[];
  created_at: Date;
  icon_url: string;
  id: string;
  updated_at: Date;
  url: string;
  value: string;
}

let chiste1: string;
let chiste2: string;
let arrayChistes: string[] = [];
let aleatorio: number;

// Chistes api
const mostrarChistes = (): void => {
  fetch(peticion, {
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((datos: Datos) => {
      if (chistes && datos.joke) {
        chiste1 = datos.joke;
        arrayChistes.push(chiste1);
      }
    })
    .catch((error) => console.log(error));

  fetch(peticion2, {
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((datos: Chuck) => {
      if (chistes && datos.value) {
        chiste2 = datos.value;
        arrayChistes.push(chiste2);
        chistes.innerHTML = arrayChistes[aleatorio];
      }
    })
    .catch((error) => console.log(error));
console.log('hola')
  aleatorio = Math.floor(Math.random() * arrayChistes.length);
  contador++;
  let imagen1: any = document.querySelector("#img1");
  let imagen2: any = document.querySelector("#img2");
  let imagen3: any = document.querySelector("#img3");

  let img1: string[] = [
    "blob1",
    "blob2",
    "blob3",
    "blob4",
    "blob5",
    "blob6",
    "blob7",
  ];
  let img2: string[] = [
    "blob7",
    "blob6",
    "blob5",
    "blob4",
    "blob3",
    "blob2",
    "blob1",
  ];
  let img3: string[] = [
    "blob3",
    "blob4",
    "blob4",
    "blob6",
    "blob7",
    "blob1",
    "blob2",
  ];

  imagen1.src = `./img/${img1[contador]}.svg`;
  imagen2.src = `./img/${img2[contador]}.svg`;
  imagen3.src = `./img/${img3[contador]}.svg`;

  if (contador == 6) {
    contador = -1;
  }
};

// Puntuacion

const addPuntuacion = (score: number) => {
  if (arrayChistes) {
    const chisteIndex = reportAcudits.findIndex(
      (elemento) => elemento.joke === arrayChistes[aleatorio]
    );

    if (chisteIndex !== -1) {
      reportAcudits[chisteIndex].score = score;
    } else {
      reportAcudits.push({ joke: arrayChistes[aleatorio], score, date: dia });
    }

    console.log(reportAcudits);
  }
};

// El tiempo api

interface Tiempo {
  origen: Origen;
  title: string;
  ciudades: Ciudades[];
}

interface Ciudades {
  id: string;
  idProvince: string;
  name: string;
  nameProvince: string;
  stateSky: StateSky;
  temperatures: Temperatures;
}

interface StateSky {
  description: string;
  id: string;
}

interface Temperatures {
  max: string;
  min: string;
}

interface Origen {
  productor: string;
  web: string;
  language: string;
  copyright: string;
  nota_legal: string;
  descripcion: string;
}

const elTiempo = () => {
  let icono: any = document.getElementById("icono");
  let peticion: string = "https://www.el-tiempo.net/api/json/v2/home";
  let grados: any = document.querySelector("h3");
  fetch(peticion, {
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((datos: Tiempo) => {
      grados.innerHTML = `Max: ${datos.ciudades[0].temperatures.max}º / Min: ${datos.ciudades[0].temperatures.min}º`;
      switch (datos.ciudades[0].stateSky.description) {
        case "Poco nuboso":
          icono.src = "animated/cloudy-day-1.svg";
          console.log("Poco nuboso");
          break;
        case '"Despejado"':
          icono.src = "animated/day.svg";
          console.log('"Despejado"');
          break;
        case '"Muy nuboso con lluvia escasa"':
          icono.src = "animated/rainy-7.svg";
          console.log("lluvia");
          break;
        case '"Intervalos nubosos"':
          icono.src = "animated/cloudy-day-1.svg";
          console.log("Intervalos nubosos");
          break;

        case '""Muy nuboso con lluvia""':
          icono.src = "animated/rainy-7.svg";
          console.log('"Muy nuboso con lluvia"');
          break;

        default:
          icono.src = "animated/cloudy-day-1.svg";
          console.log("por defecto");
      }
    })
    .catch((error) => console.log(error));
};

elTiempo();

// Eventos

window.onload = mostrarChistes;
document.querySelector("button")?.addEventListener("click", mostrarChistes);
puntuacion1?.addEventListener("click", () => addPuntuacion(1));
puntuacion2?.addEventListener("click", () => addPuntuacion(2));
puntuacion3?.addEventListener("click", () => addPuntuacion(3));
