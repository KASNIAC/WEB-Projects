const anchoTotal = 1000;
const altoTotal = 300;
let ancho, alto, aumentoHorizontal, aumentoVertical, actualHorizontal, actualVertical;
let division = 5;
let conjunto_clavos_x = new Set();
let conjunto_clavos_y = new Set();
let conjunto_adornos_x = new Set();
let conjunto_adornos_y = new Set();
let arreglo_clavos_x = [];
let arreglo_clavos_y = [];
let arreglo_adornos_x = [];
let arreglo_adornos_y = [];

function dibuja_plano() {
   let plano = document.getElementById("svg-plano-cartesiano");

   ancho = 100;
   alto = 30;
   aumentoHorizontal = anchoTotal / ancho;
   aumentoVertical = altoTotal / alto;

   for (let i = 0; i <= ancho; ++i) {
      let nuevoPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      nuevoPath.setAttribute("stroke", "#ccc");
      if (i % division == 0) {
         nuevoPath.setAttribute("stroke-width", "2");
      } else {
         nuevoPath.setAttribute("stroke-width", "0.5");
      }
      // if(i == division){
      //    nuevoPath.setAttribute("stroke", "black");
      // }

      let posicion = "M " + (aumentoVertical * i) + " 0 V " + altoTotal;
      nuevoPath.setAttribute("d", posicion);
      plano.appendChild(nuevoPath);
   }

   for (let i = 0; i <= alto; ++i) {
      let nuevoPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      nuevoPath.setAttribute("stroke", "#ccc");
      if (i % division == 0) {
         nuevoPath.setAttribute("stroke-width", "2");
      } else {
         nuevoPath.setAttribute("stroke-width", "0.5");
      }
      if (i == alto - division) {
         console.log()
         nuevoPath.setAttribute("stroke", "black");
      }
      let posicion = "M 0 " + (aumentoHorizontal * i) + "H " + anchoTotal;
      nuevoPath.setAttribute("d", posicion);
      plano.appendChild(nuevoPath);
   }

   let nuevoPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
   nuevoPath.setAttribute("stroke", "black");
   let posicion = "M " + (aumentoVertical * division) + " 0 V " + altoTotal;
   nuevoPath.setAttribute("d", posicion);
   plano.appendChild(nuevoPath);

   let numeros = document.getElementById("svg-plano-numeros");
   numeros.setAttribute("transform", "translate(" + (aumentoVertical * division) + ", " + (altoTotal - division * aumentoHorizontal) + ")")
   console.log("Numeros: ", (aumentoVertical * division), (altoTotal - division * aumentoHorizontal));
   // let circulo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
   // circulo.setAttribute("cx", "0");
   // circulo.setAttribute("cy", "0");
   // circulo.setAttribute("r", 10);
   // numeros.appendChild(circulo);

   for (let i = 1; i < alto; ++i) {
      let texto = document.createElementNS("http://www.w3.org/2000/svg", "text")
      texto.setAttribute("x", -aumentoHorizontal);
      texto.setAttribute("y", -aumentoHorizontal * i + division / 2);
      texto.setAttribute("font-size", "5");
      if (i % 5 == 0) {
         texto.setAttribute("font-weight", "bold");
         texto.setAttribute("font-size", "7");
      }

      texto.setAttribute("font-family", "Arial");
      texto.textContent = i.toString();
      numeros.appendChild(texto);
      // break;
   }

   for (let i = 1; i < ancho; ++i) {
      let texto = document.createElementNS("http://www.w3.org/2000/svg", "text");
      texto.setAttribute("x", aumentoVertical * i - division / 2);
      texto.setAttribute("y", aumentoVertical);
      texto.setAttribute("font-size", "5");
      if (i % 5 == 0) {
         texto.setAttribute("font-weight", "bold");
         texto.setAttribute("font-size", "7");
      }

      texto.setAttribute("font-family", "Arial");
      texto.textContent = i.toString();
      numeros.appendChild(texto);
      // break;
   }

}

function limpia_puntos() {
   document.getElementById("svg-puntos-clavos").innerHTML = "";
   document.getElementById("svg-puntos-adornos").innerHTML = "";
   conjunto_clavos_x.clear();
   conjunto_clavos_y.clear();
   conjunto_adornos_x.clear();
   conjunto_adornos_y.clear();
   arreglo_clavos_x = [];
   arreglo_clavos_y = [];
   arreglo_adornos_x = [];
   arreglo_adornos_y = [];
}

function limpia_rectangulos() {
   document.getElementById("svg-rectangulos").innerHTML = "";
}

function dibuja_puntos() {
   limpia_puntos();

   // ------------ CLAVOS ----------------
   let contenido1 = document.getElementById("text-clavos").value;
   let lineas1 = contenido1.split('\n');

   let contenido2 = document.getElementById("text-adornos").value;
   let lineas2 = contenido2.split('\n');

   // Verifico que 2 puntos no repitan coordenadas:
   let conjunto_x = new Set();
   let conjunto_y = new Set();
   let bandera = true;
   // CLAVOS
   for (let i = 0; i < lineas1.length; ++i) {
      let valores = lineas1[i].split(" ");

      // console.log("i: ", i, "\tValores: ", valores[0], valores[1]);
      if (valores[0] == "") continue;
      if (conjunto_x.has(valores[0])) {
         bandera = false;
         // console.log("HERE1", i, valores[0]);
         break;
      } else {
         conjunto_x.add(valores[0]);
         conjunto_clavos_x.add(valores[0]);
         arreglo_clavos_x.push(valores[0]);
      }

      if (conjunto_y.has(valores[1])) {
         bandera = false;
         // console.log("HERE2", i, valores[1]);
         break;
      } else {
         conjunto_y.add(valores[1]);
         conjunto_clavos_y.add(valores[1]);
         arreglo_clavos_y.push(valores[1]);
      }
   }

   // ADORNOS, REDUCIR ESTE FOR FEOOOO
   for (let i = 0; i < lineas2.length; ++i) {
      let valores = lineas2[i].split(" ");
      if (valores[0] == "") continue;
      // console.log("i: ", i, "\tValores: ", valores[0], valores[1]);
      if (conjunto_x.has(valores[0])) {
         bandera = false;

         break;
      } else {
         conjunto_x.add(valores[0]);
         conjunto_adornos_x.add(valores[0]);
         arreglo_adornos_x.push(valores[0]);
      }

      if (conjunto_y.has(valores[1])) {
         bandera = false;
         // console.log("HERE2", i, valores[1]);
         break;
      } else {
         conjunto_y.add(valores[1]);
         conjunto_adornos_y.add(valores[1]);
         arreglo_adornos_y.push(valores[1]);
      }
   }

   if (bandera) {
      // ------------ CLAVOS ----------------
      let clavos = document.getElementById("svg-puntos-clavos");
      clavos.setAttribute("transform", "translate(" + (aumentoVertical * division) + ", " + (altoTotal - division * aumentoHorizontal) + ")");
      for (let i = 0; i < lineas1.length; ++i) {
         let valores = lineas1[i].split(" ");
         // console.log(valores[0], valores[1]);
         if (valores[0] == "") continue;
         if (valores.length == 2) {
            let nuevo_punto = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            nuevo_punto.setAttribute("fill", "red");
            nuevo_punto.setAttribute("cx", aumentoVertical * valores[0]);
            nuevo_punto.setAttribute("cy", -aumentoHorizontal * valores[1]);
            nuevo_punto.setAttribute("r", 4);
            clavos.appendChild(nuevo_punto);

            let nuevo_texto = document.createElementNS("http://www.w3.org/2000/svg", "text");
            nuevo_texto.setAttribute("x", aumentoVertical * valores[0]);
            nuevo_texto.setAttribute("y", -aumentoHorizontal * valores[1]);
            nuevo_texto.setAttribute("font-size", "10");
            nuevo_texto.setAttribute("font-weight", "bolder");
            nuevo_texto.setAttribute("text-anchor", "middle");
            nuevo_texto.setAttribute("dominant-baseline", "middle");
            nuevo_texto.textContent = i.toString();
            clavos.appendChild(nuevo_texto);
         } else {
            alert("Checa los puntos");
         }
      }

      // ------------ ADORNOS ----------------
      let adornos = document.getElementById("svg-puntos-adornos");
      adornos.setAttribute("transform", "translate(" + (aumentoVertical * division) + ", " + (altoTotal - division * aumentoHorizontal) + ")");
      for (let i = 0; i < lineas2.length; ++i) {
         let valores = lineas2[i].split(" ");
         // console.log(valores[0], valores[1]);
         if (valores[0] == "") continue;
         if (valores.length == 2) {
            let nuevo_punto = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            nuevo_punto.setAttribute("fill", "#5CA9F9");
            nuevo_punto.setAttribute("cx", aumentoVertical * valores[0]);
            nuevo_punto.setAttribute("cy", -aumentoHorizontal * valores[1]);
            nuevo_punto.setAttribute("r", 4);
            adornos.appendChild(nuevo_punto);

            let nuevo_texto = document.createElementNS("http://www.w3.org/2000/svg", "text");
            nuevo_texto.setAttribute("x", aumentoVertical * valores[0]);
            nuevo_texto.setAttribute("y", -aumentoHorizontal * valores[1]);
            nuevo_texto.setAttribute("font-size", "10");
            nuevo_texto.setAttribute("font-weight", "bolder");
            nuevo_texto.setAttribute("text-anchor", "middle");
            nuevo_texto.setAttribute("dominant-baseline", "middle");
            nuevo_texto.textContent = i.toString();
            // nuevo_texto.setAttribute("fill", "#5CA9F9");
            adornos.appendChild(nuevo_texto);
         } else {
            alert("Checa los puntos");
         }
      }

   } else {
      alert("2 puntos comparten coordenada");
   }
}

function dibuja_rectangulos() {
   limpia_rectangulos();

   let contenido = document.getElementById("text-rectangulos").value;
   let lineas = contenido.split('\n');

   // Verifico que sí existan los puntos a conectar:
   let bandera = true;
   for (let i = 0; i < lineas.length; ++i) {
      let valores = lineas[i].split(" ");

      if (valores[0] > arreglo_clavos_x.length || valores[1] > arreglo_clavos_x.length) {
         bandera = false;
         break;
      }
   }

   if (bandera) {
      for (let i = 0; i < lineas.length; ++i) {
         let valores = lineas[i].split(" ");

         let punto1 = [arreglo_clavos_x[valores[0]], arreglo_clavos_y[valores[0]]];
         let punto2 = [arreglo_clavos_x[valores[1]], arreglo_clavos_y[valores[1]]];
         let punto3 = [punto1[0], punto2[1]];
         let punto4 = [punto2[0], punto1[1]];

         let coor_x = [punto1[0], punto2[0], punto3[0], punto4[0]];
         let max_X = Math.max(...coor_x);
         let min_X = Math.min(...coor_x);

         let coor_y = [punto1[1], punto2[1], punto3[1], punto4[1]];
         let max_Y = Math.max(...coor_y);
         let min_Y = Math.min(...coor_y);
         console.log("Coordenadas: ", coor_y);
         console.log("Max: ", max_Y);
         console.log("Min: ", min_Y);

         let rectangulos = document.getElementById("svg-rectangulos");
         rectangulos.setAttribute("transform", "translate(" + (aumentoVertical * division) + ", " + (altoTotal - division * aumentoHorizontal) + ")");

         let nuevo_rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
         nuevo_rect.setAttribute("fill", "none");
         nuevo_rect.setAttribute("stroke", "green");
         nuevo_rect.setAttribute("stroke-width", "2.5");
         nuevo_rect.setAttribute("x", aumentoVertical * min_X);
         nuevo_rect.setAttribute("y", -aumentoHorizontal * max_Y);
         nuevo_rect.setAttribute("width", aumentoVertical * (max_X - min_X));
         nuevo_rect.setAttribute("height", aumentoHorizontal * (max_Y - min_Y));
         rectangulos.appendChild(nuevo_rect);
      }
   } else {
      alert("Los puntos que estas conectando con el liston no existen");
   }
}

function genera_caso() {
   document.getElementById("text-genera-caso").value = "";
   let caso = document.getElementById("text-genera-caso");

   let clavos_x = [];
   for (let elemento of conjunto_clavos_x) {
      clavos_x.push(elemento);
   }
   console.log("Clavos X: ", clavos_x);

   let clavos_y = [];
   for (let elemento of conjunto_clavos_y) {
      clavos_y.push(elemento);
   }

   let adornos_x = [];
   for (let elemento of conjunto_adornos_x) {
      adornos_x.push(elemento);
   }

   let adornos_y = [];
   for (let elemento of conjunto_adornos_y) {
      adornos_y.push(elemento);
   }

   caso.value += clavos_x.length + adornos_x.length + "\n";
   for (let i = 0; i < clavos_x.length; ++i) {
      caso.value += clavos_x[i] + " " + clavos_y[i] + " " + "C\n";
   }
   for (let i = 0; i < adornos_x.length; ++i) {
      caso.value += adornos_x[i] + " " + adornos_y[i] + " " + "A\n";
   }
}

function limpia_todo() {
   limpia_puntos();
   limpia_rectangulos();

   document.getElementById("text-clavos").value = "";
   document.getElementById("text-adornos").value = "";
   document.getElementById("text-rectangulos").value = "";
   document.getElementById("text-genera-caso").value = "";
   document.getElementById("text-entrada-caso").value = "";
   // console.log("OK");
}

function entrada_caso() {
   let contenido = document.getElementById("text-entrada-caso").value;
   limpia_todo();
   document.getElementById("text-entrada-caso").value = contenido;
   let lineas = contenido.split('\n');

   for (let i = 1; i < lineas.length; ++i) {
      let valores = lineas[i].split(" ");
      if (valores[2] == 'C') {
         document.getElementById("text-clavos").value += valores[0] + " " + valores[1] + "\n";
      } else if (valores[2] == 'A') {
         document.getElementById("text-adornos").value += valores[0] + " " + valores[1] + "\n";
      } else {
         alert("Inserte un valor válido");
      }
   }
   dibuja_puntos();
}

function instrucciones(tipo){
   let inst = document.getElementById("instrucciones-" + tipo);
   inst.hidden = !inst.hidden;
}

