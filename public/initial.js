axios.get('/api/notes').then(({ data: notes }) => {
    if (notes.length === 0) {
        return;
    }

    const notesColumns = document.querySelectorAll('.notes-column');

    function renderNote({ title, content }) {
        return `
        <div class="note">
          <header class="note-title">
            ${title}
          </header>
          <main class="content">
            ${content}
          </main>
        </div>
      `;
    }

    for (let i = 0; i < notes.length; i++) {
        const renderedNote = renderNote(notes[i]);
        switch (i % 3) {
            case 0:
                notesColumns[0].innerHTML += renderedNote;
                break;
            case 1:
                notesColumns[1].innerHTML += renderedNote;
                break;
            case 2:
                notesColumns[2].innerHTML += renderedNote;
        }
    }
});
