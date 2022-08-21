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

        const notesContainer = document.querySelector('.notes-container');

        function renderNote(
            { title, content, _id, creatorId },
            userId,
            parentNode
        ) {
            // added an id prop for editing on click
            const noteContainer = document.createElement('div');
            noteContainer.classList.add('note-container');

            noteContainer.innerHTML = `
            <div class="note ${creatorId._id === userId ? 'blue' : 'green'}">
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
                <span class="created-by">created by ${creatorId.name}</span>
            </div>
            `;

            parentNode.append(noteContainer);

            const note = noteContainer.querySelector('.note');
            noteContainer.style.gridRowEnd = `span ${note.clientHeight + 8}`;
        }

        for (let i = 0; i < notes.length; i++) {
            renderNote(notes[i], _id, notesContainer);
        }
    });
