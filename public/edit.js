function addDeleteRequest() {
    const deleteButton = document.querySelector('.delete-button');

    deleteButton.addEventListener('click', () => {
        axios.delete(`/api/delete/${deleteButton.id}`).then((res) => {
            if (res.status === 202) {
                window.location = '/';
            }
        });
    });
}

function addEditRequest() {
    const newNoteContainer = document.querySelector('.new-note-container');
    const saveButton = document.querySelector('.save-button');
    const noteTitle = document.querySelector('.title-input');
    const noteContent = document.querySelector('.content-input');

    saveButton.addEventListener('click', () => {
        axios
            .put(
                '/api/edit-note',
                {
                    title: noteTitle.value,
                    content: noteContent.value,
                    _id: newNoteContainer.id,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((res) => {
                if (res.status === 204) {
                    window.location = '/';
                }

                for (let error in res.data) {
                    document.querySelector(`.${error}-error`).innerText =
                        res.data[error].msg;
                }
            });
    });
}

addEditRequest();
addDeleteRequest();
