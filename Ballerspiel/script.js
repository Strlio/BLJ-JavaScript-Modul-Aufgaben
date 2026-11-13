const balls = Array.from(document.getElementsByTagName("img"));
const gameOverMessage = document.getElementById("game-over");

balls.forEach(currentBall => {
    currentBall.addEventListener("click", function() {
        // Schritt 1: Ball zu Kreuz machen
        if (this.src.indexOf("ball.png") > -1) {
            this.src = "kreuz.png";
        }
        // Schritt 2: Kreuz unsichtbar machen
        else if (this.src.indexOf("kreuz.png") > -1) {
            this.style.visibility = "hidden";

            // Wir holen die aktuelle Liste der Bilder
            const allImages = document.getElementsByTagName("img");
            // Wir wandeln sie in ein Array um, damit .forEach() funktioniert
            const allImagesArray = Array.from(allImages);

            let allHidden = true;

            for (let img of allImagesArray) {
                if (img.style.visibility !== "hidden") {
                    allHidden = false; // Es gibt noch ein sichtbares Bild
                    break;
                }
            }

            // Wenn alle unsichtbar sind: Game Over & Löschen
            if (allHidden) {
                gameOverMessage.style.display = "block";

                // Jetzt werden alle Bälle endgültig aus dem HTML gelöscht
                allImagesArray.forEach(img => {
                    img.remove();
                });
            }
        }
    });
});

