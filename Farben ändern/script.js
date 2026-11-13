// Funktion, die die Farben anwendet
function updateColors() {
    // vom Benutzer ausgewählte Hintergrundfarbe 
    let selectedBackgroundColor = document.getElementById("bg-picker").value;
    
    // vom Benutzer ausgewählte Schriftfarbe 
    let selectedColor = document.getElementById("font-picker").value;
    
    // Hintergrundfarbe und Schriftfarbe setzen
    document.body.style.backgroundColor = selectedBackgroundColor;
    document.body.style.color = selectedColor;
}

// Event Listener für den Hintergrund-Picker
document.getElementById("bg-picker").addEventListener("input", updateColors);

// Event Listener für den Schrift-Picker
document.getElementById("font-picker").addEventListener("input", updateColors);

// Initial beim Laden der Seite einmal ausführen
updateColors();
