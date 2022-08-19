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

const editorsWrapper = document.querySelector('.editors-wrapper');

document.querySelector('.show-users-button').addEventListener('click', () => {
    const showIcon = document.querySelector('.show-users-button i');
    const isHidden = Array.from(editorsWrapper.classList).includes('hidden');

    editorsWrapper.classList.toggle('hide');
    showIcon.classList.toggle('flip');
});
