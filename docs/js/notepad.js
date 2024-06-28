document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("notepad-form");
  const noteContent = document.getElementById("note-content");
  const notesList = document.getElementById("notes-list");
  const clearAllButton = document.getElementById("clear-all-notes");

  // Load saved notes from localStorage
  const loadNotes = () => {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notesList.innerHTML = "";
    notes.forEach((note, index) => {
      const li = document.createElement("li");

      const noteText = document.createElement("span");
      noteText.textContent = `${note.content} (${note.timestamp})`;
      noteText.style.flexGrow = "1";

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        deleteNote(index);
      });

      li.appendChild(noteText);
      li.appendChild(deleteButton);
      notesList.appendChild(li);
    });
  };

  // Save note to localStorage
  const saveNote = (content) => {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const timestamp = new Date().toLocaleString();
    notes.unshift({ content, timestamp });
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  // Delete note from localStorage
  const deleteNote = (index) => {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
  };

  // Clear all notes from localStorage
  const clearAllNotes = () => {
    localStorage.removeItem("notes");
    loadNotes();
  };

  // Handle form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const note = noteContent.value.trim();
    if (note) {
      saveNote(note);
      noteContent.value = "";
      loadNotes();
    }
  });

  // Handle clear all notes button click
  clearAllButton.addEventListener("click", (e) => {
    clearAllNotes();
  });

  // Initial load
  loadNotes();
});
