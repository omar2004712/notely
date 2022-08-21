let notesIndex = 1; // this varialbe will store at which index of notes we are in

async function requestNotesOnScroll() {
    if (document.body.scrollHeight - window.scrollY !== window.innerHeight) {
        return;
    }

    const {
        data: { notes, _id },
    } = await axios.post(
        '/api/notes',
        {
            index: notesIndex,
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    if (notes.length < 18) {
        document.removeEventListener('click', requestNotesOnScroll);
    }

    if (notes.length === 0) {
        // skip the whole operation and exit
        return;
    }

    const notesContainer = document.querySelector('.notes-container'); // fix used querySelector instead of querySelectorAll

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

    notesIndex += 18; // for the next request
}

document.addEventListener('scroll', requestNotesOnScroll);
