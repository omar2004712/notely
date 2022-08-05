let notesIndex = 18; // this varialbe will store at which index of notes we are in

async function requestNotesOnScroll() {
    if (document.body.scrollHeight - window.scrollY !== window.innerHeight) {
        return;
    }

    const {
        data: { notes },
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

    const notesColumns = document.querySelectorAll('.notes-column');

    function renderNote({ title, content, _id }) {
        return `
            <div class="note" id="${_id}">
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

    notesIndex += 18; // for the next request
}

document.addEventListener('scroll', requestNotesOnScroll);
