let notesIndex = 18; // this varialbe will store at which index of notes we are in

document.addEventListener('scroll', () => {
    // ================================
    // For the animation of the top bar
    // ================================

    const topBar = document.querySelector('.top-bar');
    const newNoteBtn = topBar.querySelector('i');
    const header = topBar.querySelector('a');

    if (window.scrollY > 100) {
        topBar.style.fontSize = '12px';
        topBar.style.backgroundColor = 'var(--button-color)';
        header.style.color = 'white';
        newNoteBtn.style.color = 'white';
        newNoteBtn.style.fontSize = '28px';
        return;
    }

    topBar.style.backgroundColor = `rgb(${2.55 * (100 - window.scrollY)}, ${
        255 - window.scrollY
    }, 255)`;
    header.style.color = `rgb(${2.55 * window.scrollY}, ${
        2.55 * window.scrollY
    }, ${2.55 * window.scrollY})`;
    newNoteBtn.style.color = `rgb(${window.scrollY * 2.55}, ${
        window.scrollY * (2.55 - 1.55) + 155
    }, 255)`;
    topBar.style.fontSize = `${(100 - window.scrollY) * 0.18 + 12}px`;
    newNoteBtn.style.fontSize = `${(100 - window.scrollY) * 0.12 + 28}px`;
});

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
            <a href="/edit-note?id=${_id}">
                <div class="note" id="${_id}">
                    <header class="note-title">
                        ${title}
                    </header>
                    <p class="content">
                        ${content}
                    </p>
                </div>
            </a>
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
