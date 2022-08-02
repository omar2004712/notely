function addSaveRequest() {
    const saveButton = document.querySelector('.save-button');
    const noteTitle = document.querySelector('.note-title');
    const noteContent = document.querySelector('.note-content');

    saveButton.addEventListener('click', () => {
        axios
            .post(
                '/api/save-note',
                {
                    title: noteTitle.value,
                    content: noteContent.value,
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

addSaveRequest();
