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

addDeleteRequest();

const editorsWrapper2 = document.querySelector('.editors-wrapper');

editorsWrapper2.querySelectorAll('.delete-editor-button').forEach((EDB) => {
    EDB.addEventListener('click', () => {
        axios
            .delete(
                `/api/editor/${EDB.id}/${
                    document.querySelector('.new-note-container').id
                }`
            )
            .then(() => {
                EDB.parentElement.remove();
            });
    });
});
