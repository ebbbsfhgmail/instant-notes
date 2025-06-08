function addNote() {
    const noteInput = document.getElementById('newNote');
    const noteText = noteInput.value.trim();
    
    if (noteText) {
        saveNote(noteText);
        noteInput.value = '';
        displayNotes();
    }
}

function saveNote(note) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
}

function displayNotes() {
    const notesList = document.getElementById('notesList');
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    
    notesList.innerHTML = '';
    
    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.innerHTML = `
            <pre>${note}</pre>
            <button onclick="copyNote(${index})">نسخ</button>
            <button onclick="deleteNote(${index})">حذف</button>
        `;
        notesList.appendChild(noteElement);
    });
}

function copyNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteText = notes[index];
    navigator.clipboard.writeText(noteText).then(() => {
        alert('تم النسخ!');
    });
}

function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

// عرض الملاحظات عند تحميل الصفحة
window.onload = displayNotes;
