function addEditRequest() {
    const newNoteContainer = document.querySelector('.new-note-container');
    const saveButton = document.querySelector('.save-button');
    const noteTitle = document.querySelector('.note-title');
    const noteContent = document.querySelector('.note-content');

    saveButton.addEventListener('click', () => {
        axios
            .put('/api/edit-note', {
                title: noteTitle.value,
                content: noteContent.innerText,
                _id: newNoteContainer.id,
            })
            .then((res) => {
                if (res.status === 204) {
                    window.location = '/';
                }
            });
    });
}
