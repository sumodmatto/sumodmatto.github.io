class NotepadApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
            <style>
              @import url('../css/common.css');
              @import url('../css/notepad.css');
            </style>
            <div class="container">
              <h1>Notepad</h1>
              <form id="notepad-form">
                <textarea id="note-content" placeholder="Type your note here..."></textarea>
                <button type="submit">Save Note</button>
              </form>
              <div id="saved-notes">
                <h2>Saved Notes</h2>
                <button id="clear-all-notes">Clear All Notes</button>
                <ul id="notes-list"></ul>
              </div>
            </div>
          `;

    this.loadNotes();
    this.addEventListeners();
  }

  addEventListeners() {
    const form = this.shadowRoot.getElementById("notepad-form");
    const noteContent = this.shadowRoot.getElementById("note-content");
    const clearAllButton = this.shadowRoot.getElementById("clear-all-notes");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const note = noteContent.value.trim();
      if (note) {
        this.saveNote(note);
        noteContent.value = "";
        this.loadNotes();
      }
    });

    clearAllButton.addEventListener("click", () => {
      this.clearAllNotes();
    });
  }

  loadNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const notesList = this.shadowRoot.getElementById("notes-list");
    notesList.innerHTML = "";
    notes.forEach((note, index) => {
      const li = document.createElement("li");

      const noteText = document.createElement("span");
      noteText.textContent = note.content;
      noteText.style.flexGrow = "1";
      noteText.style.whiteSpace = "pre-wrap"; // 改行を保持

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        this.deleteNote(index);
      });

      li.appendChild(noteText);
      li.appendChild(deleteButton);
      notesList.appendChild(li);
    });
  }

  saveNote(content) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const timestamp = new Date().toLocaleString();
    const contentWithTimestamp = `${content}\n${timestamp}`;
    notes.unshift({ content: contentWithTimestamp }); // contentに改行を含むtimestampを追加
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    this.loadNotes();
  }

  clearAllNotes() {
    localStorage.removeItem("notes");
    this.loadNotes();
  }
}

customElements.define("notepad-app", NotepadApp);
