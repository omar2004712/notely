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
    .then(({ data: { notes, _id } }) => {
        if (notes.length === 0) {
            return;
        }

        const notesColumns = document.querySelectorAll('.notes-column');

        function renderNote({ title, content, _id, creatorId }, userId) {
            // added an id prop for editing on click
            return `
            <div class="note ${
                creatorId === userId ? 'blue' : 'green'
            }" id="${_id}">
                <div class="note-head">
                    <h2 class="note-title">
                        ${title}
                    </h2>
                    <a href="/edit-note?id=${_id}">
                    <i class="fa-solid fa-pen edit-button"></i>
                    </a>
                </div>
                <div class="content">
                    ${content.replace(/\n/g, '<br />')}
                </div>
            </div>
      `;
        }

        for (let i = 0; i < notes.length; i++) {
            const renderedNote = renderNote(notes[i], _id);
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
