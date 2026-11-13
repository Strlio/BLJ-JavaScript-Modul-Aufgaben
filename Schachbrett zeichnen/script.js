zeichneSchachbrett();

function zeichneSchachbrett() {
  var result = "";

  //todo: HTML-Code für Schachbrett erstellen
  //      und der Variable "result" zuweisen
  
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {

        const color = (function() {
            return(i + j) % 2 === 0 ? "black" : "white";
        })();

        result += `<div class="schachDivs ${color}" ></div>`
    }
  }

  document.getElementsByTagName("body")[0].innerHTML = result;
  console.log(result);
}
