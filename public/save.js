function addSaveRequest() {
    const saveButton = document.querySelector('.save-button');
    const noteTitle = document.querySelector('.title-input');
    const noteContent = document.querySelector('.content-input');

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
                if (res.status === 201) {
                    // fixed the status code
                    return (window.location = '/'); // to stop any none existing errors "undefined" to show up on the screen while loading
                }

                document.querySelectorAll('.error').forEach((el) => {
                    el.innerText = ''; // to emplty all the previous errors
                });

                for (let error in res.data) {
                    document.querySelector(`.${error}-error`).innerText =
                        res.data[error].msg;
                }
            });
    });
}

addSaveRequest();
