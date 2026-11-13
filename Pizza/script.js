window.addEventListener("load", initialize);

function initialize() {
    document.getElementById("add").addEventListener("click", add);
    document.getElementById("remove").addEventListener("click", remove);
}

function add() {
    var ingredients = document.getElementById("ingredients");
    var choice = document.getElementById("choice");
    
    // Prüfen, ob eine Option ausgewählt ist
    if (ingredients.selectedIndex > -1) {
        // Die ausgewählte Option (das <option> Element) holen
        var selectedOption = ingredients.options[ingredients.selectedIndex];

        // Die Option zum rechten Select verschieben
        // append() verschiebt das Element automatisch aus dem alten zum neuen Select
        choice.append(selectedOption);
    }
}

function remove() {
    var ingredients = document.getElementById("ingredients");
    var choice = document.getElementById("choice");
    
    // Prüfen, ob im rechten Select etwas ausgewählt ist
    if (choice.selectedIndex > -1) {
        // Die ausgewählte Option vom rechten Select holen
        var selectedOption = choice.options[choice.selectedIndex];

        // Die Option zurück zum linken Select verschieben
        ingredients.append(selectedOption);
    }
}