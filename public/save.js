function addDeleteRequest() {
    const deleteButton = document.querySelector('.delete-button');

    if (!deleteButton) {
        // if there are no delete button -new note- cancel the operation
        return;
    }

    deleteButton.addEventListener('click', () => {
        axios.delete(`/api/delete/${deleteButton.id}`).then((res) => {
            if (res.status === 202) {
                window.location = '/';
            }
        });
    });
}

function addSaveRequest() {
    const saveButton = document.querySelector('.save-button');
    const noteTitle = document.querySelector('.note-title');
    const noteContent = document.querySelector('.note-content');

    saveButton
        .addEventListener('click', () => {
            axios.post('/api/save-note', {
                title: noteTitle.value,
                content: noteContent.innerText,
            });
        })
        .then((res) => {
            if (res.status === 204) {
                window.location = '/';
            }
        });
}
