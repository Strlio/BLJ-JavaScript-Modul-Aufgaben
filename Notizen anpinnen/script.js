function createNoteHTML(title, content, index) {
    return `
<div class="noteContainer">
    <button class="deleteNote" type="button" data-note-index="${index}" aria-label="Notiz löschen" title="Notiz löschen">&times;</button>
    <h2>${title}</h2>
    <p>${content}</p>
</div>`;
}

function initialize() {
    const createNoteButton = document.getElementById('createNote');
    if (createNoteButton) {
        createNoteButton.addEventListener('click', createNote);
    }
    const notesContainer = document.getElementById('notesContainer');
    if (notesContainer) {
        notesContainer.addEventListener('click', event => {
            const deleteButton = event.target.closest('.deleteNote');
            if (deleteButton) {
                deleteNote(Number(deleteButton.dataset.noteIndex));
            }
        });
    }
    renderNotes();
}

function readLocalStorage() {
    // "notes" muss ein String sein, kein Variablename ohne Anführungszeichen
    const storedNotes = localStorage.getItem('notes');
    return storedNotes ? JSON.parse(storedNotes) : [];
}

function writeNotesToLocalStorage(notes) {
    // 'notes' muss ein String in Anführungszeichen sein!
    localStorage.setItem('notes', JSON.stringify(notes));
}

function createNote() {
    const contentInput = document.getElementById('contentInput'); // Achte auf die ID!
    
    if (contentInput && contentInput.value.trim().length > 0) {
        const newNote = {
            title: new Date().toLocaleDateString(), // Ein schönerer Titel als nur die Millisekunden
            content: contentInput.value
        };

        const notes = readLocalStorage();
        notes.push(newNote);
        writeNotesToLocalStorage(notes);

        renderNotes();

        contentInput.value = ''; // Eingabefeld leeren
    }
}

function deleteNote(index) {
    const notes = readLocalStorage();
    if (index >= 0 && index < notes.length) {
        notes.splice(index, 1);
        writeNotesToLocalStorage(notes);
        renderNotes();
    }
}

// Diese Funktion fügt die Notizen in die Webseite ein
function renderNotes() {
    const notes = readLocalStorage();
    const container = document.getElementById('notesContainer');

    if (container) {
        container.innerHTML = '';
        notes.forEach((note, index) => {
            container.innerHTML += createNoteHTML(note.title, note.content, index);
        });
    }
}

window.onload = initialize;