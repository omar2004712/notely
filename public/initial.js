axios
    .post(
        '/api/notes',
        {
            index: 0,
        },
        {
            header: {
                'Content-Type': 'application/json',
            },
        }
    )
    .then(({ data: notes }) => {
        if (notes.length === 0) {
            return;
        }

        const notesColumns = document.querySelectorAll('.notes-column');

        function renderNote({ title, content, _id }) {
            // added an id prop for editing on click
            return `
        <div class="note" id="${_id}">
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
